interface PilotPreAssessmentRecapProps {
  /** Verbatim lesson learning objectives. */
  objectives: string[];
}

export function PilotPreAssessmentRecap({ objectives }: PilotPreAssessmentRecapProps) {
  if (objectives.length === 0) {
    return null;
  }

  return (
    <div
      id="lesson-recap"
      className="rounded-xl border border-border/80 border-l-[3px] border-l-[color-mix(in_srgb,var(--gold-primary)_75%,var(--border))] bg-[color-mix(in_srgb,var(--gold-soft)_38%,var(--bg-secondary))] p-5 shadow-sm sm:p-6"
    >
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-readable-muted">
        Before the knowledge check
      </p>
      <p className="mt-2 text-sm font-semibold text-foreground">You should be able to:</p>
      <ul className="mt-4 space-y-3.5">
        {objectives.map((obj) => (
          <li key={obj} className="flex gap-3 text-sm leading-relaxed text-readable-muted">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[color-mix(in_srgb,var(--gold-primary)_38%,var(--border))] bg-surface/90 text-[0.65rem] font-bold text-[var(--gold-primary)] shadow-[var(--shadow-text-04)]"
              aria-hidden
            >
              ✓
            </span>
            <span>{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
