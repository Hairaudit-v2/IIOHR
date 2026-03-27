import type { SupabaseClient } from "@supabase/supabase-js";
import {
  fetchClinicBillingEntitlementSnapshot,
  type ClinicBillingEntitlementSnapshot,
} from "@/lib/clinic/fetch-clinic-billing-entitlement";

/** One enrollment row from `get_clinic_team_snapshot` (merged with `clinic_team_members` when present). */
export type ClinicTeamMemberSnapshot = {
  enrollment_id: string;
  user_id: string;
  display_name: string | null;
  stream_slug: string;
  program_slug: string;
  enrollment_status: string;
  progress_percent: number;
  certificate_count: number;
  last_activity_at: string | null;
  member_record_id?: string | null;
  assignment_status?: string;
  assigned_pathway_stream?: string;
  assigned_pathway_program?: string | null;
};

export type ClinicPendingInviteSnapshot = {
  member_id: string;
  invite_email: string;
  target_stream_slug: string;
  target_program_slug: string | null;
  member_status: string;
};

export type ClinicDashboardSnapshot = {
  isClinicManager: boolean;
  clinicId: string | null;
  clinicIds: string[];
  teamMembers: ClinicTeamMemberSnapshot[];
  pendingInvites: ClinicPendingInviteSnapshot[];
  progressByEnrollmentId: Record<string, number>;
  teamSnapshotError?: string;
  teamCertificateTotal: number;
  billingEntitlement: ClinicBillingEntitlementSnapshot | null;
  billingEntitlementError?: string;
};

const EMPTY: ClinicDashboardSnapshot = {
  isClinicManager: false,
  clinicId: null,
  clinicIds: [],
  teamMembers: [],
  pendingInvites: [],
  progressByEnrollmentId: {},
  teamCertificateTotal: 0,
  billingEntitlement: null,
};

function parseTeamSnapshotPayload(data: unknown): {
  enrollments: ClinicTeamMemberSnapshot[];
  pendingInvites: ClinicPendingInviteSnapshot[];
} {
  if (!data) {
    return { enrollments: [], pendingInvites: [] };
  }
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data) as unknown;
      return parseTeamSnapshotPayload(parsed);
    } catch {
      return { enrollments: [], pendingInvites: [] };
    }
  }
  if (Array.isArray(data)) {
    return { enrollments: data as ClinicTeamMemberSnapshot[], pendingInvites: [] };
  }
  if (typeof data === "object" && data !== null && "enrollments" in data) {
    const o = data as { enrollments?: unknown; pending_invites?: unknown };
    const enrollments = Array.isArray(o.enrollments)
      ? (o.enrollments as ClinicTeamMemberSnapshot[])
      : [];
    const pendingInvites = Array.isArray(o.pending_invites)
      ? (o.pending_invites as ClinicPendingInviteSnapshot[])
      : [];
    return { enrollments, pendingInvites };
  }
  return { enrollments: [], pendingInvites: [] };
}

/**
 * Resolves clinic scope via `user_clinic_ids` + enrollment, then loads team data
 * through `get_clinic_team_snapshot` (no broad learner-table reads for managers).
 */
export async function fetchClinicDashboardSnapshot(
  supabase: SupabaseClient,
  userId: string
): Promise<ClinicDashboardSnapshot> {
  try {
    const roleRes = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "clinic_manager")
      .maybeSingle();
    const isClinicManager = !roleRes.error && Boolean(roleRes.data);

    const rpcRes = await supabase.rpc("user_clinic_ids");
    const fromRpc = !rpcRes.error && Array.isArray(rpcRes.data) ? (rpcRes.data as string[]).filter(Boolean) : [];

    let clinicIdFromEnrollment: string | null = null;
    const mine = await supabase
      .from("program_enrollments")
      .select("clinic_id")
      .eq("user_id", userId)
      .not("clinic_id", "is", null)
      .limit(1)
      .maybeSingle();
    if (!mine.error && mine.data) {
      clinicIdFromEnrollment = (mine.data as { clinic_id: string | null }).clinic_id;
    }

    const clinicIds = [...new Set([...fromRpc, clinicIdFromEnrollment].filter(Boolean))] as string[];
    const clinicId = fromRpc[0] ?? clinicIdFromEnrollment ?? null;

    const progressByEnrollmentId: Record<string, number> = {};
    let teamMembers: ClinicTeamMemberSnapshot[] = [];
    let pendingInvites: ClinicPendingInviteSnapshot[] = [];
    let teamSnapshotError: string | undefined;
    let teamCertificateTotal = 0;
    let billingEntitlement: ClinicBillingEntitlementSnapshot | null = null;
    let billingEntitlementError: string | undefined;

    if (clinicId && isClinicManager) {
      const snap = await supabase.rpc("get_clinic_team_snapshot", { p_clinic_id: clinicId });
      if (snap.error) {
        teamSnapshotError = snap.error.message;
      } else {
        const parsed = parseTeamSnapshotPayload(snap.data);
        teamMembers = parsed.enrollments.map((row) => ({
          ...row,
          display_name: row.display_name?.trim() ? row.display_name.trim() : null,
        }));
        pendingInvites = parsed.pendingInvites;
        for (const row of teamMembers) {
          progressByEnrollmentId[row.enrollment_id] = row.progress_percent;
        }
        teamCertificateTotal = teamMembers.reduce((s, r) => s + (r.certificate_count ?? 0), 0);
      }

      const be = await fetchClinicBillingEntitlementSnapshot(supabase, clinicId);
      billingEntitlement = be.snapshot;
      billingEntitlementError = be.error;
    }

    return {
      isClinicManager,
      clinicId,
      clinicIds,
      teamMembers,
      pendingInvites,
      progressByEnrollmentId,
      teamSnapshotError,
      teamCertificateTotal,
      billingEntitlement,
      billingEntitlementError,
    };
  } catch {
    return { ...EMPTY };
  }
}
