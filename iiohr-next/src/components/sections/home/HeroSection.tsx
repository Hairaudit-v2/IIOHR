import { getHeroImage } from "@/lib/heroImages";
import { PageHero } from "@/components/sections/shared/PageHero";

export function HeroSection() {
  return (
    <PageHero
      variant="dark"
      eyebrow="International Institute of Hair Restoration"
      title="Beyond the short course. From technician to surgeon."
      description="A global education and mentorship platform for hair restoration: clinically grounded training, practical surgical exposure, and standards-based progression for doctors and clinics."
      primaryCta={{ href: "/apply", label: "Apply Now" }}
      secondaryCta={{ href: "/training-pathways", label: "Explore Pathways" }}
      tertiaryCta={{ href: "/about", label: "Learn More" }}
      image={getHeroImage("home")}
      imagePriority
    />
  );
}
