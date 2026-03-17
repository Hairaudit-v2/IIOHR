import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { AudienceSection } from "@/components/sections/home/AudienceSection";
import { CTASection } from "@/components/sections/home/CTASection";
import { DifferenceSection } from "@/components/sections/home/DifferenceSection";
import { EcosystemAuthoritySection } from "@/components/sections/home/EcosystemAuthoritySection";
import { FollicleIntelligenceSupportSection } from "@/components/sections/home/FollicleIntelligenceSupportSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { HumanImpactSection } from "@/components/sections/home/HumanImpactSection";
import { MentorshipSection } from "@/components/sections/home/MentorshipSection";
import { PathwayTrustBlock } from "@/components/sections/home/PathwayTrustBlock";
import { ProblemSection } from "@/components/sections/home/ProblemSection";
import { ProgressionPathwaySection } from "@/components/sections/home/ProgressionPathwaySection";
import { ScienceBridgeSection } from "@/components/sections/home/ScienceBridgeSection";
import { ScienceModulesSection } from "@/components/sections/home/ScienceModulesSection";
import { TrainingPillarsSection } from "@/components/sections/home/TrainingPillarsSection";
import { TrustSignalsSection } from "@/components/sections/home/TrustSignalsSection";
import { SectionSpacer } from "@/components/sections/shared/SectionSpacer";
import { GlobalHairIntelligenceSection } from "@/components/ecosystem";
import { getWebPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { HOME_IMAGES, ecosystemLabImage } from "@/lib/homeImages";

export default function HomePage() {
  const webPageJsonLd = getWebPageJsonLd({
    name: "IIOHR — International Institute of Hair Restoration",
    description: siteConfig.description,
  });

  return (
    <>
      <JsonLdScript data={webPageJsonLd} />
      {/* 1. Hero — hair progression image */}
      <HeroSection />
      <SectionSpacer />
      {/* 2. Science bridge — DNA image */}
      <ScienceBridgeSection />
      <SectionSpacer />
      {/* 3. Science modules — hormones, follicle, hair cycle, genetics */}
      <ScienceModulesSection />
      <SectionSpacer />
      <ProblemSection />
      <DifferenceSection />
      <SectionSpacer />
      <TrainingPillarsSection />
      <FollicleIntelligenceSupportSection />
      <SectionSpacer />
      <ProgressionPathwaySection />
      <PathwayTrustBlock />
      <EcosystemAuthoritySection />
      {/* 4. Human impact — mirror image */}
      <HumanImpactSection />
      <SectionSpacer />
      {/* 5. Mentorship — doctor image */}
      <MentorshipSection />
      <SectionSpacer />
      {/* 6. Ecosystem — network + lab DNA visual */}
      <GlobalHairIntelligenceSection
        variant="iiohr"
        heading="The Engine Behind the Ecosystem"
        description="Follicle Intelligence powers a connected system across education, audit, and biological treatment pathways. One engine. System-wide intelligence. Global standardisation."
        size="hero"
        sectionTone="dark"
        labImage={{ src: HOME_IMAGES.ecosystem.dnaLab, alt: ecosystemLabImage.alt }}
      />
      <TrustSignalsSection />
      <AudienceSection />
      <CTASection />
    </>
  );
}
