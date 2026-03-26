import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const supervisionBlocks = [
  {
    title: "Direct supervision in live care settings",
    description:
      "Practical exposure is delivered under experienced surgical supervision so technique, sequencing, and safety standards are corrected in real time.",
  },
  {
    title: "Why observation alone is insufficient",
    description:
      "Observation builds awareness, but operative judgment is formed only through supervised responsibility in real procedures where decisions carry consequences.",
  },
  {
    title: "Staged responsibility with accountability",
    description:
      "Responsibility expands only as readiness is demonstrated, with case-based feedback and review to improve consistency, discipline, and clinical accountability.",
  },
];

export function SupervisedHandsOnSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Clinical Supervision"
        title="Supervised development where responsibility is earned in stages"
        description="The practical environment prioritizes patient safety, disciplined execution, and transparent review. Progression is governed by readiness and supervision so standards and judgment lead technical development."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {supervisionBlocks.map((block) => (
          <Card key={block.title}>
            <h3 className="text-lg font-semibold">{block.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
