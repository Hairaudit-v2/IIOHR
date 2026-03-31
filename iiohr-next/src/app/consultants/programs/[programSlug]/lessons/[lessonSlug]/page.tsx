import { notFound } from "next/navigation";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { EscalationTriggersPanel } from "@/components/academy/shared/EscalationTriggersPanel";
import { LearningObjectivesList } from "@/components/academy/shared/LearningObjectivesList";
import { LessonCompletionRulesPanel } from "@/components/academy/shared/LessonCompletionRulesPanel";
import { LessonEvidenceTierPanel } from "@/components/academy/shared/LessonEvidenceTierPanel";
import { LessonHeader } from "@/components/academy/shared/LessonHeader";
import { LessonOverviewPanel } from "@/components/academy/shared/LessonOverviewPanel";
import { LinkedCaseStudiesPanel } from "@/components/academy/shared/LinkedCaseStudiesPanel";
import { LinkedPracticalTasksPanel } from "@/components/academy/shared/LinkedPracticalTasksPanel";
import { PatientCommunicationExamples } from "@/components/academy/shared/PatientCommunicationExamples";
import { ProtectedAcademyAccessBoundary } from "@/components/academy/shared/ProtectedAcademyAccessBoundary";
import { RedFlagsPanel } from "@/components/academy/shared/RedFlagsPanel";
import { ReferenceList } from "@/components/academy/shared/ReferenceList";
import { DownloadableResourceList } from "@/components/academy/shared/DownloadableResourceList";
import { RichTextAcademicBody } from "@/components/academy/shared/RichTextAcademicBody";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { LinkedAssessmentsCallout } from "@/components/academy/shared/LinkedAssessmentsCallout";
import { ConsultantLessonFooterNav } from "@/components/academy/consultant/ConsultantLessonFooterNav";
import { ConsultantPilotLessonLayout } from "@/components/academy/consultant/ConsultantPilotLessonLayout";
import { ConsultantRoleBoundariesCallout } from "@/components/academy/consultant/ConsultantRoleBoundariesCallout";
import { ConsultantScopeStrip } from "@/components/academy/consultant/ConsultantScopeStrip";
import { LessonChapterNav } from "@/components/academy/shared/LessonChapterNav";
import { getProtectedAcademyAccess } from "@/lib/academy/access";
import { buildConsultantLessonChapterNav } from "@/lib/academy/lesson-chapter-nav";
import {
  CONSULTANT_ACADEMY_PILOT_LESSON_SLUG,
  NURSE_ACADEMY_PILOT_LESSON_SLUG,
} from "@/lib/academy/pilot-lesson";
import { getLessonPageViewModel } from "@/lib/academy/view-models/lesson";
import { partitionDownloadableResourcesByFile } from "@/lib/academy/public-asset-exists";

