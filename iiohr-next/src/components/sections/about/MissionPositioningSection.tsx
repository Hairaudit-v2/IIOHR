import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const pillars = [
  {
    title: "Mission",
    description:
      "To develop confident, accountable hair restoration surgeons through structured education, supervised practical progression, and rigorous review.",
  },
  {
    title: "Positioning",
    description:
      "IIOHR operates as an institute-level training pathway, not a transactional short-format teaching provider.",
  },
  {
    title: "Purpose",
    description:
      "To bridge the gap between initial procedural exposure and sustained, high-quality clinical performance over time.",
  },
];

export function MissionPositioningSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Mission and Positioning"
        title="Why IIOHR exists"
        description="IIOHR was established to create a serious educational framework for surgeon development in hair restoration, with clear standards and explicit progression."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {pillars.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
