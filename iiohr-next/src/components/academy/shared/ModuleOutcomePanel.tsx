import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface ModuleOutcomePanelProps {
  learningOutcomes: string[];
}

export function ModuleOutcomePanel({ learningOutcomes }: ModuleOutcomePanelProps) {
  return (
    <AcademyPanel title="Module Learning Outcomes">
      <ul className="space-y-2">
        {learningOutcomes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </AcademyPanel>
  );
}
