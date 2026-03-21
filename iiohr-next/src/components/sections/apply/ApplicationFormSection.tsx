"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function ApplicationFormSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      enquiryType: data.get("enquiryType") ?? "individual",
      fullName: (data.get("fullName") as string)?.trim(),
      email: (data.get("email") as string)?.trim(),
      phone: (data.get("phone") as string)?.trim() || "",
      country: (data.get("country") as string)?.trim(),
      medicalBackground: (data.get("medicalBackground") as string)?.trim(),
      experienceLevel: data.get("experienceLevel"),
      interestArea: data.get("interestArea"),
      goals: (data.get("goals") as string)?.trim(),
      timeframe: data.get("timeframe"),
      consent: data.get("consent") === "on",
      website: data.get("website"), // honeypot
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong. Please try again or email us directly.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or email " + siteConfig.applicationEmail + " directly.");
    }
  }

  return (
    <SectionShell>
      <div id="application-form" className="grid min-w-0 gap-8 lg:grid-cols-[1.8fr_1fr]">
        <div className="min-w-0">
          <SectionHeading
            eyebrow="Application or Enquiry"
            title="Submit your details for pathway review"
            description="Complete the form below. Our admissions team will review your profile and respond with pathway guidance."
          />

          {status === "success" && (
            <div
              role="status"
              aria-live="polite"
              className="mt-8 rounded-xl border border-border bg-surface p-6 text-foreground break-words"
            >
              <p className="font-semibold text-primary">Thank you for your application.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-words">
                We have received your details and will be in touch to discuss your pathway fit. If you have
                urgent questions, email us at{" "}
                <a
                  href={`mailto:${siteConfig.applicationEmail}`}
                  className="font-medium text-foreground underline hover:text-accent"
                >
                  {siteConfig.applicationEmail}
                </a>
                .
              </p>
              <Link
                href="/training-pathways"
                className="mt-4 inline-block text-sm font-medium text-primary hover:text-accent"
              >
                Explore training pathways →
              </Link>
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="mt-8 rounded-xl border border-border bg-surface p-4 text-sm text-foreground break-words"
            >
              <p className="font-medium break-words">{errorMessage}</p>
              <p className="mt-2 text-muted-foreground break-words">
                You can also send your enquiry directly to{" "}
                <a
                  href={`mailto:${siteConfig.applicationEmail}`}
                  className="font-medium text-foreground underline hover:text-accent"
                >
                  {siteConfig.applicationEmail}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => { setStatus("idle"); setErrorMessage(""); }}
                className="mt-3 text-sm font-medium underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(108,132,168,0.45)] focus-visible:ring-offset-2"
              >
                Try again
              </button>
            </div>
          )}

          {status !== "success" && (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
              {/* Honeypot – leave empty; bots often fill it */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <fieldset className="rounded-xl border border-border bg-surface p-5">
                <legend className="px-1 text-sm font-semibold">Enquiry Type</legend>
                <div className="mt-4 flex flex-wrap gap-4">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="enquiryType"
                      value="individual"
                      defaultChecked
                      className="h-4 w-4 border-border text-primary"
                    />
                    <span>Individual doctor enquiry</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="enquiryType"
                      value="clinic"
                      className="h-4 w-4 border-border text-primary"
                    />
                    <span>Clinic or group enquiry</span>
                  </label>
                </div>
              </fieldset>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Full name <span className="text-muted-foreground">(required)</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    disabled={status === "submitting"}
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm disabled:opacity-70"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-muted-foreground">(required)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    disabled={status === "submitting"}
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm disabled:opacity-70"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    disabled={status === "submitting"}
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm disabled:opacity-70"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium">
                    Country <span className="text-muted-foreground">(required)</span>
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    required
                    aria-required="true"
                    disabled={status === "submitting"}
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm disabled:opacity-70"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="medicalBackground" className="text-sm font-medium">
                  Current medical background <span className="text-muted-foreground">(required)</span>
                </label>
                <textarea
                  id="medicalBackground"
                  name="medicalBackground"
                  rows={3}
                  required
                  aria-required="true"
                  disabled={status === "submitting"}
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm disabled:opacity-70"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="experienceLevel" className="text-sm font-medium">
                    Current level of hair restoration experience <span className="text-muted-foreground">(required)</span>
                  </label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    required
                    aria-required="true"
                    defaultValue=""
                    disabled={status === "submitting"}
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm disabled:opacity-70"
                  >
                    <option value="" disabled>Select experience level</option>
                    <option value="none">No procedural experience yet</option>
                    <option value="early">Early-stage practical exposure</option>
                    <option value="intermediate">Performing cases with supervision</option>
                    <option value="experienced">Established surgeon seeking refinement</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="interestArea" className="text-sm font-medium">
                    Interest area <span className="text-muted-foreground">(required)</span>
                  </label>
                  <select
                    id="interestArea"
                    name="interestArea"
                    required
                    aria-required="true"
                    defaultValue=""
                    disabled={status === "submitting"}
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm disabled:opacity-70"
                  >
                    <option value="" disabled>Select interest area</option>
                    <option value="training-pathways">Training Pathways</option>
                    <option value="practical-fue">Practical FUE</option>
                    <option value="hair-loss-science">Hair Loss Science</option>
                    <option value="clinic-partnership">Clinic Partnership Pathway</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="goals" className="text-sm font-medium">
                  Goals <span className="text-muted-foreground">(required)</span>
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  rows={4}
                  required
                  aria-required="true"
                  disabled={status === "submitting"}
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm disabled:opacity-70"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="timeframe" className="text-sm font-medium">
                  Preferred timeframe <span className="text-muted-foreground">(required)</span>
                </label>
                <select
                  id="timeframe"
                  name="timeframe"
                  required
                  aria-required="true"
                  defaultValue=""
                  disabled={status === "submitting"}
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm disabled:opacity-70"
                >
                  <option value="" disabled>Select preferred timeframe</option>
                  <option value="immediate">Immediate (0–2 months)</option>
                  <option value="short-term">Short term (3–6 months)</option>
                  <option value="medium-term">Medium term (6–12 months)</option>
                  <option value="planning">Planning stage (12+ months)</option>
                </select>
              </div>

              <div className="rounded-xl border border-border bg-surface-soft/50 p-4">
                <label className="flex cursor-pointer items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    aria-required="true"
                    disabled={status === "submitting"}
                    className="mt-0.5 h-4 w-4 rounded border-border text-primary"
                  />
                  <span>
                    I have read the{" "}
                    <Link href="/privacy-policy" className="font-medium text-foreground underline hover:text-accent">
                      Privacy Policy
                    </Link>
                    {" "}and agree to my data being used for pathway review and admissions contact. I consent to
                    being contacted by IIOHR in relation to my application.
                  </span>
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex min-h-10 items-center justify-center rounded-md border border-primary bg-primary px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-primary-foreground hover:brightness-95 disabled:opacity-70"
                >
                  {status === "submitting" ? "Submitting…" : "Submit application"}
                </button>
                <a
                  href={`mailto:${siteConfig.applicationEmail}`}
                  className="inline-flex min-h-10 items-center justify-center rounded-md border border-accent px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-foreground hover:bg-surface-soft"
                >
                  Prefer email enquiry
                </a>
              </div>
            </form>
          )}

          {status !== "success" && (
            <p className="mt-4 text-sm text-muted-foreground">
              Your information is used only for pathway review and admissions. For direct contact, email{" "}
              <a className="font-medium text-foreground hover:text-accent" href={`mailto:${siteConfig.applicationEmail}`}>
                {siteConfig.applicationEmail}
              </a>
              .
            </p>
          )}
        </div>

        <aside className="space-y-4">
          <Card>
            <h3 className="text-lg font-semibold">What happens next</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Institute-led assessment of your profile</li>
              <li>Pathway recommendation matched to your goals</li>
              <li>Direct contact from the admissions team</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">Privacy</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We use your details only for pathway review and admissions. See our{" "}
              <Link href="/privacy-policy" className="font-medium text-foreground hover:text-accent">
                Privacy Policy
              </Link>
              {" "}for full details.
            </p>
          </Card>
        </aside>
      </div>
    </SectionShell>
  );
}
