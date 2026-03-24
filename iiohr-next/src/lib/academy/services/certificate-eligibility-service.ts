import type { SupabaseClient } from "@supabase/supabase-js";
import type { AcademyEligibilityReadModel } from "@/lib/academy/certificate-types";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import type { AssessmentAttemptRow, CompetencyEvidenceRow, CompetencyRecordRow } from "@/lib/academy/db/types";
import { dbCompetencyStatusToUi, dbFacultyReviewStatusToUi } from "@/lib/academy/db/supabase-mappers";
import type { CertificateEligibilityService } from "@/lib/academy/services/academy-service-contracts";
import {
  getAssessmentsForModule,
  getLessonsForModule,
  getProgramAssessments,
  getProgramCompetencies,
  getProgramLessons,
  getProgramLevels,
  getProgramModules,
} from "@/lib/academy/content-loader";
import { computeFacultyGateMetrics } from "@/lib/academy/services/faculty-review-persistence";
import { getCertificateEligibilitySummary } from "@/lib/academy/services/certificate-service";
import { isAssessmentPassed } from "@/lib/academy/services/assessment-service";
import type { AssessmentAttempt } from "@/lib/academy/operational-types";
import type { CompetencyEvidence, CompetencyRecord } from "@/lib/academy/operational-types";

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

function toOperationalCompetencyRecord(row: CompetencyRecordRow): CompetencyRecord {
  return {
    id: row.id,
    programEnrollmentId: row.program_enrollment_id,
    competencyId: row.competency_id,
    status: dbCompetencyStatusToUi(row.status),
    achievedAt: row.achieved_at,
  };
}

function toOperationalCompetencyEvidence(row: CompetencyEvidenceRow): CompetencyEvidence {
  const sourceMap: Record<
    CompetencyEvidenceRow["source_type"],
    CompetencyEvidence["sourceType"]
  > = {
    assessment_attempt: "assessment-attempt",
    practical_task: "practical-task",
    faculty_review: "faculty-review",
    lesson_completion: "lesson-completion",
  };
  return {
    id: row.id,
    competencyRecordId: row.competency_record_id,
    sourceType: sourceMap[row.source_type],
    sourceId: row.source_id,
    accepted: row.accepted,
  };
}

