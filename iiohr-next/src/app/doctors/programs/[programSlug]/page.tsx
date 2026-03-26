import Link from "next/link";
import { notFound } from "next/navigation";
import { ModuleFacultyNotesTeaser } from "@/components/academy/doctor/ModuleFacultyNotesTeaser";
import { ProtectedAcademyAccessBoundary } from "@/components/academy/shared/ProtectedAcademyAccessBoundary";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { LevelProgressionRail } from "@/components/academy/shared/LevelProgressionRail";
import { ProgramOverviewHeader } from "@/components/academy/shared/ProgramOverviewHeader";
import { ProgramPillarCardGrid } from "@/components/academy/shared/ProgramPillarCardGrid";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { getProtectedAcademyAccess } from "@/lib/academy/access";
import { getProgramComplianceNotices, getProgramFacultyNotes } from "@/lib/academy/content-loader";
import { getProgramPageViewModel } from "@/lib/academy/view-models/program";

export default async function DoctorProgramPage({
  params,
}: {
  params: Promise<{ programSlug: string }>;
}) {
  const { programSlug } = await params;
  const access = await getProtectedAcademyAccess("doctors", `/doctors/programs/${programSlug}`);
  if (!access.hasProtectedAccess) {
    return <ProtectedAcademyAccessBoundary {...access} />;
  }

  const viewModel = getProgramPageViewModel(programSlug);

  if (!viewModel || viewModel.stream.slug !== "doctors") {
    notFound();
  }

  const programLevelFacultyNotes = getProgramFacultyNotes(programSlug).filter(
    (note) => note.parentType === "program" && note.parentId === viewModel.program.id
  );

  return (
    <>
      <SectionShell>
        <ProgramOverviewHeader
          eyebrow="Doctor Program"
          title={viewModel.program.title}
          description={viewModel.program.overview}
        />
        <div className="mt-10">
          <ProgramPillarCardGrid
            pillars={viewModel.program.whyItMatters.map((item) => ({ title: item, body: item }))}
          />
        </div>
      </SectionShell>
      <SectionShell muted>
        <LevelProgressionRail
          levels={viewModel.levels.map((level) => ({
            id: level.id,
            title: level.title,
            overview: level.overview,
          }))}
        />
      </SectionShell>
      <SectionShell>
        <div className="space-y-10">
          {viewModel.levels.flatMap((level) =>
            level.sections.map((section) => (
              <div key={section.id} className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-readable-muted">
                    Volume {section.sequence}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-foreground">{section.title}</h2>
                </div>
                <div className="grid gap-4">
                  {section.modules.map((module) => (
                    <Link
                      key={module.id}
                      href={`/doctors/programs/${viewModel.program.slug}/modules/${module.slug}`}
                      className="rounded-[10px] border border-border bg-surface px-6 py-5 text-sm text-foreground transition-colors hover:border-accent/40"
                    >
                      {module.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </SectionShell>
      {programLevelFacultyNotes.length > 0 ? (
        <SectionShell muted>
          <ModuleFacultyNotesTeaser notes={programLevelFacultyNotes} />
        </SectionShell>
      ) : null}
      <SectionShell muted>
        <ComplianceStatementPanel notices={getProgramComplianceNotices(programSlug)} />
      </SectionShell>
    </>
  );
}
