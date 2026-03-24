import Link from "next/link";
import { notFound } from "next/navigation";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { LevelProgressionRail } from "@/components/academy/shared/LevelProgressionRail";
import { ProgramOverviewHeader } from "@/components/academy/shared/ProgramOverviewHeader";
import { ProgramPillarCardGrid } from "@/components/academy/shared/ProgramPillarCardGrid";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { getProgramComplianceNotices } from "@/lib/academy/content-loader";
import { getProgramPageViewModel } from "@/lib/academy/view-models/program";

export default async function ConsultantProgramPage({
  params,
}: {
  params: Promise<{ programSlug: string }>;
}) {
  const { programSlug } = await params;
  const viewModel = getProgramPageViewModel(programSlug);

  if (!viewModel || viewModel.stream.slug !== "consultants") {
    notFound();
  }

  return (
    <>
      <SectionShell>
        <ProgramOverviewHeader
          eyebrow="Consultant Program"
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
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {viewModel.levels.map((level) => (
            <Link
              key={level.id}
              href={`/consultants/programs/${viewModel.program.slug}/levels/${level.slug}`}
              className="rounded-[10px] border border-border bg-surface px-6 py-5 text-sm text-foreground transition-colors hover:border-accent/40"
            >
              Explore {level.title}
            </Link>
          ))}
        </div>
      </SectionShell>
      <SectionShell>
        <ComplianceStatementPanel notices={getProgramComplianceNotices(programSlug)} />
      </SectionShell>
    </>
  );
}
