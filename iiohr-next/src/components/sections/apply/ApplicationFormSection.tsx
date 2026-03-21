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

  const inputClass =
    "w-full rounded-md border-2 border-foreground/16 bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition-[border-color,box-shadow] focus:border-accent/45 focus:ring-2 focus:ring-accent/15 disabled:opacity-70";
  const labelClass = "text-sm font-medium text-foreground";

  return (
    <SectionShell>
      <div id="application-form" className="grid min-w-0 gap-10 lg:grid-cols-[1.8fr_1fr] lg:gap-12">
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
              <p className="mt-2 text-sm leading-relaxed text-readable-muted break-words">
                We have received your details and will be in touch to discuss your pathway fit. If you have
                urgent questions, email us at{" "}
                <a
                  href={`mailto:${siteConfig.applicationEmail}`}
                  className="font-medium text-foreground underline decoration-accent/45 underline-offset-2 hover:text-accent"
                >
                  {siteConfig.applicationEmail}
                </a>
                .
              </p>
              <Link
                href="/training-pathways"
                className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-accent/50 underline-offset-2 hover:text-accent"
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
              <p className="mt-2 text-readable-muted break-words">
                You can also send your enquiry directly to{" "}
                <a
                  href={`mailto:${siteConfig.applicationEmail}`}
                  className="font-medium text-foreground underline decoration-accent/45 underline-offset-2 hover:text-accent"
                >
                  {siteConfig.applicationEmail}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => { setStatus("idle"); setErrorMessage(""); }}
                className="mt-4 text-sm font-medium text-foreground underline decoration-accent/45 underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2"
              >
                Try again
              </button>
            </div>
          )}

          {status !== "success" && (
            <form onSubmit={handleSubmit} className="mt-8 space-y-8" noValidate>
              {/* Honeypot – leave empty; bots often fill it */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <fieldset className="rounded-xl border-2 border-foreground/18 bg-surface px-5 py-6">
                <legend className="px-1 text-sm font-semibold text-foreground">Enquiry Type</legend>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-border/80 bg-background px-4 py-3.5 text-sm text-foreground has-[:checked]:border-accent/45 has-[:checked]:bg-surface-soft/60">
                    <input
                      type="radio"
                      name="enquiryType"
                      value="individual"
                      defaultChecked
                      className="mt-0.5 h-4 w-4 shrink-0 border-border text-primary"
                    />
                    <span className="leading-snug">Individual doctor enquiry</span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-border/80 bg-background px-4 py-3.5 text-sm text-foreground has-[:checked]:border-accent/45 has-[:checked]:bg-surface-soft/60">
                    <input
                      type="radio"
                      name="enquiryType"
                      value="clinic"
                      className="mt-0.5 h-4 w-4 shrink-0 border-border text-primary"
                    />
                    <span className="leading-snug">Clinic or group enquiry</span>
                  </label>
                </div>
              </fieldset>

              <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                <div className="space-y-2.5">
                  <label htmlFor="fullName" className={labelClass}>
                    Full name <span className="text-readable-muted">(required)</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    disabled={status === "submitting"}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2.5">
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-readable-muted">(required)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    disabled={status === "submitting"}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2.5">
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    disabled={status === "submitting"}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2.5">
                  <label htmlFor="country" className={labelClass}>
                    Country <span className="text-readable-muted">(required)</span>
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    required
                    aria-required="true"
                    disabled={status === "submitting"}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label htmlFor="medicalBackground" className={labelClass}>
                  Current medical background <span className="text-readable-muted">(required)</span>
                </label>
                <textarea
                  id="medicalBackground"
                  name="medicalBackground"
                  rows={3}
                  required
                  aria-required="true"
                  disabled={status === "submitting"}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                <div className="space-y-2.5">
                  <label htmlFor="experienceLevel" className={labelClass}>
                    Current level of hair restoration experience <span className="text-readable-muted">(required)</span>
                  </label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    required
                    aria-required="true"
                    defaultValue=""
                    disabled={status === "submitting"}
                    className={inputClass}
                  >
                    <option value="" disabled>Select experience level</option>
                    <option value="none">No procedural experience yet</option>
                    <option value="early">Early-stage practical exposure</option>
                    <option value="intermediate">Performing cases with supervision</option>
                    <option value="experienced">Established surgeon seeking refinement</option>
                  </select>
                </div>
                <div className="space-y-2.5">
                  <label htmlFor="interestArea" className={labelClass}>
                    Interest area <span className="text-readable-muted">(required)</span>
                  </label>
                  <select
                    id="interestArea"
                    name="interestArea"
                    required
                    aria-required="true"
                    defaultValue=""
                    disabled={status === "submitting"}
                    className={inputClass}
                  >
                    <option value="" disabled>Select interest area</option>
                    <option value="training-pathways">Training Pathways</option>
                    <option value="practical-fue">Practical FUE</option>
                    <option value="hair-loss-science">Hair Loss Science</option>
                    <option value="clinic-partnership">Clinic Partnership Pathway</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2.5">
                <label htmlFor="goals" className={labelClass}>
                  Goals <span className="text-readable-muted">(required)</span>
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  rows={4}
                  required
                  aria-required="true"
                  disabled={status === "submitting"}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2.5">
                <label htmlFor="timeframe" className={labelClass}>
                  Preferred timeframe <span className="text-readable-muted">(required)</span>
                </label>
                <select
                  id="timeframe"
                  name="timeframe"
                  required
                  aria-required="true"
                  defaultValue=""
                  disabled={status === "submitting"}
                  className={inputClass}
                >
                  <option value="" disabled>Select preferred timeframe</option>
                  <option value="immediate">Immediate (0–2 months)</option>
                  <option value="short-term">Short term (3–6 months)</option>
                  <option value="medium-term">Medium term (6–12 months)</option>
                  <option value="planning">Planning stage (12+ months)</option>
                </select>
              </div>

              <div className="rounded-xl border-2 border-border/80 bg-surface-soft/60 p-5 md:p-6">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-foreground">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    aria-required="true"
                    disabled={status === "submitting"}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-2 border-foreground/20 text-primary"
                  />
                  <span>
                    I have read the{" "}
                    <Link
                      href="/privacy-policy"
                      className="font-medium text-foreground underline decoration-accent/50 underline-offset-2 hover:text-accent"
                    >
                      Privacy Policy
                    </Link>
                    {" "}and agree to my data being used for pathway review and admissions contact. I consent to
                    being contacted by IIOHR in relation to my application.
                  </span>
                </label>
              </div>

              <div className="border-t border-border/25 pt-8">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-readable-muted">
                  Submit or email
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-accent bg-accent px-6 py-3 text-sm font-semibold tracking-[0.04em] text-primary shadow-[var(--shadow-btn-primary)] hover:bg-accent-muted disabled:opacity-70"
                  >
                    {status === "submitting" ? "Submitting…" : "Submit application"}
                  </button>
                  <a
                    href={`mailto:${siteConfig.applicationEmail}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-foreground/18 bg-surface px-6 py-3 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-accent/45 hover:bg-surface-elevated"
                  >
                    Prefer email enquiry
                  </a>
                </div>
              </div>
            </form>
          )}

          {status !== "success" && (
            <p className="mt-6 text-sm text-readable-muted">
              Your information is used only for pathway review and admissions. For direct contact, email{" "}
              <a
                className="font-medium text-foreground underline decoration-accent/45 underline-offset-2 hover:text-accent"
                href={`mailto:${siteConfig.applicationEmail}`}
              >
                {siteConfig.applicationEmail}
              </a>
              .
            </p>
          )}
        </div>

        <aside className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-heading">What happens next</h3>
            <ul className="mt-4 space-y-3 text-sm text-readable-muted">
              <li>Institute-led assessment of your profile</li>
              <li>Pathway recommendation matched to your goals</li>
              <li>Direct contact from the admissions team</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-heading">Privacy</h3>
            <p className="mt-4 text-sm leading-relaxed text-readable-muted">
              We use your details only for pathway review and admissions. See our{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-foreground underline decoration-accent/45 underline-offset-2 hover:text-accent"
              >
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
