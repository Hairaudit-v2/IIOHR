import {
  extractJourneyParagraphFromLessonBody,
  splitJourneyPhases,
} from "@/lib/academy/pilot-lesson-reading";

interface PilotJourneyFigureStripProps {
  lessonBodyContent: string;
}

/**
 * Pilot-only visual rhythm block: schematic of journey phases using wording from the teaching notes.
 */
export function PilotJourneyFigureStrip({ lessonBodyContent }: PilotJourneyFigureStripProps) {
  const paragraph = extractJourneyParagraphFromLessonBody(lessonBodyContent);
  if (!paragraph) {
    return null;
  }
  const phases = splitJourneyPhases(paragraph);
  if (phases.length === 0) {
    return null;
  }

  return (
    <figure
      className="mt-8 overflow-hidden rounded-xl border border-border/90 bg-surface/80 shadow-[var(--shadow-card)]"
      aria-label={paragraph}
    >
      <div className="border-b border-border/70 bg-[color-mix(in_srgb,var(--bg-soft)_55%,var(--bg-secondary))] px-4 py-3 sm:px-5">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-readable-muted">
          Visual explanation · patient journey
        </p>
      </div>
      <div className="overflow-x-auto px-3 py-4 sm:px-4">
        <ol className="flex min-w-max snap-x snap-mandatory gap-2 pb-1 sm:gap-3">
          {phases.map((phase, i) => (
            <li
              key={`${i}-${phase.slice(0, 24)}`}
              className="flex snap-start items-center gap-2 sm:gap-3"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--gold-primary)_35%,var(--border))] bg-surface text-[11px] font-semibold tabular-nums text-foreground"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="max-w-[11rem] text-[0.7rem] font-medium leading-snug text-readable-muted sm:max-w-[13rem] sm:text-xs">
                {phase}
              </span>
              {i < phases.length - 1 ? (
                <span className="hidden text-[color-mix(in_srgb,var(--gold-primary)_55%,var(--text-secondary))] sm:inline" aria-hidden>
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
