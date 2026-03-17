import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { AudienceSection } from "@/components/sections/home/AudienceSection";
import { CTASection } from "@/components/sections/home/CTASection";
import { DifferenceSection } from "@/components/sections/home/DifferenceSection";
import { EcosystemAuthoritySection } from "@/components/sections/home/EcosystemAuthoritySection";
import { FollicleIntelligenceSupportSection } from "@/components/sections/home/FollicleIntelligenceSupportSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { MentorshipSection } from "@/components/sections/home/MentorshipSection";
import { PathwayTrustBlock } from "@/components/sections/home/PathwayTrustBlock";
import { ProblemSection } from "@/components/sections/home/ProblemSection";
import { ProgressionPathwaySection } from "@/components/sections/home/ProgressionPathwaySection";
import { TrainingPillarsSection } from "@/components/sections/home/TrainingPillarsSection";
import { TrustSignalsSection } from "@/components/sections/home/TrustSignalsSection";
import { SectionSpacer } from "@/components/sections/shared/SectionSpacer";
import { WhyModelSection } from "@/components/sections/home/WhyModelSection";
import { GlobalHairIntelligenceSection, GLOBAL_NETWORK_NODE_LINKS } from "@/components/ecosystem";
import { getWebPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const webPageJsonLd = getWebPageJsonLd({
    name: "IIOHR — International Institute of Hair Restoration",
    description: siteConfig.description,
  });

  return (
    <>
      <JsonLdScript data={webPageJsonLd} />
      <HeroSection />
      <ProblemSection />
      <DifferenceSection />
      <TrainingPillarsSection />
      <FollicleIntelligenceSupportSection />
      <SectionSpacer />
      <ProgressionPathwaySection />
      <PathwayTrustBlock />
      <GlobalHairIntelligenceSection
        variant="iiohr"
        heading="The Global Hair Intelligence System"
        description="IIOHR is the education and certification pillar within a connected intelligence ecosystem. Training links directly to surgical audit, analytical feedback, and hair-loss science so surgeon development is measured, supported, and continuously improved."
        size="compact"
        sectionTone="dark"
        nodeLinks={GLOBAL_NETWORK_NODE_LINKS}
      />
      <EcosystemAuthoritySection />
      <WhyModelSection />
      <MentorshipSection />
      <TrustSignalsSection />
      <AudienceSection />
      <CTASection />
    </>
  );
}
