/**
 * Faculty review outcomes should be synced via a narrow SECURITY DEFINER RPC or trusted
 * Edge Function — see docs/academy-faculty-review-architecture.md (not direct broad RLS).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { AssessmentAttemptRow } from "@/lib/academy/db/types";
import type {
  AssessmentSubmissionService,
  SubmitAssessmentAttemptInput,
} from "@/lib/academy/services/academy-service-contracts";
import { dbFacultyReviewStatusToUi } from "@/lib/academy/db/supabase-mappers";
import { getProgramAssessments } from "@/lib/academy/content-loader";
import { getProgramBundles } from "@/lib/academy/content-registry";
import { isAssessmentPassed } from "@/lib/academy/services/assessment-service";
import { scoreAssessmentResponses } from "@/lib/academy/services/score-assessment-responses";

function resolveProgramSlugForAssessment(assessmentId: string): string {
  for (const bundle of getProgramBundles()) {
    if (bundle.assessments.some((a) => a.id === assessmentId)) {
      return bundle.program.slug;
    }
  }
  throw new Error(`Assessment not found in any program bundle: ${assessmentId}`);
}

export function createAssessmentSubmissionService(
  supabase: SupabaseClient
): AssessmentSubmissionService {
  return {
    async submitAttempt(input: SubmitAssessmentAttemptInput): Promise<AssessmentAttemptRow> {
      const programSlug = resolveProgramSlugForAssessment(input.assessmentId);
      const assessment = getProgramAssessments(programSlug).find((a) => a.id === input.assessmentId);
      if (!assessment) {
        throw new Error(`Unknown assessment: ${input.assessmentId}`);
      }

      const { data: enrollment, error: enrErr } = await supabase
        .from("program_enrollments")
        .select("id, user_id")
        .eq("id", input.programEnrollmentId)
        .single();
      if (enrErr || !enrollment) {
        throw new Error(enrErr?.message ?? "Enrollment not found");
      }
      if (enrollment.user_id !== input.userId) {
        throw new Error("Enrollment does not belong to the current user");
      }

      let resolvedRetryIndex: number;
      if (input.retryIndex !== undefined) {
        resolvedRetryIndex = input.retryIndex;
      } else {
        const { data: last, error: lastErr } = await supabase
          .from("assessment_attempts")
          .select("retry_index")
          .eq("program_enrollment_id", input.programEnrollmentId)
          .eq("assessment_id", input.assessmentId)
          .order("retry_index", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (lastErr) {
          throw new Error(lastErr.message);
        }
        resolvedRetryIndex = (last?.retry_index ?? -1) + 1;
      }

      if (resolvedRetryIndex > assessment.retryLimit) {
        throw new Error("Maximum attempts reached for this assessment");
      }

      const { score } = scoreAssessmentResponses({
        programSlug,
        assessment,
        responses: input.responses,
      });

      const dbFacultyStatus = assessment.facultyReviewRequired
        ? ("pending" as const)
        : ("not_required" as const);

      const passed = isAssessmentPassed(assessment, {
        score,
        facultyReviewStatus: dbFacultyReviewStatusToUi(dbFacultyStatus),
      });

      const insertPayload = {
        program_enrollment_id: input.programEnrollmentId,
        assessment_id: input.assessmentId,
        retry_index: resolvedRetryIndex,
        submitted_at: new Date().toISOString(),
        score,
        passed,
        faculty_review_status: dbFacultyStatus,
        responses: input.responses as Record<string, unknown>,
        grader_user_id: null as string | null,
      };

      const { data, error } = await supabase
        .from("assessment_attempts")
        .insert(insertPayload)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data as AssessmentAttemptRow;
    },
  };
}
