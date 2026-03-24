import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface LearningObjectivesListProps {
  objectives: string[];
}

export function LearningObjectivesList({ objectives }: LearningObjectivesListProps) {
  return (
    <AcademyPanel title="Learning Objectives">
      <ol className="space-y-2">
        {objectives.map((objective, index) => (
          <li key={objective}>
            {index + 1}. {objective}
          </li>
        ))}
      </ol>
    </AcademyPanel>
  );
}
