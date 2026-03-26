import { GlobalHairIntelligenceSection } from "@/components/ecosystem";
import { GLOBAL_NETWORK_NODE_LINKS } from "@/components/ecosystem/constants";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const ecosystemRoles = [
  {
    title: "HairAudit",
    description:
      "Supports audit and review so standards can be checked against real clinical work.",
  },
  {
    title: "Follicle Intelligence",
    description:
      "Adds analytical feedback and benchmarking that can sharpen review and improvement.",
  },
  {
    title: "Hair Longevity Institute",
    description:
      "Contributes broader biological and treatment context around long-term hair care and planning.",
  },
] as const;

export function EcosystemRelationshipSection() {
  return (
    <>
      <SectionShell muted>
        <SectionHeading
          eyebrow="Wider Ecosystem"
          title="How IIOHR sits within the wider system"
          description="IIOHR is the education and development institute within a wider ecosystem that also includes audit, analytics, and broader biological context."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
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
        heading="Connected education, audit, and clinical intelligence"
        description="The ecosystem keeps education connected to review and intelligence without turning the institute into a product layer."
        size="compact"
        nodeLinks={GLOBAL_NETWORK_NODE_LINKS}
      />
    </>
  );
}
