import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface AssessmentRendererProps {
  items: Array<{ id: string; prompt: string; type: string }>;
}

export function AssessmentRenderer({ items }: AssessmentRendererProps) {
  return (
    <AcademyPanel title="Assessment Items">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id}>
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Item {index + 1} · {item.type}
            </p>
            <p className="mt-2 text-foreground">{item.prompt}</p>
          </div>
        ))}
      </div>
    </AcademyPanel>
  );
}
