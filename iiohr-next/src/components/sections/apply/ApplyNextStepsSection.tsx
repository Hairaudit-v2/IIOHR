import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const nextSteps = [
  "Admissions reviews your submission in context.",
  "Pathway fit is considered against role, experience, and intended direction.",
  "You receive guidance on the most appropriate next step.",
  "Where relevant, the process moves into application follow-up or account-based access.",
];

export function ApplyNextStepsSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Next Steps"
        title="What happens after submission"
        description="Submissions are reviewed for fit and direction. The process is structured to give clear guidance, not to force every applicant through one intake path."
      />
      <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {nextSteps.map((step, index) => (
          <Card key={step} as="li" quiet marker={`0${index + 1}`}>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Step
            </p>
            <p className="mt-2 text-sm leading-relaxed text-readable-muted">{step}</p>
          </Card>
        ))}
      </ol>
    </SectionShell>
  );
}
