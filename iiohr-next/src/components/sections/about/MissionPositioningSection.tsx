import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const pillars = [
  {
    title: "What IIOHR is",
    description:
      "An education institute for structured development in hair restoration across doctor, consultant, nurse, and clinic pathways.",
  },
  {
    title: "Why it exists",
    description:
      "To replace fragmented training logic with clearer standards, staged progression, and stronger review across the field.",
  },
  {
    title: "What it is designed to do",
    description:
      "To connect education, supervision, admissions, and accountability so capability can build more reliably over time.",
  },
] as const;

export function MissionPositioningSection() {
  return (
    <SectionShell muted joinPrevious>
      <SectionHeading
        eyebrow="Institute Purpose"
        title="What IIOHR exists to do"
        description="IIOHR exists to make development in hair restoration more structured and credible than ad hoc training pathways."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {pillars.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
