/**
 * Service-layer contracts for academy persistence (implementation: server actions,
 * route handlers, or Supabase client wrappers). No IO here — types only.
 */

import type { AcademyStreamSlug } from "@/lib/academy/constants";
import type { AcademyEligibilityReadModel } from "@/lib/academy/certificate-types";
import type {
  ApplicationAdmissionsEventRow,
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
    /**
     * Award/progression unit for certificate summary, weighted score, competencies, and faculty gate.
     * When omitted, the first level by sequence is used (doctor single-level programs; consultant defaults to foundation).
     */
    levelSlug?: string;
  }): Promise<AcademyEligibilityReadModel>;
}

export interface SubmitApplicationInput {
  userId: string;
  targetStreamSlug: AcademyStreamSlug;
  /** When set, must be owned draft or needs_more_information for this user. */
  applicationId?: string | null;
  targetProgramSlug?: string | null;
  answers: Array<Pick<ApplicationAnswerRow, "question_key" | "answer">>;
  consents: Array<
    Pick<ApplicationConsentRow, "consent_key" | "consent_version" | "accepted_at" | "text_hash">
  >;
}

/** Application plus nested rows for admissions review UI. */
export interface ApplicationReviewRow extends ApplicationRow {
  answers: ApplicationAnswerRow[];
  consents: ApplicationConsentRow[];
  admissions_events: ApplicationAdmissionsEventRow[];
}

export interface AdmissionsAdminTransitionInput {
  applicationId: string;
  toStatus:
    | "submitted"
    | "under_review"
    | "needs_more_information"
    | "declined"
    | "waitlisted"
    | "rejected";
  internalNote?: string | null;
  /** Shown to applicant when moving to needs_more_information. */
  applicantMessage?: string | null;
  /** Captured when requesting more information (question_key → answer). */
  answersSnapshot?: Record<string, unknown> | null;
}

export interface AdmissionsService {
  saveDraftApplication(input: SubmitApplicationInput): Promise<ApplicationRow>;
  submitApplication(applicationId: string, userId: string): Promise<ApplicationRow>;
  /** Admin: accept → stream membership + program enrollment via SECURITY DEFINER RPC. */
  acceptApplication(applicationId: string): Promise<{
    application: ApplicationRow;
    enrollment: ProgramEnrollmentRow;
  }>;
  /** Admin: decline (uses declined status when supported). */
  declineApplication(applicationId: string, internalNote?: string | null): Promise<ApplicationRow>;
  markUnderReview(applicationId: string, internalNote?: string | null): Promise<ApplicationRow>;
  requestMoreInformation(
    applicationId: string,
    applicantMessage: string,
    internalNote?: string | null
  ): Promise<ApplicationRow>;
  /** Generic admin transition + audit row (not for acceptance). */
  adminTransition(input: AdmissionsAdminTransitionInput): Promise<ApplicationRow>;
  updateInternalNotes(applicationId: string, internalNotes: string): Promise<ApplicationRow>;
  /** Applicant withdraw from draft or in-flight pipeline states. */
  withdrawApplication(
    applicationId: string,
    userId: string,
    applicantEmailOverride?: string | null
  ): Promise<ApplicationRow>;
  /** Admin queue: in-flight pipeline; set includeTerminal for outcomes archive. */
  listApplicationsForReview(params?: { includeTerminal?: boolean }): Promise<ApplicationReviewRow[]>;
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
