import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { AcademyFrameworkSection } from "@/components/sections/shared/AcademyFrameworkSection";
import { Card } from "@/components/ui/Card";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";

const canonical = "https://iiohr.com/admissions";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "IIOHR Admissions clarifies readiness, entrant levels, and pathway-fit guidance for doctors and clinics before application and intake.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

const audienceGroups = [
  {
    title: "Individual doctors seeking structured progression",
    body: "Clinicians who want a staged development pathway with practical exposure, scientific grounding, and long-term capability growth.",
  },
  {
    title: "Practitioners transitioning toward practical development",
    body: "Doctors moving from theoretical understanding into supervised practical training with standards-led progression support.",
  },
  {
    title: "Clinics developing internal teams",
    body: "Clinic owners and medical groups building internal surgeon capability systems with institute-guided structure and oversight.",
  },
] as const;

const readinessFactors = [
  {
    title: "Prior experience and baseline profile",
    body: "Applicants may enter at different stages based on existing clinical exposure, prior training, and current professional context.",
  },
  {
    title: "Training exposure and development trajectory",
    body: "Admissions considers current training depth and the most suitable next stage for safe and meaningful progression.",
  },
  {
    title: "Development goals and pathway intent",
    body: "Pathway fit is shaped by individual or clinic goals, with guidance focused on realistic progression planning.",
  },
] as const;

const strongApplicationInputs = [
  "Clinical background",
  "Learning goals",
  "Practical interests",
  "Commitment to standards-led development",
  "Clinic context (where relevant)",
] as const;

const admissionsJourney = [
  {
    step: "Enquiry",
    detail: "Initial contact to share background, goals, and development context.",
  },
  {
    step: "Review",
    detail: "Admissions review of profile information to assess progression readiness and support needs.",
  },
  {
    step: "Pathway fit",
    detail: "Matching to an appropriate entrant level and development route.",
  },
  {
    step: "Next-step guidance",
    detail: "Clear guidance on recommended sequencing, expectations, and preparation.",
  },
  {
    step: "Application / intake",
    detail: "Formal application and intake coordination for suitable pathway entry.",
  },
] as const;

const postAdmissionLinks = [
  { href: "/academy", label: "Academy" },
  { href: "/training-pathways", label: "Training Pathways" },
  { href: "/practical-fue", label: "Practical FUE" },
  { href: "/certification-framework", label: "Certification Framework" },
  { href: "/for-clinics", label: "Clinic Development" },
] as const;

const doctorProfiles = [
  {
    title: "Early-career doctor entering hair restoration",
    description:
      "A foundational entrant profile suited to staged progression, supervision, and practical capability building.",
    href: "/training-pathways",
    label: "View pathway structure",
  },
  {
    title: "Transitioning practitioner",
    description:
      "A profile moving from theoretical exposure toward practical development with clearer progression milestones.",
    href: "/academy",
    label: "Explore academy model",
  },
  {
    title: "Experienced surgeon refining technique",
    description:
      "A profile focused on consistency improvement, decision quality refinement, and standards-aware progression.",
    href: "/practical-fue",
    label: "Review practical FUE",
  },
] as const;

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Find your pathway entry point"
        description="Review your readiness, identify the right entrant level, and understand your progression route before you apply."
        primaryCta={{ href: "/apply", label: "Apply now" }}
        secondaryCta={{ href: "/academy", label: "Explore Academy" }}
      />

      <SectionShell muted joinPrevious>
        <SectionHeading
          eyebrow="Who this is for"
          title="Clinicians and clinics at different development stages"
          description="Whether you are entering the field, transitioning into practical training, or building clinic capability, admissions guidance helps identify your right entry point."
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
          eyebrow="Readiness and entrant levels"
          title="Entry is matched to experience, exposure, and goals"
          description="Applicants may be guided to different starting points based on prior experience, training exposure, and intended progression direction."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {readinessFactors.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell muted>
        <SectionHeading
          eyebrow="Doctor profiles"
          title="Who this pathway guidance supports"
          description="These example profiles help individual doctors identify a suitable starting context before application."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {doctorProfiles.map((profile) => (
            <Card key={profile.title}>
              <h3 className="text-base font-semibold tracking-tight text-foreground">{profile.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{profile.description}</p>
              <p className="mt-4 text-sm">
                <Link href={profile.href} className="link-premium font-medium">
                  {profile.label}
                </Link>
              </p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="What supports a strong application"
          title="Clear profile context helps admissions guidance"
          description="Strong applications typically communicate current background, development priorities, and practical learning intent."
        />
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {strongApplicationInputs.map((item) => (
            <Card as="li" key={item} className="h-full">
              <p className="text-sm font-medium text-foreground">{item}</p>
            </Card>
          ))}
        </ul>
      </SectionShell>

      <SectionShell muted>
        <SectionHeading
          eyebrow="Admissions journey"
          title="A structured review and pathway-fit process"
          description="The admissions journey is designed to clarify readiness and next-step direction before intake."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {admissionsJourney.map((item) => (
            <Card key={item.step} marker={item.step[0]}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.detail}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Support after admission"
          title="Progression continues beyond intake"
          description="After admission, development is supported through connected academic, practical, and quality-focused pathways."
        />
        <div className="mt-10 flex flex-wrap gap-4">
          {postAdmissionLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/40 hover:bg-surface-elevated"
            >
              {item.label}
            </a>
          ))}
        </div>
      </SectionShell>

      <AcademyFrameworkSection />

      <SectionShell anchor>
        <SectionHeading
          eyebrow="Next step"
          title="Apply or explore your pathway options"
          description="Use admissions guidance to choose the most suitable route, then proceed to formal application."
        />
        <SectionCTA
          variant="light"
          primary={{ href: "/apply", label: "Apply now" }}
          secondary={[
            { href: "/academy", label: "Explore Academy" },
            { href: "/training-pathways", label: "Explore Training Pathways" },
          ]}
          className="mt-16"
        />
      </SectionShell>
    </>
  );
}
