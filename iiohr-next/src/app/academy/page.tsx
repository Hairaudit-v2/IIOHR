import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { AcademyFrameworkSection } from "@/components/sections/shared/AcademyFrameworkSection";
import { Card } from "@/components/ui/Card";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getHeroImage } from "@/lib/heroImages";
import { HOME_IMAGES, dnaBridgeImage, ecosystemLabImage } from "@/lib/homeImages";

const canonical = "https://iiohr.com/academy";

export const metadata: Metadata = {
  title: "Academy",
  description:
    "IIOHR Academy is a structured, standards-led education framework for doctors and clinics, delivered through the IIOHR partner training network.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

const academyModelCards = [
  {
    title: "Practical FUE Development",
    body: "Supervised surgical training focused on technical discipline, safe progression, and repeatable clinical execution.",
  },
  {
    title: "Science and Diagnosis",
    body: "Biological understanding, trichology, and diagnostic reasoning that strengthen planning and treatment decisions.",
  },
  {
    title: "Standards and Assessment",
    body: "Structured review, capability checkpoints, and quality-aligned assessment to keep development accountable.",
  },
  {
    title: "Mentorship and Progression",
    body: "Longitudinal mentor support, case feedback, and staged advancement toward durable independent performance.",
  },
] as const;

const programLadder = [
  {
    level: "Foundation",
    focus:
      "Core principles, supervised basics, and clinical workflow discipline for safe early-stage capability.",
  },
  {
    level: "Intermediate",
    focus:
      "Expanded procedural responsibility, stronger planning logic, and reinforced standards in live practice settings.",
  },
  {
    level: "Advanced",
    focus:
      "Higher-complexity decision making, refined execution, and measurable consistency under structured review.",
  },
  {
    level: "Immersion",
    focus:
      "Intensive supervised exposure with integrated science, practical performance, and progression oversight.",
  },
] as const;

const continuousDevelopmentCards = [
  {
    title: "Clinical Intelligence",
    body: "AI-supported insight into surgical patterns, outcomes, and case-level decision-making to support ongoing refinement.",
  },
  {
    title: "Surgical Audit & Benchmarking",
    body: "Independent assessment and benchmarking of surgical outcomes enable clinicians to track performance and improve over time.",
  },
  {
    title: "Medical & Trichology Insight",
    body: "Integration of patient-level factors, including systemic health, hormonal influence, and long-term hair loss progression.",
  },
  {
    title: "Ongoing Mentorship",
    body: "Continued case discussion, guidance, and progression support beyond initial training stages.",
  },
] as const;

const clinicianLearning = [
  "Hairline design",
  "Extraction",
  "Implantation",
  "Graft handling",
  "Patient assessment",
  "Complication awareness",
  "Follow-up standards",
] as const;

const audiencePathways = [
  {
    title: "Individual doctors",
    description:
      "For clinicians entering or advancing in hair restoration through staged pathway matching and structured progression support.",
    links: [
      { href: "/training-pathways", label: "Training Pathways" },
      { href: "/practical-fue", label: "Practical FUE" },
      { href: "/hair-loss-science", label: "Hair Loss Science" },
      { href: "/apply", label: "Apply" },
    ],
  },
  {
    title: "Clinics developing internal teams",
    description:
      "For clinic owners and medical groups building internal capability with institute-led standards, supervision, and long-term development structure.",
    links: [
      { href: "/for-clinics", label: "For Clinics" },
      { href: "/training-pathways", label: "Training Pathways" },
      { href: "/apply", label: "Enquire / Apply" },
    ],
  },
] as const;

const doctorJourneySteps = [
  {
    step: "1",
    title: "Review admissions and readiness",
    href: "/admissions",
    label: "Explore admissions",
  },
  {
    step: "2",
    title: "Explore training pathways",
    href: "/training-pathways",
    label: "Explore training pathways",
  },
  {
    step: "3",
    title: "Submit an application",
    href: "/apply",
    label: "Apply now",
  },
] as const;

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow="IIOHR Academy"
        title="Structured, standards-led surgical education for doctors and clinics"
        description="Progression-based training in practical FUE, clinical science, and mentored development through the IIOHR partner network."
        primaryCta={{ href: "/apply", label: "Apply or Enquire" }}
        secondaryCta={{ href: "/training-pathways", label: "Explore Pathways" }}
        tertiaryCta={{ href: "/admissions", label: "View Admissions" }}
        image={getHeroImage("academy")}
        variant="dark"
      />

      <SectionShell muted>
        <div className="statement-panel px-6 py-8 md:px-8 md:py-10">
          <SectionHeading
            eyebrow="Why the Academy exists"
            title="Development continuity, not isolated training events"
            description="Surgical capability requires staged learning, supervised practice, and structured review. The Academy provides the continuity that short courses cannot."
          />
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              eyebrow="Academy model"
              title="Four integrated pillars of surgeon development"
              description="Practical training, scientific grounding, standards alignment, and mentorship work together to produce capable, consistent surgeons."
            />
            <div className="mt-10">
              <ImageWrapper
                src={HOME_IMAGES.science.dna}
                alt={dnaBridgeImage.alt}
                className="aspect-[4/3] min-h-[260px] w-full"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {academyModelCards.map((item, index) => (
              <Card key={item.title} interactive marker={`0${index + 1}`}>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell muted>
        <SectionHeading
          eyebrow="Program ladder"
          title="A simplified staged structure"
          description="Progression is structured to match readiness, responsibility, and supervised exposure at each stage."
        />
        <div className="authority-panel mt-16 grid gap-0 overflow-hidden md:grid-cols-2">
          {programLadder.map((item, index) => (
            <Card
              key={item.level}
              className="rounded-none border-0 border-b border-border/35 shadow-none last:border-b-0 md:last:border-b md:[&:nth-last-child(-n+2)]:border-b-0 md:[&:not(:nth-child(odd))]:border-l md:[&:not(:nth-child(odd))]:border-border/35"
            >
              <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{item.level}</p>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.focus}</p>
              <div className="mt-6 text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                Stage 0{index + 1}
              </div>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell dark>
        <SectionHeading
          eyebrow="Development ecosystem"
          title="Continuous Clinical Development"
          description="Training is the starting point. Long-term capability is strengthened through ongoing learning, structured audit, and intelligence-informed review."
          eyebrowOnDark
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {continuousDevelopmentCards.map((item) => (
            <Card key={item.title} dark interactive>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{item.body}</p>
            </Card>
          ))}
        </div>
        <div className="authority-panel mt-10 px-6 py-5 md:max-w-3xl md:px-7">
          <p className="text-sm leading-relaxed text-muted-foreground">
            This continuous model creates practical feedback loops that support measurable
            improvement and sustained clinical excellence over time.
          </p>
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="What clinicians learn"
          title="Core competencies across planning, execution, and follow-up"
          description="Training outcomes center on technical proficiency, diagnostic clarity, and standards-aware clinical judgment."
        />
        <ul className="authority-panel mt-16 grid gap-0 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {clinicianLearning.map((item) => (
            <li
              key={item}
              className="border-b border-border/35 px-5 py-5 last:border-b-0 sm:px-6 sm:py-6 lg:[&:nth-last-child(-n+1)]:border-b-0 sm:[&:nth-last-child(-n+1)]:border-b-0 sm:[&:not(:nth-child(odd))]:border-l sm:[&:not(:nth-child(odd))]:border-border/35 lg:[&:not(:nth-child(3n+1))]:border-l lg:[&:not(:nth-child(3n+1))]:border-border/35"
            >
              <p className="text-sm font-medium text-foreground">{item}</p>
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell muted>
        <SectionHeading
          eyebrow="Why partner-network training works"
          title="Supervised clinical exposure in real practice contexts"
          description="Training quality improves when education is delivered with live case context, close supervision, and immediate feedback loops. The IIOHR model connects structured curriculum with supervised practical exposure so progression is clinically grounded rather than theoretical."
        />
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Partner training network"
          title="Delivered through approved IIOHR partner clinics"
          description="Academy delivery occurs through the IIOHR partner training network: approved partner clinics selected for standards alignment, faculty capability, and appropriate supervised exposure environments."
        />
        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-16">
          <ImageWrapper
            src={HOME_IMAGES.ecosystem.dnaLab}
            alt={ecosystemLabImage.alt}
            className="aspect-[4/3] min-h-[260px] w-full"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="authority-panel px-6 py-6 md:px-7 md:py-7">
            <p className="text-sm leading-relaxed text-readable-muted">
              Partner-network delivery allows institute-level standards to be applied consistently
              while maintaining practical relevance in clinical settings. This supports clear
              supervision structures, capability development continuity, and accountable progression
              review.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell muted>
        <SectionHeading
          eyebrow="Pathways by audience"
          title="Clear next steps for doctors and clinics"
          description="Choose the entry point that matches your role and development goals."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {audiencePathways.map((group) => (
            <Card key={group.title}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{group.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-readable-muted">{group.description}</p>
              <ul className="mt-6 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="link-premium text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="For individual doctors"
          title="A clear three-step journey"
          description="Use this sequence to move from readiness assessment to pathway selection and formal application."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {doctorJourneySteps.map((item) => (
            <Card as="li" key={item.step} marker={item.step}>
              <h3 className="text-base font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm">
                <Link href={item.href} className="link-premium font-medium">
                  {item.label}
                </Link>
              </p>
            </Card>
          ))}
        </ol>
      </SectionShell>

      <AcademyFrameworkSection />

      <SectionShell anchor>
        <SectionHeading
          eyebrow="Final step"
          title="Apply, enquire, or explore the full pathway structure"
          description="Whether you are applying as an individual doctor or seeking a clinic development pathway, IIOHR will map the right next step."
        />
        <SectionCTA
          variant="light"
          primary={{ href: "/apply", label: "Apply" }}
          secondary={[
            { href: "/for-clinics", label: "Enquire" },
            { href: "/training-pathways", label: "Explore Pathways" },
            { href: "/certification-framework", label: "Certification Framework" },
          ]}
          tertiary={[{ href: "/admissions", label: "Explore admissions" }]}
          className="mt-16"
        />
      </SectionShell>
    </>
  );
}
