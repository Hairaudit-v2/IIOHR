import type { SupabaseClient } from "@supabase/supabase-js";
import {
  fetchIiohrAccessSnapshot,
  resolveIiohrPostLoginDestination,
} from "@/lib/auth/iiohr-post-login";

/**
 * Default landing after magic link when `mergeIiohrPostLoginWithNext` is not used.
 * Delegates to `resolveIiohrPostLoginDestination` (roles, enrollments, applications).
 */
export async function resolvePostLoginRedirect(
  supabase: SupabaseClient,
  userId: string
): Promise<string> {
  const snapshot = await fetchIiohrAccessSnapshot(supabase, userId);
  return resolveIiohrPostLoginDestination(snapshot).destination;
}
