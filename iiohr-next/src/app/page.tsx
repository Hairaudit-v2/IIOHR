import { AudienceSection } from "@/components/sections/home/AudienceSection";
import { CTASection } from "@/components/sections/home/CTASection";
import { DifferenceSection } from "@/components/sections/home/DifferenceSection";
import { FollicleIntelligenceSupportSection } from "@/components/sections/home/FollicleIntelligenceSupportSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { MentorshipSection } from "@/components/sections/home/MentorshipSection";
import { ProblemSection } from "@/components/sections/home/ProblemSection";
import { ProgressionPathwaySection } from "@/components/sections/home/ProgressionPathwaySection";
import { TrainingPillarsSection } from "@/components/sections/home/TrainingPillarsSection";
import { TrustSignalsSection } from "@/components/sections/home/TrustSignalsSection";
import { WhyModelSection } from "@/components/sections/home/WhyModelSection";
import { GlobalHairIntelligenceSection, GLOBAL_NETWORK_NODE_LINKS } from "@/components/ecosystem";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <DifferenceSection />
      <TrainingPillarsSection />
      <FollicleIntelligenceSupportSection />
      <ProgressionPathwaySection />
      <GlobalHairIntelligenceSection
        variant="iiohr"
        heading="The Global Hair Intelligence System"
        description="IIOHR is the education and certification pillar within a connected intelligence ecosystem. Training links directly to surgical audit, analytical feedback, and hair-loss science so surgeon development is measured, supported, and continuously improved."
        size="compact"
        nodeLinks={GLOBAL_NETWORK_NODE_LINKS}
      />
      <WhyModelSection />
      <MentorshipSection />
      <TrustSignalsSection />
      <AudienceSection />
      <CTASection />
    </>
  );
}
