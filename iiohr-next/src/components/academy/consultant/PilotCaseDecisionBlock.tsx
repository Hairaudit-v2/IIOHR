import type { CaseStudy } from "@/lib/academy/compliance-types";

interface PilotCaseDecisionBlockProps {
  caseStudy: CaseStudy;
}

/**
 * Scenario framed as explicit decision checkpoints (discussion prompts), not a passive case list.
 */
export function PilotCaseDecisionBlock({ caseStudy }: PilotCaseDecisionBlockProps) {
  return (
    <div className="rounded-xl border border-[color-mix(in_srgb,var(--accent-blue)_18%,var(--border))] bg-[color-mix(in_srgb,var(--accent-blue-soft)_55%,var(--bg-secondary))] p-5 sm:p-6">
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-readable-muted">
        Decision-point scenario
      </p>
      <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">{caseStudy.title}</h3>
      <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">{caseStudy.scenarioSummary}</p>
      {caseStudy.patientContext !== caseStudy.scenarioSummary ? (
        <p className="mt-2 text-sm leading-relaxed text-readable-muted">{caseStudy.patientContext}</p>
      ) : null}

      {caseStudy.redFlags.length > 0 ? (
        <div className="mt-4 rounded-lg border border-border/80 bg-surface/80 px-3 py-2.5">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-readable-muted">Watch for</p>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-foreground">
            {caseStudy.redFlags.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-[var(--gold-primary)]" aria-hidden>
                  ·
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {caseStudy.discussionPrompts.length > 0 ? (
        <div className="mt-5">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-foreground">Check your reasoning</p>
          <ol className="mt-3 space-y-3">
            {caseStudy.discussionPrompts.map((p, i) => (
              <li key={p} className="flex gap-3 text-sm leading-relaxed text-readable-muted">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-foreground/15 bg-surface text-xs font-semibold text-foreground">
                  {i + 1}
                </span>
                <span className="pt-0.5">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <div className="mt-5 rounded-lg border border-[color-mix(in_srgb,var(--gold-primary)_20%,var(--border))] bg-surface/90 px-3 py-3">
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[var(--gold-primary)]">
          Expected pathway
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{caseStudy.expectedEscalationPath}</p>
      </div>
    </div>
  );
}
