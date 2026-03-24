import Link from "next/link";
import { notFound } from "next/navigation";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { CompetencyTagList } from "@/components/academy/shared/CompetencyTagList";
import { ModuleHero } from "@/components/academy/shared/ModuleHero";
import { ModuleOutcomePanel } from "@/components/academy/shared/ModuleOutcomePanel";
import { LinkedCaseStudiesPanel } from "@/components/academy/shared/LinkedCaseStudiesPanel";
import { LinkedPracticalTasksPanel } from "@/components/academy/shared/LinkedPracticalTasksPanel";
import { ReferenceList } from "@/components/academy/shared/ReferenceList";
import { DownloadableResourceList } from "@/components/academy/shared/DownloadableResourceList";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { ConsultantModuleFlowIntro } from "@/components/academy/consultant/ConsultantModuleFlowIntro";
import { ConsultantModuleFooterNav } from "@/components/academy/consultant/ConsultantModuleFooterNav";
import { ConsultantScopeStrip } from "@/components/academy/consultant/ConsultantScopeStrip";
import { getModulePageViewModel } from "@/lib/academy/view-models/module";
import { partitionDownloadableResourcesByFile } from "@/lib/academy/public-asset-exists";

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

  const base = `/consultants/programs/${programSlug}`;
  const lessonsOrdered = viewModel.lessons;
  const firstLesson = lessonsOrdered[0] ?? null;
  const { available: resourcesAvailable, unavailable: resourcesPending } = partitionDownloadableResourcesByFile(
    viewModel.resources
  );

  const modSeq = viewModel.moduleSequence;
  const moduleSeqShort =
    modSeq && modSeq.position && modSeq.total ? { position: modSeq.position, total: modSeq.total } : null;

  const mergedCompliance = [...viewModel.complianceNotices];
  const seen = new Set(mergedCompliance.map((n) => n.id));
  for (const n of viewModel.programComplianceNotices) {
    if (!seen.has(n.id)) {
      mergedCompliance.push(n);
      seen.add(n.id);
    }
  }

  return (
    <>
      <SectionShell>
        <ConsultantScopeStrip notices={viewModel.programComplianceNotices} />
        <div className="mt-8">
          <ModuleHero
            title={viewModel.module.title}
            overview={viewModel.module.moduleOverview}
            studyTimeMinutes={viewModel.module.estimatedStudyMinutes}
          />
        </div>
        {modSeq ? (
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-readable-muted">
            Module {modSeq.position} of {modSeq.total} in programme sequence
          </p>
        ) : null}
        <div className="mt-6">
          <CompetencyTagList competencies={viewModel.competencies} />
        </div>
      </SectionShell>

      <SectionShell muted>
        <ConsultantModuleFlowIntro
          programSlug={programSlug}
          moduleSequence={moduleSeqShort}
          firstLessonSlug={firstLesson?.slug ?? null}
        />
      </SectionShell>

      <SectionShell>
        <ModuleOutcomePanel learningOutcomes={viewModel.module.learningOutcomes} />
      </SectionShell>

      <SectionShell muted>
        <AcademyPanel title="Lessons — work in order">
          <ol className="space-y-3">
            {lessonsOrdered.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`${base}/lessons/${lesson.slug}`}
                  className="block rounded-[10px] border border-border bg-surface px-5 py-4 text-left text-sm text-foreground transition-colors hover:border-[color-mix(in_srgb,var(--gold-primary)_35%,transparent)]"
                >
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-readable-muted">
                    Step {lesson.sequence}
                  </span>
                  <p className="mt-1 font-medium">{lesson.title}</p>
                </Link>
              </li>
            ))}
          </ol>
        </AcademyPanel>
      </SectionShell>

      {viewModel.assessments.length > 0 ? (
        <SectionShell>
          <AcademyPanel title="Module assessment — complete after the lesson">
            <ul className="space-y-3">
              {viewModel.assessments.map((a) => (
                <li key={a.id}>
                  <Link href={`${base}/assessments/${a.slug}`} className="link-premium font-semibold text-foreground">
                    {a.title}
                  </Link>
                  <p className="mt-1 text-xs text-readable-muted">
                    {a.assessmentType.replace(/-/g, " ")} · Pass {a.passMark}%
                    {a.facultyReviewRequired ? " · Faculty review" : ""}
                  </p>
                </li>
              ))}
            </ul>
          </AcademyPanel>
        </SectionShell>
      ) : null}

      {viewModel.caseStudies.length > 0 ? (
        <SectionShell muted>
          <LinkedCaseStudiesPanel caseStudies={viewModel.caseStudies} />
        </SectionShell>
      ) : null}

      {viewModel.practicalTasks.length > 0 ? (
        <SectionShell>
          <LinkedPracticalTasksPanel tasks={viewModel.practicalTasks} />
        </SectionShell>
      ) : null}

      <SectionShell muted>
        <div className="grid gap-8 lg:grid-cols-2">
          <ReferenceList references={viewModel.references} />
          <DownloadableResourceList
            resources={resourcesAvailable}
            pendingResources={resourcesPending}
            title="Resources and downloads"
          />
        </div>
      </SectionShell>

      <SectionShell>
        <ComplianceStatementPanel
          notices={mergedCompliance}
          title="Scope, ethics, and how to use this module"
          tone="safety"
        />
      </SectionShell>

      {viewModel.moduleSequence ? (
        <SectionShell muted>
          <ConsultantModuleFooterNav
            programSlug={programSlug}
            prevModule={viewModel.moduleSequence.prevModule}
            nextModule={viewModel.moduleSequence.nextModule}
          />
        </SectionShell>
      ) : null}
    </>
  );
}
