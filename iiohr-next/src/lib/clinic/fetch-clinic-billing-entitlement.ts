import type { SupabaseClient } from "@supabase/supabase-js";

export type ClinicBillingEntitlementCounts = {
  pendingInvites: number;
  linkedPlacementNoEnrollment: number;
  enrolledUsersActive: number;
  enrolledUsersPausedOnly: number;
  enrolledUsersCompletedOnly: number;
  enrolledUsersWithdrawnOnly: number;
};

export type ClinicBillingEntitlementSnapshot = {
  seatLimit: number | null;
  seatsUsed: number;
  seatsAvailable: number | null;
  overLimit: boolean;
  completedEnrollmentConsumesSeat: boolean;
  counts: ClinicBillingEntitlementCounts;
};

function num(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) ? v : 0;
}

function parseCounts(o: Record<string, unknown> | null | undefined): ClinicBillingEntitlementCounts {
  if (!o) {
    return {
      pendingInvites: 0,
      linkedPlacementNoEnrollment: 0,
      enrolledUsersActive: 0,
      enrolledUsersPausedOnly: 0,
      enrolledUsersCompletedOnly: 0,
      enrolledUsersWithdrawnOnly: 0,
    };
  }
  return {
    pendingInvites: num(o.pending_invites),
    linkedPlacementNoEnrollment: num(o.linked_placement_no_enrollment),
    enrolledUsersActive: num(o.enrolled_users_active),
    enrolledUsersPausedOnly: num(o.enrolled_users_paused_only),
    enrolledUsersCompletedOnly: num(o.enrolled_users_completed_only),
    enrolledUsersWithdrawnOnly: num(o.enrolled_users_withdrawn_only),
  };
}

export function parseClinicBillingEntitlementPayload(data: unknown): ClinicBillingEntitlementSnapshot | null {
  if (data == null) return null;
  let raw: unknown = data;
  if (typeof data === "string") {
    try {
      raw = JSON.parse(data) as unknown;
    } catch {
      return null;
    }
  }
  if (typeof raw !== "object" || raw === null) return null;
  const o = raw as Record<string, unknown>;
  const policy = o.policy as Record<string, unknown> | undefined;
  return {
    seatLimit:
      o.seat_limit === null || o.seat_limit === undefined
        ? null
        : typeof o.seat_limit === "number"
          ? o.seat_limit
          : null,
    seatsUsed: num(o.seats_used),
    seatsAvailable:
      o.seats_available === null || o.seats_available === undefined ? null : num(o.seats_available),
    overLimit: Boolean(o.over_limit),
    completedEnrollmentConsumesSeat: Boolean(policy?.completed_enrollment_consumes_seat),
    counts: parseCounts(o.counts as Record<string, unknown>),
  };
}

export async function fetchClinicBillingEntitlementSnapshot(
  supabase: SupabaseClient,
  clinicId: string
): Promise<{ snapshot: ClinicBillingEntitlementSnapshot | null; error?: string }> {
  const res = await supabase.rpc("get_clinic_billing_entitlement_snapshot", { p_clinic_id: clinicId });
  if (res.error) {
    return { snapshot: null, error: res.error.message };
  }
  return { snapshot: parseClinicBillingEntitlementPayload(res.data) };
}
