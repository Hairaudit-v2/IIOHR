import { notFound } from "next/navigation";
import { AssessmentHeader } from "@/components/academy/shared/AssessmentHeader";
import { AssessmentInstructionPanel } from "@/components/academy/shared/AssessmentInstructionPanel";
import { ProtectedAcademyAccessBoundary } from "@/components/academy/shared/ProtectedAcademyAccessBoundary";
import { AssessmentRenderer } from "@/components/academy/shared/AssessmentRenderer";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { getProtectedAcademyAccess } from "@/lib/academy/access";
import { getAssessmentPageViewModel } from "@/lib/academy/view-models/assessment";

export default async function DoctorAssessmentPage({
  params,
}: {
  params: Promise<{ programSlug: string; assessmentSlug: string }>;
}) {
  const { programSlug, assessmentSlug } = await params;
  const access = await getProtectedAcademyAccess(
    "doctors",
    `/doctors/programs/${programSlug}/assessments/${assessmentSlug}`
  );
  if (!access.hasProtectedAccess) {
    return <ProtectedAcademyAccessBoundary {...access} />;
  }

  const viewModel = getAssessmentPageViewModel(programSlug, assessmentSlug);

  if (!viewModel || viewModel.stream.slug !== "doctors") {
    notFound();
  }

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
        <ComplianceStatementPanel notices={viewModel.complianceNotices} />
      </SectionShell>
    </>
  );
}
