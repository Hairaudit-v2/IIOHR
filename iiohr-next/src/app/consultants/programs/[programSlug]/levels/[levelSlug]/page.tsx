import Link from "next/link";
import { notFound } from "next/navigation";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { CompetencyTagList } from "@/components/academy/shared/CompetencyTagList";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCompetenciesByIds, getComplianceNoticesByIds } from "@/lib/academy/content-loader";
import { getLevelPageViewModel } from "@/lib/academy/view-models/level";

export default async function ConsultantLevelPage({
  params,
}: {
  params: Promise<{ programSlug: string; levelSlug: string }>;
}) {
  const { programSlug, levelSlug } = await params;
  const viewModel = getLevelPageViewModel(programSlug, levelSlug);

  if (!viewModel || viewModel.stream.slug !== "consultants") {
    notFound();
  }

  const competencies = getCompetenciesByIds(programSlug, viewModel.level.competencyIds);
  const compliance = getComplianceNoticesByIds(programSlug, viewModel.program.complianceNoticeIds);

  return (
    <>
      <SectionShell>
        <SectionHeading
          eyebrow="Consultant Level"
          title={viewModel.level.title}
          description={viewModel.level.overview}
        />
        <div className="mt-8">
          <CompetencyTagList competencies={competencies} />
        </div>
      </SectionShell>
      <SectionShell muted>
        <div className="grid gap-4">
          {viewModel.level.sections.flatMap((section) =>
            section.modules.map((module) => (
              <Link
                key={module.id}
                href={`/consultants/programs/${viewModel.program.slug}/modules/${module.slug}`}
                className="rounded-[10px] border border-border bg-surface px-6 py-5 text-sm text-foreground transition-colors hover:border-accent/40"
              >
                {module.title}
              </Link>
            ))
          )}
        </div>
      </SectionShell>
      <SectionShell>
        <ComplianceStatementPanel notices={compliance} />
      </SectionShell>
    </>
  );
}
