import type { AcademyStreamSlug } from "@/lib/academy/constants";
import { defaultProgramSlugForStream } from "@/lib/academy/admissions/defaults";
import {
  admissionsConsentDefinitions,
  consultantApplicationQuestionKeys,
  doctorApplicationQuestionKeys,
  consentFieldName,
  formFieldNameForQuestion,
  streamFormLabels,
} from "@/lib/academy/admissions/stream-forms";

export function StreamApplyFormFields({ stream }: { stream: AcademyStreamSlug }) {
  const keys =
    stream === "doctors" ? doctorApplicationQuestionKeys : consultantApplicationQuestionKeys;
  const labels = streamFormLabels[stream];
  const defs = admissionsConsentDefinitions[stream];
  const defaultProgram = defaultProgramSlugForStream(stream);

  return (
    <>
      <input type="hidden" name="targetStream" value={stream} />
      <input type="hidden" name="targetProgramSlug" value={defaultProgram} />

      <div className="space-y-6">
        {keys.map((k) => {
          const meta = labels[k];
          const name = formFieldNameForQuestion(k);
          const isTextarea = meta?.type === "textarea";
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
                  placeholder={meta?.placeholder}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type="text"
                  placeholder={meta?.placeholder}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 space-y-6 border-t border-border pt-8">
        <h2 className="text-sm font-semibold text-foreground">Required consents</h2>
        {defs.map((d) => {
          const id = consentFieldName(d.consentKey);
          return (
            <div key={d.consentKey} className="space-y-2 rounded-md border border-border p-4">
              <label htmlFor={id} className="flex cursor-pointer gap-3 text-sm">
                <input
                  id={id}
                  type="checkbox"
                  name={id}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-border"
                />
                <span>
                  <span className="font-medium text-foreground">{d.label}</span>
                  <span className="mt-1 block text-[var(--text-secondary)] leading-relaxed">{d.body}</span>
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
