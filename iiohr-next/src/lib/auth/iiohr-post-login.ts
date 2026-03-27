import type { SupabaseClient } from "@supabase/supabase-js";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import type { ApplicationRow, DbAppUserRole } from "@/lib/academy/db/types";
import {
  normalizeIiohrPath,
  pathMatchesConsultantStreamRbac,
  pathMatchesDoctorStreamRbac,
} from "@/lib/auth/iiohr-protected-paths";

export type IiohrResolvedAccessType =
  | "admin"
  | "doctor_learner"
  | "consultant_learner"
  | "clinic_contact"
  | "applicant_in_review"
  | "applicant_draft"
  | "applicant_outcome"
  | "faculty"
  | "none";

export type ResolveIiohrPostLoginResult = {
  destination: string;
  resolvedAccessType: IiohrResolvedAccessType;
  /** Stable machine-readable reason for the chosen default destination */
  reasonCode?: string;
};

export type IiohrAccessSnapshot = {
  userId: string;
  roles: DbAppUserRole[];
  activeEnrollmentsByStream: Partial<Record<AcademyStreamSlug, true>>;
  applications: Pick<ApplicationRow, "id" | "status" | "target_stream_slug" | "updated_at">[];
};

const IN_REVIEW_STATUSES = new Set<ApplicationRow["status"]>([
  "submitted",
  "under_review",
  "needs_more_information",
]);

const TERMINAL_OR_HOLD_STATUSES = new Set<ApplicationRow["status"]>([
  "rejected",
  "declined",
  "waitlisted",
  "withdrawn",
]);

function roleSet(roles: DbAppUserRole[]): Set<DbAppUserRole> {
  return new Set(roles);
}

function isAcademyStreamSlug(v: string): v is AcademyStreamSlug {
  return v === "doctors" || v === "consultants";
}

/**
 * Loads role, enrollment, and application rows for post-login resolution and route checks.
 * Tolerates missing tables, RLS denials, or network errors by returning empty partial state.
 */
export async function fetchIiohrAccessSnapshot(
  supabase: SupabaseClient,
  userId: string
): Promise<IiohrAccessSnapshot> {
  const [rolesRes, enrollRes, appsRes] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", userId),
    supabase
      .from("program_enrollments")
      .select("stream_slug,status")
      .eq("user_id", userId)
      .eq("status", "active"),
    supabase
      .from("applications")
      .select("id,status,target_stream_slug,updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(24),
  ]);

  const roles = ((rolesRes.data ?? []) as { role: string }[])
    .map((row) => row.role)
    .filter((role): role is DbAppUserRole => role === "admin" || role === "faculty" || role === "clinic_manager");

  const activeEnrollmentsByStream: Partial<Record<AcademyStreamSlug, true>> = {};
  if (!enrollRes.error) {
    for (const row of (enrollRes.data ?? []) as { stream_slug: string }[]) {
      if (row.stream_slug === "doctors") activeEnrollmentsByStream.doctors = true;
      if (row.stream_slug === "consultants") activeEnrollmentsByStream.consultants = true;
    }
  }

  const applications = (
    appsRes.error ? [] : ((appsRes.data ?? []) as IiohrAccessSnapshot["applications"])
  ) as IiohrAccessSnapshot["applications"];

  return { userId, roles, activeEnrollmentsByStream, applications };
}

/**
 * Pure post-login destination from a pre-built snapshot (no I/O).
 */
