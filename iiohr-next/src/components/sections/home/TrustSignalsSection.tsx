import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { Card } from "@/components/ui/Card";

const signals = [
  {
    title: "Faculty-led training",
    description: "Delivered by practising surgeons with active teaching responsibility.",
  },
  {
    title: "Audit-backed improvement",
    description: "Benchmarking and review inform priorities—progress is measurable.",
  },
  {
    title: "Standards alignment",
    description: "Explicit clinical standards support governance and consistent quality.",
  },
  {
    title: "Pathway clarity",
    description: "Staged milestones and clear entry points for you and your mentors.",
  },
];

/** Compact governance strip after ecosystem centerpiece — less vertical peak, same substance. */
export function TrustSignalsSection() {
  return (
    <SectionShell muted compact>
      <SectionHeading
        eyebrow="Standards & governance"
        title="How we uphold quality"
        description="Faculty credibility, measurable outcomes, and clear standards—accountable, transparent development."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 xl:grid-cols-4">
        {signals.map((item) => (
          <Card key={item.title} interactive className="md:p-6">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
