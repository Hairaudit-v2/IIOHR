import type { AdmissionNotificationContext, AdmissionNotificationEvent } from "@/lib/notifications/admission-event-types";

function baseSubject(ctx: AdmissionNotificationContext, headline: string): string {
  return `[IIOHR ${ctx.streamLabel}] ${headline}`;
}

export function admissionEmailSubject(
  ctx: AdmissionNotificationContext,
  event: AdmissionNotificationEvent
): string {
  switch (event.kind) {
    case "application_submitted":
      return baseSubject(ctx, event.fromDraft ? "Application received" : "Updated application received");
    case "application_under_review":
      return baseSubject(ctx, "Application under review");
    case "needs_more_information":
      return baseSubject(ctx, "More information needed");
    case "application_accepted":
      return baseSubject(ctx, "Application accepted");
    case "application_declined":
      return baseSubject(ctx, "Application update");
    case "application_withdrawn":
      return baseSubject(ctx, "Application withdrawn");
  }
}

export function admissionEmailBody(
  ctx: AdmissionNotificationContext,
  event: AdmissionNotificationEvent
): string {
  const prog = ctx.programLabel;
  const lines: string[] = [
    `Hello,`,
    ``,
    `This is an automated message about your IIOHR academy application.`,
    `Stream: ${ctx.streamLabel}`,
    `Program focus: ${prog}`,
    ``,
  ];

  switch (event.kind) {
    case "application_submitted":
      lines.push(
        event.fromDraft
          ? `We have received your submitted application. Admissions will review it in turn.`
          : `We have received your updated application materials after a request for more information.`,
        ``,
        `You can track status on your application page:`,
        ctx.applyUrl
      );
      break;
    case "application_under_review":
      lines.push(
        `Your application is now marked as under review by the admissions team.`,
        ``,
        `Application page: ${ctx.applyUrl}`
      );
      break;
    case "needs_more_information":
      lines.push(
        `The admissions team needs a bit more information before we can continue.`,
        ``,
        `Message from admissions:`,
        event.messageToApplicant,
        ``,
        `Please sign in and update your existing application (no need to start over):`,
        ctx.applyUrl
      );
      break;
    case "application_accepted":
      lines.push(
        `Congratulations — your application has been accepted for the ${ctx.streamLabel}.`,
        `Next steps (enrolment and program access) will follow from the academy.`,
        ``,
        `You can return to the site anytime: ${ctx.applyUrl}`
      );
      break;
    case "application_declined":
      lines.push(
        `Thank you for applying. We are not able to move this application forward at this time.`,
        `If you have questions, please contact admissions through the channels shared on the IIOHR site.`,
        ``,
        `Application reference id: ${ctx.applicationId}`
      );
      break;
    case "application_withdrawn":
      lines.push(
        `Your application has been withdrawn as requested.`,
        `If you change your mind, you may start a new application from the apply page when you are ready.`,
        ``,
        ctx.applyUrl
      );
      break;
  }

  lines.push(``, `— IIOHR Academy (automated)`);
  return lines.join("\n");
}
