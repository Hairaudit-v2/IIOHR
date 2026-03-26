import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const clinicPathways = [
  {
    title: "Consistency",
    description:
      "A clearer internal model helps teams work to more consistent communication and development expectations.",
  },
  {
    title: "Trust",
    description:
      "Patients and teams benefit when clinics use role-safe pathways rather than informal or personality-led training behaviour.",
  },
  {
    title: "Team readiness",
    description:
      "Structured routes help clinics understand what different team members are building and where support is needed.",
  },
  {
    title: "Structured growth",
    description:
      "Growth becomes more manageable when progression, standards, and review are treated as operating infrastructure.",
  },
] as const;

export function ClinicPathwaysSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Why It Matters Operationally"
        title="Why this matters operationally"
        description="The clinic case for IIOHR is about reducing ad hoc training dependence and building a more durable standards culture."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {clinicPathways.map((pathway, index) => (
          <Card key={pathway.title}>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {`Area 0${index + 1}`}
            </p>
            <h3 className="mt-2 text-lg font-semibold">{pathway.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pathway.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
