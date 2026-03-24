import {
  getAssessmentItemsForAssessment,
  getComplianceNoticesByIds,
  getCompetenciesByIds,
  getProgram,
  getProgramAssessmentBySlug,
  getProgramStream,
} from "@/lib/academy/content-loader";
import { assessmentPageLayout } from "@/lib/academy/layouts/page-layouts";

export function getAssessmentPageViewModel(programSlug: string, assessmentSlug: string) {
  const stream = getProgramStream(programSlug);
  const program = getProgram(programSlug);
  const assessment = getProgramAssessmentBySlug(programSlug, assessmentSlug);

  if (!stream || !program || !assessment) {
    return null;
  }

  return {
    stream,
    program,
    assessment,
    items: getAssessmentItemsForAssessment(programSlug, assessment.id),
    competencies: getCompetenciesByIds(programSlug, assessment.competencyIds),
    complianceNotices: getComplianceNoticesByIds(programSlug, assessment.mandatoryDomainTags.includes("ethics-scope") ? program.complianceNoticeIds : []),
    layout: assessmentPageLayout,
  };
}
