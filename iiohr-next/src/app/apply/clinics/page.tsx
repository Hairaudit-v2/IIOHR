import type { Metadata } from "next";
import Link from "next/link";
import { ContinuationAnalyticsBeacon } from "@/components/analytics/ContinuationAnalyticsBeacon";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clinic / group enquiry continuation",
  description: "Continue your clinic or group enquiry with admissions guidance and next-step coordination.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function ApplyClinicsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main
      className="section-light section-flow w-full min-h-[50vh] text-sm text-foreground"
      data-section-tone="light"
    >
      <div className="mx-auto max-w-2xl px-6 py-12">
        <ContinuationAnalyticsBeacon role="clinic_group" route="/apply/clinics" signedIn={Boolean(user)} />
        <p className="text-readable-muted">
          <Link href="/apply" className="link-premium font-medium">
            Apply
          </Link>
          {" · "}
          <Link href="/for-clinics" className="link-premium font-medium">
            For Clinics
          </Link>
        </p>
        <h1 className="mt-4 text-lg font-semibold tracking-tight">Clinic / group enquiry continuation</h1>
        <p className="mt-2 leading-relaxed text-readable-muted">
          This account page is for clinics and groups progressing an admissions enquiry. It is intentionally enquiry-led,
          with no academy stream assumptions.
        </p>

        {!user ? (
          <p className="mt-8 rounded-lg border border-border bg-[var(--bg-secondary)] p-4 text-readable-muted">
            You need to be signed in to continue your clinic enquiry.{" "}
            <Link
              href={`/login?redirectTo=${encodeURIComponent("/apply/clinics")}`}
              className="link-premium font-medium"
              data-analytics-event="funnel_cta_clicked"
              data-analytics-page="/apply/clinics"
              data-analytics-cta="Sign in"
              data-analytics-section="continuation_gate"
              data-analytics-role="clinic_group"
              data-analytics-destination="/login?redirectTo=%2Fapply%2Fclinics"
            >
              Sign in
            </Link>
          </p>
        ) : (
          <>
            <p className="mt-8 rounded-lg border border-border bg-[var(--bg-soft)] p-4 leading-relaxed">
              You are signed in. Admissions will use your enquiry details and clinic context to guide the next commercial
              and implementation step.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-[var(--bg-secondary)] p-4 text-readable-muted">
              <p className="font-medium text-foreground">What happens next</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Admissions reviews organisation profile, team goals, and current implementation stage.</li>
                <li>You may be asked for brief follow-up detail to refine pathway-fit guidance.</li>
                <li>Where relevant, your team is directed to doctor and consultant / nurse tracks in a coordinated way.</li>
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/for-clinics"
                className="rounded-md border border-border bg-[var(--bg-secondary)] px-4 py-2 font-medium hover:bg-[var(--bg-soft)]"
              >
                Review clinic pathway context
              </Link>
              <a
                href={`mailto:${siteConfig.applicationEmail}?subject=Clinic%20continuation%20enquiry`}
                className="rounded-md border border-transparent bg-[var(--text-primary)] px-4 py-2 font-medium text-[var(--bg-secondary)] hover:opacity-90"
              >
                Contact admissions by email
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
