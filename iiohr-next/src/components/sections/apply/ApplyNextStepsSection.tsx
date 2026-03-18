import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const nextSteps = [
  "Initial intake review of your profile and goals",
  "Pathway-fit discussion with the IIOHR team",
  "Recommendation of the most suitable entry stage",
  "Intake guidance and next-step planning",
];

export function ApplyNextStepsSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Next Steps"
        title="What happens after submission"
        description="Every enquiry is reviewed by the admissions team and matched to pathway suitability before progression decisions are made."
      />
      <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {nextSteps.map((step, index) => (
          <Card key={step} as="li" interactive marker={`0${index + 1}`}>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Step
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{step}</p>
          </Card>
        ))}
      </ol>
    </SectionShell>
  );
}
