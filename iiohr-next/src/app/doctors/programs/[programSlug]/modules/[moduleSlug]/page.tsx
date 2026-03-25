import Link from "next/link";
import { notFound } from "next/navigation";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";
import { CompetencyTagList } from "@/components/academy/shared/CompetencyTagList";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { DownloadableResourceList } from "@/components/academy/shared/DownloadableResourceList";
import { LinkedCaseStudiesPanel } from "@/components/academy/shared/LinkedCaseStudiesPanel";
import { ModuleHero } from "@/components/academy/shared/ModuleHero";
import { ModuleOutcomePanel } from "@/components/academy/shared/ModuleOutcomePanel";
import { ReferenceList } from "@/components/academy/shared/ReferenceList";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { ModuleFacultyNotesTeaser } from "@/components/academy/doctor/ModuleFacultyNotesTeaser";
import { partitionDownloadableResourcesByFile } from "@/lib/academy/public-asset-exists";
import { getModulePageViewModel } from "@/lib/academy/view-models/module";

export default async function DoctorModulePage({
  params,
}: {
  params: Promise<{ programSlug: string; moduleSlug: string }>;
}) {
  const { programSlug, moduleSlug } = await params;
  const viewModel = getModulePageViewModel(programSlug, moduleSlug);

  if (!viewModel || viewModel.stream.slug !== "doctors") {
    notFound();
  }

  const base = `/doctors/programs/${programSlug}`;
  const lessonsOrdered = viewModel.lessons;
  const firstLesson = lessonsOrdered[0] ?? null;
  const { available: resourcesAvailable, unavailable: resourcesPending } = partitionDownloadableResourcesByFile(
    viewModel.resources
  );

  const modSeq = viewModel.moduleSequence;

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
        <ModuleHero
          title={viewModel.module.title}
          overview={viewModel.module.moduleOverview}
          studyTimeMinutes={viewModel.module.estimatedStudyMinutes}
        />
        {modSeq ? (
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-readable-muted">
            Module {modSeq.position} of {modSeq.total} in programme sequence
          </p>
        ) : null}
        {viewModel.competencies.length > 0 ? (
          <div className="mt-6">
            <CompetencyTagList competencies={viewModel.competencies} />
          </div>
        ) : null}
      </SectionShell>

      <SectionShell muted>
        <ModuleOutcomePanel learningOutcomes={viewModel.module.learningOutcomes} />
      </SectionShell>

      <SectionShell>
        <AcademyPanel title="How to work through this module">
          <p className="text-sm text-readable-muted">
            Work through the lessons in order. The final lesson in this module links the knowledge check and case
            discussion; you can open the assessment from that lesson or from the links below when you are ready.
          </p>
          {firstLesson ? (
            <p className="mt-4">
              <Link
                href={`${base}/lessons/${firstLesson.slug}`}
                className="link-premium text-sm font-semibold text-foreground"
              >
                Start with lesson 1 →
              </Link>
            </p>
          ) : null}
        </AcademyPanel>
      </SectionShell>

      <SectionShell muted>
        <AcademyPanel title="Lessons — work in order">
          <ol className="space-y-3">
            {lessonsOrdered.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`${base}/lessons/${lesson.slug}`}
                  className="block rounded-[10px] border border-border bg-surface px-5 py-4 text-left text-sm text-foreground transition-colors hover:border-accent/40"
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
          <AcademyPanel title="Module assessment">
            <ul className="space-y-3">
              {viewModel.assessments.map((a) => (
                <li key={a.id}>
                  <Link href={`${base}/assessments/${a.slug}`} className="link-premium font-semibold text-foreground">
                    {a.title}
                  </Link>
                  <p className="mt-1 text-xs text-readable-muted">
                    {a.assessmentType.replace(/-/g, " ")} · Pass {a.passMark}%
                    {a.facultyReviewRequired ? " · Includes faculty review" : ""}
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

      {viewModel.facultyNotes.length > 0 ? (
        <SectionShell>
          <ModuleFacultyNotesTeaser notes={viewModel.facultyNotes} />
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
        <ComplianceStatementPanel notices={mergedCompliance} />
      </SectionShell>
    </>
  );
}
