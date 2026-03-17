import { getHeroImage } from "@/lib/heroImages";
import { PageHero } from "@/components/sections/shared/PageHero";

export function TrainingPathwaysHero() {
  return (
    <PageHero
      eyebrow="Training Pathways"
      title="A structured progression system, not a one-off short course"
      description="IIOHR pathways are designed to build durable surgeon capability through staged practical exposure, academic depth, quality auditing, and long-term mentorship."
      primaryCta={{ href: "/apply", label: "Apply for Training" }}
      secondaryCta={{ href: "#pathway-philosophy", label: "Explore the Pathway" }}
      image={getHeroImage("trainingPathways")}
    />
  );
}