export function createCertificateEligibilityService(
  supabase: SupabaseClient
): CertificateEligibilityService {
  return {
    async getEligibilityForEnrollment(params: {
      userId: string;
      programEnrollmentId: string;
      programSlug: string;
      streamSlug: AcademyStreamSlug;
      moduleId?: string;
    }): Promise<AcademyEligibilityReadModel> {
      const { data: enrollment, error: enrErr } = await supabase
        .from("program_enrollments")
        .select("*")
        .eq("id", params.programEnrollmentId)
        .single();

      if (enrErr || !enrollment) {
        return {
          enrolled: false,
          programEnrollmentId: null,
          lessonCompletionPercent: 0,
          requiredAssessmentCompletionPercent: 0,
          facultyReviewPending: false,
          hasFacultyRevisionRequested: false,
          hasFacultyRejectedAttempt: false,
          certificateBlockedByFacultyGate: false,
          certificateEligible: false,
          summary: {
            isEligible: false,
            unmetRequirements: ["Not enrolled for this program."],
            scoreSummary: {
              overallScore: 0,
              weightedScore: 0,
              passedDomains: [],
              failedDomains: [],
            },
            competencyStatuses: {},
          },
        };
      }

      if (enrollment.user_id !== params.userId) {
        throw new Error("Enrollment does not belong to the current user");
      }
      if (enrollment.stream_slug !== params.streamSlug || enrollment.program_slug !== params.programSlug) {
        throw new Error("Enrollment does not match requested stream/program");
      }

      const { data: attemptRows, error: attErr } = await supabase
        .from("assessment_attempts")
        .select("*")
        .eq("program_enrollment_id", params.programEnrollmentId);
      if (attErr) {
        throw new Error(attErr.message);
      }
      const attempts = (attemptRows ?? []) as AssessmentAttemptRow[];
      const operationalAttempts = attempts.map(toOperationalAttempt);

      const { data: compRows, error: compErr } = await supabase
        .from("competency_records")
        .select("*")
        .eq("program_enrollment_id", params.programEnrollmentId);
      if (compErr) {
        throw new Error(compErr.message);
      }
      const competencyRecords = ((compRows ?? []) as CompetencyRecordRow[]).map(toOperationalCompetencyRecord);

      const recordIds = competencyRecords.map((r) => r.id);
      let competencyEvidence: CompetencyEvidence[] = [];
      if (recordIds.length > 0) {
        const { data: evRows, error: evErr } = await supabase
          .from("competency_evidence")
          .select("*")
          .in("competency_record_id", recordIds);
        if (evErr) {
          throw new Error(evErr.message);
        }
        competencyEvidence = ((evRows ?? []) as CompetencyEvidenceRow[]).map(toOperationalCompetencyEvidence);
      }

      const level = getProgramLevels(params.programSlug)[0];
      const modules = getProgramModules(params.programSlug);
      const assessments = getProgramAssessments(params.programSlug);
      const competencies = getProgramCompetencies(params.programSlug);

      if (!level) {
        throw new Error("Program has no levels in content bundle");
      }

      const summary = getCertificateEligibilitySummary({
        level,
        modules,
        assessments,
        attempts: operationalAttempts,
        competencies,
        competencyRecords,
        competencyEvidence,
        lessonCompletions: [],
      });

      const facultyReviewPending = attempts.some((a) =>
        ["pending", "in_review"].includes(a.faculty_review_status)
      );

      const facultyGate = computeFacultyGateMetrics({
        programSlug: params.programSlug,
        attempts,
      });

      const moduleId = params.moduleId;
      let lessonCompletionPercent = 0;
      let requiredAssessmentCompletionPercent = 0;

      if (moduleId) {
        const moduleLessons = getLessonsForModule(params.programSlug, moduleId);
        const lessonIds = new Set(moduleLessons.map((l) => l.id));
        let done = new Set<string>();
        if (lessonIds.size > 0) {
          const { data: lcRows } = await supabase
            .from("lesson_completions")
            .select("lesson_id")
            .eq("program_enrollment_id", params.programEnrollmentId)
            .in("lesson_id", [...lessonIds]);
          done = new Set((lcRows ?? []).map((r) => r.lesson_id as string));
        }
        lessonCompletionPercent =
          moduleLessons.length === 0
            ? 100
            : Math.round((done.size / moduleLessons.length) * 100);

        const modAssessments = getAssessmentsForModule(params.programSlug, moduleId);
        if (modAssessments.length === 0) {
          requiredAssessmentCompletionPercent = 100;
        } else {
          let passedCount = 0;
          for (const a of modAssessments) {
            const forAssessment = attempts.filter((row) => row.assessment_id === a.id);
            const latest = forAssessment.sort((x, y) => y.retry_index - x.retry_index)[0];
            if (!latest) {
              continue;
            }
            const op = toOperationalAttempt(latest);
            if (isAssessmentPassed(a, op)) {
              passedCount += 1;
            }
          }
          requiredAssessmentCompletionPercent = Math.round(
            (passedCount / modAssessments.length) * 100
          );
        }
      } else {
        const allLessons = getProgramLessons(params.programSlug);
        const lessonIds = new Set(allLessons.map((l) => l.id));
        let done = new Set<string>();
        if (lessonIds.size > 0) {
          const { data: lcRows } = await supabase
            .from("lesson_completions")
            .select("lesson_id")
            .eq("program_enrollment_id", params.programEnrollmentId)
            .in("lesson_id", [...lessonIds]);
          done = new Set((lcRows ?? []).map((r) => r.lesson_id as string));
        }
        lessonCompletionPercent =
          allLessons.length === 0
            ? 100
            : Math.round((done.size / allLessons.length) * 100);

        if (assessments.length === 0) {
          requiredAssessmentCompletionPercent = 100;
        } else {
          let passedCount = 0;
          for (const a of assessments) {
            const forAssessment = attempts.filter((row) => row.assessment_id === a.id);
            const latest = forAssessment.sort((x, y) => y.retry_index - x.retry_index)[0];
            if (!latest) {
              continue;
            }
            const op = toOperationalAttempt(latest);
            if (isAssessmentPassed(a, op)) {
              passedCount += 1;
            }
          }
          requiredAssessmentCompletionPercent = Math.round((passedCount / assessments.length) * 100);
        }
      }

      return {
        enrolled: true,
        programEnrollmentId: enrollment.id as string,
        lessonCompletionPercent,
        requiredAssessmentCompletionPercent,
        facultyReviewPending,
        hasFacultyRevisionRequested: facultyGate.hasFacultyRevisionRequested,
        hasFacultyRejectedAttempt: facultyGate.hasFacultyRejectedAttempt,
        certificateBlockedByFacultyGate: facultyGate.certificateBlockedByFacultyGate,
        certificateEligible: summary.isEligible,
        summary,
      };
    },
  };
}
