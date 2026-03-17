import { FeatureGrid } from "@/components/sections/shared/FeatureGrid";

export function ProblemSection() {
  return (
    <FeatureGrid
      muted
      eyebrow="Context"
      title="The problem with traditional training"
      description="Hair restoration training is often too short, too shallow, and too unsupported to build lasting surgical competence."
      items={[
        "Short and shallow training windows",
        "Doctors left alone after completion",
        "Limited outcome feedback loops",
        "No clear progression pathway",
      ]}
    />
  );
}
