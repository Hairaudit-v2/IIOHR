import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const items = [
  {
    title: "Standards-led development",
    description: "Progress depends on clearer expectations rather than informal assumptions about readiness.",
  },
  {
    title: "Staged progression",
    description: "Responsibility grows in a sequence that can be reviewed, discussed, and justified.",
  },
  {
    title: "Review and accountability",
    description: "Feedback, audit, and mentor input help keep development visible rather than opaque.",
  },
] as const;

export function GovernanceStandardsSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Operating Structure"
        title="How credibility is built into the model"
        description="IIOHR is designed to make development more traceable through standards, progression, review, and accountability."
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
