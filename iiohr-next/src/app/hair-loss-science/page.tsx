import type { Metadata } from "next";
import { BiologyTreatmentPlanningSection } from "@/components/sections/hair-loss-science/BiologyTreatmentPlanningSection";
import { CausesAndAssessmentSection } from "@/components/sections/hair-loss-science/CausesAndAssessmentSection";
import { EcosystemScienceSection } from "@/components/sections/hair-loss-science/EcosystemScienceSection";
import { HairLossScienceCtaSection } from "@/components/sections/hair-loss-science/HairLossScienceCtaSection";
import { HairLossScienceHero } from "@/components/sections/hair-loss-science/HairLossScienceHero";
import { JudgmentOutcomesSection } from "@/components/sections/hair-loss-science/JudgmentOutcomesSection";
import { ScienceImportanceSection } from "@/components/sections/hair-loss-science/ScienceImportanceSection";
import { TrichologyAndDiagnosisSection } from "@/components/sections/hair-loss-science/TrichologyAndDiagnosisSection";

const canonical = "https://iiohr.com/hair-loss-science";

export const metadata: Metadata = {
  title: "Hair Loss Science",
  description:
    "Hair Loss Science at IIOHR develops biological understanding, diagnostic rigor, and treatment-planning judgment to strengthen surgical decision quality.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

export default function HairLossSciencePage() {
  return (
    <>
      <HairLossScienceHero />
      <ScienceImportanceSection />
      <CausesAndAssessmentSection />
      <TrichologyAndDiagnosisSection />
      <BiologyTreatmentPlanningSection />
      <EcosystemScienceSection />
      <JudgmentOutcomesSection />
      <HairLossScienceCtaSection />
    </>
  );
}
