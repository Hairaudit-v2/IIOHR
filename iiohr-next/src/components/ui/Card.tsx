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

const baseStyles =
  "relative min-w-0 overflow-hidden rounded-[14px] border border-border/80 bg-surface p-6 md:p-7";
const quietBase =
  "relative min-w-0 overflow-hidden rounded-[12px] border border-border/55 bg-surface/70 p-5 shadow-none md:p-6 [&_h3]:text-heading [&_h3]:font-semibold";
const lightStyles =
  "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border/60";
const darkStyles =
  "border-section-charcoal-border/80 bg-section-charcoal-foreground/[0.06] before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-section-charcoal-border";
const interactiveStyles =
  "transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-foreground/26 hover:bg-surface-elevated/80";
const interactiveDarkStyles =
  "transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-section-charcoal-border hover:bg-section-charcoal-foreground/[0.1]";
const quietInteractiveStyles =
  "transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-surface/82";

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
                ? "inline-flex h-8 w-8 items-center justify-center rounded-md border border-section-charcoal-border bg-section-charcoal-foreground/10 text-[11px] font-semibold tracking-wider text-section-charcoal-muted"
                : quiet
                  ? "inline-flex h-8 w-8 items-center justify-center rounded-md border border-foreground/22 bg-surface/50 text-[11px] font-semibold tracking-wider text-foreground"
                  : "inline-flex h-8 w-8 items-center justify-center rounded-md border border-foreground/22 bg-surface-elevated text-[11px] font-semibold tracking-wider text-foreground"
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
