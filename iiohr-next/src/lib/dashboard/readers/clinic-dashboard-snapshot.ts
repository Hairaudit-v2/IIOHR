import type { SupabaseClient } from "@supabase/supabase-js";

export type ClinicTeamEnrollmentRow = {
  id: string;
  user_id: string;
  stream_slug: string;
  program_slug: string;
  status: string;
  clinic_id: string | null;
};

export type ClinicDashboardSnapshot = {
  isClinicManager: boolean;
  clinicId: string | null;
  teamEnrollments: ClinicTeamEnrollmentRow[];
  /** Mean module percent per enrollment when `module_progress` is readable for team rows */
  progressByEnrollmentId: Record<string, number>;
};

const EMPTY: ClinicDashboardSnapshot = {
  isClinicManager: false,
  clinicId: null,
  teamEnrollments: [],
  progressByEnrollmentId: {},
};

/**
 * Clinic roster and pathway signals. RLS may block team rows until clinic-manager policies exist;
 * callers should fall back to placeholder VM data when `teamEnrollments` is empty.
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

    let clinicId: string | null = null;
    const mine = await supabase
      .from("program_enrollments")
      .select("clinic_id")
      .eq("user_id", userId)
      .not("clinic_id", "is", null)
      .limit(1)
      .maybeSingle();
    if (!mine.error && mine.data) {
      clinicId = (mine.data as { clinic_id: string | null }).clinic_id;
    }

    if (!clinicId) {
      const rpc = await supabase.rpc("user_clinic_ids");
      if (!rpc.error && Array.isArray(rpc.data) && rpc.data.length > 0) {
        clinicId = rpc.data[0] as string;
      }
    }

    let teamEnrollments: ClinicTeamEnrollmentRow[] = [];
    if (clinicId) {
      const team = await supabase
        .from("program_enrollments")
        .select("id,user_id,stream_slug,program_slug,status,clinic_id")
        .eq("clinic_id", clinicId)
        .eq("status", "active");
      if (!team.error && team.data) {
        teamEnrollments = team.data as ClinicTeamEnrollmentRow[];
      }
    }

    const ids = teamEnrollments.map((t) => t.id);
    const progressByEnrollmentId: Record<string, number> = {};
    if (ids.length > 0) {
      const pg = await supabase
        .from("module_progress")
        .select("program_enrollment_id, percent_complete")
        .in("program_enrollment_id", ids);
      if (!pg.error && pg.data) {
        const byEnr = new Map<string, number[]>();
        for (const row of pg.data as { program_enrollment_id: string; percent_complete: number }[]) {
          const list = byEnr.get(row.program_enrollment_id) ?? [];
          list.push(row.percent_complete);
          byEnr.set(row.program_enrollment_id, list);
        }
        for (const [eid, vals] of byEnr) {
          progressByEnrollmentId[eid] = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
        }
      }
    }

    return { isClinicManager, clinicId, teamEnrollments, progressByEnrollmentId };
  } catch {
    return { ...EMPTY };
  }
}
