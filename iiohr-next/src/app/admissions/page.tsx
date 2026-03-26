import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { Card } from "@/components/ui/Card";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";

const canonical = "https://iiohr.com/admissions";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "IIOHR Admissions helps applicants understand likely fit, pathway matching, review criteria, and the next step into application and protected account access.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

const audienceGroups = [
  {
    title: "Early-career doctors",
    body: "Doctors entering hair restoration who need a more structured route than isolated exposure or informal progression.",
  },
  {
    title: "Transitioning clinicians",
    body: "Practitioners moving into the field and looking for clearer pathway placement, staged development, and realistic next-step guidance.",
  },
  {
    title: "Experienced practitioners refining standards",
    body: "Doctors seeking a more credible framework for judgment, review, consistency, and standards-led development.",
  },
  {
    title: "Consultants and nurses",
    body: "Patient-facing teams looking for structured development in communication, triage awareness, coordination, and role-safe progression.",
  },
  {
    title: "Clinics exploring team development",
    body: "Clinic owners and operators who want a clearer route for matching individuals or teams to the right development pathway.",
  },
] as const;

const fitFactors = [
  {
    title: "Current role",
    body: "Admissions considers whether you are applying as a doctor, consultant, nurse, or clinic representative.",
  },
  {
    title: "Prior exposure",
    body: "Existing clinical exposure, prior training, and current responsibilities help clarify the most suitable entry point.",
  },
  {
    title: "Intended development direction",
    body: "We consider what you are trying to build next, rather than assuming every applicant should enter in the same way.",
  },
  {
    title: "Readiness for staged progression",
    body: "Pathway matching reflects whether a staged route is appropriate, realistic, and aligned with current experience.",
  },
  {
    title: "Scope alignment",
    body: "Admissions checks that the route being considered matches the responsibilities and boundaries of your role.",
  },
] as const;

const reviewItems = [
  {
    title: "Professional background",
    body: "Applicants share their current role, experience, and the context in which they are working or planning to work.",
  },
  {
    title: "Development goals",
    body: "Admissions reviews what you are aiming to develop next so pathway guidance stays relevant and realistic.",
  },
  {
    title: "Current exposure and interests",
    body: "We consider prior exposure and intended direction without exposing or requiring protected curriculum detail on the public page.",
  },
  {
    title: "Role and scope",
    body: "Applications are reviewed with role boundaries in mind so pathway matching stays credible and safe.",
  },
  {
    title: "Clinic context where relevant",
    body: "For clinic-led enquiries, admissions may consider team structure, intended development use, and pathway fit at organisational level.",
  },
] as const;

const admissionsJourney = [
  {
    step: "01",
    title: "Submit an enquiry or application",
    detail: "You share your role, background, and intended development direction through the public admissions route.",
  },
  {
    step: "02",
    title: "Admissions review",
    detail: "The admissions team reviews fit at a high level rather than treating application as an automatic acceptance step.",
  },
  {
    step: "03",
    title: "Pathway matching",
    detail: "Applicants are guided toward the most suitable route based on role, exposure, scope, and intended direction.",
  },
  {
    step: "04",
    title: "Next-step guidance",
    detail: "You receive guidance on whether to proceed, which route to follow, and what the next step should be.",
  },
  {
    step: "05",
    title: "Account or admissions follow-up",
    detail: "Where appropriate, the process moves into account-based application, admissions follow-up, or the relevant pathway page.",
  },
] as const;

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Admissions helps you understand likely fit before you apply"
        description="Use Admissions to understand whether the pathway is likely to suit your role, how matching works at a high level, and what happens after enquiry or application."
        primaryCta={{ href: "/apply", label: "Start Application" }}
        secondaryCta={{ href: "/login?redirectTo=%2Fapply", label: "Sign In / Access Account" }}
        tertiaryCta={{ href: "/training-pathways", label: "View Training Pathways" }}
      />

      <SectionShell muted joinPrevious>
        <SectionHeading
          eyebrow="Who Typically Applies"
          title="Admissions is designed to help applicants self-sort"
          description="This page is for people and clinics trying to understand whether IIOHR is likely to be the right fit before moving into application."
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
          description="Admissions looks at a small set of practical criteria to understand where you may fit and whether a staged route is appropriate."
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
          description="Public admissions does not assess protected curriculum detail. It reviews the context needed to make pathway guidance more useful and role-appropriate."
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
          description="Admissions is intended to clarify fit and next-step direction before the process moves deeper into application or account-based access."
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
          description="Move into application, review the doctor or consultant pathways, or explore the clinic route if you are sorting team development."
        />
        <SectionCTA
          variant="light"
          primary={{ href: "/apply", label: "Start Application" }}
          secondary={[
            { href: "/doctors", label: "Explore Doctors" },
            { href: "/consultants", label: "Explore Consultants" },
            { href: "/for-clinics", label: "Explore For Clinics" },
          ]}
          tertiary={[{ href: "/login?redirectTo=%2Fapply", label: "Sign In / Access Account" }]}
          className="mt-16"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">Admissions</h3>
            <p className="mt-3 text-sm leading-relaxed text-readable-muted">
              Start here if you want to understand likely fit and how pathway matching works before going deeper.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/apply" className="link-premium font-medium">
                Begin application
              </Link>
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">Pathway pages</h3>
            <p className="mt-3 text-sm leading-relaxed text-readable-muted">
              Review the public doctor, consultant, and clinic pages if you need more role-specific context before applying.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/doctors" className="link-premium font-medium">
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
              <Link href="/login?redirectTo=%2Fapply" className="link-premium font-medium">
                Sign in / access account
              </Link>
            </p>
          </Card>
        </div>
      </SectionShell>
    </>
  );
}
