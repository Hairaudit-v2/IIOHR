import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { Card } from "@/components/ui/Card";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";

const canonical = "https://iiohr.com/admissions";

export const metadata: Metadata = {
  title: "Admissions Review",
  description:
    "IIOHR Admissions helps applicants understand likely fit, pathway matching, review criteria, and the next step into application and protected account access.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

const audienceGroups = [
  {
    title: "Early-career doctors",
    body: "Doctors entering hair restoration who need a structured route rather than isolated exposure.",
  },
  {
    title: "Transitioning clinicians",
    body: "Clinicians moving into the field who need clearer pathway placement and staged progression.",
  },
  {
    title: "Experienced practitioners refining standards",
    body: "Doctors seeking stronger consistency, judgment, and standards-led development.",
  },
  {
    title: "Consultants and nurses",
    body: "Patient-facing teams seeking structured development in communication, triage awareness, and coordination.",
  },
  {
    title: "Clinics exploring team development",
    body: "Clinic leaders who need clearer matching of individuals or teams to suitable pathways.",
  },
] as const;

const fitFactors = [
  {
    title: "Current role",
    body: "Your route starts with role: doctor, consultant, nurse, or clinic representative.",
  },
  {
    title: "Prior exposure",
    body: "Existing exposure and responsibilities help identify a suitable entry point.",
  },
  {
    title: "Intended development direction",
    body: "Admissions considers what you need to build next rather than using one route for everyone.",
  },
  {
    title: "Readiness for staged progression",
    body: "Progression advice reflects readiness for staged development.",
  },
  {
    title: "Scope alignment",
    body: "Recommendations stay aligned with the responsibilities and boundaries of your role.",
  },
] as const;

const reviewItems = [
  {
    title: "Professional background",
    body: "Admissions reviews your current role, experience, and clinical context.",
  },
  {
    title: "Development goals",
    body: "Your stated goals guide role-appropriate pathway recommendations.",
  },
  {
    title: "Current exposure and interests",
    body: "Prior exposure and intended direction are considered at a public-safe, high level.",
  },
  {
    title: "Role and scope",
    body: "Review is filtered through role boundaries so guidance remains credible and safe.",
  },
  {
    title: "Clinic context where relevant",
    body: "For clinic enquiries, team structure and intended use are considered at organisational level.",
  },
] as const;

const admissionsJourney = [
  {
    step: "01",
    title: "Submit your details",
    detail: "You provide role, background, and intended development direction through the public admissions route.",
  },
  {
    step: "02",
    title: "Admissions review",
    detail: "The team reviews fit at a high level; submission does not imply automatic acceptance.",
  },
  {
    step: "03",
    title: "Pathway matching",
    detail: "You are guided toward the most suitable route based on role, exposure, and scope.",
  },
  {
    step: "04",
    title: "Next-step guidance",
    detail: "You receive clear guidance on whether to proceed and which route to follow.",
  },
  {
    step: "05",
    title: "Application or follow-up",
    detail: "Where appropriate, you move into application, admissions follow-up, or the relevant pathway page.",
  },
] as const;

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Admissions helps you understand likely fit before you apply"
        description="Use Admissions to understand whether the pathway is likely to suit your role, how matching works at a high level, and what happens after enquiry or application."
        primaryCta={{ href: "/apply", label: "Apply to IIOHR" }}
        secondaryCta={{ href: "/login?redirectTo=%2Fapply", label: "Sign In / Access Account" }}
        tertiaryCta={{ href: "/training-pathways", label: "View Training Pathways" }}
        analyticsPage="/admissions"
      />

      <SectionShell muted joinPrevious>
        <SectionHeading
          eyebrow="Who Typically Applies"
          title="Admissions is designed to help applicants self-sort"
          description="This page helps individuals and clinics decide likely fit before moving into application."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {audienceGroups.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Pathway Fit"
          title="How pathway fit is assessed"
          description="Admissions uses a focused set of criteria to identify suitable entry and progression direction."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {fitFactors.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell muted>
        <SectionHeading
          eyebrow="What We Review"
          title="What admissions is actually considering"
          description="Public admissions does not assess protected curriculum detail. It reviews context needed for useful, role-appropriate guidance."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {reviewItems.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="What Happens Next"
          title="A calm review and pathway-matching process"
          description="Admissions clarifies fit and next-step direction before deeper application or account-based access."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {admissionsJourney.map((item) => (
            <Card key={item.step} marker={item.step} interactive>
              <h3 className="text-base font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.detail}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell anchor>
        <SectionHeading
          eyebrow="Next Step"
          title="Choose the next route"
          description="Move into a doctor application, consultant / nurse application, or clinic / group enquiry route with clear pathway alignment."
        />
        <SectionCTA
          variant="light"
          primary={{ href: "/apply", label: "Apply to IIOHR" }}
          secondary={[
            { href: "/doctors", label: "Explore Doctors" },
            { href: "/consultants", label: "Explore Consultants / Nurses" },
            { href: "/for-clinics", label: "Explore For Clinics" },
          ]}
          tertiary={[{ href: "/login?redirectTo=%2Fapply", label: "Sign In / Access Account" }]}
          analyticsPage="/admissions"
          analyticsSection="next_step"
          className="mt-16"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">Admissions</h3>
            <p className="mt-3 text-sm leading-relaxed text-readable-muted">
              Start here if you want to understand likely fit and how pathway matching works before going deeper.
            </p>
            <p className="mt-5 text-sm">
              <Link
                href="/apply"
                className="link-premium font-medium"
                data-analytics-event="funnel_cta_clicked"
                data-analytics-page="/admissions"
                data-analytics-cta="Apply to IIOHR"
                data-analytics-section="next_step_cards"
                data-analytics-destination="/apply"
              >
                Apply to IIOHR
              </Link>
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">Pathway pages</h3>
            <p className="mt-3 text-sm leading-relaxed text-readable-muted">
                Review the public doctor, consultant / nurse, and clinic pages if you need more role-specific context before applying.
            </p>
            <p className="mt-5 text-sm">
              <Link
                href="/doctors"
                className="link-premium font-medium"
                data-analytics-event="funnel_cta_clicked"
                data-analytics-page="/admissions"
                data-analytics-cta="Review pathway pages"
                data-analytics-section="next_step_cards"
                data-analytics-destination="/doctors"
              >
                Review pathway pages
              </Link>
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">Account access</h3>
            <p className="mt-3 text-sm leading-relaxed text-readable-muted">
              Protected academy detail opens through sign-in and approved access rather than from the public admissions layer.
            </p>
            <p className="mt-5 text-sm">
              <Link
                href="/login?redirectTo=%2Fapply"
                className="link-premium font-medium"
                data-analytics-event="funnel_cta_clicked"
                data-analytics-page="/admissions"
                data-analytics-cta="Sign in / access account"
                data-analytics-section="next_step_cards"
                data-analytics-destination="/login?redirectTo=%2Fapply"
              >
                Sign in / access account
              </Link>
            </p>
          </Card>
        </div>
      </SectionShell>
    </>
  );
}
