import type { CompetencyStatus, FacultyReviewStatus } from "@/lib/academy/constants";
import type { DbCompetencyStatus, DbFacultyReviewStatus } from "@/lib/academy/db/types";

/** Map Postgres enum values to UI/operational kebab-case. */
export function dbFacultyReviewStatusToUi(db: DbFacultyReviewStatus): FacultyReviewStatus {
  const map: Record<DbFacultyReviewStatus, FacultyReviewStatus> = {
    not_required: "not-required",
    pending: "pending",
    in_review: "in-review",
    approved: "approved",
    revision_required: "revision-required",
    rejected: "rejected",
  };
  return map[db];
}

export function uiFacultyReviewStatusToDb(ui: FacultyReviewStatus): DbFacultyReviewStatus {
  const map: Record<FacultyReviewStatus, DbFacultyReviewStatus> = {
    "not-required": "not_required",
    pending: "pending",
    "in-review": "in_review",
    approved: "approved",
    "revision-required": "revision_required",
    rejected: "rejected",
  };
  return map[ui];
}

export function dbCompetencyStatusToUi(db: DbCompetencyStatus): CompetencyStatus {
  const map: Record<DbCompetencyStatus, CompetencyStatus> = {
    not_started: "not-started",
    in_progress: "in-progress",
    evidence_submitted: "evidence-submitted",
    faculty_review: "faculty-review",
    achieved: "achieved",
    needs_remediation: "needs-remediation",
  };
  return map[db];
}
