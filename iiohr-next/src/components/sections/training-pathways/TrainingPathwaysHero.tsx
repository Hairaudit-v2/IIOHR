import { getHeroImage } from "@/lib/heroImages";
import { PageHero } from "@/components/sections/shared/PageHero";

export function TrainingPathwaysHero() {
  return (
    <PageHero
      eyebrow="Training Pathways"
      title="Training pathways explain how progression works across the institute"
      description="At IIOHR, progression is structured in stages rather than treated as one-off exposure. Public pages explain that logic at a high level without exposing protected academy detail."
      primaryCta={{ href: "/admissions", label: "Start Admissions Review" }}
      secondaryCta={{ href: "/apply", label: "Apply to IIOHR" }}
      tertiaryCta={{ href: "#pathway-philosophy", label: "View progression model" }}
      image={getHeroImage("trainingPathways")}
    />
  );
}
