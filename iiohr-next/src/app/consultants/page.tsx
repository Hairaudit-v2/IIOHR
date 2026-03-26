import Link from "next/link";
import { notFound } from "next/navigation";
import { AcademyStreamHero } from "@/components/academy/shared/AcademyStreamHero";
import { ProgramPillarCardGrid } from "@/components/academy/shared/ProgramPillarCardGrid";
import { Card } from "@/components/ui/Card";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAcademyStreams } from "@/lib/academy/content-registry";

const nextStepCards = [
  {
    title: "Admissions",
    body: "Review who this stream is for, how pathway fit is assessed, and what happens after review.",
    href: "/admissions",
    label: "Review admissions",
  },
  {
    title: "Apply",
    body: "Submit consultant or nurse interest, understand review expectations, and receive next-step guidance.",
    href: "/apply/consultants",
    label: "Continue consultant application",
  },
  {
    title: "Account access",
    body: "Detailed programmes, competencies, assessments, and internal academy assets open only inside approved learner access.",
    href: "/login?redirectTo=%2Fconsultants%2Fdashboard",
    label: "Sign in or create account",
  },
] as const;

export default function ConsultantsPage() {
  const stream = getAcademyStreams().find((entry) => entry.slug === "consultants");

  if (!stream) {
    notFound();
  }

  return (
    <>
      <AcademyStreamHero
        eyebrow="IIOHR Consultant Academy"
        title="Consultant and Nurse Academy"
        description={`${stream.positioning} Public pages explain pathway intent and admissions; detailed academy content opens after sign-in and approved access.`}
        primaryCta={{ href: "/admissions", label: "View Admissions" }}
        secondaryCta={{ href: "/apply/consultants", label: "Apply as Consultant / Nurse" }}
      />
      <SectionShell>
        <SectionHeading
          eyebrow="Guiding principles"
          title="A standards-led front-line education pathway"
          description="Consultant education is designed to improve literacy, communication, documentation, and escalation safety without collapsing into doctor semantics."
        />
        <ProgramPillarCardGrid
          pillars={stream.guidingPrinciples.map((principle) => ({
            title: principle,
            body: "This principle is embedded in consultant lessons, assessments, and compliance notices.",
          }))}
        />
      </SectionShell>
      <SectionShell muted>
        <SectionHeading
          eyebrow="Protected curriculum access"
          title="Public positioning first, detailed academy content after approval"
          description="Consultant programme detail, competency transcripts, modules, lessons, assessments, and downloads are now separated from the public marketing and admissions layer."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
