import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getStreamPrograms } from "@/lib/academy/content-loader";

export default function ConsultantProgramsPage() {
  const programs = getStreamPrograms("consultants");

  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Consultant Programs"
        title="Consultant and nurse academy programs"
        description="Programs under `/consultants` are explicitly scope-safe, non-diagnostic, and operationally distinct from doctor routes."
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
  );
}
