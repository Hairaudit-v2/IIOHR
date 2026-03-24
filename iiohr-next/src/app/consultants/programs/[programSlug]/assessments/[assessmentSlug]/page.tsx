import { notFound } from "next/navigation";
import { AssessmentHeader } from "@/components/academy/shared/AssessmentHeader";
import { AssessmentInstructionPanel } from "@/components/academy/shared/AssessmentInstructionPanel";
import { AssessmentRenderer } from "@/components/academy/shared/AssessmentRenderer";
import { CommunicationRoleplayTask } from "@/components/academy/shared/CommunicationRoleplayTask";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { DocumentationTaskEditor } from "@/components/academy/shared/DocumentationTaskEditor";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { getAssessmentPageViewModel } from "@/lib/academy/view-models/assessment";

export default async function ConsultantAssessmentPage({
  params,
}: {
  params: Promise<{ programSlug: string; assessmentSlug: string }>;
}) {
  const { programSlug, assessmentSlug } = await params;
  const viewModel = getAssessmentPageViewModel(programSlug, assessmentSlug);

  if (!viewModel || viewModel.stream.slug !== "consultants") {
    notFound();
  }

  const firstPrompt = viewModel.items[0]?.prompt ?? "Assessment workspace";
  const usesTextWorkspace =
    viewModel.assessment.assessmentType === "documentation-exercise" ||
    viewModel.assessment.assessmentType === "consultation-note-task" ||
    viewModel.assessment.assessmentType === "capstone";

  return (
    <>
      <SectionShell>
        <AssessmentHeader
          title={viewModel.assessment.title}
          passMark={viewModel.assessment.passMark}
          retryLimit={viewModel.assessment.retryLimit}
        />
      </SectionShell>
      <SectionShell muted>
        <AssessmentInstructionPanel
          instructions={viewModel.assessment.instructions}
          mandatoryDomainTags={viewModel.assessment.mandatoryDomainTags}
        />
      </SectionShell>
      <SectionShell>
        <AssessmentRenderer items={viewModel.items} />
      </SectionShell>
      <SectionShell muted>
        {usesTextWorkspace ? (
          <DocumentationTaskEditor prompt={firstPrompt} />
        ) : (
          <CommunicationRoleplayTask prompt={firstPrompt} />
        )}
      </SectionShell>
      <SectionShell>
        <ComplianceStatementPanel notices={viewModel.complianceNotices} />
      </SectionShell>
    </>
  );
}
