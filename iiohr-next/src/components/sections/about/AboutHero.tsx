import { getHeroImage } from "@/lib/heroImages";
import { applyTrainingHref } from "@/lib/navigation";
import { PageHero } from "@/components/sections/shared/PageHero";

export function AboutHero() {
  return (
    <PageHero
      eyebrow="About IIOHR"
      title="IIOHR is an institute for structured development in hair restoration"
      description="It exists to build clearer standards, staged progression, review, and accountability across doctor, consultant, and clinic development in hair restoration."
      primaryCta={{ href: "/admissions", label: "Start Admissions Review" }}
      secondaryCta={{ href: "/training-pathways", label: "View Training Pathways" }}
      tertiaryCta={{ href: applyTrainingHref, label: "Apply to IIOHR" }}
      image={getHeroImage("about")}
    />
  );
}
