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
import { GlobalHairIntelligenceSection } from "@/components/ecosystem";
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
      <SectionSpacer />
      <GlobalHairIntelligenceSection
        variant="iiohr"
        heading="The Engine Behind the Ecosystem"
        description="Follicle Intelligence powers a connected system across education, audit, and biological treatment pathways. One engine. System-wide intelligence. Global standardisation."
        size="hero"
        sectionTone="dark"
      />
      <TrainingPillarsSection />
      <FollicleIntelligenceSupportSection />
      <SectionSpacer />
      <ProgressionPathwaySection />
      <PathwayTrustBlock />
      <EcosystemAuthoritySection />
      <WhyModelSection />
      <MentorshipSection />
      <TrustSignalsSection />
      <AudienceSection />
      <CTASection />
    </>
  );
}
