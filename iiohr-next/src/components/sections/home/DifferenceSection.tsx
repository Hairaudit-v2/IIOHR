import { FeatureGrid } from "@/components/sections/shared/FeatureGrid";
import { LinkArrow } from "@/components/ui/LinkArrow";

export function DifferenceSection() {
  return (
    <FeatureGrid
      eyebrow="Our Approach"
      title="The IIOHR difference"
      description="A training model built on practical surgery, hair restoration science, clinical judgment, and measured development within a connected ecosystem."
      items={[
        "Practical FUE training with supervised live-patient exposure",
        "Hair loss science and trichology for diagnostic and planning rigor",
        "Clinical discipline and donor management from first principles",
        "Ongoing mentorship and surgeon development beyond initial training",
        "Audit-backed improvement integrated with Follicle Intelligence",
        "Global perspective anchored to explicit clinical standards",
      ]}
      footer={
        <>
          <LinkArrow href="/training-pathways">Explore training pathways</LinkArrow>
          <LinkArrow href="/practical-fue">Practical FUE training</LinkArrow>
        </>
      }
    />
  );
}
