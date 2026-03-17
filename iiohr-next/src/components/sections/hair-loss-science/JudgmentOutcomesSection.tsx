import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const judgmentOutcomes = [
  "More accurate case selection and indication discipline",
  "Improved treatment sequencing and long-term planning logic",
  "Greater consistency in surgical strategy and execution decisions",
  "Stronger risk recognition and complication prevention",
  "Higher-quality patient communication and expectation setting",
  "More reliable outcome review and refinement over time",
];

export function JudgmentOutcomesSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Clinical Impact"
        title="Why deeper science leads to better surgical judgment"
        description="When surgeons understand biological context and treatment pathways more deeply, decision quality improves before, during, and after surgery."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {judgmentOutcomes.map((item) => (
          <Card key={item}>
            <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
