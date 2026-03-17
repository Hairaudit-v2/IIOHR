import { getHeroImage } from "@/lib/heroImages";
import { PageHero } from "@/components/sections/shared/PageHero";

export function AboutHero() {
  return (
    <PageHero
      eyebrow="About IIOHR"
      title="An institute model for long-term surgeon development"
      description="IIOHR exists to provide structured, clinically grounded progression in hair restoration, connecting practical training with science, mentorship, and measurable quality review."
      primaryCta={{ href: "/training-pathways", label: "Explore Pathways" }}
      secondaryCta={{ href: "/apply", label: "Apply to IIOHR" }}
      image={getHeroImage("about")}
    />
  );
}
