import { notFound } from "next/navigation";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { LearningObjectivesList } from "@/components/academy/shared/LearningObjectivesList";
import { LessonHeader } from "@/components/academy/shared/LessonHeader";
import { LessonOverviewPanel } from "@/components/academy/shared/LessonOverviewPanel";
import { RedFlagsPanel } from "@/components/academy/shared/RedFlagsPanel";
import { ReferenceList } from "@/components/academy/shared/ReferenceList";
import { DownloadableResourceList } from "@/components/academy/shared/DownloadableResourceList";
import { RichTextAcademicBody } from "@/components/academy/shared/RichTextAcademicBody";
import { SectionShell } from "@/components/sections/shared/SectionShell";
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
        <div className="grid gap-6 lg:grid-cols-3">
          <RedFlagsPanel redFlags={viewModel.lesson.redFlags} />
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
