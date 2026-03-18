import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const clinicPathways = [
  {
    title: "New doctors",
    description:
      "Foundational progression for clinicians entering hair restoration with supervised capability development.",
  },
  {
    title: "Existing surgeons needing refinement",
    description:
      "Targeted pathway for improving consistency, decision quality, and outcomes through review-led development.",
  },
  {
    title: "Internal capability building",
    description:
      "Clinic-level pathway design for creating dependable in-house training and progression systems.",
  },
];

export function ClinicPathwaysSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Clinic Pathways"
        title="Partnership models aligned to your clinic’s capability goals"
        description="IIOHR supports clinics across different development contexts, from first-entry training to internal standards consolidation."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
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
