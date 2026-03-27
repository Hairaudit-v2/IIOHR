import { notFound } from "next/navigation";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";
import { ClinicalReasoningPanel } from "@/components/academy/shared/ClinicalReasoningPanel";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { DownloadableResourceList } from "@/components/academy/shared/DownloadableResourceList";
import { LearningObjectivesList } from "@/components/academy/shared/LearningObjectivesList";
import { LessonCompletionRulesPanel } from "@/components/academy/shared/LessonCompletionRulesPanel";
import { LessonEvidenceTierPanel } from "@/components/academy/shared/LessonEvidenceTierPanel";
import { LessonHeader } from "@/components/academy/shared/LessonHeader";
import { LessonOverviewPanel } from "@/components/academy/shared/LessonOverviewPanel";
import { LinkedAssessmentsCallout } from "@/components/academy/shared/LinkedAssessmentsCallout";
import { LinkedCaseStudiesPanel } from "@/components/academy/shared/LinkedCaseStudiesPanel";
import { ProtectedAcademyAccessBoundary } from "@/components/academy/shared/ProtectedAcademyAccessBoundary";
import { RedFlagsPanel } from "@/components/academy/shared/RedFlagsPanel";
import { ReferenceList } from "@/components/academy/shared/ReferenceList";
import { RichTextAcademicBody } from "@/components/academy/shared/RichTextAcademicBody";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { LessonChapterNav } from "@/components/academy/shared/LessonChapterNav";
import { getProtectedAcademyAccess } from "@/lib/academy/access";
import { buildDoctorLessonChapterNav } from "@/lib/academy/lesson-chapter-nav";
import { partitionDownloadableResourcesByFile } from "@/lib/academy/public-asset-exists";
import { getLessonPageViewModel } from "@/lib/academy/view-models/lesson";

export default async function DoctorLessonPage({
  params,
}: {
  params: Promise<{ programSlug: string; lessonSlug: string }>;
}) {
  const { programSlug, lessonSlug } = await params;
  const access = await getProtectedAcademyAccess(
    "doctors",
    `/doctors/programs/${programSlug}/lessons/${lessonSlug}`
  );
  if (!access.hasProtectedAccess) {
    return <ProtectedAcademyAccessBoundary {...access} />;
  }

  const viewModel = getLessonPageViewModel(programSlug, lessonSlug);

  if (!viewModel || viewModel.stream.slug !== "doctors") {
    notFound();
  }

  const base = `/doctors/programs/${programSlug}`;
  const { available: resourcesAvailable, unavailable: resourcesPending } = partitionDownloadableResourcesByFile(
    viewModel.resources
  );

  const seq = viewModel.lessonSequence;
  const sequenceLabel =
    seq && viewModel.moduleForLesson
      ? `Lesson ${seq.position} of ${seq.total} · ${viewModel.moduleForLesson.title}`
      : seq
        ? `Lesson ${seq.position} of ${seq.total}`
        : null;

  const mergedComplianceForDetail = [...viewModel.complianceNotices];
  const seen = new Set(mergedComplianceForDetail.map((n) => n.id));
  for (const n of viewModel.programComplianceNotices) {
    if (!seen.has(n.id)) {
      mergedComplianceForDetail.push(n);
      seen.add(n.id);
    }
  }

  const reasoningBoxes = viewModel.lesson.clinicalReasoningBoxes ?? [];
  const showReasoning = Boolean(
    viewModel.lesson.displayFlags.showClinicalReasoning && reasoningBoxes.length > 0
  );
  const showRedFlags =
    viewModel.lesson.displayFlags.showRedFlagsPanel && viewModel.lesson.redFlags.length > 0;

  const navItems = buildDoctorLessonChapterNav({
    showEvidence: viewModel.lesson.displayFlags.showEvidencePanel,
    showClinicalReasoning: showReasoning,
    hasScenarios: viewModel.caseStudies.length > 0,
    hasAssessments: viewModel.linkedAssessments.length > 0,
    showRedFlags,
    hasReferencesOrResources: viewModel.references.length > 0 || viewModel.resources.length > 0,
  });

  return (
    <>
      <SectionShell id="lesson-hero" className="scroll-mt-32">
        <LessonHeader
          variant="deck"
          title={viewModel.lesson.title}
          overview={viewModel.lesson.overview}
          studyTimeMinutes={viewModel.lesson.estimatedStudyMinutes}
          sequenceLabel={sequenceLabel}
          programWorkingTitle={viewModel.program.workingTitle}
          moduleTitle={viewModel.moduleForLesson?.title ?? null}
        />
      </SectionShell>

      <LessonChapterNav items={navItems} />

      <SectionShell muted id="lesson-focus" className="scroll-mt-32">
        <div className="grid gap-6 lg:grid-cols-2">
          <LearningObjectivesList objectives={viewModel.lesson.learningObjectives} title="What you will learn" />
          <LessonOverviewPanel
            overview={viewModel.lesson.overview}
            keyTakeaways={viewModel.lesson.keyTakeaways}
          />
        </div>
      </SectionShell>
      <SectionShell id="lesson-reading" className="scroll-mt-32">
        <AcademyPanel title="Core reading" eyebrow="Teaching notes" quiet>
          <RichTextAcademicBody content={viewModel.lesson.body.content} />
        </AcademyPanel>
      </SectionShell>
      {showReasoning ? (
        <SectionShell muted id="lesson-reasoning" className="scroll-mt-32">
          <ClinicalReasoningPanel boxes={reasoningBoxes} />
        </SectionShell>
      ) : null}
      {viewModel.lesson.displayFlags.showEvidencePanel ? (
        <SectionShell id="lesson-evidence" className="scroll-mt-32">
          <LessonEvidenceTierPanel lesson={viewModel.lesson} />
        </SectionShell>
      ) : null}
      {viewModel.caseStudies.length > 0 || viewModel.linkedAssessments.length > 0 ? (
        <SectionShell muted id="lesson-scenarios" className="scroll-mt-32">
          <div className="grid gap-8 lg:grid-cols-2">
            <LinkedCaseStudiesPanel caseStudies={viewModel.caseStudies} />
            <LinkedAssessmentsCallout
              assessments={viewModel.linkedAssessments}
              basePath={base}
              description="Complete the linked module assessment to demonstrate clinical reasoning. Pass mark and retry limits apply; some items may require faculty review."
            />
          </div>
        </SectionShell>
      ) : null}
      {showRedFlags ? (
        <SectionShell id="lesson-safety" className="scroll-mt-32">
          <RedFlagsPanel redFlags={viewModel.lesson.redFlags} />
        </SectionShell>
      ) : null}
      <SectionShell muted id="lesson-completion" className="scroll-mt-32">
        <LessonCompletionRulesPanel rules={viewModel.lesson.completionRules} />
      </SectionShell>
      {viewModel.references.length > 0 || viewModel.resources.length > 0 ? (
        <SectionShell id="lesson-references" className="scroll-mt-32">
          <div className="grid gap-6 lg:grid-cols-2">
            <ReferenceList references={viewModel.references} />
            <DownloadableResourceList
              resources={resourcesAvailable}
              pendingResources={resourcesPending}
              title="Resources and downloads"
            />
          </div>
        </SectionShell>
      ) : null}
      <SectionShell muted id="lesson-compliance" className="scroll-mt-32">
        <ComplianceStatementPanel notices={mergedComplianceForDetail} />
      </SectionShell>
    </>
  );
}
