import { FeatureGrid } from "@/components/sections/shared/FeatureGrid";

export function WhyModelSection() {
  return (
    <FeatureGrid
      eyebrow="Outcomes"
      title="Why this model produces better surgeons"
      description="Better surgeons come from repeated practice, review, and support over time rather than isolated short-course exposure."
      items={[
        "Repetition through supervised practical exposure",
        "Feedback loops from structured auditing",
        "Benchmarking that clarifies improvement priorities",
        "Case-based reflection tied to outcomes",
        "Mentorship continuity beyond initial training",
        "Science-led decision support in daily practice",
      ]}
    />
  );
}
