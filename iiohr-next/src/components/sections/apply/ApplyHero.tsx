import { getHeroImage } from "@/lib/heroImages";
import { PageHero } from "@/components/sections/shared/PageHero";

export function ApplyHero() {
  return (
    <PageHero
      eyebrow="Apply"
      title="Submit your application for pathway review"
      description="If your background and goals appear broadly aligned with IIOHR, this is the right next step. We review submissions for pathway fit and guidance rather than treating every applicant as the same."
      primaryCta={{ href: "#application-form", label: "Start Application" }}
      secondaryCta={{ href: "/admissions", label: "Review Admissions" }}
      tertiaryCta={{ href: "/login?redirectTo=%2Fapply", label: "Sign In / Access Account" }}
      image={getHeroImage("apply")}
    />
  );
}
