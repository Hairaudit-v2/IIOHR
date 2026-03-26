import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const stagedSteps = [
  {
    label: "Foundation",
    description: "Build the understanding needed for safer role-appropriate development.",
  },
  {
    label: "Observe",
    description: "See standards, workflow, and decision-making in real context.",
  },
  {
    label: "Support",
    description: "Take defined responsibilities with supervision and correction.",
  },
  {
    label: "Review",
    description: "Use standards and feedback to identify what should improve next.",
  },
  {
    label: "Advance",
    description: "Move forward only when readiness and scope alignment support it.",
  },
] as const;

export function StagedProgressionSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Progression Sequence"
        title="A staged sequence rather than one-size-fits-all intake"
        description="Not every person or clinic enters at the same point. Progression is matched to current role, experience, and readiness."
      />
      <ol className="mt-14 grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stagedSteps.map((step, index) => (
          <Card key={step.label} as="li" interactive marker={`0${index + 1}`}>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Stage
            </p>
            <h3 className="mt-2 text-sm font-semibold tracking-tight">{step.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </Card>
        ))}
      </ol>
    </SectionShell>
  );
}
