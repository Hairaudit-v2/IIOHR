import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface CaseTriageScenarioProps {
  title: string;
  scenarioSummary: string;
  expectedEscalationPath: string;
}

export function CaseTriageScenario({
  title,
  scenarioSummary,
  expectedEscalationPath,
}: CaseTriageScenarioProps) {
  return (
    <AcademyPanel title={title}>
      <p>{scenarioSummary}</p>
      <p className="text-foreground">Expected escalation path: {expectedEscalationPath}</p>
    </AcademyPanel>
  );
}
