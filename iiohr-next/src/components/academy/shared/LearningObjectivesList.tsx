import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface LearningObjectivesListProps {
  objectives: string[];
  title?: string;
}

export function LearningObjectivesList({ objectives, title = "Learning objectives" }: LearningObjectivesListProps) {
  return (
    <AcademyPanel title={title}>
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
