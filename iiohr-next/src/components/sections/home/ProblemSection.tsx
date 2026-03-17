import { FeatureGrid } from "@/components/sections/shared/FeatureGrid";

export function ProblemSection() {
  return (
    <FeatureGrid
      muted
      eyebrow="Context"
      title="The problem with traditional training"
      description="Hair restoration training is often too short, too shallow, and too unsupported to build lasting surgical competence and clinical judgment."
      items={[
        "Short and shallow training windows",
        "Doctors left without mentorship after completion",
        "Limited outcome feedback and audit loops",
        "No clear progression from observation to independent practice",
      ]}
    />
  );
}
