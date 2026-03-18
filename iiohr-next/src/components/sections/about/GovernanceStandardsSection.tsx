import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const items = [
  {
    title: "Institute-led assessment",
    description: "Admissions and pathway placement are decided by the institute team, with clear criteria and direct communication.",
  },
  {
    title: "Explicit progression standards",
    description: "Capability milestones are defined so trainees and mentors share a common frame for readiness and advancement.",
  },
  {
    title: "Review and accountability",
    description: "Case review, audit feedback, and mentor input form a continuous loop rather than a one-off evaluation.",
  },
];

export function GovernanceStandardsSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Governance and standards"
        title="How we maintain rigour"
        description="Quality is built into the model through assessment, clear standards, and ongoing review—not only at the point of entry."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
