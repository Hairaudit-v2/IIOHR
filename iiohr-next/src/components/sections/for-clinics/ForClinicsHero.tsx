import { PageHero } from "@/components/sections/shared/PageHero";

export function ForClinicsHero() {
  return (
    <PageHero
      eyebrow="For Clinics"
      title="Structured surgeon development for clinic owners and medical groups"
      description="IIOHR partners with clinics to build internal surgical capability through staged training, standards alignment, and long-term professional support."
      primaryCta={{ href: "/apply", label: "Enquire About Partnerships" }}
      secondaryCta={{ href: "#clinic-development-need", label: "View Clinic Model" }}
    />
  );
}
