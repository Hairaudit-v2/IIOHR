import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const supports = [
  {
    title: "Pathway design",
    description: "We work with your clinic to map entry points, progression steps, and review points so development is repeatable.",
  },
  {
    title: "Standards alignment",
    description: "Training and assessment are aligned with explicit clinical standards to support governance and consistency.",
  },
  {
    title: "Review integration",
    description: "Audit and case review are built into the pathway so surgeon improvement is measurable and trackable.",
  },
];

export function ClinicImplementationSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Implementation support"
        title="What clinic partnerships include"
        description="IIOHR supports clinics with more than training delivery—pathway design, standards alignment, and review integration so internal development is sustainable."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {supports.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
