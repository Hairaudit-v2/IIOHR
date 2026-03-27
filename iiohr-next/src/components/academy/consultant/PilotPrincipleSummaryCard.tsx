interface PilotPrincipleSummaryCardProps {
  /** Verbatim key takeaways from lesson JSON; first item is emphasised. */
  takeaways: string[];
}

export function PilotPrincipleSummaryCard({ takeaways }: PilotPrincipleSummaryCardProps) {
  if (takeaways.length === 0) {
    return null;
  }
  const [headline, ...rest] = takeaways;

  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-[color-mix(in_srgb,var(--gold-primary)_42%,var(--border))] bg-[color-mix(in_srgb,var(--bg-secondary)_92%,var(--bg-soft))] p-5 shadow-[0_10px_36px_-16px_color-mix(in_srgb,var(--bg-dark)_22%,transparent)] sm:p-8">
      <div
        className="pointer-events-none absolute inset-y-3 left-0 w-[3px] rounded-full bg-[color-mix(in_srgb,var(--gold-primary)_88%,transparent)]"
        aria-hidden
      />
      <div className="relative pl-4 sm:pl-5">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[var(--gold-primary)]">
          Principle to carry forward
        </p>
        <p className="mt-4 text-xl font-semibold leading-[1.35] tracking-tight text-foreground sm:text-2xl sm:leading-[1.3]">
          {headline}
        </p>
        {rest.length > 0 ? (
          <ul className="mt-6 space-y-3.5 border-t border-[color-mix(in_srgb,var(--gold-primary)_16%,var(--border))] pt-6">
            {rest.map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-readable-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold-primary)]" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
