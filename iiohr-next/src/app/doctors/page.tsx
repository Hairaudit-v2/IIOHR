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

const canonical = "https://iiohr.com/doctors";

const audienceCards = [
  {
    title: "Early-career doctors",
    body: "Doctors entering hair restoration who need a structured route beyond short-course exposure.",
  },
  {
    title: "Transitioning clinicians",
    body: "Physicians moving into the field who need a clearer framework for trichology, planning, and procedural judgment.",
  },
  {
    title: "Experienced practitioners",
    body: "Doctors refining technique and clinical judgment within an accountable institute model.",
  },
] as const;

const modelCards = [
  {
    title: "Biology before technique",
    body: "The pathway begins with diagnosis, trichology, and treatment logic before technical ambition takes over.",
  },
  {
    title: "Staged progression",
    body: "Responsibility grows through a defined route rather than isolated exposure.",
  },
  {
    title: "Supervised development",
    body: "Clinical growth is tied to oversight, correction, and readiness rather than premature autonomy.",
  },
  {
    title: "Review and accountability",
    body: "Case discussion and audit show what should improve before the next step.",
  },
  {
    title: "Long-term capability",
    body: "The aim is durable clinical judgment and operative discipline, not short-term confidence after a course.",
  },
] as const;

const capabilityCards = [
  {
    title: "Diagnosis and planning",
    body: "Assess cause, pattern, candidacy, and treatment logic before procedural decisions are made.",
  },
  {
    title: "Donor stewardship",
    body: "Approach donor use with planning discipline, restraint, and longer-view clinical judgment.",
  },
  {
    title: "Implantation judgment",
    body: "Develop placement decisions that reflect anatomy, density strategy, and cosmetic consequence.",
  },
  {
    title: "Hairline design",
    body: "Strengthen aesthetic judgment within medically responsible, patient-specific planning.",
  },
  {
    title: "Operative discipline",
    body: "Build consistency in workflow, handling, and supervised execution.",
  },
  {
    title: "Review and improvement",
    body: "Use case review and benchmarking to identify what should change in the next case.",
  },
] as const;

const progressionSteps = [
  {
    label: "01",
    title: "Build foundations",
    body: "Start with the science, diagnostic reasoning, and planning principles that support safer decision-making.",
  },
  {
    label: "02",
    title: "Observe and contextualise",
    body: "Study patient selection, workflow, and operative reasoning in clinical context.",
  },
  {
    label: "03",
    title: "Take defined responsibility",
    body: "Move into supervised roles with clear, reviewable responsibilities.",
  },
  {
    label: "04",
    title: "Review performance",
    body: "Use audit and case discussion to identify gaps before advancing.",
  },
  {
    label: "05",
    title: "Advance when ready",
    body: "Progression follows readiness, consistency, and accountability rather than time alone.",
  },
] as const;

const nextStepCards = [
  {
    title: "Admissions",
    body: "Review how pathway fit is assessed and how public guidance transitions into structured review.",
    href: "/admissions",
    label: "Start Admissions Review",
  },
  {
    title: "Apply",
    body: "Submit a doctor application when you are ready to be considered for the pathway.",
    href: "/apply/doctors",
    label: "Apply as a Doctor",
  },
  {
    title: "Account access",
    body: "Detailed curriculum and internal academy content remain available through sign-in and approved access.",
    href: "/login?redirectTo=%2Fdoctors%2Fdashboard",
    label: "Sign In / Access Account",
  },
] as const;

export const metadata: Metadata = {
  title: "Doctors Pathway",
  description:
    "A public overview of the IIOHR doctor pathway covering who it is for, how development is structured, and how to move into admissions and protected academy access.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

export default function DoctorsPage() {
  const stream = getAcademyStreams().find((entry) => entry.slug === "doctors");

  if (!stream) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="IIOHR Doctor Academy"
        title="Structured hair restoration development for doctors"
        description="A public overview of the doctor pathway in clinical trichology, hair loss medicine, and hair restoration practice, built around standards, supervision, and staged progression."
        primaryCta={{ href: "/admissions", label: "Start Admissions Review" }}
        secondaryCta={{ href: "/apply/doctors", label: "Apply as a Doctor" }}
        tertiaryCta={{ href: "/login?redirectTo=%2Fdoctors%2Fdashboard", label: "Sign In / Access Account" }}
        image={heroEducationImage}
        variant="dark"
        analyticsPage="/doctors"
        analyticsRole="doctor"
      />

      <SectionShell continuous aria-label="Who the pathway is for">
        <SectionHeading
          eyebrow="Who It Is For"
          title="A doctor-specific route with multiple points of entry"
          description="This page helps doctors understand likely fit before admissions, whether entering the field or refining existing practice."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {audienceCards.map((item) => (
            <Card key={item.title} interactive className="h-full">
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell continuous muted joinPrevious aria-label="Why this model is different">
        <SectionHeading
          eyebrow="Why This Model"
          title="A more serious route than short-course surgical training"
          description="IIOHR positions doctor development as an institute pathway built for clinical capability over time."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {modelCards.map((item) => (
            <Card key={item.title} quiet className="h-full">
              <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell continuous joinPrevious aria-label="What doctors develop">
        <SectionHeading
          eyebrow="Capability"
          title="What doctors are developing"
          description="The emphasis is clinical and practical: stronger reasoning, safer planning, and more disciplined execution."
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
          description="Public pages explain advancement structure without exposing protected curriculum detail."
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

      <SectionShell anchor aria-label="Doctor pathway next steps">
        <SectionHeading
          eyebrow="Next Step"
          title="Move from public overview into structured review"
          description="Admissions and account access are now clearly separated from protected academy content, so public pages stay useful while detailed programme content remains controlled."
        />
        <SectionCTA
          variant="light"
          primary={{ href: "/admissions", label: "Start Admissions Review" }}
          secondary={[
            { href: "/apply/doctors", label: "Apply as a Doctor" },
            { href: "/login?redirectTo=%2Fdoctors%2Fdashboard", label: "Sign In / Access Account" },
          ]}
          analyticsPage="/doctors"
          analyticsRole="doctor"
          analyticsSection="next_step"
          className="mt-16"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {nextStepCards.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.body}</p>
              <p className="mt-5 text-sm">
                <Link
                  href={item.href}
                  className="link-premium font-medium"
                  data-analytics-event="funnel_cta_clicked"
                  data-analytics-page="/doctors"
                  data-analytics-cta={item.label}
                  data-analytics-section="next_step_cards"
                  data-analytics-role="doctor"
                  data-analytics-destination={item.href}
                >
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
