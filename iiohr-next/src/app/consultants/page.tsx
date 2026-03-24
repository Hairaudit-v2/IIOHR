import Link from "next/link";
import { notFound } from "next/navigation";
import { AcademyStreamHero } from "@/components/academy/shared/AcademyStreamHero";
import { ProgramPillarCardGrid } from "@/components/academy/shared/ProgramPillarCardGrid";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAcademyStreams } from "@/lib/academy/content-registry";
import { getStreamPrograms } from "@/lib/academy/content-loader";

export default function ConsultantsPage() {
  const stream = getAcademyStreams().find((entry) => entry.slug === "consultants");
  const programs = getStreamPrograms("consultants");

  if (!stream) {
    notFound();
  }

  return (
    <>
      <AcademyStreamHero
        eyebrow="IIOHR Consultant Academy"
        title="Consultant and Nurse Academy"
        description={stream.positioning}
        primaryCta={{ href: "/consultants/programs", label: "View Programs" }}
        secondaryCta={{ href: "/consultants/competencies", label: "View Competencies" }}
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
          eyebrow="Programs"
          title="Consultant programs"
          description="Consultant routes remain fully separate from doctor-facing route trees, content, and role language."
        />
        <div className="mt-12 grid gap-4">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={`/consultants/programs/${program.slug}`}
              className="rounded-[10px] border border-border bg-surface px-6 py-5 text-sm text-foreground transition-colors hover:border-accent/40"
            >
              {program.title}
            </Link>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
