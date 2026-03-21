import type { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  muted?: boolean;
  dark?: boolean;
  /** Tighter vertical padding for secondary or stacked strips. */
  compact?: boolean;
  /** Less top padding when stacked after another same-tone section (cream continuity). */
  joinPrevious?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

export function SectionShell({
  children,
  muted = false,
  dark = false,
  compact = false,
  joinPrevious = false,
  className = "",
  id,
  "aria-label": ariaLabel,
}: SectionShellProps) {
  const innerPad = compact
    ? "py-16 md:py-20 lg:py-24"
    : joinPrevious
      ? "pt-12 pb-28 md:pt-16 md:pb-32 lg:pt-20 lg:pb-36"
      : "py-28 md:py-32 lg:py-36";
  const tone = dark
    ? "section-dark-gradient text-section-charcoal-foreground section-flow"
    : muted
      ? "section-muted-depth text-foreground section-flow"
      : "section-ivory-depth text-foreground section-flow";

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${tone} ${className}`}
      data-section-tone={dark ? "dark" : muted ? "muted" : "default"}
    >
      <div className={`mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-5 ${innerPad}`}>{children}</div>
    </section>
  );
}
