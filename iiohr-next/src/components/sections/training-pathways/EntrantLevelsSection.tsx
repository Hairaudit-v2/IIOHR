import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const entrantLevels = [
  {
    title: "New entrant doctors",
    description:
      "Gain structured foundational training with supervised exposure and clear progression checkpoints.",
  },
  {
    title: "Existing hair surgeons",
    description:
      "Refine existing surgical capability through audit-led feedback, advanced theory, and targeted mentorship.",
  },
  {
    title: "Clinics developing internal talent",
    description:
      "Build internal surgeon pipelines with pathway design, consistency controls, and standards alignment.",
  },
  {
    title: "International surgeons",
    description:
      "Access institute-level progression frameworks informed by Australian standards and outcome governance.",
  },
];

export function EntrantLevelsSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Entrant Levels"
        title="Pathway options for different stages of professional entry"
        description="Programs are adapted by entrant level so development remains relevant, clinically rigorous, and progression-focused."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {entrantLevels.map((level) => (
          <Card key={level.title}>
            <h3 className="text-xl font-semibold">{level.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {level.description}
            </p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
