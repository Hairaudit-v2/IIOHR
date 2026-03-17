import type { Metadata } from "next";
import { EntrantLevelsSection } from "@/components/sections/training-pathways/EntrantLevelsSection";
import { IntegratedModelSection } from "@/components/sections/training-pathways/IntegratedModelSection";
import { PathwayPhilosophySection } from "@/components/sections/training-pathways/PathwayPhilosophySection";
import { PathwayStructureSection } from "@/components/sections/training-pathways/PathwayStructureSection";
import { StagedProgressionSection } from "@/components/sections/training-pathways/StagedProgressionSection";
import { TrainingPathwaysCtaSection } from "@/components/sections/training-pathways/TrainingPathwaysCtaSection";
import { TrainingPathwaysHero } from "@/components/sections/training-pathways/TrainingPathwaysHero";

const canonical = "https://iiohr.com/training-pathways";

export const metadata: Metadata = {
  title: "Training Pathways",
  description:
    "IIOHR Training Pathways provide a structured progression system combining practical education, science, audit, and mentorship.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

export default function TrainingPathwaysPage() {
  return (
    <>
      <TrainingPathwaysHero />
      <PathwayPhilosophySection />
      <PathwayStructureSection />
      <StagedProgressionSection />
      <IntegratedModelSection />
      <EntrantLevelsSection />
      <TrainingPathwaysCtaSection />
    </>
  );
}
