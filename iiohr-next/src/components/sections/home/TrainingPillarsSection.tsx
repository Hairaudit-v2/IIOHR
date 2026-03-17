import { FeatureGrid } from "@/components/sections/shared/FeatureGrid";

export function TrainingPillarsSection() {
  return (
    <FeatureGrid
      dark
      eyebrow="Curriculum"
      title="Training pillars"
      description="Five integrated elements form the core of the IIOHR training pathway."
      items={[
        "Practical FUE surgery training",
        "Live patient surgical exposure",
        "Hair loss science and trichology",
        "Follicle Intelligence auditing",
        "Ongoing mentorship and surgeon development",
      ]}
    />
  );
}
