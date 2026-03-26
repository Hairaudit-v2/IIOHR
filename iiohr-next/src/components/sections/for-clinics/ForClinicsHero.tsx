import { getHeroImage } from "@/lib/heroImages";
import { PageHero } from "@/components/sections/shared/PageHero";

export function ForClinicsHero() {
  return (
    <PageHero
      eyebrow="For Clinics"
      title="Structured capability development for clinics building long-term standards"
      description="IIOHR works with clinics that want clearer internal development, stronger team consistency, and a more structured route for doctor, consultant, and nurse progression."
      primaryCta={{ href: "/admissions", label: "Start Admissions Review" }}
      secondaryCta={{ href: "/apply", label: "Apply / Enquire" }}
      tertiaryCta={{ href: "#clinic-development-need", label: "View clinic model" }}
      image={getHeroImage("forClinics")}
    />
  );
}
