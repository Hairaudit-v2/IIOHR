import type { SupabaseClient } from "@supabase/supabase-js";

/** Best-effort display string for dashboard heroes; never throws. */
export async function loadDashboardDisplayName(
  supabase: SupabaseClient,
  userId: string,
  email: string | undefined
): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("display_name, full_name")
      .eq("id", userId)
      .maybeSingle();
    if (!error && data) {
      const row = data as { display_name: string | null; full_name: string | null };
      if (row.display_name?.trim()) return row.display_name.trim();
      if (row.full_name?.trim()) return row.full_name.trim();
    }
  } catch {
    /* table or RLS may be unavailable in some environments */
  }
  if (email?.includes("@")) {
    return email.split("@")[0] ?? null;
  }
  return null;
}
