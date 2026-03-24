import Link from "next/link";
import { notFound } from "next/navigation";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { CompetencyTagList } from "@/components/academy/shared/CompetencyTagList";
import { ModuleHero } from "@/components/academy/shared/ModuleHero";
import { ModuleOutcomePanel } from "@/components/academy/shared/ModuleOutcomePanel";
import { ReferenceList } from "@/components/academy/shared/ReferenceList";
import { DownloadableResourceList } from "@/components/academy/shared/DownloadableResourceList";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { getModulePageViewModel } from "@/lib/academy/view-models/module";

export default async function ConsultantModulePage({
  params,
}: {
  params: Promise<{ programSlug: string; moduleSlug: string }>;
}) {
  const { programSlug, moduleSlug } = await params;
  const viewModel = getModulePageViewModel(programSlug, moduleSlug);

  if (!viewModel || viewModel.stream.slug !== "consultants") {
    notFound();
  }

  return (
    <>
      <SectionShell>
        <ModuleHero
          title={viewModel.module.title}
          overview={viewModel.module.moduleOverview}
          studyTimeMinutes={viewModel.module.estimatedStudyMinutes}
        />
        <div className="mt-8">
          <CompetencyTagList competencies={viewModel.competencies} />
        </div>
      </SectionShell>
      <SectionShell muted>
        <ModuleOutcomePanel learningOutcomes={viewModel.module.learningOutcomes} />
      </SectionShell>
      <SectionShell>
        <div className="grid gap-4">
          {viewModel.lessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/consultants/programs/${viewModel.program.slug}/lessons/${lesson.slug}`}
              className="rounded-[10px] border border-border bg-surface px-6 py-5 text-sm text-foreground transition-colors hover:border-accent/40"
            >
              {lesson.title}
            </Link>
          ))}
        </div>
      </SectionShell>
      <SectionShell muted>
        <div className="grid gap-6 lg:grid-cols-2">
          <ReferenceList references={viewModel.references} />
          <DownloadableResourceList resources={viewModel.resources} />
        </div>
      </SectionShell>
      <SectionShell>
        <ComplianceStatementPanel notices={viewModel.complianceNotices} />
      </SectionShell>
    </>
  );
}
