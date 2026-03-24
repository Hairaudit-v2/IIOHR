import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Default landing after magic link when no explicit `next` path was requested.
 * Order: admin → active enrollment (stream) → faculty → apply.
 */
export async function resolvePostLoginRedirect(
  supabase: SupabaseClient,
  userId: string
): Promise<string> {
  const { data: roles, error: rErr } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);
  if (rErr) {
    return "/apply";
  }
  const roleSet = new Set((roles ?? []).map((r: { role: string }) => r.role));
  if (roleSet.has("admin")) {
    return "/academy/admissions/review";
  }

  const { data: enrollments, error: eErr } = await supabase
    .from("program_enrollments")
    .select("stream_slug")
    .eq("user_id", userId)
    .eq("status", "active")
    .limit(1);
  if (!eErr && enrollments?.length) {
    const stream = (enrollments[0] as { stream_slug: string }).stream_slug;
    if (stream === "doctors") {
      return "/doctors/dashboard";
    }
    if (stream === "consultants") {
      return "/consultants/dashboard";
    }
  }

  if (roleSet.has("faculty")) {
    return "/doctors/faculty-review-pilot";
  }

  return "/apply";
}
