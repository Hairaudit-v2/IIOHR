import type { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  /** Alternating light tone flag (subtle contrast within section-light). */
  muted?: boolean;
  dark?: boolean;
  /** Accent treatment reserved for CTA / certification sections. */
  anchor?: boolean;
  /** Legacy flag kept for compatibility; now only affects spacing density. */
  continuous?: boolean;
  /** Tighter vertical padding for secondary strips. */
  compact?: boolean;
  /** Less top padding for intentionally stacked sections. */
  joinPrevious?: boolean;
  /** More generous vertical padding for premium lesson bands (pilot / benchmark layouts). */
  relaxed?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

export function SectionShell({
  children,
  muted = false,
  dark = false,
  anchor = false,
  continuous = false,
  compact = false,
  joinPrevious = false,
  relaxed = false,
  className = "",
  id,
  "aria-label": ariaLabel,
}: SectionShellProps) {
  const innerPad = compact
    ? "py-16 md:py-20 lg:py-24"
    : relaxed
      ? "py-28 md:py-32 lg:py-[8.5rem]"
      : anchor
      ? "py-26 md:py-30 lg:py-34"
      : joinPrevious
      ? continuous
        ? "pt-12 pb-20 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28"
        : "pt-16 pb-24 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32"
      : continuous
        ? "py-20 md:py-24 lg:py-28"
        : "py-24 md:py-28 lg:py-32";
  const tone = dark
    ? "section-dark text-section-charcoal-foreground section-flow"
    : anchor
      ? "section-anchor text-foreground section-flow"
      : "section-light text-foreground section-flow";

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative overflow-hidden ${tone} ${className}`}
      data-section-tone={dark ? "dark" : anchor ? "anchor" : "light"}
      data-section-alt={muted ? "true" : "false"}
    >
      <div
        className={`section-grid-overlay ${dark ? "section-grid-overlay-dark" : "section-grid-overlay-light"}`}
        aria-hidden
      />
      <div className={`relative z-10 mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-5 ${innerPad}`}>
        {children}
      </div>
    </section>
  );
}
