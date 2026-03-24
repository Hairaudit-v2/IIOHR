import type { SupabaseClient } from "@supabase/supabase-js";

export type ApplicantAdmissionsTimelineEntry = {
  eventId: string;
  occurredAt: string;
  fromStatus: string | null;
  toStatus: string;
  title: string;
  detail: string | null;
};

type RpcTimelineRow = {
  event_id: string;
  occurred_at: string;
  from_status: string | null;
  to_status: string;
  title: string;
  detail: string | null;
};

/**
 * Sanitized milestones for the authenticated applicant (own application only). Backed by
 * `academy_applicant_admissions_timeline` SECURITY DEFINER RPC.
 */
export async function loadApplicantAdmissionsTimeline(
  supabase: SupabaseClient,
  applicationId: string
): Promise<ApplicantAdmissionsTimelineEntry[]> {
  const { data, error } = await supabase.rpc("academy_applicant_admissions_timeline", {
    p_application_id: applicationId,
  });
  if (error) {
    console.warn("[applicant-timeline]", error.message);
    return [];
  }
  if (!Array.isArray(data)) {
    return [];
  }
  return (data as RpcTimelineRow[]).map((r) => ({
    eventId: r.event_id,
    occurredAt: r.occurred_at,
    fromStatus: r.from_status,
    toStatus: r.to_status,
    title: r.title,
    detail: r.detail,
  }));
}
