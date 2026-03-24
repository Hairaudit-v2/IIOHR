import type { AcademyLesson } from "@/lib/academy/content-types";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";
import { EvidenceTierBadge } from "@/components/academy/shared/EvidenceTierBadge";

interface LessonEvidenceTierPanelProps {
  lesson: AcademyLesson;
}

export function LessonEvidenceTierPanel({ lesson }: LessonEvidenceTierPanelProps) {
  if (!lesson.displayFlags.showEvidencePanel) {
    return null;
  }

  return (
    <AcademyPanel title="Evidence tier">
      <EvidenceTierBadge tier={lesson.evidenceTier.overall} summary={lesson.evidenceTier.summaryNote} />
      {lesson.evidenceTier.notes.length > 0 ? (
        <ul className="mt-4 space-y-2 text-sm text-readable-muted">
          {lesson.evidenceTier.notes.map((n) => (
            <li key={`${n.label}-${n.tier}`}>
              <span className="font-medium text-foreground">{n.label}</span> ({n.tier}): {n.note}
            </li>
          ))}
        </ul>
      ) : null}
    </AcademyPanel>
  );
}
