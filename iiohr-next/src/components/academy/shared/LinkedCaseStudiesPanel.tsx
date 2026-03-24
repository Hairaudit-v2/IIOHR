import type { CaseStudy } from "@/lib/academy/compliance-types";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface LinkedCaseStudiesPanelProps {
  caseStudies: CaseStudy[];
}

export function LinkedCaseStudiesPanel({ caseStudies }: LinkedCaseStudiesPanelProps) {
  if (caseStudies.length === 0) {
    return null;
  }

  return (
    <AcademyPanel title="Linked case studies">
      <ul className="space-y-5">
        {caseStudies.map((cs) => (
          <li key={cs.id} className="border-b border-border pb-5 last:border-0 last:pb-0">
            <p className="font-medium text-foreground">{cs.title}</p>
            <p className="mt-1 text-sm text-readable-muted">{cs.scenarioSummary}</p>
            {cs.patientContext !== cs.scenarioSummary ? (
              <p className="mt-2 text-sm text-readable-muted">{cs.patientContext}</p>
            ) : null}
            {cs.redFlags.length > 0 ? (
              <p className="mt-2 text-xs text-readable-muted">
                <span className="font-medium text-foreground">Red flags: </span>
                {cs.redFlags.join("; ")}
              </p>
            ) : null}
            {cs.discussionPrompts.length > 0 ? (
              <ul className="mt-2 list-inside list-disc text-xs text-readable-muted">
                {cs.discussionPrompts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : null}
            <p className="mt-2 text-xs text-foreground">
              <span className="font-medium">Expected escalation: </span>
              {cs.expectedEscalationPath}
            </p>
          </li>
        ))}
      </ul>
    </AcademyPanel>
  );
}
