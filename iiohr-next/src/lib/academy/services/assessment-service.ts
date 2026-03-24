import type { AcademyAssessment } from "@/lib/academy/assessment-types";
import type { AssessmentAttempt } from "@/lib/academy/operational-types";

export function isAssessmentPassed(
  assessment: AcademyAssessment,
  attempt: Pick<AssessmentAttempt, "score" | "facultyReviewStatus">
): boolean {
  const score = attempt.score ?? 0;
  const reviewPassed =
    !assessment.facultyReviewRequired || attempt.facultyReviewStatus === "approved";
  return score >= assessment.passMark && reviewPassed;
}

export function getAttemptStateLabel(
  assessment: AcademyAssessment,
  attempt: Pick<AssessmentAttempt, "score" | "facultyReviewStatus">
): string {
  if (!assessment.facultyReviewRequired) {
    return isAssessmentPassed(assessment, attempt) ? "Passed" : "Not yet passed";
  }

  switch (attempt.facultyReviewStatus) {
    case "pending":
    case "in-review":
      return "Awaiting faculty review";
    case "revision-required":
      return "Faculty requested revision";
    case "rejected":
      return "Rejected by faculty";
    case "approved":
      return isAssessmentPassed(assessment, attempt) ? "Passed" : "Not yet passed";
    case "not-required":
      return isAssessmentPassed(assessment, attempt) ? "Passed" : "Not yet passed";
    default:
      return "Awaiting faculty review";
  }
}
