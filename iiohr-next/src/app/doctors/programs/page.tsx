import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getStreamPrograms } from "@/lib/academy/content-loader";

export default function DoctorProgramsPage() {
  const programs = getStreamPrograms("doctors");

  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Doctor Programs"
        title="Doctor education programs"
        description="Programs under `/doctors` remain distinct from consultant education while using the same academy infrastructure."
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
  );
}
