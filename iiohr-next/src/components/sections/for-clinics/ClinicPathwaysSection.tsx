import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const clinicPathways = [
  {
    title: "First-time capability build",
    description:
      "For clinics establishing internal hair restoration development for the first time, with staged entry and supervision foundations.",
  },
  {
    title: "Consistency improvement pathway",
    description:
      "For clinics with existing activity that need stronger consistency in planning, execution, and outcome-linked review.",
  },
  {
    title: "Internal doctor progression",
    description:
      "For clinics developing structured internal progression for doctors across entrant stages and capability milestones.",
  },
  {
    title: "Multi-doctor standards alignment",
    description:
      "For larger teams seeking a shared standards framework, governance cadence, and progression logic across multiple clinicians.",
  },
];

export function ClinicPathwaysSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Clinic Pathways"
        title="Pathway models for different clinic maturity contexts"
        description="Clinic leaders can use these pathway models to self-identify the development approach most aligned to current readiness, team structure, and capability goals."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {clinicPathways.map((pathway, index) => (
          <Card key={pathway.title}>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {`Pathway 0${index + 1}`}
            </p>
            <h3 className="mt-2 text-lg font-semibold">{pathway.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pathway.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
