import { notFound } from "next/navigation";
import { AssessmentHeader } from "@/components/academy/shared/AssessmentHeader";
import { AssessmentInstructionPanel } from "@/components/academy/shared/AssessmentInstructionPanel";
import { ProtectedAcademyAccessBoundary } from "@/components/academy/shared/ProtectedAcademyAccessBoundary";
import { AssessmentRenderer } from "@/components/academy/shared/AssessmentRenderer";
import { CommunicationRoleplayTask } from "@/components/academy/shared/CommunicationRoleplayTask";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { DocumentationTaskEditor } from "@/components/academy/shared/DocumentationTaskEditor";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { ConsultantScopeStrip } from "@/components/academy/consultant/ConsultantScopeStrip";
import { getProtectedAcademyAccess } from "@/lib/academy/access";
import { getAssessmentPageViewModel } from "@/lib/academy/view-models/assessment";

export default async function ConsultantAssessmentPage({
  params,
}: {
  params: Promise<{ programSlug: string; assessmentSlug: string }>;
}) {
  const { programSlug, assessmentSlug } = await params;
  const access = await getProtectedAcademyAccess(
    "consultants",
    `/consultants/programs/${programSlug}/assessments/${assessmentSlug}`
  );
  if (!access.hasProtectedAccess) {
    return <ProtectedAcademyAccessBoundary {...access} />;
  }

  const viewModel = getAssessmentPageViewModel(programSlug, assessmentSlug);

  if (!viewModel || viewModel.stream.slug !== "consultants") {
    notFound();
  }

  const firstPrompt = viewModel.items[0]?.prompt ?? "Assessment workspace";
  const usesTextWorkspace =
    viewModel.assessment.assessmentType === "documentation-exercise" ||
    viewModel.assessment.assessmentType === "consultation-note-task" ||
    viewModel.assessment.assessmentType === "capstone";

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
          <AssessmentHeader
            title={viewModel.assessment.title}
            passMark={viewModel.assessment.passMark}
            retryLimit={viewModel.assessment.retryLimit}
          />
        </div>
        <p className="mt-4 max-w-2xl text-sm text-readable-muted">
          This assessment tests consultation-support judgement within scope: education, documentation, and escalation
          — not independent diagnosis or treatment decisions.
        </p>
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
        <ComplianceStatementPanel
          notices={mergedCompliance}
          title="Interpret results in light of scope and clinic protocol"
          tone="safety"
        />
      </SectionShell>
    </>
  );
}
