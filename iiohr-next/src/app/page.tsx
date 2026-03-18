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
      {/* Hero: primary entry, dark full-bleed */}
      <HeroSection />
      <SectionSpacer />
      {/* Science: bridge + modules (dark), then problem/difference (light) */}
      <ScienceBridgeSection />
      <SectionSpacer />
      <ScienceModulesSection />
      <SectionSpacer />
      <ProblemSection />
      <DifferenceSection />
      <SectionSpacer />
      {/* Curriculum + pathway (mixed), then ecosystem platforms (light) */}
      <TrainingPillarsSection />
      <FollicleIntelligenceSupportSection />
      <SectionSpacer />
      <ProgressionPathwaySection />
      <PathwayTrustBlock />
      <EcosystemAuthoritySection />
      {/* Outcomes + mentorship (dark with imagery), then centerpiece */}
      <HumanImpactSection />
      <SectionSpacer />
      <MentorshipSection />
      <SectionSpacer />
      {/* Centerpiece: Global Hair Intelligence Network (dark) */}
      <GlobalHairIntelligenceSection
        variant="iiohr"
        heading="The Engine Behind the Ecosystem"
        description="Follicle Intelligence powers a connected system across education, audit, and biological treatment pathways. One engine. System-wide intelligence. Global standardisation."
        size="hero"
        sectionTone="dark"
        labImage={{ src: HOME_IMAGES.ecosystem.dnaLab, alt: ecosystemLabImage.alt }}
      />
      <SectionSpacer />
      <TrustSignalsSection />
      <AudienceSection />
      <CTASection />
    </>
  );
}
