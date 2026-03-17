import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Enable hover elevation, subtle lift, and border emphasis. */
  interactive?: boolean;
  /** Optional marker (e.g. step number or icon) shown above content. */
  marker?: ReactNode;
  /** Use as link wrapper; pass the link element as child or use with `asChild`. */
  as?: "div" | "article";
}

const baseStyles =
  "min-w-0 rounded-lg border border-border bg-surface p-6 shadow-[0_1px_3px_0_rgba(44,42,38,0.06)] md:p-7";
const interactiveStyles =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(44,42,38,0.08),0_1px_3px_rgba(44,42,38,0.04)] hover:border-accent/25";

/** Paper-like content panel. Use `interactive` for hover lift and emphasis; optional `marker` for step/icon. */
export function Card({
  children,
  className = "",
  interactive = false,
  marker,
  as: Tag = "article",
}: CardProps) {
  return (
    <Tag
      className={`${baseStyles} ${interactive ? interactiveStyles : ""} ${className}`}
    >
      {marker != null ? (
        <div className="mb-4">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated text-[11px] font-semibold tracking-wider text-muted-foreground"
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
