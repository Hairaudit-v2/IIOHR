import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const planningBlocks = [
  {
    title: "Scalp and follicular biology",
    description:
      "Assess biological context that influences donor strategy, recipient planning, healing dynamics, and long-term sustainability.",
  },
  {
    title: "Treatment understanding",
    description:
      "Integrate medical and adjunctive options with surgical pathways so interventions are sequenced appropriately.",
  },
  {
    title: "Biology-to-surgery connection",
    description:
      "Link diagnosis and treatment planning directly to operative decisions, improving suitability, precision, and durability.",
  },
];

export function BiologyTreatmentPlanningSection() {
  return (
    <SectionShell dark>
      <SectionHeading
        eyebrow="Biology, Treatment, and Surgery"
        title="Clinical planning improves when biology and treatment logic are integrated"
        description="IIOHR teaches surgeons to connect biological understanding with treatment strategy and surgical execution, reducing fragmented decision-making."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {planningBlocks.map((block) => (
          <Card key={block.title} className="border-white/20 bg-white/5 shadow-none">
            <h3 className="text-lg font-semibold">{block.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85">{block.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
