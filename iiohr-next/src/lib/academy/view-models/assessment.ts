import {
  getAssessmentItemsForAssessment,
  getComplianceNoticesByIds,
  getCompetenciesByIds,
  getProgram,
  getProgramAssessmentBySlug,
  getProgramStream,
} from "@/lib/academy/content-loader";
import {
  orderComplianceNoticesForDisplay,
  resolveComplianceNoticeIdsForAssessment,
} from "@/lib/academy/assessment-compliance-notices";
import { assessmentPageLayout } from "@/lib/academy/layouts/page-layouts";

export function getAssessmentPageViewModel(programSlug: string, assessmentSlug: string) {
  const stream = getProgramStream(programSlug);
  const program = getProgram(programSlug);
  const assessment = getProgramAssessmentBySlug(programSlug, assessmentSlug);

  if (!stream || !program || !assessment) {
    return null;
  }

  const items = getAssessmentItemsForAssessment(programSlug, assessment.id);
  const noticeIds = resolveComplianceNoticeIdsForAssessment(programSlug, assessment, items);
  const complianceNotices = orderComplianceNoticesForDisplay(
    getComplianceNoticesByIds(programSlug, noticeIds)
  );

  return {
    stream,
    program,
    assessment,
    items,
    competencies: getCompetenciesByIds(programSlug, assessment.competencyIds),
    complianceNotices,
    programComplianceNotices: getComplianceNoticesByIds(programSlug, program.complianceNoticeIds),
    layout: assessmentPageLayout,
  };
}
