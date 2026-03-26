import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const benefits = [
  {
    title: "Structured internal development",
    description:
      "Clinics can build clearer development pathways instead of fragmented progression decisions.",
  },
  {
    title: "More consistent consultation standards",
    description:
      "Shared expectations across doctors, consultants, and nurses help make communication and patient handover more consistent.",
  },
  {
    title: "Longer-term quality infrastructure",
    description:
      "Standards and review give clinics a stronger foundation for capability over time.",
  },
] as const;

export function InternalTalentBenefitsSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Why Clinics Engage"
        title="Why clinics engage with IIOHR"
        description="The value is operational: stronger consistency, clearer development pathways, and a more credible capability model."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {benefits.map((benefit) => (
          <Card key={benefit.title}>
            <h3 className="text-lg font-semibold">{benefit.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
