import type { SupabaseClient } from "@supabase/supabase-js";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import { answerToPlainString } from "@/lib/academy/admissions/answer-utils";

/**
 * Load latest draft application's answers as a flat map (question_key → string).
 */
export async function loadDraftAnswerMap(
  supabase: SupabaseClient,
  userId: string,
  stream: AcademyStreamSlug
): Promise<Record<string, string>> {
  const { data: app, error: appErr } = await supabase
    .from("applications")
    .select("id")
    .eq("user_id", userId)
    .eq("target_stream_slug", stream)
    .eq("status", "draft")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (appErr || !app?.id) {
    return {};
  }
  const { data: rows, error: aErr } = await supabase
    .from("application_answers")
    .select("question_key, answer")
    .eq("application_id", app.id);
  if (aErr || !rows?.length) {
    return {};
  }
  const out: Record<string, string> = {};
  for (const r of rows as { question_key: string; answer: unknown }[]) {
    out[r.question_key] = answerToPlainString(r.answer);
  }
  return out;
}
