import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const progressionSteps = [
  {
    label: "Controlled Repetition",
    description:
      "Repeat core steps in supervised conditions until workflow discipline and safety behaviors are stable.",
  },
  {
    label: "Pattern Recognition",
    description:
      "Identify procedural patterns, common risk points, and technique-performance relationships across cases.",
  },
  {
    label: "Decision Consistency",
    description:
      "Apply planning and intra-operative decisions with less variability and clearer rationale under supervision.",
  },
  {
    label: "Technical Stability",
    description:
      "Deliver donor handling, extraction, and implantation with controlled precision and reproducible quality.",
  },
  {
    label: "Surgical Fluency",
    description:
      "Integrate technical execution, case judgment, and corrective review into dependable surgical performance.",
  },
];

export function FluencyProgressionSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Progression Logic"
        title="From controlled repetition to surgical fluency"
        description="Fluency is developed through repeated supervised practice, structured correction, and progressively more complex procedural responsibility."
      />
      <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {progressionSteps.map((step, index) => (
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
