import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const entrantLevels = [
  {
    title: "Doctors",
    description:
      "Doctor pathways use staged progression to support safer development from foundations through greater responsibility.",
  },
  {
    title: "Consultants and nurses",
    description:
      "Consultant and nurse pathways apply the same progression logic within clearly defined non-doctor scope boundaries.",
  },
  {
    title: "Clinics building team pathways",
    description:
      "Clinic routes use pathway thinking to support internal standards, role alignment, and more structured team development.",
  },
] as const;

export function EntrantLevelsSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Who This Applies To"
        title="One progression logic across different routes"
        description="The institute uses a shared staged model, but it is applied differently for doctors, consultants and nurses, and clinics building internal pathways."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {entrantLevels.map((level) => (
          <Card key={level.title}>
            <h3 className="text-xl font-semibold">{level.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {level.description}
            </p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
