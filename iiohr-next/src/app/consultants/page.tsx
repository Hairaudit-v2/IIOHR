import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { Card } from "@/components/ui/Card";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { heroEducationImage } from "@/lib/homeImages";
import { getAcademyStreams } from "@/lib/academy/content-registry";

const audienceCards = [
  {
    title: "Clinic consultants",
    body: "Consultants guiding patients through enquiry, education, preparation, and follow-up within a structured clinic pathway.",
  },
  {
    title: "Nurses in hair restoration settings",
    body: "Nurses supporting communication, triage awareness, coordination, and continuity inside doctor-led care pathways.",
  },
  {
    title: "Patient-facing team members",
    body: "Staff responsible for patient education, pathway guidance, documentation, and safe handover.",
  },
  {
    title: "Clinic operators improving consistency",
    body: "Clinic operators seeking a more standardised front-end model for communication, escalation, and patient experience.",
  },
] as const;

const whyItMattersCards = [
  {
    title: "Patient trust",
    body: "Patients need clearer communication, better expectation-setting, and more responsible guidance at the front of the journey.",
  },
  {
    title: "Consultation quality",
    body: "A stronger pathway improves how teams gather information, communicate options, and prepare doctor handover.",
  },
  {
    title: "Clinic consistency",
    body: "Structured development helps different team members work to the same standards rather than relying on personality alone.",
  },
  {
    title: "Escalation awareness",
    body: "Consultants and nurses need a clearer sense of when concerns should be escalated rather than interpreted independently.",
  },
  {
    title: "Responsible communication",
    body: "Education should support patients without slipping into diagnosis, overclaiming, or sales-led behaviour.",
  },
  {
    title: "Structured development",
    body: "The goal is to move beyond informal on-the-job learning toward a credible institute model.",
  },
] as const;

const capabilityCards = [
  {
    title: "Consultation quality",
    body: "Develop clearer patient conversations from first enquiry through pathway guidance.",
  },
  {
    title: "Communication standards",
    body: "Build consistency in how options, limitations, preparation, and follow-up are explained.",
  },
  {
    title: "Ethical patient guidance",
    body: "Support informed, responsible conversations without slipping into pressure, overpromising, or role confusion.",
  },
  {
    title: "Triage awareness",
    body: "Recognise when information should be gathered, clarified, or escalated rather than interpreted as diagnosis.",
  },
  {
    title: "Treatment understanding",
    body: "Strengthen high-level literacy around hair restoration pathways so patient education is accurate and coherent.",
  },
  {
    title: "Escalation boundaries",
    body: "Understand where consultant and nurse responsibilities stop and where doctor review must take over.",
  },
  {
    title: "Professionalism and consistency",
    body: "Improve documentation, handover quality, and day-to-day reliability across the patient journey.",
  },
] as const;

const progressionSteps = [
  {
    label: "01",
    title: "Build role foundations",
    body: "Start with scope, communication principles, and the clinical context needed for safer patient-facing work.",
  },
  {
    label: "02",
    title: "Develop consultation structure",
    body: "Learn how information is gathered, organised, and handed over without crossing diagnostic boundaries.",
  },
  {
    label: "03",
    title: "Strengthen triage awareness",
    body: "Recognise when concerns, uncertainty, or risk factors need escalation into doctor-led review.",
  },
  {
    label: "04",
    title: "Improve consistency",
    body: "Use review and reflection to make patient guidance and coordination more reliable.",
  },
  {
    label: "05",
    title: "Advance within scope",
    body: "Progression reflects readiness and accountability while staying clearly inside consultant and nurse boundaries.",
  },
] as const;

const nextStepCards = [
  {
    title: "Admissions",
    body: "Review how pathway fit is assessed and how public guidance moves into structured admissions review.",
    href: "/admissions",
    label: "Start Admissions Review",
  },
  {
    title: "Apply",
    body: "Submit a consultant or nurse application when you are ready to be considered for the pathway.",
    href: "/apply/consultants",
    label: "Apply as Consultant / Nurse",
  },
  {
    title: "Account access",
    body: "Detailed academy content remains available through sign-in and approved learner access.",
    href: "/login?redirectTo=%2Fconsultants%2Fdashboard",
    label: "Sign In / Access Account",
  },
] as const;

export const metadata: Metadata = {
  title: "Consultants",
  description:
    "A public overview of the IIOHR consultant and nurse pathway covering who it is for, what it develops, and how to move into admissions and protected academy access.",
};

export default function ConsultantsPage() {
  const stream = getAcademyStreams().find((entry) => entry.slug === "consultants");

  if (!stream) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="IIOHR Consultant Academy"
        title="Structured development for consultants and nurses in hair restoration"
        description="A public overview of the consultant and nurse pathway built around communication standards, triage awareness, ethical patient guidance, and role-safe progression within doctor-led care."
        primaryCta={{ href: "/admissions", label: "Start Admissions Review" }}
        secondaryCta={{ href: "/apply/consultants", label: "Apply as Consultant / Nurse" }}
        tertiaryCta={{ href: "/login?redirectTo=%2Fconsultants%2Fdashboard", label: "Sign In / Access Account" }}
        image={heroEducationImage}
        variant="dark"
      />

      <SectionShell continuous aria-label="Who the pathway is for">
        <SectionHeading
          eyebrow="Who It Is For"
          title="Built for patient-facing teams and clinic consistency"
          description="This public pathway page is for consultants, nurses, and clinic teams who need a clearer development route without blurring doctor responsibilities."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {audienceCards.map((item) => (
            <Card key={item.title} interactive className="h-full">
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell continuous muted joinPrevious aria-label="Why this pathway matters">
        <SectionHeading
          eyebrow="Why This Pathway"
          title="Why this pathway matters for individuals and clinics"
          description="Consultant and nurse development influences trust, communication quality, escalation safety, and the consistency of the patient journey."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {whyItMattersCards.map((item) => (
            <Card key={item.title} quiet className="h-full">
              <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell continuous joinPrevious aria-label="What this pathway develops">
        <SectionHeading
          eyebrow="Capability"
          title="What this pathway develops"
          description="The emphasis is front-line professionalism: clearer communication, safer escalation, and more consistent patient support."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {capabilityCards.map((item) => (
            <Card key={item.title} interactive className="h-full">
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell continuous muted joinPrevious aria-label="How progression works">
        <SectionHeading
          eyebrow="Progression"
          title="How progression works"
          description="Public pages explain development progression without exposing internal lessons, assessments, or protected academy detail."
        />
        <ol className="mt-12 grid list-none gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {progressionSteps.map((step) => (
            <Card key={step.label} as="li" interactive marker={step.label} className="h-full md:p-5">
              <h3 className="text-sm font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </Card>
          ))}
        </ol>
      </SectionShell>

      <SectionShell anchor aria-label="Consultant pathway next steps">
        <SectionHeading
          eyebrow="Next Step"
          title="Move from public overview into structured review"
          description="Admissions, application, and account access are kept separate from protected academy content so the public page remains clear, useful, and role-safe."
        />
        <SectionCTA
          variant="light"
          primary={{ href: "/admissions", label: "Start Admissions Review" }}
          secondary={[
            { href: "/apply/consultants", label: "Apply as Consultant / Nurse" },
            { href: "/login?redirectTo=%2Fconsultants%2Fdashboard", label: "Sign In / Access Account" },
          ]}
          className="mt-16"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {nextStepCards.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.body}</p>
              <p className="mt-5 text-sm">
                <Link href={item.href} className="link-premium font-medium">
                  {item.label}
                </Link>
              </p>
            </Card>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
