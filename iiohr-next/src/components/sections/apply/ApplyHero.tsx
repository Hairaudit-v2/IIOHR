import { PageHero } from "@/components/sections/shared/PageHero";

export function ApplyHero() {
  return (
    <PageHero
      eyebrow="Apply"
      title="Application and enquiry for doctors and clinics"
      description="Submit your details and training interests so the IIOHR team can review pathway fit and advise the most suitable next step."
      primaryCta={{ href: "#application-form", label: "Start Application" }}
      secondaryCta={{ href: "/training-pathways", label: "Review Training Pathways" }}
    />
  );
}
