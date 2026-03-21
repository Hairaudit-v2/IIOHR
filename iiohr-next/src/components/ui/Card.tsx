import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Enable hover elevation, subtle lift, and border emphasis. */
  interactive?: boolean;
  /** Use when section has dark background (charcoal); applies matching border, surface, and hover. */
  dark?: boolean;
  /** Optional marker (e.g. step number or icon) shown above content. */
  marker?: ReactNode;
  /** Root element; use "li" inside ol/ul for list semantics. */
  as?: "div" | "article" | "li";
}

const baseStyles =
  "min-w-0 rounded-xl border p-6 shadow-token-card md:p-7";
const lightStyles = "border-border/90 bg-surface";
const darkStyles =
  "border-section-charcoal-border shadow-token-card-dark bg-gradient-to-b from-section-charcoal-foreground/[0.12] to-section-charcoal-foreground/[0.04]";
/* Subtle lift + soft shadow; gold border whisper + hint of system blue on hover (tokens via globals) */
const interactiveStyles =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[var(--shadow-card-hover-light)] hover:border-accent/22";
const interactiveDarkStyles =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[var(--shadow-card-hover-dark)] hover:border-accent/32";

/** Paper-like content panel. Use `interactive` for hover lift and emphasis; `dark` for charcoal sections; optional `marker`. */
export function Card({
  children,
  className = "",
  interactive = false,
  dark = false,
  marker,
  as: Tag = "article",
}: CardProps) {
  const tone = dark ? darkStyles : lightStyles;
  const hover = interactive ? (dark ? interactiveDarkStyles : interactiveStyles) : "";
  return (
    <Tag className={`${baseStyles} ${tone} ${hover} ${className}`}>
      {marker != null ? (
        <div className="mb-4">
          <span
            className={
              dark
                ? "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-section-charcoal-border bg-section-charcoal-foreground/10 text-[11px] font-semibold tracking-wider text-section-charcoal-muted"
                : "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-elevated text-[11px] font-semibold tracking-wider text-muted-foreground"
            }
            aria-hidden
          >
            {marker}
          </span>
        </div>
      ) : null}
      {children}
    </Tag>
  );
}
