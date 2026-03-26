import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const pressures = [
  "Founder-led clinics building a more durable internal development model.",
  "Growing multi-practitioner clinics seeking clearer standards across teams.",
  "Teams strengthening consultant and nurse capability alongside doctor development.",
  "Clinics that want less dependence on ad hoc training decisions and one-off courses.",
  "Operators looking for a more structured route to standards alignment and review.",
] as const;

export function StructuredDevelopmentNeedSection() {
  return (
    <SectionShell muted joinPrevious className="scroll-mt-24">
      <div id="clinic-development-need">
        <SectionHeading
          eyebrow="Who This Is For"
          title="Built for clinics that want a more structured internal pathway"
          description="This route is for clinics using development as an operational priority rather than treating training as a disconnected event."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
