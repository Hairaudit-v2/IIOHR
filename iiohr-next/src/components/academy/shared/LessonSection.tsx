import type { ReactNode } from "react";
import { SectionShell } from "@/components/sections/shared/SectionShell";

interface LessonSectionProps {
  id: string;
  children?: ReactNode;
  eyebrow?: string;
  title?: string;
  intro?: string;
  muted?: boolean;
  /** When false, main content spans full width (grids); header stays readable measure. */
  constrain?: boolean;
  /** Taller section padding via SectionShell `relaxed` (benchmark pilot). */
  relaxed?: boolean;
  className?: string;
}

/**
 * Institutional lesson band: consistent anchor, scroll offset, and type rhythm for pilot / future lessons.
 */
export function LessonSection({
  id,
  children,
  eyebrow,
  title,
  intro,
  muted = false,
  constrain = true,
  relaxed = false,
  className = "",
}: LessonSectionProps) {
  const hasHeader = Boolean(eyebrow || title || intro);
  const hasChildren = children != null && children !== false;
  return (
    <SectionShell id={id} muted={muted} relaxed={relaxed} className={`scroll-mt-32 ${className}`}>
      {hasHeader ? (
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-readable-muted">{eyebrow}</p>
          ) : null}
          {title ? (
            <h2
              className={`text-xl font-semibold tracking-tight text-foreground sm:text-[1.35rem] ${eyebrow ? "mt-2" : ""}`}
            >
              {title}
            </h2>
          ) : null}
          {intro ? (
            <p
              className={`text-sm leading-[1.75] text-readable-muted ${title || eyebrow ? "mt-3" : ""} whitespace-pre-wrap`}
            >
              {intro}
            </p>
          ) : null}
        </div>
      ) : null}
      {hasChildren ? (
        <div className={`${hasHeader ? "mt-8" : ""} ${constrain ? "max-w-4xl" : ""}`}>{children}</div>
      ) : null}
    </SectionShell>
  );
}
