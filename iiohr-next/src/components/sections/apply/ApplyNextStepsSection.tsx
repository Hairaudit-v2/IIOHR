import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
      <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {nextSteps.map((step, index) => (
          <li key={step} className="rounded-lg border border-border bg-surface px-4 py-4">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {`Step 0${index + 1}`}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{step}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
