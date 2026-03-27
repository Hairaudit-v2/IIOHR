import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { AcademyFrameworkSection } from "@/components/sections/shared/AcademyFrameworkSection";
import { Card } from "@/components/ui/Card";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getHeroImage } from "@/lib/heroImages";
import { applyTrainingHref } from "@/lib/navigation";

const canonical = "https://iiohr.com/faculty-and-mentorship";

export const metadata: Metadata = {
  title: "Faculty and Mentorship",
  description:
    "IIOHR Faculty and Mentorship explains the standards-led supervisory model that supports guided development, progression, and long-term clinical maturity.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

const mentorshipReasons = [
  {
    title: "Guided oversight",
    body: "Progression in procedural disciplines is strengthened when development is supervised and expectations are clearly defined.",
  },
  {
    title: "Reflective learning",
    body: "Structured reflection helps clinicians identify strengths, address gaps, and improve decision quality over time.",
  },
  {
    title: "Repetition with feedback",
    body: "Repeated practical exposure, paired with experience-informed feedback, supports consistent capability development.",
  },
  {
    title: "Progression continuity",
    body: "Mentorship links early-stage learning to longer-term development rather than isolating growth to single training events.",
  },
] as const;

const facultyModelCards = [
  {
    title: "Standards-led educational layer",
    body: "Faculty oversight aligns development with institute expectations, assessment context, and progression quality principles.",
  },
  {
    title: "Supervisory governance",
    body: "Faculty functions as a supervisory layer that helps maintain consistency in guidance, review, and development direction.",
  },
  {
    title: "System-focused support",
    body: "The model emphasizes educational systems and clinical development processes, not personality-driven instruction.",
  },
] as const;

const mentorshipInPractice = [
  "Supervised development",
  "Case discussion",
  "Feedback",
  "Progression guidance",
  "Post-training support",
] as const;

const audienceRelevance = [
  {
    title: "Individual doctors",
    body: "Mentorship can support confidence, judgment, and staged capability growth through structured guidance over time.",
  },
  {
    title: "Clinics and medical groups",
    body: "Mentorship can support internal capability-building systems by reinforcing standards alignment and consistent progression pathways.",
  },
] as const;

export default function FacultyAndMentorshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Faculty and Mentorship"
        title="Standards-led supervision for long-term development"
        description="Guided progression, reflective practice, and consistent standards through every stage of surgeon development."
        primaryCta={{ href: "/academy", label: "Explore Academy" }}
        secondaryCta={{ href: "/admissions", label: "View Admissions" }}
        image={getHeroImage("facultyAndMentorship")}
      />

      <SectionShell muted joinPrevious>
        <SectionHeading
          eyebrow="Why mentorship matters"
          title="Progression through guided oversight and feedback"
          description="Structured supervision, reflective practice, and repeated learning cycles produce lasting clinical capability."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {mentorshipReasons.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Faculty model"
          title="Institutional framework for educational consistency"
          description="A standards-led layer ensuring progression quality, supervision integrity, and consistent development outcomes."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {facultyModelCards.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell muted>
        <SectionHeading
          eyebrow="Mentorship in practice"
          title="Structured support across development stages"
          description="Mentorship support can be delivered in different ways depending on entrant stage, pathway context, and progression needs."
        />
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mentorshipInPractice.map((item) => (
            <Card as="li" key={item} className="h-full">
              <p className="text-sm font-medium text-foreground">{item}</p>
            </Card>
          ))}
        </ul>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Development beyond initial training"
          title="Mentorship as a long-term progression mechanism"
          description="Support after initial entry can help clinicians refine confidence, improve consistency, and strengthen clinical maturity through ongoing development cycles."
        />
      </SectionShell>

      <SectionShell muted>
        <SectionHeading
          eyebrow="For individual doctors and clinics"
          title="Mentorship relevance across personal and system-level development"
          description="The mentorship model is relevant to both individual progression and clinic capability-building goals, supporting standards-aware development at multiple levels."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {audienceRelevance.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <AcademyFrameworkSection muted={false} />

      <SectionShell anchor>
        <SectionHeading
          eyebrow="Next step"
          title="Explore pathways, admissions, and application routes"
          description="Review academy structure and pathway progression, then proceed through admissions guidance and application."
        />
        <SectionCTA
          variant="light"
          primary={{ href: "/academy", label: "Academy" }}
          secondary={[
            { href: "/admissions", label: "Admissions" },
            { href: "/training-pathways", label: "Training Pathways" },
          ]}
          tertiary={[{ href: applyTrainingHref, label: "Apply" }]}
          className="mt-16"
        />
      </SectionShell>
    </>
  );
}
