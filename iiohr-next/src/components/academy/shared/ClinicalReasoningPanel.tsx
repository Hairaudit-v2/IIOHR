import type { ClinicalReasoningBox } from "@/lib/academy/content-types";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface ClinicalReasoningPanelProps {
  boxes: ClinicalReasoningBox[];
  title?: string;
}

export function ClinicalReasoningPanel({
  boxes,
  title = "Clinical reasoning",
}: ClinicalReasoningPanelProps) {
  if (!boxes.length) {
    return null;
  }

  return (
    <AcademyPanel title={title}>
      <div className="space-y-6">
        {boxes.map((box) => (
          <div key={box.id} className="border-b border-border/80 pb-6 last:border-0 last:pb-0">
            <p className="text-sm font-medium text-foreground">{box.title}</p>
            <p className="mt-2 text-sm text-readable-muted">{box.prompt}</p>
            <p className="mt-3 rounded-lg border border-border/60 bg-[var(--bg-secondary)] p-3 text-sm leading-relaxed text-foreground">
              <span className="font-medium text-readable-muted">Teaching point: </span>
              {box.teachingPoint}
            </p>
          </div>
        ))}
      </div>
    </AcademyPanel>
  );
}
