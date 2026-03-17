import { getHeroImage } from "@/lib/heroImages";
import { PageHero } from "@/components/sections/shared/PageHero";

export function PracticalFueHero() {
  return (
    <PageHero
      eyebrow="Practical FUE"
      title="Hands-on surgical training with structure, supervision, and standards"
      description="Practical FUE at IIOHR is delivered as a serious clinical training pathway: supervised operative exposure, disciplined technical progression, and measurable development toward surgical fluency."
      primaryCta={{ href: "/apply", label: "Apply for Training" }}
      secondaryCta={{ href: "#practical-fue-model", label: "View Training Model" }}
      image={getHeroImage("practicalFue")}
    />
  );
}
