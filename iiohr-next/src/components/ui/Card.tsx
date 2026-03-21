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
  "min-w-0 rounded-xl border p-6 shadow-[0_1px_4px_0_rgba(38,36,34,0.04),0_2px_10px_-2px_rgba(38,36,34,0.05)] md:p-7";
const lightStyles = "border-border/90 bg-surface";
const darkStyles =
  "border-section-charcoal-border shadow-[0_2px_14px_rgba(0,0,0,0.22)] bg-gradient-to-b from-section-charcoal-foreground/[0.12] to-section-charcoal-foreground/[0.04]";
/* Subtle lift + soft shadow; gold border whisper + hint of system blue on hover */
const interactiveStyles =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_14px_36px_-10px_rgba(38,36,34,0.09),0_6px_16px_-6px_rgba(100,125,155,0.07),0_0_0_1px_rgba(166,139,92,0.07)] hover:border-accent/22";
const interactiveDarkStyles =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.38),0_6px_18px_-8px_rgba(0,0,0,0.22),0_0_0_1px_rgba(120,145,175,0.14)] hover:border-accent/32";

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
