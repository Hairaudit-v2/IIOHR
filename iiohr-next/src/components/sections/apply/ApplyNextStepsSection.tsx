import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const nextSteps = [
  "Admissions reviews your submission in context",
  "Pathway fit is considered against role, experience, and intended direction",
  "Guidance is given on the most appropriate next step",
  "Account-based access or admissions follow-up may follow where relevant",
];

export function ApplyNextStepsSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Next Steps"
        title="What happens after submission"
        description="Submissions are reviewed for fit and direction. The aim is to guide the next step clearly, not to force every applicant through a one-size-fits-all intake."
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
