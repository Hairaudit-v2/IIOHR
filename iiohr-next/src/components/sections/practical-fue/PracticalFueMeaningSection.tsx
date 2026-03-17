import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const meaningPoints = [
  "Training is planned as a progression system, not a single short intervention.",
  "Technical execution is taught alongside patient selection and operative planning.",
  "Each stage is supervised with correction, not independent trial-and-error.",
  "Review and refinement are built into the pathway from the beginning.",
];

export function PracticalFueMeaningSection() {
  return (
    <SectionShell muted className="scroll-mt-24">
      <div id="practical-fue-model">
        <SectionHeading
          eyebrow="What Practical FUE Means at IIOHR"
          title="A serious training framework for surgical capability development"
          description="At IIOHR, Practical FUE means structured operative training with clear supervision, measurable progression, and clinical accountability. Hands-on education is grounded in standards and donor management from first principles—not shortcuts—so technical discipline and planning come before volume."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
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
