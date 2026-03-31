import type { Metadata } from "next";
import { AboutCtaSection } from "@/components/sections/about/AboutCtaSection";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { EcosystemRelationshipSection } from "@/components/sections/about/EcosystemRelationshipSection";
import { GovernanceStandardsSection } from "@/components/sections/about/GovernanceStandardsSection";
import { InstituteDifferenceSection } from "@/components/sections/about/InstituteDifferenceSection";
import { MissionPositioningSection } from "@/components/sections/about/MissionPositioningSection";
import { ShortCourseLimitationsSection } from "@/components/sections/about/ShortCourseLimitationsSection";
import { StandardsDevelopmentSection } from "@/components/sections/about/StandardsDevelopmentSection";
import { IiohrGuidesSection } from "@/components/guides/IiohrGuidesSection";
import { IIOHR_GUIDES } from "@/lib/guides/iiohr-guides";

const canonical = "https://iiohr.com/about";

export const metadata: Metadata = {
  title: "About IIOHR",
  description:
    "Learn what IIOHR is, why it exists, and how its institute model uses standards, progression, review, and ecosystem support to strengthen long-term clinical development.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionPositioningSection />
      <ShortCourseLimitationsSection />
      <InstituteDifferenceSection />
      <GovernanceStandardsSection />
      <StandardsDevelopmentSection />
      <EcosystemRelationshipSection />
      <IiohrGuidesSection
        guides={IIOHR_GUIDES}
        sectionId="iiohr-guides"
        eyebrow="Downloads"
        title="IIOHR guides (PDF)"
        description="Executive, admissions, and institutional PDFs you can share with colleagues or review offline."
        analyticsPage="/about"
      />
      <AboutCtaSection />
    </>
  );
}
