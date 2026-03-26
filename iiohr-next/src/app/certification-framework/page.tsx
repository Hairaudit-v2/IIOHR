import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { AcademyFrameworkSection } from "@/components/sections/shared/AcademyFrameworkSection";
import { Card } from "@/components/ui/Card";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";

const canonical = "https://iiohr.com/certification-framework";

export const metadata: Metadata = {
  title: "Certification Framework",
  description:
    "The IIOHR Certification Framework explains how certification supports staged progression, standards, review, and accountable clinical development across the institute model.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

const principles = [
  {
    title: "Standards alignment",
    body: "Certification is anchored to institute standards so progression is structured, consistent, and clinically credible.",
  },
  {
    title: "Staged development",
    body: "Certification reflects progression over time, not a single checkpoint. Responsibility and expectations increase in stages.",
  },
  {
    title: "Observed readiness",
    body: "Progression is linked to readiness observed in supervised development contexts rather than attendance alone.",
  },
  {
    title: "Review and accountability",
    body: "Certification decisions are supported by review and development evidence so accountability remains visible and defensible.",
  },
] as const;

const pathwayStages = [
  {
    title: "Foundational entry and suitability",
    body: "Entrant readiness and baseline capability are considered before progression into higher-responsibility stages.",
  },
  {
    title: "Supervised development",
    body: "Clinical development advances under supervision, with standards and review guiding practical progression.",
  },
  {
    title: "Scope-appropriate progression",
    body: "As capability matures, progression aligns with role scope and pathway stage rather than uniform expectations for all entrants.",
  },
  {
    title: "Ongoing accountability",
    body: "Certification sits inside continued professional development and periodic review rather than acting as a terminal event.",
  },
] as const;

const evidenceInputs = [
  "Observed development in supervised contexts",
  "Consistency with institute standards",
  "Review inputs across progression stages",
  "Case-based reflection and professional judgment",
  "Mentorship and faculty-led guidance",
  "Documented development over time",
] as const;

export default function CertificationFrameworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Certification Framework"
        title="Certification as a standards-led progression framework"
        description="At IIOHR, certification is a structured approach to progression, review, and accountability across the wider institute model. It is not a ceremonial badge or a one-off event."
        primaryCta={{ href: "/admissions", label: "Start Admissions Review" }}
        secondaryCta={{ href: "/training-pathways", label: "Explore Training Pathways" }}
      />

      <SectionShell muted joinPrevious>
        <SectionHeading
          eyebrow="Why a framework is necessary"
          title="Capability cannot be reduced to attendance or isolated exposure"
          description="In clinical practice, attendance alone does not demonstrate readiness. A framework is needed so progression is staged, reviewed, and anchored to standards over time."
        />
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="What certification is built around"
          title="Core principles that support credible progression"
          description="The framework is designed to keep certification practical, accountable, and aligned with real clinical development."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {principles.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell muted>
        <SectionHeading
          eyebrow="How certification fits the institute model"
          title="Connected to admissions, pathways, supervision, and progression"
          description="Certification operates within the broader IIOHR model: admissions positioning, pathway-aligned development, supervised practice, and staged advancement under review."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {pathwayStages.map((stage) => (
            <Card key={stage.title}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{stage.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Evidence-informed review"
          title="Progression is supported by multiple evidence inputs"
          description="Publicly, we describe certification as evidence-informed and standards-led. Detailed internal assessment design remains within protected academy environments."
        />
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {evidenceInputs.map((item) => (
            <Card as="li" key={item} className="h-full">
              <p className="text-sm font-medium text-foreground">{item}</p>
            </Card>
          ))}
        </ul>
      </SectionShell>

      <SectionShell muted>
        <SectionHeading
          eyebrow="Why this matters"
          title="A framework that supports clinicians, teams, clinics, and public trust"
          description="For doctors and consultants, it supports role-appropriate progression and accountability. For clinics, it supports standards-led team development. For external stakeholders, it reinforces a serious approach to quality and professional responsibility."
        />
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Long-term quality"
          title="Certification supports sustained development, not a finish line"
          description="Within the IIOHR model, certification is part of an ongoing cycle of progression, reflection, supervision, and standards review."
        />
      </SectionShell>

      <AcademyFrameworkSection />

      <SectionShell anchor>
        <SectionHeading
          eyebrow="Next step"
          title="Choose the route that matches your role"
          description="Use these entry points to begin admissions, apply, explore role-specific pathways, or access your account."
        />
        <SectionCTA
          variant="light"
          primary={{ href: "/admissions", label: "Start Admissions Review" }}
          secondary={[
            { href: "/apply", label: "Apply to IIOHR" },
            { href: "/training-pathways", label: "Explore Training Pathways" },
            { href: "/doctors", label: "Explore Doctors" },
          ]}
          tertiary={[
            { href: "/consultants", label: "Explore Consultants" },
            { href: "/for-clinics", label: "Explore For Clinics" },
            { href: "/login?redirectTo=%2Fapply", label: "Sign In / Access Account" },
          ]}
          className="mt-16"
        />
      </SectionShell>
    </>
  );
}
