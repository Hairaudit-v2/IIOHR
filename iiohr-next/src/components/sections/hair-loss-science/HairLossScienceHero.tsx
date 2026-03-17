import { PageHero } from "@/components/sections/shared/PageHero";

export function HairLossScienceHero() {
  return (
    <PageHero
      eyebrow="Hair Loss Science"
      title="Biological understanding that improves surgical judgment"
      description="At IIOHR, science training is integrated with practical development so surgeons make better decisions in diagnosis, planning, treatment strategy, and operative execution."
      primaryCta={{ href: "/apply", label: "Apply for Training" }}
      secondaryCta={{ href: "#science-importance", label: "Explore Science Framework" }}
    />
  );
}
