import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const pressures = [
  "Unstructured training can lead to variable clinical quality across surgeons.",
  "One-off courses rarely provide the longitudinal support required for reliable performance.",
  "Without clear progression pathways, internal capability growth becomes inconsistent.",
  "Governance expectations require transparent standards, review cadence, and accountability.",
];

export function StructuredDevelopmentNeedSection() {
  return (
    <SectionShell muted className="scroll-mt-24">
      <div id="clinic-development-need">
        <SectionHeading
          eyebrow="Why Structured Development Matters"
          title="Clinics need systems, not isolated training events"
          description="IIOHR is positioned as a development partner for clinics that require repeatable surgeon progression, measurable quality controls, and aligned clinical standards."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {pressures.map((item) => (
            <Card key={item}>
              <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
            </Card>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
