import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const meaningPoints = [
  "Practical development is structured as staged responsibility, not a short observational attachment.",
  "Technical execution is developed alongside case judgment, donor protection, and surgical planning.",
  "Progression is supervised and corrected in context rather than left to independent trial-and-error.",
  "Ongoing review is integral, so standards and decision quality are reinforced over time.",
];

export function PracticalFueMeaningSection() {
  return (
    <SectionShell muted joinPrevious className="scroll-mt-24">
      <div id="practical-fue-model">
        <SectionHeading
          eyebrow="What Practical FUE Means at IIOHR"
          title="A supervised institute framework for practical surgical capability"
          description="At IIOHR, Practical FUE means supervised practical exposure within a wider clinical training model. It develops operative judgment, donor stewardship, planning discipline, and standards-based execution through staged responsibility and structured review."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {meaningPoints.map((point) => (
            <Card key={point}>
              <p className="text-sm leading-relaxed text-muted-foreground">{point}</p>
            </Card>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
