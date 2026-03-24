import type { DbApplicationStatus } from "@/lib/academy/db/types";

export function applicantStatusTitle(status: DbApplicationStatus): string {
  switch (status) {
    case "draft":
      return "Draft in progress";
    case "submitted":
      return "Submitted";
    case "under_review":
      return "Under review";
    case "needs_more_information":
      return "More information requested";
    case "accepted":
      return "Accepted";
    case "declined":
    case "rejected":
      return "Declined";
    case "waitlisted":
      return "Waitlisted";
    case "withdrawn":
      return "Withdrawn";
    default:
      return status;
  }
}

/** True when the applicant should open the apply form and complete or update something. */
export function applicantActionNeeded(status: DbApplicationStatus): boolean {
  return status === "draft" || status === "needs_more_information";
}

export function applicantStatusDescription(status: DbApplicationStatus): string {
  switch (status) {
    case "draft":
      return "Complete the form and submit when ready.";
    case "submitted":
      return "Your application is in the admissions queue.";
    case "under_review":
      return "An admissions reviewer is assessing your application.";
    case "needs_more_information":
      return "Please review the message below, update your application, and resubmit.";
    case "accepted":
      return "You have been accepted. Program access follows enrolment setup.";
    case "declined":
    case "rejected":
      return "This application is closed. Contact admissions if you have questions.";
    case "waitlisted":
      return "You remain on the waitlist; we will contact you if a place becomes available.";
    case "withdrawn":
      return "You withdrew this application.";
    default:
      return "";
  }
}
