import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {progressionSteps.map((step, index) => (
          <li
            key={step.label}
            className="rounded-lg border border-border bg-surface p-4 shadow-[0_8px_18px_-16px_rgba(30,42,56,0.4)]"
          >
            <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {`Stage 0${index + 1}`}
            </p>
            <h3 className="mt-2 text-sm font-semibold tracking-[0.08em] uppercase">{step.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
