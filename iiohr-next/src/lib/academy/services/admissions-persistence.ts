import type { SupabaseClient } from "@supabase/supabase-js";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import { answerToPlainString, answerToTrimmedString } from "@/lib/academy/admissions/answer-utils";
import { applicantKeysRequiredForSubmit } from "@/lib/academy/admissions/applicant-fields";
import { resolveProgramSlugForStream } from "@/lib/academy/admissions/defaults";
import {
  admissionsConsentDefinitions,
  consultantApplicationQuestionKeys,
  doctorApplicationQuestionKeys,
} from "@/lib/academy/admissions/stream-forms";
import type {
  AdmissionsAdminTransitionInput,
  AdmissionsService,
  ApplicationReviewRow,
  SubmitApplicationInput,
} from "@/lib/academy/services/academy-service-contracts";
import type {
  ApplicationAdmissionsEventRow,
  ApplicationAnswerRow,
  ApplicationConsentRow,
  ApplicationRow,
  ProgramEnrollmentRow,
} from "@/lib/academy/db/types";
import { dispatchAdmissionNotification } from "@/lib/notifications/dispatch-admission-notification";

function streamQuestionKeysRequiredForSubmit(stream: AcademyStreamSlug): readonly string[] {
  return stream === "doctors" ? doctorApplicationQuestionKeys : consultantApplicationQuestionKeys;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateSubmissionReadiness(
  stream: AcademyStreamSlug,
  answers: ApplicationAnswerRow[],
  consents: ApplicationConsentRow[]
): void {
  const byKey = new Map(answers.map((a) => [a.question_key, a.answer]));

  for (const k of applicantKeysRequiredForSubmit) {
    const t = answerToTrimmedString(byKey.get(k));
    if (!t) {
      throw new Error(`Missing or empty applicant field: ${k}`);
    }
  }
  const email = answerToTrimmedString(byKey.get("applicant:email"));
  if (!isValidEmail(email)) {
    throw new Error("A valid email address is required.");
  }

  const streamKeys = streamQuestionKeysRequiredForSubmit(stream);
  for (const k of streamKeys) {
    const t = answerToTrimmedString(byKey.get(k));
    if (!t) {
      throw new Error(`Missing or empty field: ${k}`);
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

async function resolveWritableApplicationId(
  supabase: SupabaseClient,
  userId: string,
  stream: AcademyStreamSlug,
  programSlug: string,
  explicitId: string | null | undefined
): Promise<string> {
  if (explicitId) {
    const { data: row, error } = await supabase
      .from("applications")
      .select("id, status, user_id, target_stream_slug")
      .eq("id", explicitId)
      .single();
    if (error || !row) {
      throw new Error(error?.message ?? "Application not found");
    }
    const app = row as ApplicationRow & { user_id: string; target_stream_slug: string; status: string };
    if (app.user_id !== userId) {
      throw new Error("Not allowed to edit this application");
    }
    if (app.target_stream_slug !== stream) {
      throw new Error("Application stream mismatch");
    }
    if (app.status !== "draft" && app.status !== "needs_more_information") {
      throw new Error("This application cannot be edited in its current state");
    }
    const { error: upErr } = await supabase
      .from("applications")
      .update({ target_program_slug: programSlug, updated_at: new Date().toISOString() })
      .eq("id", explicitId);
    if (upErr) {
      throw new Error(upErr.message);
    }
    return explicitId;
  }

  const { data: nmi, error: nErr } = await supabase
    .from("applications")
    .select("id")
    .eq("user_id", userId)
    .eq("target_stream_slug", stream)
    .eq("status", "needs_more_information")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (nErr) {
    throw new Error(nErr.message);
  }
  if (nmi?.id) {
    const { error: upErr } = await supabase
      .from("applications")
      .update({ target_program_slug: programSlug, updated_at: new Date().toISOString() })
      .eq("id", nmi.id);
    if (upErr) {
      throw new Error(upErr.message);
    }
    return nmi.id as string;
  }

  const { data: draft, error: dErr } = await supabase
    .from("applications")
    .select("id")
    .eq("user_id", userId)
    .eq("target_stream_slug", stream)
    .eq("status", "draft")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (dErr) {
    throw new Error(dErr.message);
  }
  if (draft?.id) {
    const { error: upErr } = await supabase
      .from("applications")
      .update({ target_program_slug: programSlug, updated_at: new Date().toISOString() })
      .eq("id", draft.id);
    if (upErr) {
      throw new Error(upErr.message);
    }
    return draft.id as string;
  }

  const { data: inFlight, error: blockErr } = await supabase
    .from("applications")
    .select("id, status")
    .eq("user_id", userId)
    .eq("target_stream_slug", stream)
    .in("status", ["submitted", "under_review", "accepted", "declined", "rejected", "waitlisted"])
    .limit(1)
    .maybeSingle();
  if (blockErr) {
    throw new Error(blockErr.message);
  }
  if (inFlight?.id) {
    throw new Error(
      "You already have an application for this stream. Use your existing application or contact admissions."
    );
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
  const events = (raw.application_admissions_events as ApplicationAdmissionsEventRow[]) ?? [];
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const {
    application_answers: _a,
    application_consents: _c,
    application_admissions_events: _e,
    ...rest
  } = raw;
  return {
    ...(rest as unknown as ApplicationRow),
    answers,
    consents,
    admissions_events: sortedEvents,
  };
}

export function createAdmissionsService(supabase: SupabaseClient): AdmissionsService {
  return {
    async saveDraftApplication(input: SubmitApplicationInput): Promise<ApplicationRow> {
      const programSlug = resolveProgramSlugForStream(
        input.targetStreamSlug,
        input.targetProgramSlug
      );
      const appId = await resolveWritableApplicationId(
        supabase,
        input.userId,
        input.targetStreamSlug,
        programSlug,
        input.applicationId
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
      if (application.status !== "draft" && application.status !== "needs_more_information") {
        throw new Error(`Application cannot be submitted (status: ${application.status})`);
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

      const submittedFromDraft = application.status === "draft";

      if (submittedFromDraft) {
        const { error: rpcErr } = await supabase.rpc("academy_applicant_submit_from_draft", {
          p_application_id: applicationId,
        });
        if (rpcErr) {
          throw new Error(rpcErr.message);
        }
      } else {
        const { error: rpcErr } = await supabase.rpc("academy_applicant_resubmit_application", {
          p_application_id: applicationId,
        });
        if (rpcErr) {
          throw new Error(rpcErr.message);
        }
      }

      const { data: updated, error: uErr } = await supabase
        .from("applications")
        .select("*")
        .eq("id", applicationId)
        .single();
      if (uErr || !updated) {
        throw new Error(uErr?.message ?? "Submit failed");
      }

      void dispatchAdmissionNotification(supabase, {
        applicationId,
        event: { kind: "application_submitted", fromDraft: submittedFromDraft },
      });

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

    async declineApplication(applicationId: string, internalNote?: string | null): Promise<ApplicationRow> {
      const { error: rpcErr } = await supabase.rpc("academy_admissions_admin_transition", {
        p_application_id: applicationId,
        p_to_status: "declined",
        p_internal_note: internalNote ?? "",
        p_applicant_message: "",
        p_answers_snapshot: null,
      });
      if (rpcErr) {
        throw new Error(rpcErr.message);
      }
      const { data: row, error } = await supabase.from("applications").select("*").eq("id", applicationId).single();
      if (error || !row) {
        throw new Error(error?.message ?? "Failed to load application");
      }
      return row as ApplicationRow;
    },

    async markUnderReview(applicationId: string, internalNote?: string | null): Promise<ApplicationRow> {
      const { error: rpcErr } = await supabase.rpc("academy_admissions_admin_transition", {
        p_application_id: applicationId,
        p_to_status: "under_review",
        p_internal_note: internalNote ?? "",
        p_applicant_message: "",
        p_answers_snapshot: null,
      });
      if (rpcErr) {
        throw new Error(rpcErr.message);
      }
      const { data: row, error } = await supabase.from("applications").select("*").eq("id", applicationId).single();
      if (error || !row) {
        throw new Error(error?.message ?? "Failed to load application");
      }
      return row as ApplicationRow;
    },

    async requestMoreInformation(
      applicationId: string,
      applicantMessage: string,
      internalNote?: string | null
    ): Promise<ApplicationRow> {
      const { data: ansRows, error: aErr } = await supabase
        .from("application_answers")
        .select("question_key, answer")
        .eq("application_id", applicationId);
      if (aErr) {
        throw new Error(aErr.message);
      }
      const snapshot: Record<string, unknown> = {};
      for (const r of ansRows ?? []) {
        const row = r as { question_key: string; answer: unknown };
        snapshot[row.question_key] = answerToPlainString(row.answer);
      }

      const { error: rpcErr } = await supabase.rpc("academy_admissions_admin_transition", {
        p_application_id: applicationId,
        p_to_status: "needs_more_information",
        p_internal_note: internalNote ?? "",
        p_applicant_message: applicantMessage,
        p_answers_snapshot: snapshot,
      });
      if (rpcErr) {
        throw new Error(rpcErr.message);
      }
      const { data: row, error } = await supabase.from("applications").select("*").eq("id", applicationId).single();
      if (error || !row) {
        throw new Error(error?.message ?? "Failed to load application");
      }
      return row as ApplicationRow;
    },

    async adminTransition(input: AdmissionsAdminTransitionInput): Promise<ApplicationRow> {
      const { error: rpcErr } = await supabase.rpc("academy_admissions_admin_transition", {
        p_application_id: input.applicationId,
        p_to_status: input.toStatus,
        p_internal_note: input.internalNote ?? "",
        p_applicant_message: input.applicantMessage ?? "",
        p_answers_snapshot: input.answersSnapshot ?? null,
      });
      if (rpcErr) {
        throw new Error(rpcErr.message);
      }
      const { data: row, error } = await supabase
        .from("applications")
        .select("*")
        .eq("id", input.applicationId)
        .single();
      if (error || !row) {
        throw new Error(error?.message ?? "Failed to load application");
      }
      return row as ApplicationRow;
    },

    async updateInternalNotes(applicationId: string, internalNotes: string): Promise<ApplicationRow> {
      const { data: row, error } = await supabase
        .from("applications")
        .update({ internal_notes: internalNotes, updated_at: new Date().toISOString() })
        .eq("id", applicationId)
        .select("*")
        .single();
      if (error || !row) {
        throw new Error(error?.message ?? "Update failed");
      }
      return row as ApplicationRow;
    },

    async withdrawApplication(
      applicationId: string,
      userId: string,
      applicantEmailOverride?: string | null
    ): Promise<ApplicationRow> {
      const { data: app, error: appErr } = await supabase
        .from("applications")
        .select("user_id")
        .eq("id", applicationId)
        .single();
      if (appErr || !app || (app as { user_id: string }).user_id !== userId) {
        throw new Error(appErr?.message ?? "Not allowed");
      }
      const { error: rpcErr } = await supabase.rpc("academy_applicant_withdraw_application", {
        p_application_id: applicationId,
      });
      if (rpcErr) {
        throw new Error(rpcErr.message);
      }
      const { data: row, error } = await supabase.from("applications").select("*").eq("id", applicationId).single();
      if (error || !row) {
        throw new Error(error?.message ?? "Withdraw failed");
      }

      void dispatchAdmissionNotification(supabase, {
        applicationId,
        event: { kind: "application_withdrawn" },
        applicantEmailOverride: applicantEmailOverride ?? null,
      });

      return row as ApplicationRow;
    },

    async listApplicationsForReview(params?: { includeTerminal?: boolean }): Promise<ApplicationReviewRow[]> {
      const includeTerminal = params?.includeTerminal === true;
      let query = supabase
        .from("applications")
        .select("*, application_answers(*), application_consents(*), application_admissions_events(*)");
      if (includeTerminal) {
        query = query.not("status", "eq", "draft").not("status", "eq", "withdrawn");
      } else {
        query = query.in("status", ["submitted", "under_review", "needs_more_information"]);
      }
      const { data, error } = await query.order("submitted_at", {
        ascending: false,
        nullsFirst: false,
      });
      if (error) {
        throw new Error(error.message);
      }
      return (data ?? []).map((row) => mapReviewRow(row as Record<string, unknown>));
    },
  };
}
