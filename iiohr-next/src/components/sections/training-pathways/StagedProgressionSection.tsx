import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const stagedSteps = [
  {
    label: "Learn",
    description:
      "Build core principles in practical FUE, clinical judgment, and safety fundamentals.",
  },
  {
    label: "Observe",
    description:
      "Study live surgery under senior supervision to internalize standards and workflow.",
  },
  {
    label: "Assist",
    description:
      "Support procedural delivery in controlled settings to develop team and technical discipline.",
  },
  {
    label: "Perform Under Supervision",
    description:
      "Execute defined surgical steps with direct faculty oversight and structured feedback.",
  },
  {
    label: "Audit",
    description:
      "Review cases against outcome metrics and benchmarks to identify specific development gaps.",
  },
  {
    label: "Improve",
    description:
      "Apply targeted adjustments through case-based review and mentor-guided refinement.",
  },
  {
    label: "Advance",
    description:
      "Progress into higher-complexity decision-making with greater consistency and accountability.",
  },
];

export function StagedProgressionSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Staged Progression Model"
        title="A clear advancement sequence for sustainable capability development"
        description="The pathway is intentionally staged to ensure readiness, safety, and consistency before each next level of responsibility."
      />
      <ol className="mt-14 grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
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
