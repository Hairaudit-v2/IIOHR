import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { CTASection } from "@/components/sections/home/CTASection";
import { DifferenceAndCurriculumSection } from "@/components/sections/home/DifferenceAndCurriculumSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { HumanImpactSection } from "@/components/sections/home/HumanImpactSection";
import { MentorshipSection } from "@/components/sections/home/MentorshipSection";
import { PathwayAndStandardsSection } from "@/components/sections/home/PathwayAndStandardsSection";
import { ProblemSection } from "@/components/sections/home/ProblemSection";
import { ScienceEducationSection } from "@/components/sections/home/ScienceEducationSection";
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
      <HeroSection />
      <SectionSpacer />
      <ScienceEducationSection />
      <SectionSpacer />
      <ProblemSection />
      <DifferenceAndCurriculumSection />
      <PathwayAndStandardsSection />
      <HumanImpactSection />
      <MentorshipSection />
      <SectionSpacer airy />
      {/* Single ecosystem centerpiece (platform grid lives here) */}
      <GlobalHairIntelligenceSection
        variant="iiohr"
        id="ecosystem-platforms"
        heading="The Engine Behind the Ecosystem"
        description="One intelligence layer across education, audit, and treatment pathways—shared standards, measurable feedback, global alignment."
        size="hero"
        sectionTone="dark"
        labImage={{ src: HOME_IMAGES.ecosystem.dnaLab, alt: ecosystemLabImage.alt }}
      />
      <TrustSignalsSection />
      <CTASection />
    </>
  );
}
