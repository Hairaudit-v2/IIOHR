import type { SupabaseClient } from "@supabase/supabase-js";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import { resolveProgramSlugForStream } from "@/lib/academy/admissions/defaults";
import {
  admissionsConsentDefinitions,
  consultantApplicationQuestionKeys,
  doctorApplicationQuestionKeys,
} from "@/lib/academy/admissions/stream-forms";
import type {
  AdmissionsService,
  ApplicationReviewRow,
  SubmitApplicationInput,
} from "@/lib/academy/services/academy-service-contracts";
import type {
  ApplicationAnswerRow,
  ApplicationConsentRow,
  ApplicationRow,
  ProgramEnrollmentRow,
} from "@/lib/academy/db/types";

function requiredQuestionKeys(stream: AcademyStreamSlug): readonly string[] {
  return stream === "doctors" ? doctorApplicationQuestionKeys : consultantApplicationQuestionKeys;
}

function answerToTrimmedString(answer: unknown): string {
  if (typeof answer === "string") {
    return answer.trim();
  }
  if (answer != null && typeof answer === "object" && "text" in answer) {
    const t = (answer as { text: unknown }).text;
    if (typeof t === "string") {
      return t.trim();
    }
  }
  return "";
}

function validateSubmissionReadiness(
  stream: AcademyStreamSlug,
  answers: ApplicationAnswerRow[],
  consents: ApplicationConsentRow[]
): void {
  const keys = requiredQuestionKeys(stream);
  const byKey = new Map(answers.map((a) => [a.question_key, a.answer]));
  for (const k of keys) {
    const t = answerToTrimmedString(byKey.get(k));
    if (!t) {
      throw new Error(`Missing or empty answer: ${k}`);
    }
  }
  const scopeKey = stream === "doctors" ? "doctor:scope_attestation" : "consultant:scope_attestation";
  if (answerToTrimmedString(byKey.get(scopeKey)).toUpperCase() !== "YES") {
    throw new Error('You must type YES in the scope attestation field.');
  }
  const defs = admissionsConsentDefinitions[stream];
  const consentByKey = new Map(consents.map((c) => [c.consent_key, c]));
  for (const d of defs) {
    const c = consentByKey.get(d.consentKey);
    if (!c) {
      throw new Error(`Required consent not recorded: ${d.label}`);
    }
    if (c.consent_version !== d.consentVersion) {
      throw new Error(`Consent version mismatch for ${d.consentKey}`);
    }
  }
}

