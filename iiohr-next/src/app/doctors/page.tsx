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
    body: "Review who typically applies, how pathway fit is assessed, and what happens after your enquiry.",
    href: "/admissions",
    label: "Review admissions",
  },
  {
    title: "Apply",
    body: "Submit your interest or application and receive high-level guidance on review and next steps.",
    href: "/apply/doctors",
    label: "Continue doctor application",
  },
  {
    title: "Account access",
    body: "Detailed curriculum, module content, and internal academy resources open after sign-in and approved access.",
    href: "/login?redirectTo=%2Fdoctors%2Fdashboard",
    label: "Sign in or create account",
  },
] as const;

export default function DoctorsPage() {
  const stream = getAcademyStreams().find((entry) => entry.slug === "doctors");

  if (!stream) {
    notFound();
  }

  return (
    <>
      <AcademyStreamHero
        eyebrow="IIOHR Doctor Academy"
        title={stream.title}
        description={`${stream.positioning} Public pages explain the academy model and admissions route; detailed curriculum opens within approved learner access.`}
        primaryCta={{ href: "/admissions", label: "View Admissions" }}
        secondaryCta={{ href: "/apply/doctors", label: "Apply as a Doctor" }}
      />
      <SectionShell>
        <SectionHeading
          eyebrow="Guiding principles"
          title="Shared academic engine, doctor-specific pathway"
          description="Doctor education sits on the shared academy core while retaining its own route identity, language, and curriculum semantics."
        />
        <ProgramPillarCardGrid
          pillars={stream.guidingPrinciples.map((principle) => ({
            title: principle,
            body: "Doctor-facing curriculum and progression remain distinct from consultant education.",
          }))}
        />
      </SectionShell>
      <SectionShell muted>
        <SectionHeading
          eyebrow="Protected curriculum access"
          title="Public overview first, detailed programme access after approval"
          description="Doctor-facing curriculum detail, modules, lessons, assessments, and downloads now sit behind account access so admissions, review, and enrolled learning are clearly separated."
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
