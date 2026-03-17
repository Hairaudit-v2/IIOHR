import type { Metadata } from "next";
import { AboutCtaSection } from "@/components/sections/about/AboutCtaSection";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { EcosystemRelationshipSection } from "@/components/sections/about/EcosystemRelationshipSection";
import { GovernanceStandardsSection } from "@/components/sections/about/GovernanceStandardsSection";
import { InstituteDifferenceSection } from "@/components/sections/about/InstituteDifferenceSection";
import { MissionPositioningSection } from "@/components/sections/about/MissionPositioningSection";
import { ShortCourseLimitationsSection } from "@/components/sections/about/ShortCourseLimitationsSection";
import { StandardsDevelopmentSection } from "@/components/sections/about/StandardsDevelopmentSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn why IIOHR exists and how its institute model combines practical training, science, mentorship, and auditing for long-term surgical development.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionPositioningSection />
      <ShortCourseLimitationsSection />
      <InstituteDifferenceSection />
      <GovernanceStandardsSection />
      <EcosystemRelationshipSection />
      <StandardsDevelopmentSection />
      <AboutCtaSection />
    </>
  );
}
