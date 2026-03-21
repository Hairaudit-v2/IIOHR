import type { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  muted?: boolean;
  dark?: boolean;
  /**
   * Homepage / long-form editorial: one calm cream plane (section-home-editorial).
   * Ignores `muted` when true — use spacing + `joinPrevious` for rhythm, not alternating bands.
   */
  continuous?: boolean;
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
  continuous = false,
  compact = false,
  joinPrevious = false,
  className = "",
  id,
  "aria-label": ariaLabel,
}: SectionShellProps) {
  const innerPad = compact
    ? "py-14 md:py-16 lg:py-20"
    : joinPrevious
      ? continuous
        ? "pt-8 pb-20 md:pt-10 md:pb-24 lg:pt-12 lg:pb-28"
        : "pt-12 pb-28 md:pt-16 md:pb-32 lg:pt-20 lg:pb-36"
      : continuous
        ? "py-24 md:py-28 lg:py-32"
        : "py-28 md:py-32 lg:py-36";
  const tone = dark
    ? "section-dark-anchor text-section-charcoal-foreground section-flow"
    : continuous
      ? "section-home-editorial text-foreground section-flow"
      : muted
        ? "section-light-muted text-foreground section-flow"
        : "section-light text-foreground section-flow";

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${tone} ${className}`}
      data-section-tone={dark ? "dark" : muted && !continuous ? "muted" : "default"}
    >
      <div className={`mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-5 ${innerPad}`}>{children}</div>
    </section>
  );
}
