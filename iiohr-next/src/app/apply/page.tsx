import type { Metadata } from "next";
import Link from "next/link";
import { ApplyCtaSection } from "@/components/sections/apply/ApplyCtaSection";
import { ApplyHero } from "@/components/sections/apply/ApplyHero";
import { ApplyIntroductionSection } from "@/components/sections/apply/ApplyIntroductionSection";
import { ApplyNextStepsSection } from "@/components/sections/apply/ApplyNextStepsSection";
import { ApplicationFormSection } from "@/components/sections/apply/ApplicationFormSection";

const canonical = "https://iiohr.com/apply";

export const metadata: Metadata = {
  title: "Apply to IIOHR",
  description:
    "Submit a doctor application, consultant/nurse application, or clinic/group enquiry to IIOHR for admissions review and pathway guidance.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

export default function ApplyPage() {
  return (
    <>
      <ApplyHero />
      <section
        className="section-light-muted section-flow border-b border-border px-6 py-5 text-center text-sm text-foreground"
        data-section-tone="light"
      >
        <p className="text-readable-muted">
          Already have an account? Continue your pathway route here:{" "}
          <Link
            href="/apply/doctors"
            className="link-premium font-medium"
            data-analytics-event="funnel_cta_clicked"
            data-analytics-page="/apply"
            data-analytics-cta="Doctors continuation"
            data-analytics-section="continuation_links"
            data-analytics-role="doctor"
            data-analytics-destination="/apply/doctors"
          >
            Doctors
          </Link>
          {" · "}
          <Link
            href="/apply/consultants"
            className="link-premium font-medium"
            data-analytics-event="funnel_cta_clicked"
            data-analytics-page="/apply"
            data-analytics-cta="Consultants / nurses continuation"
            data-analytics-section="continuation_links"
            data-analytics-role="consultant_nurse"
            data-analytics-destination="/apply/consultants"
          >
            Consultants / nurses
          </Link>
          {" · "}
          <Link
            href="/apply/clinics"
            className="link-premium font-medium"
            data-analytics-event="funnel_cta_clicked"
            data-analytics-page="/apply"
            data-analytics-cta="Clinics / groups continuation"
            data-analytics-section="continuation_links"
            data-analytics-role="clinic_group"
            data-analytics-destination="/apply/clinics"
          >
            Clinics / groups
          </Link>
          {" · "}
          <Link
            href="/login?redirectTo=%2Fapply"
            className="link-premium font-medium"
            data-analytics-event="funnel_cta_clicked"
            data-analytics-page="/apply"
            data-analytics-cta="Sign In / Access Account"
            data-analytics-section="continuation_links"
            data-analytics-destination="/login?redirectTo=%2Fapply"
          >
            Sign In / Access Account
          </Link>
        </p>
      </section>
      <ApplyIntroductionSection />
      <ApplicationFormSection />
      <ApplyNextStepsSection />
      <ApplyCtaSection />
    </>
  );
}
