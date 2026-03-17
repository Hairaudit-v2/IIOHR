import { PageHero } from "@/components/sections/shared/PageHero";

export function HeroSection() {
  return (
    <PageHero
      eyebrow="International Institute of Hair Restoration"
      title="Beyond the short course. From technician to surgeon."
      description="Training, auditing and mentoring for the next generation of hair restoration surgeons."
      primaryCta={{ href: "/about", label: "Explore the Institute" }}
      secondaryCta={{ href: "/training-pathways", label: "View Training Pathway" }}
    />
  );
}
