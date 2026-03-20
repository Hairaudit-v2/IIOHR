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
    "The IIOHR Certification Framework outlines standards-led progression, evidence-informed review, and long-term clinical development for doctors and clinics.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

const principles = [
  {
    title: "Standards-led",
    body: "Certification is anchored to defined professional standards so progression is structured, transparent, and aligned with clinical expectations.",
  },
  {
    title: "Evidence-based",
    body: "Progress is interpreted through multiple evidence inputs rather than a single event, supporting a more credible development record over time.",
  },
  {
    title: "Progression-aware",
    body: "Certification is designed as staged advancement with capability maturity at each phase, not a one-time endpoint.",
  },
  {
    title: "Clinically relevant",
    body: "The framework emphasizes practical judgment, supervised development context, and real-world applicability in modern hair restoration practice.",
  },
] as const;

const pathwayStages = [
  {
    title: "Foundational readiness",
    body: "Core preparation in scientific understanding, clinical reasoning, and pathway suitability before higher responsibility is introduced.",
  },
  {
    title: "Supervised operative development",
    body: "Structured practical progression under supervision, focused on safety, technique discipline, and feedback-informed improvement.",
  },
  {
    title: "Advanced practical fluency",
    body: "Greater consistency in planning and execution, with stronger procedural confidence and refinement under standards-based review.",
  },
  {
    title: "Broader clinical maturity",
    body: "Integrated capability across decision quality, outcomes reflection, and long-term professional development expectations.",
  },
] as const;

const evidenceInputs = [
  "Training participation",
  "Practical development",
  "Assessment",
  "Case review",
  "Audit-informed improvement",
  "Mentorship engagement",
] as const;

export default function CertificationFrameworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Certification Framework"
        title="Structured progression for credible clinical development"
        description="IIOHR certification is positioned as a staged progression framework that supports standards-led development and evidence-informed advancement for doctors and clinics."
        primaryCta={{ href: "/apply", label: "Apply or Enquire" }}
        secondaryCta={{ href: "/academy", label: "Explore Academy" }}
      />

      <SectionShell muted>
        <SectionHeading
          eyebrow="Why certification matters"
          title="Measured progression requires clear standards and credible evidence"
          description="In complex clinical disciplines, development quality is strengthened when progression is framed by standards, reviewed with consistency, and supported by evidence over time rather than isolated milestones."
        />
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Certification principles"
          title="Institute-led principles guiding framework design"
          description="The framework is designed to remain rigorous, practical, and adaptable as standards evolve."
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
          eyebrow="Certification pathway"
          title="High-level stages of capability progression"
          description="Pathway stages indicate development direction and maturity expectations while allowing detailed framework criteria to evolve."
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
          eyebrow="What may contribute to certification"
          title="Multiple evidence sources support progression decisions"
          description="Certification review can draw on a combination of participation, performance context, and development engagement."
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
          eyebrow="Doctors and clinics"
          title="A framework that supports both individual and system-level capability"
          description="For doctors, certification can clarify staged professional progression. For clinics, it can support internal capability systems, standards alignment, and structured development pathways across teams."
        />
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Long-term development"
          title="Certification as part of continuous quality improvement"
          description="Certification is positioned within an ongoing development cycle that includes continued learning, reflective practice, feedback integration, and progressive refinement over time."
        />
      </SectionShell>

      <AcademyFrameworkSection />

      <SectionShell dark>
        <SectionHeading
          eyebrow="Next step"
          title="Explore pathways, academy structure, and admissions"
          description="Use the links below to review development pathways, clinic partnership options, and application routes."
        />
        <SectionCTA
          variant="dark"
          primary={{ href: "/academy", label: "Explore Academy" }}
          secondary={[
            { href: "/training-pathways", label: "Training Pathways" },
            { href: "/for-clinics", label: "For Clinics" },
          ]}
          tertiary={[
            { href: "/admissions", label: "View admissions process" },
            { href: "/apply", label: "Apply or Enquire" },
          ]}
          className="mt-16"
        />
      </SectionShell>
    </>
  );
}
