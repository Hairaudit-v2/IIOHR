import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

const WEBHOOK_TIMEOUT_MS = 6000; // 6 seconds – fail gracefully if webhook is slow

/** Required fields for application submission. */
const REQUIRED = [
  "fullName",
  "email",
  "country",
  "medicalBackground",
  "experienceLevel",
  "interestArea",
  "goals",
  "timeframe",
  "enquiryType",
] as const;

/** Honeypot field name – must be empty to pass. */
const HONEYPOT_FIELD = "website";

type ApplicationPayload = Record<string, unknown>;

function isValidString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Webhook result for logging and error handling. */
type WebhookResult = { ok: true } | { ok: false; reason: string };

/**
 * Forward submission to APPLICATION_WEBHOOK_URL with full payload and timeout.
 * Payload includes: name, email, phone, country, experience level, answers, timestamp, source.
 * Does not log PII.
 */
async function forwardToWebhook(payload: ApplicationPayload): Promise<WebhookResult> {
  const url = process.env.APPLICATION_WEBHOOK_URL;
  if (!url) return { ok: true };

  const timestamp = new Date().toISOString();
  const body = {
    source: "IIOHR Application",
    name: payload.fullName,
    email: payload.email,
    phone: payload.phone ?? "",
    country: payload.country,
    experienceLevel: payload.experienceLevel,
    answers: {
      enquiryType: payload.enquiryType,
      medicalBackground: payload.medicalBackground,
      interestArea: payload.interestArea,
      goals: payload.goals,
      timeframe: payload.timeframe,
    },
    timestamp,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return { ok: true };
    }
    return { ok: false, reason: `webhook returned ${res.status}` };
  } catch (e) {
    clearTimeout(timeoutId);
    const reason = e instanceof Error && e.name === "AbortError"
      ? "timeout"
      : e instanceof Error
        ? e.message
        : "network error";
    return { ok: false, reason };
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ApplicationPayload;

    // Honeypot: reject if bot filled the hidden field
    if (body[HONEYPOT_FIELD] != null && String(body[HONEYPOT_FIELD]).trim() !== "") {
      return NextResponse.json(
        { error: "Submission could not be processed. Please try again or email us directly." },
        { status: 400 }
      );
    }

    // Consent required
    if (body.consent !== true && body.consent !== "true") {
      return NextResponse.json(
        { error: "Please agree to the privacy and contact terms before submitting." },
        { status: 400 }
      );
    }

    // Validate required fields
    for (const key of REQUIRED) {
      const value = body[key];
      if (!isValidString(value)) {
        return NextResponse.json(
          { error: `Missing or invalid field: ${key}. Please complete all required fields.` },
          { status: 400 }
        );
      }
    }

    const email = String(body.email).trim();
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const payload: ApplicationPayload = {
      enquiryType: body.enquiryType,
      fullName: body.fullName,
      email: body.email,
      phone: body.phone ?? "",
      country: body.country,
      medicalBackground: body.medicalBackground,
      experienceLevel: body.experienceLevel,
      interestArea: body.interestArea,
      goals: body.goals,
      timeframe: body.timeframe,
    };

    const webhookResult = await forwardToWebhook(payload);

    if (process.env.APPLICATION_WEBHOOK_URL) {
      if (webhookResult.ok) {
        console.info("[Application] Webhook delivered successfully");
      } else {
        console.error("[Application] Webhook failed:", webhookResult.reason);
        return NextResponse.json(
          {
            error:
              "Your submission could not be delivered right now. Please try again in a moment or email " +
              siteConfig.applicationEmail +
              " directly.",
          },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[Application] Unexpected error:", e instanceof Error ? e.message : "unknown");
    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again or email " +
          siteConfig.applicationEmail +
          " directly.",
      },
      { status: 500 }
    );
  }
}
