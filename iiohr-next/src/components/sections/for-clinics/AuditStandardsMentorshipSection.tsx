import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const pillars = [
  {
    title: "Standards-led development",
    description:
      "Clinic development is anchored to clearer expectations rather than informal assumptions about readiness or quality.",
  },
  {
    title: "Staged progression",
    description:
      "Capability is expected to build in sequence, with transitions that can be reviewed and justified.",
  },
  {
    title: "Review and accountability",
    description:
      "Oversight, reflection, and review help clinics avoid treating training as a one-off event.",
  },
] as const;

export function AuditStandardsMentorshipSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="How The Model Works"
        title="An institute model rather than a course provider model"
        description="IIOHR is positioned as a capability partner: standards, staged progression, and review are intended to support more reliable clinic development over time."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <Card key={pillar.title} interactive>
            <h3 className="text-lg font-semibold text-heading">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
