import type { SupabaseClient } from "@supabase/supabase-js";

/** One row from `get_clinic_team_snapshot` RPC (SECURITY DEFINER aggregate). */
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
};

export type ClinicDashboardSnapshot = {
  isClinicManager: boolean;
  /** Primary clinic scope for the dashboard (first resolved id). */
  clinicId: string | null;
  /** All clinic ids the user can manage (RPC + enrollment-derived). */
  clinicIds: string[];
  /** Aggregated team rows from `get_clinic_team_snapshot` when authorized. */
  teamMembers: ClinicTeamMemberSnapshot[];
  /** Mean module percent keyed by enrollment id — populated only for legacy fallbacks; prefer `teamMembers[].progress_percent`. */
  progressByEnrollmentId: Record<string, number>;
  /** Set when the team RPC fails (e.g. not authorized); UI keeps explanatory copy. */
  teamSnapshotError?: string;
  /** Total certificates counted across team rows (from snapshot). */
  teamCertificateTotal: number;
};

const EMPTY: ClinicDashboardSnapshot = {
  isClinicManager: false,
  clinicId: null,
  clinicIds: [],
  teamMembers: [],
  progressByEnrollmentId: {},
  teamCertificateTotal: 0,
};

function parseTeamSnapshotPayload(data: unknown): ClinicTeamMemberSnapshot[] {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data as ClinicTeamMemberSnapshot[];
  }
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data) as unknown;
      return Array.isArray(parsed) ? (parsed as ClinicTeamMemberSnapshot[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Resolves clinic scope via `user_clinic_ids` + enrollment, then loads team training data
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
    let teamSnapshotError: string | undefined;
    let teamCertificateTotal = 0;

    if (clinicId && isClinicManager) {
      const snap = await supabase.rpc("get_clinic_team_snapshot", { p_clinic_id: clinicId });
      if (snap.error) {
        teamSnapshotError = snap.error.message;
      } else {
        teamMembers = parseTeamSnapshotPayload(snap.data).map((row) => ({
          ...row,
          display_name: row.display_name?.trim() ? row.display_name.trim() : null,
        }));
        for (const row of teamMembers) {
          progressByEnrollmentId[row.enrollment_id] = row.progress_percent;
        }
        teamCertificateTotal = teamMembers.reduce((s, r) => s + (r.certificate_count ?? 0), 0);
      }
    }

    return {
      isClinicManager,
      clinicId,
      clinicIds,
      teamMembers,
      progressByEnrollmentId,
      teamSnapshotError,
      teamCertificateTotal,
    };
  } catch {
    return { ...EMPTY };
  }
}
