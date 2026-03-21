import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Enable hover elevation, subtle lift, and border emphasis. */
  interactive?: boolean;
  /** Use when section has dark background (charcoal); applies matching border, surface, and hover. */
  dark?: boolean;
  /** Editorial lists: lighter frame, minimal shadow — less “feature tile”. */
  quiet?: boolean;
  /** Optional marker (e.g. step number or icon) shown above content. */
  marker?: ReactNode;
  /** Root element; use "li" inside ol/ul for list semantics. */
  as?: "div" | "article" | "li";
}

const baseStyles = "min-w-0 rounded-xl border p-6 shadow-token-card md:p-7";
const quietBase =
  "min-w-0 rounded-xl border border-border/45 bg-surface/48 p-5 shadow-none md:p-6 md:p-7 [&_h3]:text-heading [&_h3]:font-semibold";
const lightStyles = "border-border/90 bg-surface";
const darkStyles =
  "border-section-charcoal-border shadow-token-card-dark bg-gradient-to-b from-section-charcoal-foreground/[0.12] to-section-charcoal-foreground/[0.04]";
/* Subtle lift + soft shadow; gold border whisper + hint of system blue on hover (tokens via globals) */
const interactiveStyles =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[var(--shadow-card-hover-light)] hover:border-accent/35";
const interactiveDarkStyles =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[var(--shadow-card-hover-dark)] hover:border-accent/32";
const quietInteractiveStyles =
  "transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.005] hover:border-accent/40 hover:bg-surface/65";

/** Paper-like content panel. Use `interactive` for hover lift and emphasis; `dark` for charcoal sections; optional `marker`. */
export function Card({
  children,
  className = "",
  interactive = false,
  dark = false,
  quiet = false,
  marker,
  as: Tag = "article",
}: CardProps) {
  const rootBase = quiet ? quietBase : baseStyles;
  const tone = dark ? darkStyles : quiet ? "" : lightStyles;
  const hover = interactive
    ? dark
      ? interactiveDarkStyles
      : quiet
        ? quietInteractiveStyles
        : interactiveStyles
    : "";
  return (
    <Tag className={`${rootBase} ${tone} ${hover} ${className}`}>
      {marker != null ? (
        <div className="mb-4">
          <span
            className={
              dark
                ? "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-section-charcoal-border bg-section-charcoal-foreground/10 text-[11px] font-semibold tracking-wider text-section-charcoal-muted"
                : quiet
                  ? "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/20 bg-surface/50 text-[11px] font-semibold tracking-wider text-foreground/80"
                  : "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/20 bg-surface-elevated text-[11px] font-semibold tracking-wider text-foreground/75"
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
