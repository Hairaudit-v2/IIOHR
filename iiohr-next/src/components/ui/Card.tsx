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
  "relative min-w-0 overflow-hidden rounded-[10px] border border-border bg-surface p-6 text-foreground md:p-7 [&_h3]:text-heading [&_p]:text-muted-foreground";
const quietBase =
  "relative min-w-0 overflow-hidden rounded-[10px] border border-border/80 bg-surface/78 p-5 text-foreground shadow-none md:p-6 [&_h3]:text-heading [&_h3]:font-semibold [&_p]:text-muted-foreground";
const lightStyles =
  "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border/60";
const darkStyles =
  "border-[rgba(255,255,255,0.12)] bg-[var(--bg-dark-panel)] before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-[rgba(255,255,255,0.12)]";
const interactiveStyles =
  "transition-[border-color,background-color,transform] duration-150 ease-out hover:-translate-y-px hover:border-foreground/28 hover:bg-surface-elevated/85";
const interactiveDarkStyles =
  "transition-[border-color,background-color,transform] duration-150 ease-out hover:-translate-y-px hover:border-[rgba(255,255,255,0.14)] hover:bg-[var(--bg-dark-elevated)]";
const quietInteractiveStyles =
  "transition-[border-color,background-color,transform] duration-150 ease-out hover:-translate-y-px hover:border-foreground/32 hover:bg-surface/84";

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
    <Tag className={`card ${rootBase} ${tone} ${hover} ${className}`}>
      {marker != null ? (
        <div className="mb-4">
          <span
            className={
              dark
                ? "inline-flex h-8 w-8 items-center justify-center rounded-md border border-[rgba(255,255,255,0.12)] bg-[var(--bg-dark-elevated)] text-[11px] font-semibold tracking-wider text-[#9ca3af]"
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
