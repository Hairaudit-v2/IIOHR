import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const benefits = [
  {
    title: "Retention of clinical knowledge",
    description:
      "Internal training pathways preserve procedural standards and reduce dependence on ad hoc external hiring.",
  },
  {
    title: "Consistent patient experience",
    description:
      "Shared training and review frameworks improve consistency in planning, execution, and follow-up care.",
  },
  {
    title: "Scalable capability growth",
    description:
      "A structured surgeon pipeline allows clinics to expand safely without compromising quality expectations.",
  },
];

export function InternalTalentBenefitsSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Internal Talent Development"
        title="Training internal surgeons creates long-term strategic value"
        description="IIOHR supports clinics that want durable capability growth, not temporary short-course uplift."
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
