import type { Metadata } from "next";
import { CourseLevelsFeesSection } from "@/components/sections/practical-fue/CourseLevelsFeesSection";
import { GurgaonTrainingLocationSection } from "@/components/sections/practical-fue/GurgaonTrainingLocationSection";
import { NurseTechnicianTrainingSection } from "@/components/sections/practical-fue/NurseTechnicianTrainingSection";
import { PartnerFacultySection } from "@/components/sections/practical-fue/PartnerFacultySection";
import { PartnerTrainingSitesSection } from "@/components/sections/practical-fue/PartnerTrainingSitesSection";
import { PracticalFueCtaSection } from "@/components/sections/practical-fue/PracticalFueCtaSection";
import { PracticalFueHero } from "@/components/sections/practical-fue/PracticalFueHero";
import { PracticalFueMeaningSection } from "@/components/sections/practical-fue/PracticalFueMeaningSection";
import { SupervisedHandsOnSection } from "@/components/sections/practical-fue/SupervisedHandsOnSection";
import { TechnicalDevelopmentSection } from "@/components/sections/practical-fue/TechnicalDevelopmentSection";

const canonical = "https://iiohr.com/practical-fue";

export const metadata: Metadata = {
  title: "Practical FUE",
  description:
    "Practical FUE at IIOHR includes partner-led delivery in Gurgaon, India, with modified FUE training, supervised hands-on exposure, course pricing, and faculty information for international doctors.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

export default function PracticalFuePage() {
  return (
    <>
      <PracticalFueHero />
      <PracticalFueMeaningSection />
      <SupervisedHandsOnSection />
      <PartnerFacultySection />
      <TechnicalDevelopmentSection />
      <CourseLevelsFeesSection />
      <GurgaonTrainingLocationSection />
      <NurseTechnicianTrainingSection />
      <PartnerTrainingSitesSection />
      <PracticalFueCtaSection />
    </>
  );
}
