import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const suitedFor = [
  {
    title: "Doctors entering hair restoration surgery",
    description:
      "Clinicians seeking a structured and supervised pathway into practical FUE training.",
  },
  {
    title: "Existing hair surgeons",
    description:
      "Practitioners who want technical refinement, consistency improvement, and stronger operative discipline.",
  },
  {
    title: "Clinics developing internal teams",
    description:
      "Services building dependable in-house surgical capability through standardized training processes.",
  },
  {
    title: "International surgeons",
    description:
      "Professionals seeking rigorous practical exposure aligned with institute-led standards and clinical governance.",
  },
];

export function PracticalFueAudienceSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Who This Is Suited For"
        title="Practical FUE pathways matched to entrant profile and clinical stage"
        description="IIOHR pathways are tailored to baseline experience so progression remains safe, credible, and outcome-oriented."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {suitedFor.map((item) => (
          <Card key={item.title}>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
