import { getHeroImage } from "@/lib/heroImages";
import { PageHero } from "@/components/sections/shared/PageHero";

export function PracticalFueHero() {
  return (
    <PageHero
      eyebrow="Practical FUE"
      title="IIOHR-led practical FUE training for international doctors"
      description="IIOHR Practical FUE now introduces the IIOHR India Clinical Training Academy, with delivery at the Gurgaon partner site. The offering centres on Modified FUE Technique with Implanter Pen, supervised hands-on exposure on live patients, and course pathways from foundation to advanced immersion."
      primaryCta={{ href: "#course-levels-fees", label: "View Course Levels and Fees" }}
      secondaryCta={{ href: "#partner-training-overview", label: "Explore the Academy Site" }}
      image={getHeroImage("practicalFue")}
    />
  );
}