export default async function ConsultantLessonPage({
  params,
}: {
  params: Promise<{ programSlug: string; lessonSlug: string }>;
}) {
  const { programSlug, lessonSlug } = await params;
  const access = await getProtectedAcademyAccess(
    "consultants",
    `/consultants/programs/${programSlug}/lessons/${lessonSlug}`
  );
  if (!access.hasProtectedAccess) {
    return <ProtectedAcademyAccessBoundary {...access} />;
  }

  const viewModel = getLessonPageViewModel(programSlug, lessonSlug);

  if (!viewModel || viewModel.stream.slug !== "consultants") {
    notFound();
  }

  const base = `/consultants/programs/${programSlug}`;
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

  if (
    lessonSlug === CONSULTANT_ACADEMY_PILOT_LESSON_SLUG ||
    lessonSlug === NURSE_ACADEMY_PILOT_LESSON_SLUG
  ) {
    return (
      <ConsultantPilotLessonLayout
        viewModel={viewModel}
        programSlug={programSlug}
        base={base}
        sequenceLabel={sequenceLabel}
        mergedComplianceForDetail={mergedComplianceForDetail}
        resourcesAvailable={resourcesAvailable}
        resourcesPending={resourcesPending}
      />
    );
  }

  const navItems = buildConsultantLessonChapterNav({
    showScopeStrip: viewModel.programComplianceNotices.length > 0,
    hasRoleBoundaries: viewModel.lesson.roleBoundaryNotes.length > 0,
    showEvidence: viewModel.lesson.displayFlags.showEvidencePanel,
    hasCommunicationExamples: viewModel.lesson.patientCommunicationExamples.length > 0,
    hasScenarios: viewModel.caseStudies.length > 0 || viewModel.practicalTasks.length > 0,
    hasAssessments: viewModel.linkedAssessments.length > 0,
    hasReferencesOrResources: viewModel.references.length > 0 || viewModel.resources.length > 0,
  });

  return (
    <>
      <SectionShell id="lesson-hero" className="scroll-mt-32">
        {viewModel.programComplianceNotices.length > 0 ? (
          <div id="lesson-scope" className="scroll-mt-32">
            <ConsultantScopeStrip notices={viewModel.programComplianceNotices} />
          </div>
        ) : null}
        <div className="mt-8">
          <LessonHeader
            variant="deck"
            title={viewModel.lesson.title}
            overview={viewModel.lesson.overview}
            studyTimeMinutes={viewModel.lesson.estimatedStudyMinutes}
            sequenceLabel={sequenceLabel}
            programWorkingTitle={viewModel.program.workingTitle}
            moduleTitle={viewModel.moduleForLesson?.title ?? null}
          />
        </div>
      </SectionShell>

      <LessonChapterNav items={navItems} />

      {viewModel.lesson.roleBoundaryNotes.length > 0 ? (
        <SectionShell muted id="lesson-pathway" className="scroll-mt-32">
          <ConsultantRoleBoundariesCallout notes={viewModel.lesson.roleBoundaryNotes} />
        </SectionShell>
      ) : null}

      <SectionShell id="lesson-focus" className="scroll-mt-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <LearningObjectivesList
            objectives={viewModel.lesson.learningObjectives}
            title="What you will learn"
          />
          <LessonOverviewPanel
            overview={viewModel.lesson.overview}
            keyTakeaways={viewModel.lesson.keyTakeaways}
          />
        </div>
      </SectionShell>

      <SectionShell muted id="lesson-reading" className="scroll-mt-32">
        <AcademyPanel title="Core reading" eyebrow="Teaching notes" quiet>
          <RichTextAcademicBody content={viewModel.lesson.body.content} />
        </AcademyPanel>
      </SectionShell>

      {viewModel.lesson.displayFlags.showEvidencePanel ? (
        <SectionShell id="lesson-evidence" className="scroll-mt-32">
          <LessonEvidenceTierPanel lesson={viewModel.lesson} />
        </SectionShell>
      ) : null}

      {viewModel.lesson.patientCommunicationExamples.length > 0 ? (
        <SectionShell muted id="lesson-communication" className="scroll-mt-32">
          <PatientCommunicationExamples
            examples={viewModel.lesson.patientCommunicationExamples}
            title="Patient communication — scope-safe phrasing"
          />
        </SectionShell>
      ) : null}

      {viewModel.caseStudies.length > 0 || viewModel.practicalTasks.length > 0 ? (
        <SectionShell id="lesson-scenarios" className="scroll-mt-32">
          <div className="grid gap-8 lg:grid-cols-2">
            <LinkedCaseStudiesPanel caseStudies={viewModel.caseStudies} />
            <LinkedPracticalTasksPanel tasks={viewModel.practicalTasks} />
          </div>
        </SectionShell>
      ) : null}

      {viewModel.linkedAssessments.length > 0 ? (
        <SectionShell muted id="lesson-assessment" className="scroll-mt-32">
          <LinkedAssessmentsCallout
            assessments={viewModel.linkedAssessments}
            basePath={base}
            description="Complete the module assessment to demonstrate scope-safe reasoning. Pass mark and retry limits apply as shown on each assessment page."
          />
        </SectionShell>
      ) : null}

      <SectionShell id="lesson-safety" className="scroll-mt-32">
        <div
          id="safety-escalation"
          className="rounded-xl border border-[color-mix(in_srgb,var(--gold-primary)_22%,transparent)] bg-[var(--bg-secondary)] p-5 sm:p-6"
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-readable-muted">
            Safety and escalation — read carefully
          </p>
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            <RedFlagsPanel redFlags={viewModel.lesson.redFlags} />
            <EscalationTriggersPanel triggers={viewModel.lesson.escalationTriggers} />
          </div>
        </div>
      </SectionShell>

      <SectionShell muted id="lesson-compliance" className="scroll-mt-32">
        <ComplianceStatementPanel
          notices={mergedComplianceForDetail}
          title="Compliance, scope, and how to interpret this lesson"
          tone="safety"
        />
      </SectionShell>

      <SectionShell id="lesson-completion" className="scroll-mt-32">
        <LessonCompletionRulesPanel rules={viewModel.lesson.completionRules} />
      </SectionShell>

      {viewModel.references.length > 0 || viewModel.resources.length > 0 ? (
        <SectionShell muted id="lesson-references" className="scroll-mt-32">
          <div className="grid gap-8 lg:grid-cols-2">
            <ReferenceList references={viewModel.references} />
            <DownloadableResourceList
              resources={resourcesAvailable}
              pendingResources={resourcesPending}
              title="Resources and downloads"
            />
          </div>
        </SectionShell>
      ) : null}

      <SectionShell>
        {seq ? (
          <ConsultantLessonFooterNav
            programSlug={programSlug}
            moduleSlug={viewModel.moduleForLesson?.slug ?? null}
            sequence={{ position: seq.position, total: seq.total }}
            prevLesson={seq.prevLesson}
            nextLesson={seq.nextLesson}
          />
        ) : null}
      </SectionShell>
    </>
  );
}
