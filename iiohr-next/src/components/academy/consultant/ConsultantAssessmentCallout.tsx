import Link from "next/link";
import type { AcademyAssessment } from "@/lib/academy/assessment-types";

interface ConsultantAssessmentCalloutProps {
  assessments: AcademyAssessment[];
  basePath: string;
}

export function ConsultantAssessmentCallout({ assessments, basePath }: ConsultantAssessmentCalloutProps) {
  if (assessments.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-[color-mix(in_srgb,var(--gold-primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--gold-primary)_6%,var(--bg-secondary))] px-5 py-6 sm:px-8">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-readable-muted">
        Check your learning
      </p>
      <h2 className="mt-2 text-lg font-semibold text-foreground">Linked assessments</h2>
      <p className="mt-2 max-w-2xl text-sm text-readable-muted">
        Complete the module assessment to demonstrate scope-safe reasoning. Pass mark and retry limits apply as
        shown on each assessment page.
      </p>
      <ul className="mt-5 space-y-3">
        {assessments.map((a) => (
          <li key={a.id}>
            <Link
              href={`${basePath}/assessments/${a.slug}`}
              className="inline-flex flex-wrap items-baseline gap-x-2 text-foreground"
            >
              <span className="link-premium font-semibold">{a.title}</span>
              <span className="text-xs text-readable-muted">
                Pass {a.passMark}% · {a.facultyReviewRequired ? "Includes faculty review" : "Auto-marked items"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
