import type { SupabaseClient } from "@supabase/supabase-js";
import { fetchClinicBillingEntitlementSnapshot } from "@/lib/clinic/fetch-clinic-billing-entitlement";

/**
 * Soft enforcement: log when an action may conflict with seat limits.
 * Does not block mutations (Stripe / hard enforcement can extend this).
 */
export async function logClinicSeatEntitlementContext(
  supabase: SupabaseClient,
  clinicId: string,
  action: string,
  phase: "before" | "after"
): Promise<void> {
  const { snapshot, error } = await fetchClinicBillingEntitlementSnapshot(supabase, clinicId);
  if (error) {
    console.warn(`[clinic-seat][${phase}][${action}] snapshot unavailable: ${error}`);
    return;
  }
  if (!snapshot) return;

  if (snapshot.seatLimit == null) {
    return;
  }

  if (phase === "before" && snapshot.seatsUsed >= snapshot.seatLimit) {
    console.warn(
      `[clinic-seat][${phase}][${action}] At or over configured seat limit (${snapshot.seatsUsed}/${snapshot.seatLimit}).`
    );
  }
  if (phase === "after" && snapshot.overLimit) {
    console.warn(
      `[clinic-seat][${phase}][${action}] Over configured seat limit (${snapshot.seatsUsed}/${snapshot.seatLimit}).`
    );
  }
}
