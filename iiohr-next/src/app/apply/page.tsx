import type { Metadata } from "next";
import Link from "next/link";
import { ApplyCtaSection } from "@/components/sections/apply/ApplyCtaSection";
import { ApplyHero } from "@/components/sections/apply/ApplyHero";
import { ApplyIntroductionSection } from "@/components/sections/apply/ApplyIntroductionSection";
import { ApplyNextStepsSection } from "@/components/sections/apply/ApplyNextStepsSection";
import { ApplicationFormSection } from "@/components/sections/apply/ApplicationFormSection";

const canonical = "https://iiohr.com/apply";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Submit an application or enquiry to IIOHR for individual or clinic pathway review and admissions guidance.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

export default function ApplyPage() {
  return (
    <>
      <ApplyHero />
      <section
        className="section-light-muted section-flow border-b border-border px-6 py-6 text-center text-sm text-foreground"
        data-section-tone="light"
      >
        <p className="text-readable-muted">
          Already have an account? Continue to the stream-specific application routes here:{" "}
          <Link href="/apply/doctors" className="link-premium font-medium">
            Doctors
          </Link>
          {" · "}
          <Link href="/apply/consultants" className="link-premium font-medium">
            Consultants
          </Link>
          {" · "}
          <Link href="/login?redirectTo=%2Fapply" className="link-premium font-medium">
            Sign in / access account
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
