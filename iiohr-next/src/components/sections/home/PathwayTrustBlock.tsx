import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";

const items = [
  {
    title: "Staged progression",
    description: "Theory and observation through supervised performance, audit, and refinement—so capability builds with clarity and accountability.",
  },
  {
    title: "Supervised exposure",
    description: "Live feedback during supervised practical development; structured case review and longitudinal mentorship beyond initial training.",
  },
  {
    title: "Standards-based development",
    description: "Training anchored to explicit clinical standards; outcome review and benchmarking so progress is measurable, not assumed.",
  },
];

/** Lightweight visual explanation: progression overview, training exposure, standards. */
export function PathwayTrustBlock() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="At a glance"
        title="Progression, exposure, and standards"
        description="The pathway is built on staged progression, supervised practical exposure, and development aligned to clinical standards."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title}>
            <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
