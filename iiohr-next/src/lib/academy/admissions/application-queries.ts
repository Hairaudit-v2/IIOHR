import type { SupabaseClient } from "@supabase/supabase-js";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import type { ApplicationRow } from "@/lib/academy/db/types";
import { answerToPlainString } from "@/lib/academy/admissions/answer-utils";

export async function getLatestApplicationForUserStream(
  supabase: SupabaseClient,
  userId: string,
  stream: AcademyStreamSlug
): Promise<ApplicationRow | null> {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId)
    .eq("target_stream_slug", stream)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) {
    return null;
  }
  return data as ApplicationRow;
}

export function isApplicationWritable(status: ApplicationRow["status"]): boolean {
  return status === "draft" || status === "needs_more_information";
}

export async function loadAnswerMapForApplication(
  supabase: SupabaseClient,
  applicationId: string
): Promise<Record<string, string>> {
  const { data: rows, error } = await supabase
    .from("application_answers")
    .select("question_key, answer")
    .eq("application_id", applicationId);
  if (error || !rows?.length) {
    return {};
  }
  const out: Record<string, string> = {};
  for (const r of rows as { question_key: string; answer: unknown }[]) {
    out[r.question_key] = answerToPlainString(r.answer);
  }
  return out;
}
