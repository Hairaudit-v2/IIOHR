import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const philosophyPoints = [
  "Capability develops in stages, not through exposure alone.",
  "Readiness is reviewed against standards rather than assumed from attendance.",
  "Practical responsibility needs supervision, reflection, and improvement loops.",
  "Progression should stay role-appropriate for doctors, consultants, nurses, and clinics.",
] as const;

export function PathwayPhilosophySection() {
  return (
    <SectionShell muted joinPrevious className="scroll-mt-24">
      <div id="pathway-philosophy">
        <SectionHeading
          eyebrow="Why Staged Progression Matters"
          title="Why capability is built in stages"
          description="IIOHR treats progression as something that must be earned, reviewed, and supported over time. Exposure on its own is not the same as readiness."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
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
