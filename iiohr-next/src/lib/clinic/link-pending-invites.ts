import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Attaches pending `clinic_team_members` rows (invite_email) to the current session user
 * when emails match. Safe to call on every load; idempotent.
 * Does not throw — logs RPC errors in development.
 */
export async function linkPendingClinicInvitesForSession(supabase: SupabaseClient): Promise<void> {
  try {
    const { error } = await supabase.rpc("link_pending_clinic_invites_for_user");
    if (error && process.env.NODE_ENV === "development") {
      console.warn("[link_pending_clinic_invites_for_user]", error.message);
    }
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[linkPendingClinicInvitesForSession]", e);
    }
  }
}
