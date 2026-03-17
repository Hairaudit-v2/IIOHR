import type { Metadata } from "next";
import { FluencyProgressionSection } from "@/components/sections/practical-fue/FluencyProgressionSection";
import { PracticalFueAudienceSection } from "@/components/sections/practical-fue/PracticalFueAudienceSection";
import { PracticalFueCtaSection } from "@/components/sections/practical-fue/PracticalFueCtaSection";
import { PracticalFueHero } from "@/components/sections/practical-fue/PracticalFueHero";
import { PracticalFueMeaningSection } from "@/components/sections/practical-fue/PracticalFueMeaningSection";
import { SupervisedHandsOnSection } from "@/components/sections/practical-fue/SupervisedHandsOnSection";
import { TechnicalDevelopmentSection } from "@/components/sections/practical-fue/TechnicalDevelopmentSection";

const canonical = "https://iiohr.com/practical-fue";

export const metadata: Metadata = {
  title: "Practical FUE",
  description:
    "Practical FUE at IIOHR is a structured hands-on surgical training pathway emphasizing supervision, technical discipline, and progressive clinical fluency.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

export default function PracticalFuePage() {
  return (
    <>
      <PracticalFueHero />
      <PracticalFueMeaningSection />
      <SupervisedHandsOnSection />
      <TechnicalDevelopmentSection />
      <FluencyProgressionSection />
      <PracticalFueAudienceSection />
      <PracticalFueCtaSection />
    </>
  );
}
