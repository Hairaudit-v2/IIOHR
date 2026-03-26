import { getHeroImage } from "@/lib/heroImages";
import { PageHero } from "@/components/sections/shared/PageHero";

export function PracticalFueHero() {
  return (
    <PageHero
      eyebrow="Practical FUE"
      title="Partner-led practical FUE training for international doctors"
      description="IIOHR Practical FUE now includes partner-led delivery in Gurgaon, India through Evolved Hair Restoration / Evolved Training Institute. The offering centres on Modified FUE Technique with Implanter Pen, supervised hands-on exposure on live patients, and course pathways from foundation to advanced immersion."
      primaryCta={{ href: "#course-levels-fees", label: "View Course Levels and Fees" }}
      secondaryCta={{ href: "#partner-training-overview", label: "Explore Partner Training" }}
      image={getHeroImage("practicalFue")}
    />
  );
}
