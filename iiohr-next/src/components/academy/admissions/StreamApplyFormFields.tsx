import type { AcademyStreamSlug } from "@/lib/academy/constants";
import { defaultProgramSlugForStream } from "@/lib/academy/admissions/defaults";
import {
  applicantApplicationQuestionKeys,
  applicantFormLabels,
  preferredContactOptions,
} from "@/lib/academy/admissions/applicant-fields";
import {
  admissionsConsentDefinitions,
  consultantApplicationQuestionKeys,
  doctorApplicationQuestionKeys,
  consentFieldName,
  formFieldNameForQuestion,
  streamFormLabels,
} from "@/lib/academy/admissions/stream-forms";

function sectionTitleClass() {
  return "text-base font-semibold tracking-tight text-foreground";
}

function sectionIntroClass() {
  return "text-sm text-readable-muted leading-relaxed";
}

export function StreamApplyFormFields({
  stream,
  applicationId = "",
  initialAnswers = {},
}: {
  stream: AcademyStreamSlug;
  /** Writable application row id (draft or needs_more_information). */
  applicationId?: string;
  /** Merged draft + auth defaults; all keys optional. */
  initialAnswers?: Record<string, string>;
}) {
  const streamKeys =
    stream === "doctors" ? doctorApplicationQuestionKeys : consultantApplicationQuestionKeys;
  const labels = streamFormLabels[stream];
  const defs = admissionsConsentDefinitions[stream];
  const defaultProgram = defaultProgramSlugForStream(stream);

  const streamSectionTitle =
    stream === "doctors"
      ? "Professional details (doctor stream)"
      : "Professional details (consultant / nurse stream)";

  return (
    <>
      <input type="hidden" name="targetStream" value={stream} />
      <input type="hidden" name="targetProgramSlug" value={defaultProgram} />
      {applicationId ? <input type="hidden" name="applicationId" value={applicationId} /> : null}

      <section className="space-y-6" aria-labelledby="applicant-details-heading">
        <div>
          <h2 id="applicant-details-heading" className={sectionTitleClass()}>
            Applicant details
          </h2>
          <p className={`mt-2 ${sectionIntroClass()}`}>
            Contact details for admissions correspondence. Pre-filled values come from your account where available;
            please confirm or edit before submitting.
          </p>
        </div>
        <div className="space-y-5">
          {applicantApplicationQuestionKeys.map((k) => {
            const meta = applicantFormLabels[k];
            const name = formFieldNameForQuestion(k);
            const defaultValue = initialAnswers[k] ?? "";
            if (k === "applicant:preferred_contact_method") {
              return (
                <div key={k} className="space-y-2">
                  <label htmlFor={name} className="block text-sm font-medium text-foreground">
                    {meta.label}
                  </label>
                  <select
                    id={name}
                    name={name}
                    defaultValue={defaultValue}
                    className="w-full rounded-md border border-border bg-[var(--bg-secondary)] px-3 py-2 text-sm text-foreground"
                  >
                    <option value="">Select…</option>
                    {preferredContactOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }
            const inputType = meta.type ?? "text";
            return (
              <div key={k} className="space-y-2">
                <label htmlFor={name} className="block text-sm font-medium text-foreground">
                  {meta.label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={inputType}
                  defaultValue={defaultValue}
                  autoComplete={
                    k === "applicant:full_name"
                      ? "name"
                      : k === "applicant:email"
                        ? "email"
                        : k === "applicant:phone"
                          ? "tel"
                          : k === "applicant:country"
                            ? "country-name"
                            : undefined
                  }
                  placeholder={meta.placeholder}
                  className="w-full rounded-md border border-border bg-[var(--bg-secondary)] px-3 py-2 text-sm text-foreground placeholder:text-readable-muted"
                />
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="mt-12 space-y-6 border-t border-border pt-10"
        aria-labelledby="stream-details-heading"
      >
        <div>
          <h2 id="stream-details-heading" className={sectionTitleClass()}>
            {streamSectionTitle}
          </h2>
          <p className={`mt-2 ${sectionIntroClass()}`}>
            Stream-specific information used to assess pathway fit and readiness.
          </p>
        </div>
        <div className="space-y-5">
          {streamKeys.map((k) => {
            const meta = labels[k];
            const name = formFieldNameForQuestion(k);
            const isTextarea = meta?.type === "textarea";
            const defaultValue = initialAnswers[k] ?? "";
            return (
              <div key={k} className="space-y-2">
                <label htmlFor={name} className="block text-sm font-medium text-foreground">
                  {meta?.label ?? k}
                </label>
                {isTextarea ? (
                  <textarea
                    id={name}
                    name={name}
                    rows={4}
                    defaultValue={defaultValue}
                    placeholder={meta?.placeholder}
                    className="w-full rounded-md border border-border bg-[var(--bg-secondary)] px-3 py-2 text-sm text-foreground placeholder:text-readable-muted"
                  />
                ) : (
                  <input
                    id={name}
                    name={name}
                    type="text"
                    defaultValue={defaultValue}
                    placeholder={meta?.placeholder}
                    className="w-full rounded-md border border-border bg-[var(--bg-secondary)] px-3 py-2 text-sm text-foreground placeholder:text-readable-muted"
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="mt-12 space-y-6 border-t border-border pt-10"
        aria-labelledby="consents-heading"
      >
        <h2 id="consents-heading" className={sectionTitleClass()}>
          Required consents
        </h2>
        {defs.map((d) => {
          const id = consentFieldName(d.consentKey);
          return (
            <div
              key={d.consentKey}
              className="space-y-2 rounded-lg border border-border bg-[var(--bg-secondary)] p-4"
            >
              <label htmlFor={id} className="flex cursor-pointer gap-3 text-sm">
                <input
                  id={id}
                  type="checkbox"
                  name={id}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-border"
                />
                <span>
                  <span className="font-medium text-foreground">{d.label}</span>
                  <span className="mt-1 block text-readable-muted leading-relaxed">{d.body}</span>
                </span>
              </label>
            </div>
          );
        })}
      </section>
    </>
  );
}
