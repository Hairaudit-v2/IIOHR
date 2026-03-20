import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const supports = [
  {
    title: "Enquiry and fit",
    description:
      "Initial discussion clarifies clinic context, goals, and whether an IIOHR partnership model is the right strategic fit.",
  },
  {
    title: "Readiness review",
    description:
      "A readiness review identifies baseline capability, supervision capacity, and governance conditions required for safe staged rollout.",
  },
  {
    title: "Pathway design",
    description:
      "Entry stages, development milestones, and review points are mapped so progression is practical, structured, and repeatable.",
  },
  {
    title: "Supervised development",
    description:
      "Implementation emphasizes supervised practical progression with standards-led support rather than isolated one-off training events.",
  },
  {
    title: "Review and progression",
    description:
      "Ongoing case review and performance reflection are used to guide next-stage progression and quality consistency over time.",
  },
];

export function ClinicImplementationSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Implementation support"
        title="How implementation works in staged practice"
        description="Clinic implementation is structured as a phased, standards-led process from fit and readiness through supervised development and progression review."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
