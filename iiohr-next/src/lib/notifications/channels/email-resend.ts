import type { EmailSendResult } from "@/lib/notifications/admission-event-types";

const RESEND_API = "https://api.resend.com/emails";

export async function sendAdmissionEmailViaResend(params: {
  to: string;
  subject: string;
  text: string;
}): Promise<EmailSendResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.ADMISSIONS_EMAIL_FROM?.trim();
  if (!key) {
    return { status: "skipped", reason: "RESEND_API_KEY not set" };
  }
  if (!from) {
    return { status: "skipped", reason: "ADMISSIONS_EMAIL_FROM not set" };
  }

  try {
    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        subject: params.subject,
        text: params.text,
      }),
      signal: AbortSignal.timeout(12_000),
    });
    const json = (await res.json().catch(() => null)) as { id?: string; message?: string } | null;
    if (!res.ok) {
      return {
        status: "failed",
        reason: json?.message ?? `HTTP ${res.status}`,
      };
    }
    return { status: "sent", providerMessageId: json?.id };
  } catch (e) {
    return {
      status: "failed",
      reason: e instanceof Error ? e.message : "send error",
    };
  }
}
