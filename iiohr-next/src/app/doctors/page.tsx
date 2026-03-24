import Link from "next/link";
import { notFound } from "next/navigation";
import { AcademyStreamHero } from "@/components/academy/shared/AcademyStreamHero";
import { ProgramPillarCardGrid } from "@/components/academy/shared/ProgramPillarCardGrid";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAcademyStreams } from "@/lib/academy/content-registry";
import { getStreamPrograms } from "@/lib/academy/content-loader";

export default function DoctorsPage() {
  const stream = getAcademyStreams().find((entry) => entry.slug === "doctors");
  const programs = getStreamPrograms("doctors");

  if (!stream) {
    notFound();
  }

  return (
    <>
      <AcademyStreamHero
        eyebrow="IIOHR Doctor Academy"
        title={stream.title}
        description={stream.positioning}
        primaryCta={{ href: "/doctors/programs", label: "View Programs" }}
        secondaryCta={{ href: "/academy", label: "Academy Overview" }}
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
          eyebrow="Programs"
          title="Current doctor programs"
          description="Doctor curriculum routes now resolve through the shared academy registry rather than a single hardcoded volume."
        />
        <div className="mt-12 grid gap-4">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={`/doctors/programs/${program.slug}`}
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
