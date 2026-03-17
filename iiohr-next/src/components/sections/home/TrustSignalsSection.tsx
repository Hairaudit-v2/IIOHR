import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { Card } from "@/components/ui/Card";

const signals = [
  {
    title: "Faculty-led training",
    description: "Programmes are delivered by experienced surgeons with ongoing clinical practice and teaching responsibility.",
  },
  {
    title: "Audit-backed improvement",
    description: "Outcome review and benchmarking inform development priorities so progress is measurable, not assumed.",
  },
  {
    title: "Clinical standards alignment",
    description: "Training is anchored to explicit clinical standards to support governance and consistent quality.",
  },
  {
    title: "Pathway clarity",
    description: "Staged milestones and clear entry points help you and your mentors track readiness for the next step.",
  },
];

export function TrustSignalsSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Standards & governance"
        title="How we uphold quality"
        description="IIOHR’s approach is built on faculty credibility, measurable outcomes, and clear standards so clinician development is accountable, transparent, and globally relevant."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {signals.map((item) => (
          <Card key={item.title} interactive>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
