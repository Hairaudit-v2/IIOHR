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
import { RedFlagsPanel } from "@/components/academy/shared/RedFlagsPanel";
import { ReferenceList } from "@/components/academy/shared/ReferenceList";
import { DownloadableResourceList } from "@/components/academy/shared/DownloadableResourceList";
import { RichTextAcademicBody } from "@/components/academy/shared/RichTextAcademicBody";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { LinkedAssessmentsCallout } from "@/components/academy/shared/LinkedAssessmentsCallout";
import { ConsultantLessonFooterNav } from "@/components/academy/consultant/ConsultantLessonFooterNav";
import { ConsultantRoleBoundariesCallout } from "@/components/academy/consultant/ConsultantRoleBoundariesCallout";
import { ConsultantScopeStrip } from "@/components/academy/consultant/ConsultantScopeStrip";
import { getLessonPageViewModel } from "@/lib/academy/view-models/lesson";
import { partitionDownloadableResourcesByFile } from "@/lib/academy/public-asset-exists";

export default async function ConsultantLessonPage({
  params,
}: {
  params: Promise<{ programSlug: string; lessonSlug: string }>;
}) {
  const { programSlug, lessonSlug } = await params;
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

  return (
    <>
      <SectionShell>
        <ConsultantScopeStrip notices={viewModel.programComplianceNotices} />
        <div className="mt-8">
          <LessonHeader
            title={viewModel.lesson.title}
            overview={viewModel.lesson.overview}
            studyTimeMinutes={viewModel.lesson.estimatedStudyMinutes}
            sequenceLabel={sequenceLabel}
          />
        </div>
      </SectionShell>

      <SectionShell muted>
        <ConsultantRoleBoundariesCallout notes={viewModel.lesson.roleBoundaryNotes} />
      </SectionShell>

      <SectionShell>
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

      <SectionShell muted>
        <AcademyPanel title="Core reading">
          <RichTextAcademicBody content={viewModel.lesson.body.content} />
        </AcademyPanel>
      </SectionShell>

      {viewModel.lesson.displayFlags.showEvidencePanel ? (
        <SectionShell>
          <LessonEvidenceTierPanel lesson={viewModel.lesson} />
        </SectionShell>
      ) : null}

      <SectionShell muted>
        <PatientCommunicationExamples
          examples={viewModel.lesson.patientCommunicationExamples}
          title="Patient communication — scope-safe phrasing"
        />
      </SectionShell>

      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-2">
          <LinkedCaseStudiesPanel caseStudies={viewModel.caseStudies} />
          <LinkedPracticalTasksPanel tasks={viewModel.practicalTasks} />
        </div>
      </SectionShell>

      <SectionShell muted>
        <LinkedAssessmentsCallout
          assessments={viewModel.linkedAssessments}
          basePath={base}
          description="Complete the module assessment to demonstrate scope-safe reasoning. Pass mark and retry limits apply as shown on each assessment page."
        />
      </SectionShell>

      <SectionShell>
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

      <SectionShell muted>
        <ComplianceStatementPanel
          notices={mergedComplianceForDetail}
          title="Compliance, scope, and how to interpret this lesson"
          tone="safety"
        />
      </SectionShell>

      <SectionShell>
        <LessonCompletionRulesPanel rules={viewModel.lesson.completionRules} />
      </SectionShell>

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
