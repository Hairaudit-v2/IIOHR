/**
 * Admission notification domain — email first; additional channels can subscribe here later.
 */

export type AdmissionNotificationEvent =
  | { kind: "application_submitted"; fromDraft: boolean }
  | { kind: "application_under_review" }
  | { kind: "needs_more_information"; messageToApplicant: string }
  | { kind: "application_accepted" }
  | { kind: "application_declined" }
  | { kind: "application_withdrawn" };

export type AdmissionNotificationContext = {
  applicationId: string;
  applicantUserId: string;
  streamSlug: "doctors" | "consultants";
  programSlug: string | null;
  streamLabel: string;
  programLabel: string;
  applyUrl: string;
};

export type EmailSendResult =
  | { status: "sent"; providerMessageId?: string }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string };
