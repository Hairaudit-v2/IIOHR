import type { AcademyAssessment } from "@/lib/academy/assessment-types";
import type { AssessmentAttempt } from "@/lib/academy/operational-types";

export function isAssessmentPassed(
  assessment: AcademyAssessment,
  attempt: Pick<AssessmentAttempt, "score" | "facultyReviewStatus">
): boolean {
  const score = attempt.score ?? 0;
  const reviewPassed = !assessment.facultyReviewRequired || attempt.facultyReviewStatus === "approved";
  return score >= assessment.passMark && reviewPassed;
}

export function getAttemptStateLabel(
  assessment: AcademyAssessment,
  attempt: Pick<AssessmentAttempt, "score" | "facultyReviewStatus">
): string {
  if (assessment.facultyReviewRequired && attempt.facultyReviewStatus !== "approved") {
    return "Awaiting faculty review";
  }

  return isAssessmentPassed(assessment, attempt) ? "Passed" : "Not yet passed";
}
