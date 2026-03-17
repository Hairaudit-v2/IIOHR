import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const pillars = [
  {
    title: "Audit-backed improvement",
    description:
      "Performance is reviewed through structured outcome analysis so development priorities are objective and trackable.",
  },
  {
    title: "Standards alignment",
    description:
      "Training progression is anchored to explicit clinical standards, supporting governance and quality consistency.",
  },
  {
    title: "Mentorship and post-training support",
    description:
      "Surgeons continue to receive mentor correction and case-based guidance beyond initial practical exposure.",
  },
];

export function AuditStandardsMentorshipSection() {
  return (
    <SectionShell dark>
      <SectionHeading
        eyebrow="Quality Infrastructure"
        title="Audit, standards, and mentorship work as one development system"
        description="IIOHR clinic partnerships are designed to strengthen both individual surgeon progression and organizational quality assurance."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <Card key={pillar.title} className="border-white/20 bg-white/5 shadow-none">
            <h3 className="text-lg font-semibold">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85">{pillar.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
