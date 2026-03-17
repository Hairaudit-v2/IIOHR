import type { Metadata } from "next";
import { ApplyCtaSection } from "@/components/sections/apply/ApplyCtaSection";
import { ApplyHero } from "@/components/sections/apply/ApplyHero";
import { ApplyIntroductionSection } from "@/components/sections/apply/ApplyIntroductionSection";
import { ApplyNextStepsSection } from "@/components/sections/apply/ApplyNextStepsSection";
import { ApplicationFormSection } from "@/components/sections/apply/ApplicationFormSection";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Submit an application or enquiry to IIOHR for individual or clinic pathway review and admissions guidance.",
};

export default function ApplyPage() {
  return (
    <>
      <ApplyHero />
      <ApplyIntroductionSection />
      <ApplicationFormSection />
      <ApplyNextStepsSection />
      <ApplyCtaSection />
    </>
  );
}
