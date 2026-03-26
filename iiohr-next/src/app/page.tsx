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
import type { Metadata } from "next";

const canonical = "https://iiohr.com";

export const metadata: Metadata = {
  title: "International Institute of Hair Restoration",
  description:
    "IIOHR is a standards-led institute for hair restoration education, practical FUE development, and structured progression for doctors, consultants, nurses, and clinics.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

export default function HomePage() {
  const webPageJsonLd = getWebPageJsonLd({
    name: "IIOHR — International Institute of Hair Restoration",
    description: siteConfig.description,
  });

  return (
    <>
      <JsonLdScript data={webPageJsonLd} />
      <HeroSection />
      <ScienceEducationSection />
      <ProblemSection />
      <DifferenceAndCurriculumSection />
      <PathwayAndStandardsSection />
      <HumanImpactSection />
      <MentorshipSection />
      <TrustSignalsSection />
      <SectionSpacer airy minimal />
      {/* Single ecosystem centerpiece (platform grid lives here) */}
      <GlobalHairIntelligenceSection
        variant="iiohr"
        id="ecosystem-platforms"
        heading="A connected system behind the training"
        description="The academy sits within a wider system for audit and clinical intelligence, extending standards and feedback beyond training."
        size="hero"
        sectionTone="dark"
        labImage={{ src: HOME_IMAGES.ecosystem.dnaLab, alt: ecosystemLabImage.alt }}
      />
      <CTASection />
    </>
  );
}
