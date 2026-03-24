import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface LessonOverviewPanelProps {
  overview: string;
  keyTakeaways: string[];
}

export function LessonOverviewPanel({ overview, keyTakeaways }: LessonOverviewPanelProps) {
  return (
    <AcademyPanel title="Lesson Overview">
      <p>{overview}</p>
      <ul className="space-y-2">
        {keyTakeaways.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </AcademyPanel>
  );
}
