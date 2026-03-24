import type { FacultyReview, AssessmentAttempt } from "@/lib/academy/operational-types";

export function isAwaitingFacultyReview(
  review: FacultyReview | undefined,
  attempt: AssessmentAttempt | undefined
): boolean {
  if (!review || !attempt) {
    return false;
  }

  return attempt.facultyReviewStatus === "pending" || review.status === "pending";
}
