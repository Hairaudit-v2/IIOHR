import { notFound } from "next/navigation";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { EscalationTriggersPanel } from "@/components/academy/shared/EscalationTriggersPanel";
import { LearningObjectivesList } from "@/components/academy/shared/LearningObjectivesList";
import { LessonHeader } from "@/components/academy/shared/LessonHeader";
import { LessonOverviewPanel } from "@/components/academy/shared/LessonOverviewPanel";
import { PatientCommunicationExamples } from "@/components/academy/shared/PatientCommunicationExamples";
import { RedFlagsPanel } from "@/components/academy/shared/RedFlagsPanel";
import { ReferenceList } from "@/components/academy/shared/ReferenceList";
import { RoleBoundaryNotesPanel } from "@/components/academy/shared/RoleBoundaryNotesPanel";
import { DownloadableResourceList } from "@/components/academy/shared/DownloadableResourceList";
import { RichTextAcademicBody } from "@/components/academy/shared/RichTextAcademicBody";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { getLessonPageViewModel } from "@/lib/academy/view-models/lesson";

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

  return (
    <>
      <SectionShell>
        <LessonHeader
          title={viewModel.lesson.title}
          overview={viewModel.lesson.overview}
          studyTimeMinutes={viewModel.lesson.estimatedStudyMinutes}
        />
      </SectionShell>
      <SectionShell muted>
        <div className="grid gap-6 lg:grid-cols-2">
          <LearningObjectivesList objectives={viewModel.lesson.learningObjectives} />
          <LessonOverviewPanel
            overview={viewModel.lesson.overview}
            keyTakeaways={viewModel.lesson.keyTakeaways}
          />
        </div>
      </SectionShell>
      <SectionShell>
        <RichTextAcademicBody content={viewModel.lesson.body.content} />
      </SectionShell>
      <SectionShell muted>
        <div className="grid gap-6 lg:grid-cols-2">
          <PatientCommunicationExamples examples={viewModel.lesson.patientCommunicationExamples} />
          <RoleBoundaryNotesPanel notes={viewModel.lesson.roleBoundaryNotes} />
        </div>
      </SectionShell>
      <SectionShell>
        <div className="grid gap-6 lg:grid-cols-3">
          <RedFlagsPanel redFlags={viewModel.lesson.redFlags} />
          <EscalationTriggersPanel triggers={viewModel.lesson.escalationTriggers} />
          <ComplianceStatementPanel notices={viewModel.complianceNotices} />
        </div>
      </SectionShell>
      <SectionShell muted>
        <div className="grid gap-6 lg:grid-cols-2">
          <ReferenceList references={viewModel.references} />
          <DownloadableResourceList resources={viewModel.resources} />
        </div>
      </SectionShell>
    </>
  );
}
