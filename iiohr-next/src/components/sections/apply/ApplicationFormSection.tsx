"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/lib/site";
import { trackAnalyticsEvent } from "@/lib/analytics/events";

type Status = "idle" | "submitting" | "success" | "error";

export function ApplicationFormSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [enquiryType, setEnquiryType] = useState<"doctor" | "consultant" | "clinic">("doctor");
  const [submittedEnquiryType, setSubmittedEnquiryType] = useState<"doctor" | "consultant" | "clinic" | null>(null);
  const [formStarted, setFormStarted] = useState(false);

  function getPublicEmail(type: "doctor" | "consultant" | "clinic") {
    return type === "clinic" ? siteConfig.emails.clinics : siteConfig.emails.admissions;
  }

  const roleForEnquiryType = enquiryType === "doctor"
    ? "doctor"
    : enquiryType === "consultant"
      ? "consultant_nurse"
      : "clinic_group";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      enquiryType: data.get("enquiryType") ?? "doctor",
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
    setSubmittedEnquiryType(payload.enquiryType === "clinic" ? "clinic" : payload.enquiryType === "consultant" ? "consultant" : "doctor");
    trackAnalyticsEvent("funnel_form_submit_attempted", {
      form_id: "apply_public",
      enquiry_type: String(payload.enquiryType ?? enquiryType),
      role: roleForEnquiryType,
    });

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
        trackAnalyticsEvent("funnel_form_submit_failed", {
          form_id: "apply_public",
          enquiry_type: String(payload.enquiryType ?? enquiryType),
          role: roleForEnquiryType,
          reason: "server",
        });
        return;
      }
      setStatus("success");
      trackAnalyticsEvent("funnel_form_submit_succeeded", {
        form_id: "apply_public",
        enquiry_type: String(payload.enquiryType ?? enquiryType),
        role: roleForEnquiryType,
      });
      setEnquiryType("doctor");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or email " + getPublicEmail(enquiryType) + " directly.");
      trackAnalyticsEvent("funnel_form_submit_failed", {
        form_id: "apply_public",
        enquiry_type: String(payload.enquiryType ?? enquiryType),
        role: roleForEnquiryType,
        reason: "network",
      });
    }
  }

  const inputClass =
    "w-full rounded-md border-2 border-foreground/16 bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-readable-subtle shadow-sm outline-none transition-[border-color,box-shadow] focus:border-accent/45 focus:ring-2 focus:ring-accent/15 disabled:border-border disabled:bg-surface-soft disabled:text-readable-muted disabled:opacity-70 [&:-webkit-autofill]:[-webkit-text-fill-color:var(--text-primary)] [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_var(--surface)] [&:-webkit-autofill:focus]:shadow-[inset_0_0_0px_1000px_var(--surface)]";
  const labelClass = "text-sm font-medium text-foreground";
  const isDoctor = enquiryType === "doctor";
  const isConsultant = enquiryType === "consultant";
  const isClinic = enquiryType === "clinic";
  const displayedEnquiryType = submittedEnquiryType ?? enquiryType;
  const displayedIsClinic = displayedEnquiryType === "clinic";
  const publicEmail = getPublicEmail(displayedEnquiryType);
  const clinicalContextLabel = isDoctor
    ? "Current medical background"
    : isConsultant
      ? "Current clinical or patient-facing background"
      : "Current clinic or group context";
  const experienceLabel = isDoctor
    ? "Current level of hair restoration experience"
    : isConsultant
      ? "Current level of hair-loss consultation / support experience"
      : "Current level of team training implementation";

  return (
    <SectionShell>
      <div id="application-form" className="grid min-w-0 gap-12 lg:grid-cols-[1.72fr_1fr] lg:gap-12">
        <div className="min-w-0">
          <SectionHeading
            eyebrow="Application or Enquiry"
            title="Submit your details for pathway-fit review"
            description="Complete the form below to give admissions the context needed to review your background, intended direction, and likely next step."
          />

          {status === "success" && (
            <div
              role="status"
              aria-live="polite"
              className="mt-8 rounded-xl border border-border bg-surface p-6 text-foreground break-words"
            >
              <p className="font-semibold text-primary">
                {displayedIsClinic ? "Thank you for your enquiry." : "Thank you for your application."}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-readable-muted break-words">
                {displayedIsClinic
                  ? "We have received your clinic details and will review your enquiry in context before recommending a suitable next step."
                  : "We have received your details and will review them in context before guiding the next step."}{" "}
                If you have questions, email us at{" "}
                <a href={`mailto:${publicEmail}`} className="link-premium">
                  {publicEmail}
                </a>
                .
              </p>
              <Link href="/training-pathways" className="link-premium mt-4 inline-block text-sm">
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
                <a href={`mailto:${publicEmail}`} className="link-premium">
                  {publicEmail}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => { setStatus("idle"); setErrorMessage(""); }}
                className="link-premium mt-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2"
              >
                Try again
              </button>
            </div>
          )}

          {status !== "success" && (
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-9"
              noValidate
              data-analytics-form="apply_public"
              onFocusCapture={() => {
                if (formStarted) return;
                setFormStarted(true);
                trackAnalyticsEvent("funnel_form_started", {
                  form_id: "apply_public",
                  enquiry_type: enquiryType,
                  role: roleForEnquiryType,
                });
              }}
            >
              {/* Honeypot – leave empty; bots often fill it */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <fieldset className="rounded-xl border-2 border-foreground/16 bg-surface px-5 py-6">
                <legend className="px-1 text-sm font-semibold text-foreground">Enquiry Type</legend>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-border/80 bg-surface px-4 py-3.5 text-sm text-foreground has-[:checked]:border-accent/45 has-[:checked]:bg-surface-soft/60">
                    <input
                      type="radio"
                      name="enquiryType"
                      value="doctor"
                      defaultChecked
                      onChange={() => {
                        setEnquiryType("doctor");
                        trackAnalyticsEvent("funnel_enquiry_type_selected", {
                          form_id: "apply_public",
                          enquiry_type: "doctor",
                          role: "doctor",
                        });
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 border-border text-primary"
                    />
                    <span className="leading-snug">Doctor application</span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-border/80 bg-surface px-4 py-3.5 text-sm text-foreground has-[:checked]:border-accent/45 has-[:checked]:bg-surface-soft/60">
                    <input
                      type="radio"
                      name="enquiryType"
                      value="consultant"
                      onChange={() => {
                        setEnquiryType("consultant");
                        trackAnalyticsEvent("funnel_enquiry_type_selected", {
                          form_id: "apply_public",
                          enquiry_type: "consultant",
                          role: "consultant_nurse",
                        });
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 border-border text-primary"
                    />
                    <span className="leading-snug">Consultant / nurse application</span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-border/80 bg-surface px-4 py-3.5 text-sm text-foreground has-[:checked]:border-accent/45 has-[:checked]:bg-surface-soft/60">
                    <input
                      type="radio"
                      name="enquiryType"
                      value="clinic"
                      onChange={() => {
                        setEnquiryType("clinic");
                        trackAnalyticsEvent("funnel_enquiry_type_selected", {
                          form_id: "apply_public",
                          enquiry_type: "clinic",
                          role: "clinic_group",
                        });
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 border-border text-primary"
                    />
                    <span className="leading-snug">Clinic / group enquiry</span>
                  </label>
                </div>
              </fieldset>

              <fieldset className="rounded-xl border border-border/65 bg-surface/75 p-5 md:p-6">
                <legend className="px-1 text-xs font-semibold tracking-[0.12em] text-readable-muted uppercase">
                  Contact details
                </legend>
                <div className="mt-4 grid gap-5 md:grid-cols-2 md:gap-6">
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
              </fieldset>

              <fieldset className="rounded-xl border border-border/65 bg-surface/75 p-5 md:p-6">
                <legend className="px-1 text-xs font-semibold tracking-[0.12em] text-readable-muted uppercase">
                  Clinical context
                </legend>
                <div className="mt-4 space-y-2.5">
                  <label htmlFor="medicalBackground" className={labelClass}>
                    {clinicalContextLabel} <span className="text-readable-muted">(required)</span>
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
              </fieldset>

              <fieldset className="rounded-xl border border-border/65 bg-surface/75 p-5 md:p-6">
                <legend className="px-1 text-xs font-semibold tracking-[0.12em] text-readable-muted uppercase">
                  Pathway direction
                </legend>
                <div className="mt-4 grid gap-5 md:grid-cols-2 md:gap-6">
                  <div className="space-y-2.5">
                    <label htmlFor="experienceLevel" className={labelClass}>
                      {experienceLabel} <span className="text-readable-muted">(required)</span>
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
                      {isDoctor ? (
                        <>
                          <option value="none">No procedural experience yet</option>
                          <option value="early">Early-stage practical exposure</option>
                          <option value="intermediate">Performing cases with supervision</option>
                          <option value="experienced">Established surgeon seeking refinement</option>
                        </>
                      ) : isConsultant ? (
                        <>
                          <option value="none">New to structured consultation support</option>
                          <option value="early">Some patient-facing exposure</option>
                          <option value="intermediate">Supporting pathways with supervision</option>
                          <option value="experienced">Experienced coordinator / nurse seeking formal progression</option>
                        </>
                      ) : (
                        <>
                          <option value="planning">Planning team pathway rollout</option>
                          <option value="early">Early-stage team implementation</option>
                          <option value="intermediate">Active internal pathway in place</option>
                          <option value="mature">Mature clinic programme seeking refinement</option>
                        </>
                      )}
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
                      {isDoctor ? (
                        <>
                          <option value="doctor-application">Doctor application</option>
                          <option value="training-pathways">Training Pathways</option>
                          <option value="practical-fue">Practical FUE</option>
                          <option value="hair-loss-science">Hair Loss Science</option>
                        </>
                      ) : isConsultant ? (
                        <>
                          <option value="consultant-nurse-application">Consultant / nurse application</option>
                          <option value="consultant-certificate">Consultant / nurse certificate pathway</option>
                          <option value="communication-and-triage">Communication and triage progression</option>
                          <option value="documentation-and-handover">Documentation and handover standards</option>
                        </>
                      ) : (
                        <>
                          <option value="clinic-group-enquiry">Clinic / group enquiry</option>
                          <option value="team-development">Team development pathway</option>
                          <option value="standards-and-governance">Standards and governance support</option>
                          <option value="implementation-roadmap">Implementation roadmap</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
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

                <div className="mt-6 space-y-2.5">
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
              </fieldset>

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
                    <Link href="/privacy-policy" className="link-premium">
                      Privacy Policy
                    </Link>
                    {" "}and agree to my data being used for pathway review and admissions contact. I consent to
                    being contacted by IIOHR in relation to my {isClinic ? "enquiry" : "application"}.
                  </span>
                </label>
              </div>

              <div className="border-t border-border/25 pt-7">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-readable-muted">
                  Submit or email
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-accent bg-accent px-6 py-3 text-sm font-semibold tracking-[0.04em] text-primary shadow-[var(--shadow-btn-primary)] hover:bg-accent-muted disabled:opacity-70"
                  >
                    {status === "submitting" ? "Submitting…" : isClinic ? "Submit enquiry" : "Submit application"}
                  </button>
                  <a
                    href={`mailto:${getPublicEmail(enquiryType)}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-foreground/16 bg-surface px-6 py-3 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-accent/40 hover:bg-surface-elevated"
                    data-analytics-event="funnel_cta_clicked"
                    data-analytics-page="/apply"
                    data-analytics-cta="Prefer email enquiry"
                    data-analytics-section="form_actions"
                    data-analytics-role={roleForEnquiryType}
                    data-analytics-destination={`mailto:${getPublicEmail(enquiryType)}`}
                  >
                    Prefer email enquiry
                  </a>
                </div>
              </div>
            </form>
          )}

          {status !== "success" && (
            <p className="mt-7 text-sm leading-relaxed text-readable-muted">
              Your information is used only for pathway review and admissions. The purpose is guidance and pathway matching, not automatic intake. For direct contact, email{" "}
              <a className="link-premium" href={`mailto:${getPublicEmail(enquiryType)}`}>
                {getPublicEmail(enquiryType)}
              </a>
              .
            </p>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card quiet>
            <h3 className="text-base font-semibold text-heading">What this form is for</h3>
            <ul className="mt-4 space-y-3 text-sm text-readable-muted">
              <li>Share enough context for pathway-fit review</li>
              <li>Help admissions understand role, goals, and current stage</li>
              <li>Support the most appropriate next-step guidance</li>
            </ul>
          </Card>
          <Card quiet>
            <h3 className="text-base font-semibold text-heading">Before you submit</h3>
            <p className="mt-4 text-sm leading-relaxed text-readable-muted">
              Not every applicant is entering at the same stage. Submissions are reviewed in context so route guidance can reflect role, exposure, and intended development direction.
            </p>
          </Card>
          <Card quiet>
            <h3 className="text-base font-semibold text-heading">Privacy and account access</h3>
            <p className="mt-4 text-sm leading-relaxed text-readable-muted">
              We use your details only for pathway review and admissions. Protected academy content remains behind sign-in and approved access. See our{" "}
              <Link href="/privacy-policy" className="link-premium">
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
