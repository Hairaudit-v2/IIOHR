import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const mailtoClass =
  "inline-flex min-h-10 items-center justify-center rounded-md border-2 border-foreground/16 bg-surface px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ForClinicsCtaSection() {
  return (
    <SectionShell anchor>
      <SectionHeading
        eyebrow="Next Step"
        title="Choose the right next step for your clinic"
        description="Use admissions to review fit first, apply when ready, or explore the doctor and consultant / nurse routes that sit around the wider clinic model."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          href="/admissions"
          variant="primary"
          analyticsEvent="funnel_cta_clicked"
          analyticsPage="/for-clinics"
          analyticsCta="Start Admissions Review"
          analyticsSection="next_step"
          analyticsRole="clinic_group"
        >
          Start Admissions Review
        </Button>
        <Button
          href="/apply/clinics"
          variant="secondary"
          analyticsEvent="funnel_cta_clicked"
          analyticsPage="/for-clinics"
          analyticsCta="Continue Clinic Enquiry"
          analyticsSection="next_step"
          analyticsRole="clinic_group"
        >
          Continue Clinic Enquiry
        </Button>
        <Button
          href="/apply"
          variant="ghost"
          analyticsEvent="funnel_cta_clicked"
          analyticsPage="/for-clinics"
          analyticsCta="Start New Enquiry"
          analyticsSection="next_step"
          analyticsRole="clinic_group"
        >
          Start New Enquiry
        </Button>
        <a
          href={`mailto:${siteConfig.emails.clinics}?subject=Clinic%20partnership%20enquiry`}
          className={mailtoClass}
          data-analytics-event="funnel_cta_clicked"
          data-analytics-page="/for-clinics"
          data-analytics-cta="Email clinic enquiry"
          data-analytics-section="next_step"
          data-analytics-role="clinic_group"
          data-analytics-destination={`mailto:${siteConfig.emails.clinics}`}
        >
          Email clinic enquiry
        </a>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          href="/doctors"
          variant="ghost"
          analyticsEvent="funnel_cta_clicked"
          analyticsPage="/for-clinics"
          analyticsCta="Explore Doctors"
          analyticsSection="related_paths"
          analyticsRole="clinic_group"
        >
          Explore Doctors
        </Button>
        <Button
          href="/consultants"
          variant="ghost"
          analyticsEvent="funnel_cta_clicked"
          analyticsPage="/for-clinics"
          analyticsCta="Explore Consultants / nurses"
          analyticsSection="related_paths"
          analyticsRole="clinic_group"
        >
          Explore Consultants / nurses
        </Button>
      </div>
      <p className="mt-6 text-sm text-readable-muted">
        <Link
          href="/admissions"
          className="link-premium"
          data-analytics-event="funnel_cta_clicked"
          data-analytics-page="/for-clinics"
          data-analytics-cta="Understand readiness and entry"
          data-analytics-section="text_links"
          data-analytics-role="clinic_group"
          data-analytics-destination="/admissions"
        >
          Understand readiness and entry
        </Link>
        {" · "}
        <Link
          href="/apply/clinics"
          className="link-premium"
          data-analytics-event="funnel_cta_clicked"
          data-analytics-page="/for-clinics"
          data-analytics-cta="Continue clinic account route"
          data-analytics-section="text_links"
          data-analytics-role="clinic_group"
          data-analytics-destination="/apply/clinics"
        >
          Continue clinic account route
        </Link>
        {" · "}
        <Link
          href="/login?redirectTo=%2Fapply%2Fclinics"
          className="link-premium"
          data-analytics-event="funnel_cta_clicked"
          data-analytics-page="/for-clinics"
          data-analytics-cta="Sign in for clinic continuation"
          data-analytics-section="text_links"
          data-analytics-role="clinic_group"
          data-analytics-destination="/login?redirectTo=%2Fapply%2Fclinics"
        >
          Sign in for clinic continuation
        </Link>
      </p>
    </SectionShell>
  );
}
