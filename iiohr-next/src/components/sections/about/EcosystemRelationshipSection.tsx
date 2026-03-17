import { GlobalHairIntelligenceSection } from "@/components/ecosystem";
import { GLOBAL_NETWORK_NODE_LINKS } from "@/components/ecosystem/constants";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const ecosystemRoles = [
  {
    title: "HairAudit",
    description:
      "Supports structured surgical audit and quality review to guide targeted development priorities.",
  },
  {
    title: "Follicle Intelligence",
    description:
      "Provides analytical insight and benchmarking to strengthen case-based feedback and refinement.",
  },
  {
    title: "Hair Longevity Institute",
    description:
      "Contributes biological and treatment-depth context that informs long-term clinical planning.",
  },
];

export function EcosystemRelationshipSection() {
  return (
    <>
      <SectionShell muted>
        <SectionHeading
          eyebrow="Ecosystem Relationship"
          title="How IIOHR connects with the wider intelligence ecosystem"
          description="IIOHR is the education and certification pillar, designed to operate alongside ecosystem platforms that strengthen outcome review, analytics, and biological depth."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ecosystemRoles.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </SectionShell>
      <GlobalHairIntelligenceSection
        variant="iiohr"
        heading="Connected education, audit, analytics, and biology"
        description="IIOHR links surgeon development to ecosystem intelligence so training remains measurable, standards-led, and clinically relevant over the long term."
        size="compact"
        nodeLinks={GLOBAL_NETWORK_NODE_LINKS}
      />
    </>
  );
}
