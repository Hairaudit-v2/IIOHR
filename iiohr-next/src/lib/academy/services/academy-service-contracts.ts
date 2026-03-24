/**
 * Service-layer contracts for academy persistence (implementation: server actions,
 * route handlers, or Supabase client wrappers). No IO here — types only.
 */

import type { AcademyStreamSlug } from "@/lib/academy/constants";
import type { AcademyEligibilityReadModel } from "@/lib/academy/certificate-types";
import type {
  ApplicationAnswerRow,
  ApplicationConsentRow,
  ApplicationRow,
  AssessmentAttemptRow,
  CertificateAwardRow,
  FacultyReviewRow,
  LessonCompletionRow,
  ModuleProgressRow,
  ProgramEnrollmentRow,
} from "@/lib/academy/db/types";

/** Input for creating stream membership + program enrollment (admin / admissions). */
export interface CreateProgramEnrollmentInput {
  userId: string;
  streamSlug: AcademyStreamSlug;
  programSlug: string;
  cohortId?: string | null;
  clinicId?: string | null;
  contentRulesVersion?: string | null;
}

export interface EnrollmentService {
  getActiveEnrollmentForUserProgram(
    userId: string,
    programSlug: string
  ): Promise<ProgramEnrollmentRow | null>;
  /** Admin or trusted pipeline only (matches RLS insert policy). */
  createProgramEnrollment(input: CreateProgramEnrollmentInput): Promise<ProgramEnrollmentRow>;
}

export interface MarkLessonCompleteInput {
  programEnrollmentId: string;
  userId: string;
  lessonId: string;
  durationMinutes?: number | null;
  completionSource?: LessonCompletionRow["completion_source"];
}

export interface LearnerModuleProgressSummary {
  programSlug: string;
  moduleId: string;
  lessonCompletionPercent: number;
  completedLessonCount: number;
  totalLessons: number;
  moduleProgressRow: ModuleProgressRow;
}

export interface ProgressTrackingService {
  markLessonComplete(input: MarkLessonCompleteInput): Promise<LessonCompletionRow>;
  /** Recompute from content manifest + lesson_completions + assessment rules; upsert module_progress. */
  refreshModuleProgress(params: {
    programEnrollmentId: string;
    moduleId: string;
    programSlug: string;
    streamSlug: AcademyStreamSlug;
  }): Promise<ModuleProgressRow>;
  getLearnerModuleProgressSummary(params: {
    programEnrollmentId: string;
    moduleId: string;
    programSlug: string;
  }): Promise<LearnerModuleProgressSummary>;
}

export interface SubmitAssessmentAttemptInput {
  programEnrollmentId: string;
  userId: string;
  assessmentId: string;
  responses: Record<string, unknown>;
  /** If omitted, server computes next retry index from existing attempts. */
  retryIndex?: number;
}

export interface AssessmentSubmissionService {
  submitAttempt(input: SubmitAssessmentAttemptInput): Promise<AssessmentAttemptRow>;
}

export interface FacultyReviewQueueItem {
  attempt: AssessmentAttemptRow;
  enrollment: ProgramEnrollmentRow;
}

/** Matches RPC `academy_faculty_finalize_attempt` outcome parameter. */
export type FacultyReviewOutcome = "approved" | "revision_required" | "rejected";

export interface FacultyReviewService {
  listPendingForReviewer(params: {
    reviewerUserId: string;
    streamSlug?: AcademyStreamSlug;
  }): Promise<FacultyReviewQueueItem[]>;
  /** SECURITY DEFINER RPC `academy_faculty_claim_attempt`: pending → in_review. */
  claimAttempt(params: { assessmentAttemptId: string; reviewerUserId: string }): Promise<void>;
  /** SECURITY DEFINER RPC `academy_faculty_finalize_attempt`: row + sync attempt status / passed. */
  finalizeAttempt(params: {
    assessmentAttemptId: string;
    reviewerUserId: string;
    outcome: FacultyReviewOutcome;
    notes?: string | null;
    rubricSummary?: string | null;
  }): Promise<FacultyReviewRow>;
}

export interface CertificateEligibilityService {
  getEligibilityForEnrollment(params: {
    userId: string;
    programEnrollmentId: string;
    programSlug: string;
    streamSlug: AcademyStreamSlug;
    /** When set, lesson/assessment % fields are scoped to this module. */
    moduleId?: string;
  }): Promise<AcademyEligibilityReadModel>;
}

export interface SubmitApplicationInput {
  userId: string;
  targetStreamSlug: AcademyStreamSlug;
  targetProgramSlug?: string | null;
  answers: Array<Pick<ApplicationAnswerRow, "question_key" | "answer">>;
  consents: Array<
    Pick<ApplicationConsentRow, "consent_key" | "consent_version" | "accepted_at" | "text_hash">
  >;
}

export interface AdmissionsService {
  saveDraftApplication(input: SubmitApplicationInput): Promise<ApplicationRow>;
  submitApplication(applicationId: string, userId: string): Promise<ApplicationRow>;
  /** Admin: accept → create membership + enrollment (use admin client or RPC with elevated privileges). */
  acceptApplication(applicationId: string): Promise<{
    application: ApplicationRow;
    enrollment: ProgramEnrollmentRow;
  }>;
}

export interface CertificateIssuanceService {
  issueCertificate(input: {
    programEnrollmentId: string;
    programSlug: string;
    levelId?: string | null;
    templateKey: string;
    distinction: boolean;
  }): Promise<CertificateAwardRow>;
}
