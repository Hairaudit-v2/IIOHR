import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const philosophyPoints = [
  "Progression is longitudinal with explicit capability milestones, not fixed-duration course completion.",
  "Practical surgical training is continuously reinforced by scientific reasoning and case review.",
  "Performance quality is measured through structured audit and benchmarking feedback loops.",
  "Mentorship extends beyond initial exposure to support durable clinical judgment and consistency.",
];

export function PathwayPhilosophySection() {
  return (
    <SectionShell muted className="scroll-mt-24">
      <div id="pathway-philosophy">
        <SectionHeading
          eyebrow="Pathway Philosophy"
          title="Built for measurable progression from learning to independent excellence"
          description="IIOHR positions training as a progression system with clear stages rather than a one-off short course. Progression runs from theory and observation to applied understanding and supervised practice—so who each pathway is for, and why structured education matters in hair restoration, is explicit. Every stage links practical capability, clinical judgment, and outcome review."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {philosophyPoints.map((point) => (
            <Card key={point}>
              <p className="text-sm leading-relaxed text-muted-foreground">{point}</p>
            </Card>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
