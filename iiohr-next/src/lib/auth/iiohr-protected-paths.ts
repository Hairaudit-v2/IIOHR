/**
 * Canonical IIOHR protected route configuration (single source of truth).
 *
 * - `IIOHR_SESSION_REQUIRED_PREFIXES`: middleware — any signed-in user passes; RBAC enforced downstream.
 * - `IIOHR_*_STREAM_RBAC_PREFIXES`: `userCanAccessIiohrPath`, `assertIiohrEntitledPath`, and layouts — admin | faculty | active stream enrollment | `academy_preview` on curriculum prefixes only (see `iiohr-post-login.ts`).
 *
 * Keep aligned with pages using `getProtectedAcademyAccess` under `src/app/doctors/*` and `src/app/consultants/*`.
 */

/** Doctor-stream academy surfaces (must match program/certificates routes, dashboard, pilot). */
export const IIOHR_DOCTOR_STREAM_RBAC_PREFIXES = [
  "/doctors/dashboard",
  "/doctors/programs",
  "/doctors/pilot-academy",
  "/doctors/certificates",
] as const;

/** Doctor curriculum only — excludes learner dashboard; used for `academy_preview`. */
export const IIOHR_DOCTOR_CURRICULUM_RBAC_PREFIXES = [
  "/doctors/programs",
  "/doctors/pilot-academy",
  "/doctors/certificates",
] as const;

/** Consultant-stream academy surfaces (includes competencies). */
export const IIOHR_CONSULTANT_STREAM_RBAC_PREFIXES = [
  "/consultants/dashboard",
  "/consultants/programs",
  "/consultants/certificates",
  "/consultants/competencies",
] as const;

/** Consultant / nurse curriculum only — excludes learner dashboard; used for `academy_preview`. */
export const IIOHR_CONSULTANT_CURRICULUM_RBAC_PREFIXES = [
  "/consultants/programs",
  "/consultants/certificates",
  "/consultants/competencies",
] as const;

/** Internal hub for curriculum preview navigation (session + role-gated in `userCanAccessIiohrPath`). */
export const IIOHR_ACADEMY_PREVIEW_HUB_PREFIX = "/academy/preview" as const;

/**
 * Paths that require a Supabase session in middleware. Union of admin/faculty/academy pages,
 * session-only applicant pages, clinic dashboard, and all learner stream prefixes above.
 */
export const IIOHR_SESSION_REQUIRED_PREFIXES = [
  "/academy/admissions/review",
  "/academy/faculty-review",
  "/academy/preview",
  "/academy/application-status",
  "/academy/access-pending",
  "/clinics/dashboard",
  ...IIOHR_DOCTOR_STREAM_RBAC_PREFIXES,
  ...IIOHR_CONSULTANT_STREAM_RBAC_PREFIXES,
] as const;

export function normalizeIiohrPath(path: string): string {
  const raw = path.split("?")[0]?.split("#")[0] ?? path;
  if (raw.length > 1 && raw.endsWith("/")) {
    return raw.slice(0, -1);
  }
  return raw;
}

export function pathMatchesAnyPrefix(path: string, prefixes: readonly string[]): boolean {
  const p = normalizeIiohrPath(path);
  return prefixes.some((prefix) => p === prefix || p.startsWith(`${prefix}/`));
}

export function pathRequiresIiohrSession(pathname: string): boolean {
  return pathMatchesAnyPrefix(pathname, IIOHR_SESSION_REQUIRED_PREFIXES);
}

export function pathMatchesDoctorStreamRbac(path: string): boolean {
  return pathMatchesAnyPrefix(path, IIOHR_DOCTOR_STREAM_RBAC_PREFIXES);
}

export function pathMatchesConsultantStreamRbac(path: string): boolean {
  return pathMatchesAnyPrefix(path, IIOHR_CONSULTANT_STREAM_RBAC_PREFIXES);
}

export function pathMatchesDoctorCurriculumRbac(path: string): boolean {
  return pathMatchesAnyPrefix(path, IIOHR_DOCTOR_CURRICULUM_RBAC_PREFIXES);
}

export function pathMatchesConsultantCurriculumRbac(path: string): boolean {
  return pathMatchesAnyPrefix(path, IIOHR_CONSULTANT_CURRICULUM_RBAC_PREFIXES);
}

export function pathMatchesAcademyPreviewHub(path: string): boolean {
  const p = normalizeIiohrPath(path);
  return p === IIOHR_ACADEMY_PREVIEW_HUB_PREFIX || p.startsWith(`${IIOHR_ACADEMY_PREVIEW_HUB_PREFIX}/`);
}