export function resolveIiohrPostLoginDestination(snapshot: IiohrAccessSnapshot): ResolveIiohrPostLoginResult {
  const r = roleSet(snapshot.roles);
  const enroll = snapshot.activeEnrollmentsByStream;
  const apps = snapshot.applications;

  if (r.has("admin")) {
    return {
      destination: "/academy/admissions/review",
      resolvedAccessType: "admin",
      reasonCode: "ROLE_ADMIN",
    };
  }

  if (enroll.doctors) {
    return {
      destination: "/doctors/dashboard",
      resolvedAccessType: "doctor_learner",
      reasonCode: "ENROLLMENT_ACTIVE_DOCTORS",
    };
  }

  if (enroll.consultants) {
    return {
      destination: "/consultants/dashboard",
      resolvedAccessType: "consultant_learner",
      reasonCode: "ENROLLMENT_ACTIVE_CONSULTANTS",
    };
  }

  if (r.has("clinic_manager")) {
    return {
      destination: "/clinics/dashboard",
      resolvedAccessType: "clinic_contact",
      reasonCode: "ROLE_CLINIC_MANAGER",
    };
  }

  const inReview = apps.find((a) => IN_REVIEW_STATUSES.has(a.status));
  if (inReview) {
    return {
      destination: "/academy/application-status",
      resolvedAccessType: "applicant_in_review",
      reasonCode: "APPLICATION_IN_REVIEW_PIPELINE",
    };
  }

  const draft = apps.find((a) => a.status === "draft" && isAcademyStreamSlug(a.target_stream_slug));
  if (draft) {
    const applyPath = draft.target_stream_slug === "doctors" ? "/apply/doctors" : "/apply/consultants";
    return {
      destination: applyPath,
      resolvedAccessType: "applicant_draft",
      reasonCode: "APPLICATION_DRAFT",
    };
  }

  const accepted = apps.find((a) => a.status === "accepted");
  if (accepted) {
    return {
      destination: "/academy/application-status",
      resolvedAccessType: "applicant_outcome",
      reasonCode: "APPLICATION_ACCEPTED_PENDING_ENROLLMENT",
    };
  }

  const terminal = apps.find((a) => TERMINAL_OR_HOLD_STATUSES.has(a.status));
  if (terminal) {
    return {
      destination: "/academy/application-status",
      resolvedAccessType: "applicant_outcome",
      reasonCode: "APPLICATION_OUTCOME",
    };
  }

  if (r.has("faculty")) {
    return {
      destination: "/academy/faculty-review",
      resolvedAccessType: "faculty",
      reasonCode: "ROLE_FACULTY",
    };
  }

  return {
    destination: "/academy/access-pending",
    resolvedAccessType: "none",
    reasonCode: "NO_IIOHR_ACCESS_RECORD",
  };
}

/**
 * Chooses which application row to show on the consolidated status page.
 */
export function pickPrimaryApplicationForStatusDisplay(apps: ApplicationRow[]): ApplicationRow | null {
  if (!apps.length) return null;
  const pick = (pred: (a: ApplicationRow) => boolean) => apps.find(pred);
  return (
    pick((a) => IN_REVIEW_STATUSES.has(a.status)) ??
    pick((a) => a.status === "accepted") ??
    pick((a) => TERMINAL_OR_HOLD_STATUSES.has(a.status)) ??
    pick((a) => a.status === "draft") ??
    apps[0]
  );
}

/**
 * Whether the user may open `path` (already sanitized internal path). Unknown paths are allowed so
 * public marketing routes and `/apply/*` continue to work with `next`.
 * Doctor/consultant learner families use the same prefix lists as `IIOHR_SESSION_REQUIRED_PREFIXES`
 * (see `iiohr-protected-paths.ts`).
 */
export function userCanAccessIiohrPath(path: string, snapshot: IiohrAccessSnapshot): boolean {
  const p = normalizeIiohrPath(path);
  const r = roleSet(snapshot.roles);
  const enroll = snapshot.activeEnrollmentsByStream;
  const isAdmin = r.has("admin");
  const isFaculty = r.has("faculty");
  const isClinic = r.has("clinic_manager");

  if (p === "/academy/admissions/review" || p.startsWith("/academy/admissions/review/")) {
    return isAdmin;
  }
  if (p === "/academy/faculty-review" || p.startsWith("/academy/faculty-review/")) {
    return isAdmin || isFaculty;
  }
  if (pathMatchesDoctorStreamRbac(p)) {
    return isAdmin || isFaculty || Boolean(enroll.doctors);
  }
  if (pathMatchesConsultantStreamRbac(p)) {
    return isAdmin || isFaculty || Boolean(enroll.consultants);
  }
  if (p === "/clinics/dashboard" || p.startsWith("/clinics/dashboard/")) {
    return isAdmin || isClinic;
  }
  if (p === "/academy/application-status" || p.startsWith("/academy/application-status/")) {
    return true;
  }
  if (p === "/academy/access-pending" || p.startsWith("/academy/access-pending/")) {
    return true;
  }
  return true;
}

/**
 * Applies an optional safe `next` path only when entitled; otherwise returns the resolved default.
 * `safeNext` must already be passed through `sanitizeRedirectPath`.
 */
export function mergeIiohrPostLoginWithNext(
  safeNext: string | null | undefined,
  snapshot: IiohrAccessSnapshot
): ResolveIiohrPostLoginResult {
  const resolved = resolveIiohrPostLoginDestination(snapshot);
  const trimmed = typeof safeNext === "string" ? safeNext.trim() : "";
  if (!trimmed || trimmed === "/") {
    return resolved;
  }
  if (userCanAccessIiohrPath(trimmed, snapshot)) {
    return {
      destination: trimmed,
      resolvedAccessType: resolved.resolvedAccessType,
      reasonCode: "NEXT_PATH_ENTITLED",
    };
  }
  return {
    ...resolved,
    reasonCode: resolved.reasonCode ? `${resolved.reasonCode};NEXT_DENIED` : "NEXT_DENIED",
  };
}
