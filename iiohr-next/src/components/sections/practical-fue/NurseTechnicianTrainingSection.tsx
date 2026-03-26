import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const trainingAreas = [
  "Sorting grafts for surgical support",
  "Arranging grafts in the tray using first out, first in discipline",
  "Maintaining graft viability through strict protocols",
  "Loading grafts into implanter pens with minimal trauma",
];

export function NurseTechnicianTrainingSection() {
  return (
    <SectionShell id="nurse-technician-training">
      <SectionHeading
        eyebrow="Optional Nurse / Technician Training"
        title="A separate support-team training option can run alongside doctor training"
        description="The brochure includes an optional nurse or technician training pathway that can be organised in parallel with doctor training at the Gurgaon site."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Training scope</p>
          <div className="mt-5 grid gap-4">
            {trainingAreas.map((area) => (
              <div key={area} className="border-t border-border/70 pt-4 first:border-t-0 first:pt-0">
                <p className="text-sm leading-relaxed text-muted-foreground">{area}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Course fee</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">USD 5,000</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This option is described as subsidised and can be organised hand-in-hand with doctor training at the
            Gurgaon partner site.
          </p>
        </Card>
      </div>
    </SectionShell>
  );
}
