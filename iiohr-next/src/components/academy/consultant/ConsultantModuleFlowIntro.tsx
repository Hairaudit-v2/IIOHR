import Link from "next/link";

interface ConsultantModuleFlowIntroProps {
  programSlug: string;
  moduleSequence: { position: number; total: number } | null;
  firstLessonSlug: string | null;
}

/**
 * Frames the module as a guided unit using only structural facts (sequence, links).
 */
export function ConsultantModuleFlowIntro({
  programSlug,
  moduleSequence,
  firstLessonSlug,
}: ConsultantModuleFlowIntroProps) {
  const base = `/consultants/programs/${programSlug}`;

  return (
    <div className="rounded-xl border border-border bg-[var(--bg-secondary)] px-5 py-5 sm:px-6">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-readable-muted">
        How this unit is organised
      </p>
      {moduleSequence ? (
        <p className="mt-2 text-sm text-foreground">
          Module {moduleSequence.position} of {moduleSequence.total} in this programme pathway.
        </p>
      ) : null}
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-readable-muted">
        Work through the lesson reading, review communication and role-boundary prompts, then use linked scenarios
        and tasks to rehearse safe practice. Finish with the module assessment so your progress reflects both
        knowledge and scope discipline — not independent diagnosis or prescribing.
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-readable-muted">
        <li>Open the lesson and complete the reading and objectives.</li>
        <li>Review case prompts and practical tasks where provided.</li>
        <li>Complete the linked assessment before moving to the next module.</li>
      </ol>
      {firstLessonSlug ? (
        <p className="mt-5">
          <Link
            href={`${base}/lessons/${firstLessonSlug}`}
            className="link-premium text-sm font-semibold text-foreground"
          >
            Start with lesson 1 →
          </Link>
        </p>
      ) : null}
    </div>
  );
}
