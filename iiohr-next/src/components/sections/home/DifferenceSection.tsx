import { FeatureGrid } from "@/components/sections/shared/FeatureGrid";

export function DifferenceSection() {
  return (
    <FeatureGrid
      eyebrow="Our Approach"
      title="The IIOHR difference"
      description="A training model built on practical surgery, advanced science, and measured, sustained development."
      items={[
        "Practical FUE training",
        "Live-patient surgery under supervision",
        "Advanced trichology and hair loss science",
        "Ongoing development support and mentoring",
        "Audit-backed improvement with Follicle Intelligence",
        "Australian standards as the guiding framework",
      ]}
    />
  );
}
