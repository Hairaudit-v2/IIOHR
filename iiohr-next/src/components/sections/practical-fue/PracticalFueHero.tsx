import { getHeroImage } from "@/lib/heroImages";
import { PageHero } from "@/components/sections/shared/PageHero";

export function PracticalFueHero() {
  return (
    <PageHero
      eyebrow="Practical FUE"
      title="Supervised practical surgical development for FUE clinicians"
      description="Practical FUE at IIOHR is supervised clinical development inside an institute-led pathway. The focus is judgment, donor stewardship, planning discipline, and accountable progression under review."
      primaryCta={{ href: "/admissions", label: "Start Admissions Review" }}
      secondaryCta={{ href: "#practical-fue-model", label: "What Practical FUE Means" }}
      image={getHeroImage("practicalFue")}
    />
  );
}
