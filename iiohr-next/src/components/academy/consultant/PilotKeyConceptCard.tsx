/**
 * Pilot-only emphasis block: surfaces one existing learning objective verbatim (no new copy).
 */
interface PilotKeyConceptCardProps {
  /** Verbatim string from lesson JSON (e.g. a single learning objective). */
  text: string;
}

export function PilotKeyConceptCard({ text }: PilotKeyConceptCardProps) {
  return (
    <div
      className="rounded-xl border border-[color-mix(in_srgb,var(--gold-primary)_32%,var(--border))] bg-[color-mix(in_srgb,var(--gold-soft)_45%,var(--bg-secondary))] px-5 py-5 sm:px-6 sm:py-6"
      role="note"
    >
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--gold-primary)]">
        Learning objective
      </p>
      <p className="mt-3 text-[0.95rem] font-medium leading-[1.65] text-foreground">{text}</p>
    </div>
  );
}
