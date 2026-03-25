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
import { RedFlagsPanel } from "@/components/academy/shared/RedFlagsPanel";
import { ReferenceList } from "@/components/academy/shared/ReferenceList";
import { RichTextAcademicBody } from "@/components/academy/shared/RichTextAcademicBody";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { partitionDownloadableResourcesByFile } from "@/lib/academy/public-asset-exists";
import { getLessonPageViewModel } from "@/lib/academy/view-models/lesson";

export default async function DoctorLessonPage({
  params,
}: {
  params: Promise<{ programSlug: string; lessonSlug: string }>;
}) {
  const { programSlug, lessonSlug } = await params;
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
  const showReasoning =
    viewModel.lesson.displayFlags.showClinicalReasoning && reasoningBoxes.length > 0;

  return (
    <>
      <SectionShell>
        <LessonHeader
          title={viewModel.lesson.title}
          overview={viewModel.lesson.overview}
          studyTimeMinutes={viewModel.lesson.estimatedStudyMinutes}
          sequenceLabel={sequenceLabel}
        />
      </SectionShell>
      <SectionShell muted>
        <div className="grid gap-6 lg:grid-cols-2">
          <LearningObjectivesList objectives={viewModel.lesson.learningObjectives} title="What you will learn" />
          <LessonOverviewPanel
            overview={viewModel.lesson.overview}
            keyTakeaways={viewModel.lesson.keyTakeaways}
          />
        </div>
      </SectionShell>
      <SectionShell>
        <AcademyPanel title="Core reading">
          <RichTextAcademicBody content={viewModel.lesson.body.content} />
        </AcademyPanel>
      </SectionShell>
      {showReasoning ? (
        <SectionShell muted>
          <ClinicalReasoningPanel boxes={reasoningBoxes} />
        </SectionShell>
      ) : null}
      {viewModel.lesson.displayFlags.showEvidencePanel ? (
        <SectionShell>
          <LessonEvidenceTierPanel lesson={viewModel.lesson} />
        </SectionShell>
      ) : null}
      {viewModel.caseStudies.length > 0 || viewModel.linkedAssessments.length > 0 ? (
        <SectionShell muted>
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
      {viewModel.lesson.displayFlags.showRedFlagsPanel && viewModel.lesson.redFlags.length > 0 ? (
        <SectionShell>
          <RedFlagsPanel redFlags={viewModel.lesson.redFlags} />
        </SectionShell>
      ) : null}
      <SectionShell muted>
        <LessonCompletionRulesPanel rules={viewModel.lesson.completionRules} />
      </SectionShell>
      <SectionShell>
        <div className="grid gap-6 lg:grid-cols-2">
          <ReferenceList references={viewModel.references} />
          <DownloadableResourceList
            resources={resourcesAvailable}
            pendingResources={resourcesPending}
            title="Resources and downloads"
          />
        </div>
      </SectionShell>
      <SectionShell muted>
        <ComplianceStatementPanel notices={mergedComplianceForDetail} />
      </SectionShell>
    </>
  );
}
