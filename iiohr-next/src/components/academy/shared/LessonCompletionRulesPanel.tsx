import type { CompletionRule } from "@/lib/academy/content-types";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

const RULE_LABELS: Record<CompletionRule["type"], string> = {
  view: "Complete the lesson reading",
  "pass-linked-assessment": "Pass the linked assessment(s)",
  "submit-linked-task": "Submit the linked practical task(s)",
  "faculty-approval": "Obtain faculty approval where required",
  "acknowledge-compliance": "Acknowledge compliance requirements",
};

interface LessonCompletionRulesPanelProps {
  rules: CompletionRule[];
}

export function LessonCompletionRulesPanel({ rules }: LessonCompletionRulesPanelProps) {
  if (rules.length === 0) {
    return null;
  }

  return (
    <AcademyPanel title="Completion requirements">
      <ul className="list-inside list-disc space-y-2 text-sm text-readable-muted">
        {rules.map((rule) => (
          <li key={rule.id}>
            <span className="text-foreground">{RULE_LABELS[rule.type] ?? rule.type}</span>
            {rule.description ? <span> — {rule.description}</span> : null}
            {!rule.required ? <span className="text-xs"> (optional)</span> : null}
          </li>
        ))}
      </ul>
    </AcademyPanel>
  );
}
