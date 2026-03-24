/**
 * Persistence layer types aligned with `supabase/migrations/20250325120000_academy_persistence.sql`.
 * DB uses snake_case enums (underscores); map to UI constants in `@/lib/academy/constants` at boundaries.
 */

import type { AcademyStreamSlug } from "@/lib/academy/constants";

/** Postgres `public.membership_status` */
export type DbMembershipStatus = "invited" | "active" | "suspended";

/** Postgres `public.enrollment_status` */
export type DbEnrollmentStatus = "active" | "paused" | "completed" | "withdrawn";

/** Postgres `public.completion_source` */
export type DbCompletionSource = "self_complete" | "assessment_pass" | "faculty_override";

/** Postgres `public.faculty_review_status` */
export type DbFacultyReviewStatus =
  | "not_required"
  | "pending"
  | "in_review"
  | "approved"
  | "revision_required"
  | "rejected";

/** Postgres `public.competency_status` */
export type DbCompetencyStatus =
  | "not_started"
  | "in_progress"
  | "evidence_submitted"
  | "faculty_review"
  | "achieved"
  | "needs_remediation";

/** Postgres `public.competency_evidence_source` */
export type DbCompetencyEvidenceSource =
  | "assessment_attempt"
  | "practical_task"
  | "faculty_review"
  | "lesson_completion";

/** Postgres `public.application_status` */
export type DbApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "needs_more_information"
  | "accepted"
  | "rejected"
  | "declined"
  | "waitlisted"
  | "withdrawn";

/** Postgres `public.app_user_role` */
export type DbAppUserRole = "admin" | "faculty" | "clinic_manager";

export interface ProfileRow {
  id: string;
  display_name: string | null;
  full_name: string | null;
  legal_name: string | null;
  name_on_certificate: string | null;
  locale: string | null;
  timezone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRoleRow {
  user_id: string;
  role: DbAppUserRole;
  created_at: string;
}

export interface FacultyStreamScopeRow {
  user_id: string;
  stream_slug: AcademyStreamSlug;
  created_at: string;
}

export interface AcademyStreamMembershipRow {
  id: string;
  user_id: string;
  stream_slug: AcademyStreamSlug;
  status: DbMembershipStatus;
  is_primary: boolean;
  created_at: string;
}

export interface ProgramEnrollmentRow {
  id: string;
  user_id: string;
  stream_slug: AcademyStreamSlug;
  program_slug: string;
  academy_stream_membership_id: string;
  status: DbEnrollmentStatus;
  cohort_id: string | null;
  clinic_id: string | null;
  content_rules_version: string | null;
  enrolled_at: string;
  completed_at: string | null;
}

export interface LessonCompletionRow {
  id: string;
  program_enrollment_id: string;
  lesson_id: string;
  completed_at: string;
  duration_minutes: number | null;
  completion_source: DbCompletionSource;
}

export interface ModuleProgressRow {
  id: string;
  program_enrollment_id: string;
  module_id: string;
  percent_complete: number;
  completed_at: string | null;
  updated_at: string;
}

export interface AssessmentAttemptRow {
  id: string;
  program_enrollment_id: string;
  assessment_id: string;
  retry_index: number;
  submitted_at: string | null;
  score: string | null;
  passed: boolean;
  faculty_review_status: DbFacultyReviewStatus;
  responses: Record<string, unknown>;
  grader_user_id: string | null;
  created_at: string;
  /** Pass mark from content at submit time; required for faculty approval RPC. */
  assessment_pass_mark_snapshot?: number | null;
}

export interface CompetencyRecordRow {
  id: string;
  program_enrollment_id: string;
  competency_id: string;
  status: DbCompetencyStatus;
  achieved_at: string | null;
  updated_at: string;
}

export interface CompetencyEvidenceRow {
  id: string;
  competency_record_id: string;
  source_type: DbCompetencyEvidenceSource;
  source_id: string;
  accepted: boolean;
  verified_at: string | null;
  verified_by: string | null;
  created_at: string;
}

export interface FacultyReviewRow {
  id: string;
  assessment_attempt_id: string;
  reviewer_user_id: string;
  status: DbFacultyReviewStatus;
  rubric_summary: string | null;
  notes: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export interface CertificateAwardRow {
  id: string;
  program_enrollment_id: string;
  program_slug: string;
  level_id: string | null;
  certificate_number: string;
  template_key: string;
  distinction: boolean;
  issued_at: string;
  storage_path: string | null;
  verification_token: string | null;
  created_at: string;
}

export interface ApplicationRow {
  id: string;
  user_id: string;
  target_stream_slug: AcademyStreamSlug;
  target_program_slug: string | null;
  status: DbApplicationStatus;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  internal_notes: string | null;
  applicant_message: string | null;
}

export interface ApplicationAdmissionsEventRow {
  id: string;
  application_id: string;
  from_status: DbApplicationStatus | null;
  to_status: DbApplicationStatus;
  actor_user_id: string | null;
  internal_note: string | null;
  applicant_message: string | null;
  answers_snapshot: Record<string, unknown> | null;
  created_at: string;
}

export interface ApplicationAnswerRow {
  id: string;
  application_id: string;
  question_key: string;
  answer: unknown;
}

export interface ApplicationConsentRow {
  id: string;
  application_id: string;
  consent_key: string;
  consent_version: string;
  accepted_at: string;
  text_hash: string | null;
}

export interface AdminAuditLogRow {
  id: string;
  actor_user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
}
