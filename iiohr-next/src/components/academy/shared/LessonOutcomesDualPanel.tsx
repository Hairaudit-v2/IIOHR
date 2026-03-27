import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface LessonOutcomesDualPanelProps {
  moduleOutcomes: string[];
  lessonObjectives: string[];
}

/** Module-level outcomes (from the teaching manual spine) alongside lesson objectives — same copy as JSON. */
export function LessonOutcomesDualPanel({ moduleOutcomes, lessonObjectives }: LessonOutcomesDualPanelProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <AcademyPanel
        title="Module learning outcomes"
        eyebrow="Teaching manual alignment"
        quiet
      >
        <ol className="list-none space-y-3 text-sm leading-relaxed">
          {moduleOutcomes.map((line, i) => (
            <li key={line} className="flex gap-2.5">
              <span className="w-5 shrink-0 font-semibold tabular-nums text-foreground">{i + 1}.</span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
      </AcademyPanel>
      <AcademyPanel title="Lesson objectives" eyebrow="This session" quiet>
        <ol className="list-none space-y-3 text-sm leading-relaxed">
          {lessonObjectives.map((line, i) => (
            <li key={line} className="flex gap-2.5">
              <span className="w-5 shrink-0 font-semibold tabular-nums text-foreground">{i + 1}.</span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
      </AcademyPanel>
    </div>
  );
}
