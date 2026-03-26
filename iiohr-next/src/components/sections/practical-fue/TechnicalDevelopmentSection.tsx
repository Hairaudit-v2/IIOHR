import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const technicalPillars = [
  "Donor assessment and stewardship discipline",
  "Extraction control and graft handling precision",
  "Recipient planning and implantation discipline",
  "Case planning, execution sequencing, and intra-operative judgment",
  "Post-case reflection and standards-based refinement",
];

export function TechnicalDevelopmentSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Technical Development"
        title="Core operative standards developed through disciplined practice"
        description="Practical FUE development emphasizes donor stewardship, procedural control, planning discipline, and review. The aim is not speed, but reliable clinical execution that supports long-term quality and accountability."
      />
      <ol className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {technicalPillars.map((pillar, index) => (
          <Card key={pillar} interactive>
            <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{`Pillar ${index + 1}`}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{pillar}</p>
          </Card>
        ))}
      </ol>
    </SectionShell>
  );
}
