import { PageHero } from "@/components/sections/shared/PageHero";

export function HeroSection() {
  return (
    <PageHero
      eyebrow="International Institute of Hair Restoration"
      title="Beyond the short course. From technician to surgeon."
      description="A global education and mentorship platform for hair restoration: clinically grounded training, practical surgical exposure, and standards-based progression for doctors and clinics."
      primaryCta={{ href: "/about", label: "Explore the Institute" }}
      secondaryCta={{ href: "/training-pathways", label: "View Training Pathways" }}
    />
  );
}
