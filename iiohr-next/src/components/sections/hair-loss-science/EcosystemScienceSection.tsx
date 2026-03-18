import { GlobalHairIntelligenceSection } from "@/components/ecosystem";
import { GLOBAL_NETWORK_NODE_LINKS } from "@/components/ecosystem/constants";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const relationshipCards = [
  {
    title: "Hair Longevity Institute",
    description:
      "Provides biological and treatment-depth context that informs long-term planning beyond immediate operative technique.",
  },
  {
    title: "Follicle Intelligence",
    description:
      "Converts outcomes into structured analytical feedback, supporting benchmarked review and science-informed refinement.",
  },
];

export function EcosystemScienceSection() {
  return (
    <>
      <SectionShell muted>
        <SectionHeading
          eyebrow="Ecosystem Relationship"
          title="Science education is strengthened by connected ecosystem intelligence"
          description="Hair-loss science training at IIOHR is reinforced through relationship with Hair Longevity Institute and Follicle Intelligence, linking biology, treatment reasoning, and measurable outcomes."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {relationshipCards.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </SectionShell>
      <GlobalHairIntelligenceSection
        variant="iiohr"
        heading="Connected science, audit, and education"
        description="IIOHR contributes the training and certification pillar while connected ecosystem platforms provide biological depth and analytical review to support better clinical decisions."
        size="compact"
        nodeLinks={GLOBAL_NETWORK_NODE_LINKS}
      />
    </>
  );
}
