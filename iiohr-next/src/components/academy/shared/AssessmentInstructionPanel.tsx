import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface AssessmentInstructionPanelProps {
  instructions: string;
  mandatoryDomainTags: string[];
}

export function AssessmentInstructionPanel({
  instructions,
  mandatoryDomainTags,
}: AssessmentInstructionPanelProps) {
  return (
    <AcademyPanel title="Assessment Instructions">
      <p>{instructions}</p>
      {mandatoryDomainTags.length > 0 ? (
        <p>Mandatory domains: {mandatoryDomainTags.join(", ")}</p>
      ) : null}
    </AcademyPanel>
  );
}
