import Link from "next/link";
import type { AcademyLesson } from "@/lib/academy/content-types";

interface ConsultantLessonFooterNavProps {
  programSlug: string;
  moduleSlug: string | null;
  sequence: { position: number; total: number } | null;
  prevLesson: AcademyLesson | null;
  nextLesson: AcademyLesson | null;
}

export function ConsultantLessonFooterNav({
  programSlug,
  moduleSlug,
  sequence,
  prevLesson,
  nextLesson,
}: ConsultantLessonFooterNavProps) {
  const base = `/consultants/programs/${programSlug}`;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-[var(--bg-secondary)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        {sequence ? (
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-readable-muted">
            Lesson {sequence.position} of {sequence.total} in this module
          </p>
        ) : null}
        {moduleSlug ? (
          <p className="mt-1 text-sm text-readable-muted">
            <Link href={`${base}/modules/${moduleSlug}`} className="link-premium font-medium text-foreground">
              Back to module overview
            </Link>
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-3">
        {prevLesson ? (
          <Link
            href={`${base}/lessons/${prevLesson.slug}`}
            className="rounded-lg border border-border bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[color-mix(in_srgb,var(--gold-primary)_40%,transparent)]"
          >
            ← Previous lesson
          </Link>
        ) : null}
        {nextLesson ? (
          <Link
            href={`${base}/lessons/${nextLesson.slug}`}
            className="rounded-lg border border-border bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[color-mix(in_srgb,var(--gold-primary)_40%,transparent)]"
          >
            Next lesson →
          </Link>
        ) : (
          <p className="self-center text-sm text-readable-muted">End of module lessons — complete the assessment.</p>
        )}
      </div>
    </div>
  );
}
