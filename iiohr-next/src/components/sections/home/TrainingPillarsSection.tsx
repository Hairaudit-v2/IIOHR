import { FeatureGrid } from "@/components/sections/shared/FeatureGrid";

export function TrainingPillarsSection() {
  return (
    <FeatureGrid
      dark
      eyebrow="Curriculum"
      title="Training pillars"
      description="Five integrated elements form the core of the IIOHR pathway: practical exposure, science, audit, and mentorship under one standards-based system."
      items={[
        "Practical FUE surgery training under supervision",
        "Live-patient observation and progressive hands-on exposure",
        "Hair loss science and trichology for clinical judgment",
        "Follicle Intelligence auditing and outcome feedback",
        "Ongoing clinician-facing mentorship and development",
      ]}
    />
  );
}
