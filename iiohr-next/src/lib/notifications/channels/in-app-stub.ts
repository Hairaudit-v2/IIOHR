import type { AdmissionNotificationContext, AdmissionNotificationEvent } from "@/lib/notifications/admission-event-types";

/**
 * Placeholder for a future in-app / bell inbox. Keeps the dispatcher extensible without DB churn yet.
 */
export async function recordInAppAdmissionNotificationStub(_params: {
  context: AdmissionNotificationContext;
  event: AdmissionNotificationEvent;
  emailStatus: string;
}): Promise<void> {
  // Future: insert into academy_in_app_notifications (user_id, kind, payload, read_at)
}