async function getOrCreateDraftApplicationId(
  supabase: SupabaseClient,
  userId: string,
  stream: AcademyStreamSlug,
  programSlug: string
): Promise<string> {
  const { data: existing, error: selErr } = await supabase
    .from("applications")
    .select("id")
    .eq("user_id", userId)
    .eq("target_stream_slug", stream)
    .eq("status", "draft")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (selErr) {
    throw new Error(selErr.message);
  }
  if (existing?.id) {
    const { error: upErr } = await supabase
      .from("applications")
      .update({ target_program_slug: programSlug, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
    if (upErr) {
      throw new Error(upErr.message);
    }
    return existing.id as string;
  }
  const { data: ins, error: inErr } = await supabase
    .from("applications")
    .insert({
      user_id: userId,
      target_stream_slug: stream,
      target_program_slug: programSlug,
      status: "draft",
    })
    .select("id")
    .single();
  if (inErr) {
    throw new Error(inErr.message);
  }
  return ins.id as string;
}

function mapReviewRow(raw: Record<string, unknown>): ApplicationReviewRow {
  const answers = (raw.application_answers as ApplicationAnswerRow[]) ?? [];
  const consents = (raw.application_consents as ApplicationConsentRow[]) ?? [];
  const { application_answers: _a, application_consents: _c, ...rest } = raw;
  return { ...(rest as unknown as ApplicationRow), answers, consents };
}

export function createAdmissionsService(supabase: SupabaseClient): AdmissionsService {
  return {
    async saveDraftApplication(input: SubmitApplicationInput): Promise<ApplicationRow> {
      const programSlug = resolveProgramSlugForStream(
        input.targetStreamSlug,
        input.targetProgramSlug
      );
      const appId = await getOrCreateDraftApplicationId(
        supabase,
        input.userId,
        input.targetStreamSlug,
        programSlug
      );

      const { error: delA } = await supabase.from("application_answers").delete().eq("application_id", appId);
      if (delA) {
        throw new Error(delA.message);
      }
      const { error: delC } = await supabase.from("application_consents").delete().eq("application_id", appId);
      if (delC) {
        throw new Error(delC.message);
      }

      if (input.answers.length > 0) {
        const { error: aErr } = await supabase.from("application_answers").insert(
          input.answers.map((a) => ({
            application_id: appId,
            question_key: a.question_key,
            answer: a.answer,
          }))
        );
        if (aErr) {
          throw new Error(aErr.message);
        }
      }

      if (input.consents.length > 0) {
        const { error: cErr } = await supabase.from("application_consents").insert(
          input.consents.map((c) => ({
            application_id: appId,
            consent_key: c.consent_key,
            consent_version: c.consent_version,
            accepted_at: c.accepted_at,
            text_hash: c.text_hash ?? null,
          }))
        );
        if (cErr) {
          throw new Error(cErr.message);
        }
      }

      const { data: row, error: fErr } = await supabase
        .from("applications")
        .select("*")
        .eq("id", appId)
        .single();
      if (fErr || !row) {
        throw new Error(fErr?.message ?? "Failed to load application");
      }
      return row as ApplicationRow;
    },

    async submitApplication(applicationId: string, userId: string): Promise<ApplicationRow> {
      const { data: app, error: appErr } = await supabase
        .from("applications")
        .select("*")
        .eq("id", applicationId)
        .single();
      if (appErr || !app) {
        throw new Error(appErr?.message ?? "Application not found");
      }
      const application = app as ApplicationRow;
      if (application.user_id !== userId) {
        throw new Error("Not allowed to submit this application");
      }
      if (application.status !== "draft") {
        throw new Error(`Application is not a draft (status: ${application.status})`);
      }

      const [{ data: ansRows, error: aErr }, { data: consentRows, error: cErr }] = await Promise.all([
        supabase.from("application_answers").select("*").eq("application_id", applicationId),
        supabase.from("application_consents").select("*").eq("application_id", applicationId),
      ]);
      if (aErr || cErr) {
        throw new Error(aErr?.message ?? cErr?.message ?? "Failed to load application details");
      }

      validateSubmissionReadiness(
        application.target_stream_slug,
        (ansRows ?? []) as ApplicationAnswerRow[],
        (consentRows ?? []) as ApplicationConsentRow[]
      );

      const { data: updated, error: uErr } = await supabase
        .from("applications")
        .update({
          status: "submitted",
          submitted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", applicationId)
        .eq("status", "draft")
        .select("*")
        .single();
      if (uErr || !updated) {
        throw new Error(uErr?.message ?? "Submit failed (application may have changed)");
      }
      return updated as ApplicationRow;
    },

    async acceptApplication(applicationId: string): Promise<{
      application: ApplicationRow;
      enrollment: ProgramEnrollmentRow;
    }> {
      const { data: enrollmentId, error: rpcErr } = await supabase.rpc(
        "academy_admissions_accept_application",
        { p_application_id: applicationId }
      );
      if (rpcErr) {
        throw new Error(rpcErr.message);
      }
      if (!enrollmentId || typeof enrollmentId !== "string") {
        throw new Error("Accept did not return an enrollment id");
      }
      const [{ data: enr, error: eErr }, { data: app, error: aErr }] = await Promise.all([
        supabase.from("program_enrollments").select("*").eq("id", enrollmentId).single(),
        supabase.from("applications").select("*").eq("id", applicationId).single(),
      ]);
      if (eErr || !enr) {
        throw new Error(eErr?.message ?? "Enrollment not found after accept");
      }
      if (aErr || !app) {
        throw new Error(aErr?.message ?? "Application not found after accept");
      }
      return { application: app as ApplicationRow, enrollment: enr as ProgramEnrollmentRow };
    },

    async rejectApplication(applicationId: string): Promise<ApplicationRow> {
      const { data: current, error: curErr } = await supabase
        .from("applications")
        .select("status")
        .eq("id", applicationId)
        .single();
      if (curErr || !current) {
        throw new Error(curErr?.message ?? "Application not found");
      }
      const st = (current as { status: string }).status;
      if (st !== "submitted" && st !== "under_review") {
        throw new Error("Only submitted or under-review applications can be rejected");
      }
      const { data: updated, error } = await supabase
        .from("applications")
        .update({ status: "rejected", updated_at: new Date().toISOString() })
        .eq("id", applicationId)
        .select("*")
        .single();
      if (error || !updated) {
        throw new Error(error?.message ?? "Reject failed");
      }
      return updated as ApplicationRow;
    },

    async markUnderReview(applicationId: string): Promise<ApplicationRow> {
      const { data: current, error: rErr } = await supabase
        .from("applications")
        .select("status")
        .eq("id", applicationId)
        .single();
      if (rErr || !current) {
        throw new Error(rErr?.message ?? "Application not found");
      }
      if ((current as { status: string }).status !== "submitted") {
        throw new Error("Only submitted applications can move to under review");
      }
      const { data: updated, error } = await supabase
        .from("applications")
        .update({ status: "under_review", updated_at: new Date().toISOString() })
        .eq("id", applicationId)
        .select("*")
        .single();
      if (error || !updated) {
        throw new Error(error?.message ?? "Update failed");
      }
      return updated as ApplicationRow;
    },

    async listApplicationsForReview(): Promise<ApplicationReviewRow[]> {
      const { data, error } = await supabase
        .from("applications")
        .select("*, application_answers(*), application_consents(*)")
        .in("status", ["submitted", "under_review"])
        .order("submitted_at", { ascending: false, nullsFirst: false });
      if (error) {
        throw new Error(error.message);
      }
      return (data ?? []).map((row) => mapReviewRow(row as Record<string, unknown>));
    },
  };
}
