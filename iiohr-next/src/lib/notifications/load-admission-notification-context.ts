import type { SupabaseClient } from "@supabase/supabase-js";
import { answerToPlainString } from "@/lib/academy/admissions/answer-utils";
import type { AdmissionNotificationContext } from "@/lib/notifications/admission-event-types";

function programLabelFromSlug(slug: string | null): string {
  if (!slug?.trim()) {
    return "Program (to be assigned)";
  }
  return slug.replace(/-/g, " ");
}

function streamLabel(stream: "doctors" | "consultants"): string {
  return stream === "doctors" ? "Doctor academy stream" : "Consultant academy stream";
}

function applyPathForStream(stream: "doctors" | "consultants"): string {
  return stream === "doctors" ? "/apply/doctors" : "/apply/consultants";
}

/**
 * Loads stream/program identity for copy. Caller supplies applicant email when known (e.g. auth user).
 */
export async function loadAdmissionNotificationContext(
  supabase: SupabaseClient,
  applicationId: string
): Promise<AdmissionNotificationContext | null> {
  const { data: app, error } = await supabase
    .from("applications")
    .select("id, user_id, target_stream_slug, target_program_slug")
    .eq("id", applicationId)
    .single();
  if (error || !app) {
    return null;
  }
  const stream = app.target_stream_slug as "doctors" | "consultants";
  if (stream !== "doctors" && stream !== "consultants") {
    return null;
  }
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const path = applyPathForStream(stream);
  return {
    applicationId: app.id,
    applicantUserId: app.user_id,
    streamSlug: stream,
    programSlug: app.target_program_slug,
    streamLabel: streamLabel(stream),
    programLabel: programLabelFromSlug(app.target_program_slug),
    applyUrl: site ? `${site}${path}` : path,
  };
}

export async function loadApplicantEmailFromApplicationAnswers(
  supabase: SupabaseClient,
  applicationId: string
): Promise<string | null> {
  const { data: row, error } = await supabase
    .from("application_answers")
    .select("answer")
    .eq("application_id", applicationId)
    .eq("question_key", "applicant:email")
    .maybeSingle();
  if (error || !row) {
    return null;
  }
  const email = answerToPlainString((row as { answer: unknown }).answer).trim();
  return email.length > 0 ? email : null;
}
