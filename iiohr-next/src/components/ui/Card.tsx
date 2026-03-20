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
  "min-w-0 rounded-xl border p-6 shadow-[0_1px_3px_0_rgba(44,42,38,0.05),0_1px_2px_0_rgba(44,42,38,0.04)] md:p-7";
const lightStyles = "border-border bg-surface";
const darkStyles =
  "border-section-charcoal-border shadow-[0_2px_12px_rgba(0,0,0,0.2)] bg-gradient-to-b from-section-charcoal-foreground/[0.12] to-section-charcoal-foreground/[0.04]";
/* Premium interaction: subtle lift, scale 1.02, soft shadow increase, faint glow edge */
const interactiveStyles =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_10px_28px_-4px_rgba(44,42,38,0.1),0_4px_12px_-2px_rgba(44,42,38,0.06),0_0_0_1px_rgba(166,139,92,0.06)] hover:border-accent/25";
const interactiveDarkStyles =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.35),0_4px_16px_-4px_rgba(0,0,0,0.2),0_0_0_1px_rgba(166,139,92,0.12)] hover:border-accent/35";

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
