/**
 * Faculty writes go through SECURITY DEFINER RPCs (see supabase migration
 * 20250326120000_faculty_review_rpc.sql) — not direct client updates to attempts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import type {
  FacultyReviewOutcome,
  FacultyReviewQueueItem,
  FacultyReviewService,
} from "@/lib/academy/services/academy-service-contracts";
import { isAssessmentPassed } from "@/lib/academy/services/assessment-service";
import { dbFacultyReviewStatusToUi } from "@/lib/academy/db/supabase-mappers";
import { getProgramAssessments } from "@/lib/academy/content-loader";
import type { AssessmentAttemptRow, FacultyReviewRow, ProgramEnrollmentRow } from "@/lib/academy/db/types";
import type { AssessmentAttempt } from "@/lib/academy/operational-types";

function toOperationalAttempt(row: AssessmentAttemptRow): AssessmentAttempt {
  return {
    id: row.id,
    programEnrollmentId: row.program_enrollment_id,
    assessmentId: row.assessment_id,
    submittedAt: row.submitted_at,
    score: row.score != null ? Number(row.score) : null,
    passed: row.passed,
    retryIndex: row.retry_index,
    facultyReviewStatus: dbFacultyReviewStatusToUi(row.faculty_review_status),
  };
}

export function createFacultyReviewService(supabase: SupabaseClient): FacultyReviewService {
  return {
    async listPendingForReviewer(params: {
      reviewerUserId: string;
      streamSlug?: AcademyStreamSlug;
    }): Promise<FacultyReviewQueueItem[]> {
      void params.reviewerUserId;
      const { data: attempts, error: aErr } = await supabase
        .from("assessment_attempts")
        .select("*")
        .in("faculty_review_status", ["pending", "in_review"])
        .order("submitted_at", { ascending: true });
      if (aErr) {
        throw new Error(aErr.message);
      }
      const rows = (attempts ?? []) as AssessmentAttemptRow[];
      if (rows.length === 0) {
        return [];
      }
      const enrollmentIds = [...new Set(rows.map((r) => r.program_enrollment_id))];
      const { data: enrollments, error: eErr } = await supabase
        .from("program_enrollments")
        .select("*")
        .in("id", enrollmentIds);
      if (eErr) {
        throw new Error(eErr.message);
      }
      const enrById = new Map((enrollments ?? []).map((e) => [e.id as string, e as ProgramEnrollmentRow]));
      const stream = params.streamSlug;
      const assessmentsByProgram = new Map<string, ReturnType<typeof getProgramAssessments>>();

      const items: FacultyReviewQueueItem[] = [];
      for (const attempt of rows) {
        const enrollment = enrById.get(attempt.program_enrollment_id);
        if (!enrollment) {
          continue;
        }
        if (stream && enrollment.stream_slug !== stream) {
          continue;
        }
        let programAssessments = assessmentsByProgram.get(enrollment.program_slug);
        if (!programAssessments) {
          programAssessments = getProgramAssessments(enrollment.program_slug);
          assessmentsByProgram.set(enrollment.program_slug, programAssessments);
        }
        const assessment = programAssessments.find((a) => a.id === attempt.assessment_id);
        if (assessment && !assessment.facultyReviewRequired) {
          continue;
        }
        items.push({ attempt, enrollment });
      }
      return items;
    },

    async claimAttempt(params: {
      assessmentAttemptId: string;
      reviewerUserId: string;
    }): Promise<void> {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr || userData.user?.id !== params.reviewerUserId) {
        throw new Error("Reviewer must match the signed-in user");
      }
      const { error } = await supabase.rpc("academy_faculty_claim_attempt", {
        p_attempt_id: params.assessmentAttemptId,
      });
      if (error) {
        throw new Error(error.message);
      }
    },

    async finalizeAttempt(params: {
      assessmentAttemptId: string;
      reviewerUserId: string;
      outcome: FacultyReviewOutcome;
      notes?: string | null;
      rubricSummary?: string | null;
    }): Promise<FacultyReviewRow> {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr || userData.user?.id !== params.reviewerUserId) {
        throw new Error("Reviewer must match the signed-in user");
      }
      const { data: reviewId, error } = await supabase.rpc("academy_faculty_finalize_attempt", {
        p_attempt_id: params.assessmentAttemptId,
        p_outcome: params.outcome,
        p_notes: params.notes ?? "",
        p_rubric_summary: params.rubricSummary ?? "",
      });
      if (error) {
        throw new Error(error.message);
      }
      if (reviewId == null) {
        throw new Error("RPC returned no faculty review id");
      }
      const { data: row, error: fetchErr } = await supabase
        .from("faculty_reviews")
        .select("*")
        .eq("id", reviewId as string)
        .single();
      if (fetchErr || !row) {
        throw new Error(fetchErr?.message ?? "Failed to load faculty review row");
      }
      return row as FacultyReviewRow;
    },
  };
}

/** Used by eligibility read model for faculty gate metrics. */
export function computeFacultyGateMetrics(params: {
  programSlug: string;
  attempts: AssessmentAttemptRow[];
}): {
  hasFacultyRevisionRequested: boolean;
  hasFacultyRejectedAttempt: boolean;
  certificateBlockedByFacultyGate: boolean;
} {
  const assessments = getProgramAssessments(params.programSlug).filter((a) => a.facultyReviewRequired);
  let hasFacultyRevisionRequested = false;
  let hasFacultyRejectedAttempt = false;
  let certificateBlockedByFacultyGate = false;

  for (const assessment of assessments) {
    const forA = params.attempts.filter((r) => r.assessment_id === assessment.id);
    const latest = forA.sort((x, y) => y.retry_index - x.retry_index)[0];
    if (!latest) {
      certificateBlockedByFacultyGate = true;
      continue;
    }
    const st = latest.faculty_review_status;
    if (st === "pending" || st === "in_review") {
      certificateBlockedByFacultyGate = true;
    }
    if (st === "revision_required") {
      hasFacultyRevisionRequested = true;
      certificateBlockedByFacultyGate = true;
    }
    if (st === "rejected") {
      hasFacultyRejectedAttempt = true;
      certificateBlockedByFacultyGate = true;
    }
    const op = toOperationalAttempt(latest);
    if (!isAssessmentPassed(assessment, op)) {
      certificateBlockedByFacultyGate = true;
    }
  }

  return {
    hasFacultyRevisionRequested,
    hasFacultyRejectedAttempt,
    certificateBlockedByFacultyGate,
  };
}
