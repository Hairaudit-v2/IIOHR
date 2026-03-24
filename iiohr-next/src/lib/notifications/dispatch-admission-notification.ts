import type { SupabaseClient } from "@supabase/supabase-js";
import type { AdmissionNotificationEvent } from "@/lib/notifications/admission-event-types";
import { admissionEmailBody, admissionEmailSubject } from "@/lib/notifications/admission-email-copy";
import { sendAdmissionEmailViaResend } from "@/lib/notifications/channels/email-resend";
import { recordInAppAdmissionNotificationStub } from "@/lib/notifications/channels/in-app-stub";
import {
  loadAdmissionNotificationContext,
  loadApplicantEmailFromApplicationAnswers,
} from "@/lib/notifications/load-admission-notification-context";

function shouldNotifyUnderReview(): boolean {
  return process.env.ADMISSIONS_NOTIFY_UNDER_REVIEW === "true";
}

/**
 * Sends admission-related notifications. Never throws — failures are logged only so workflow RPCs stay reliable.
 */
export async function dispatchAdmissionNotification(
  supabase: SupabaseClient,
  params: {
    applicationId: string;
    event: AdmissionNotificationEvent;
    /** When the signed-in applicant triggers the action (e.g. withdraw), pass auth email as fallback. */
    applicantEmailOverride?: string | null;
  }
): Promise<void> {
  try {
    if (params.event.kind === "application_under_review" && !shouldNotifyUnderReview()) {
      return;
    }

    const context = await loadAdmissionNotificationContext(supabase, params.applicationId);
    if (!context) {
      console.warn("[admission-notify] missing context", params.applicationId);
      return;
    }

    let to = params.applicantEmailOverride?.trim() || null;
    if (!to) {
      to = await loadApplicantEmailFromApplicationAnswers(supabase, params.applicationId);
    }
    if (!to) {
      console.warn("[admission-notify] no recipient email", params.applicationId);
      await recordInAppAdmissionNotificationStub({
        context,
        event: params.event,
        emailStatus: "skipped_no_email",
      });
      return;
    }

    const subject = admissionEmailSubject(context, params.event);
    const text = admissionEmailBody(context, params.event);
    const emailResult = await sendAdmissionEmailViaResend({ to, subject, text });

    if (emailResult.status === "failed") {
      console.warn("[admission-notify] email failed", params.applicationId, emailResult.reason);
    }

    await recordInAppAdmissionNotificationStub({
      context,
      event: params.event,
      emailStatus: emailResult.status,
    });
  } catch (e) {
    console.warn("[admission-notify] unexpected", e);
  }
}
