interface LessonHeaderProps {
  title: string;
  overview: string;
  studyTimeMinutes: number;
  /** e.g. "Lesson 2 of 5 in this module" */
  sequenceLabel?: string | null;
  /** Programme line (e.g. working title) — deck layout only. */
  programWorkingTitle?: string | null;
  moduleTitle?: string | null;
  /** Premium “deck” chrome inspired by editorial lesson PDFs: hierarchy, spacing, accent rule. */
  variant?: "default" | "deck";
  /**
   * When false with `variant="deck"`, overview is omitted here so it can appear in a dedicated section below (pilot pacing).
   */
  showDeckOverview?: boolean;
  /**
   * Stronger title scale, accent bar, and meta strip — benchmark pilot lessons only (defaults off).
   */
  deckAuthority?: boolean;
}

export function LessonHeader({
  title,
  overview,
  studyTimeMinutes,
  sequenceLabel,
  programWorkingTitle,
  moduleTitle,
  variant = "default",
  showDeckOverview = true,
  deckAuthority = false,
}: LessonHeaderProps) {
  if (variant === "deck") {
    return (
      <div className="relative scroll-mt-32 pl-5 sm:pl-8">
        <div
          className={`absolute left-0 rounded-full bg-[color-mix(in_srgb,var(--gold-primary)_88%,transparent)] ${
            deckAuthority ? "top-0 bottom-0 w-1" : "top-1 bottom-1 w-[3px]"
          }`}
          aria-hidden
        />
        <div className={`space-y-3 ${deckAuthority ? "sm:space-y-4" : ""}`}>
          {programWorkingTitle ? (
            <p className="max-w-4xl text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-readable-muted">
              {programWorkingTitle}
            </p>
          ) : null}
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Lesson</p>
          {sequenceLabel ? (
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-readable-muted">
              {sequenceLabel}
            </p>
          ) : null}
          <h1
            className={`max-w-[min(100%,42rem)] font-semibold tracking-tight text-foreground ${
              deckAuthority
                ? "text-[1.85rem] leading-[1.15] sm:text-[2.45rem] sm:leading-[1.12]"
                : "text-3xl sm:text-[2.15rem] sm:leading-tight"
            }`}
          >
            {title}
          </h1>
          {moduleTitle ? (
            <p
              className={`max-w-3xl font-medium text-foreground/85 ${
                deckAuthority ? "text-[0.95rem] leading-snug sm:text-base" : "text-sm"
              }`}
            >
              {moduleTitle}
            </p>
          ) : null}
          {showDeckOverview ? (
            <p className="max-w-3xl text-sm leading-[1.7] text-readable-muted">{overview}</p>
          ) : null}
          <div
            className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${
              deckAuthority
                ? "border-t border-[color-mix(in_srgb,var(--gold-primary)_14%,transparent)] pt-3"
                : "pt-1"
            }`}
          >
            {deckAuthority ? (
              <span className="inline-flex min-h-[2.25rem] items-center rounded-md border border-border/85 bg-surface/90 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Study time · {studyTimeMinutes} min
              </span>
            ) : (
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Study time · {studyTimeMinutes} min
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-mt-32">
      <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Lesson</p>
      {sequenceLabel ? (
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-readable-muted">{sequenceLabel}</p>
      ) : null}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-readable-muted">{overview}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Estimated study time: {studyTimeMinutes} minutes
      </p>
    </div>
  );
}
