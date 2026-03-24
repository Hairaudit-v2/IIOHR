import type {
  AcademyStreamSlug,
  CompetencyStatus,
  FacultyReviewStatus,
} from "@/lib/academy/constants";

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface AcademyEnrollment {
  id: string;
  userId: string;
  streamSlug: AcademyStreamSlug;
  enrolledAt: string;
  status: "active" | "paused" | "completed";
}

export interface ProgramEnrollment {
  id: string;
  academyEnrollmentId: string;
  programId: string;
  cohortId: string | null;
  clinicId: string | null;
  enrolledAt: string;
  status: "active" | "paused" | "completed";
}

export interface LevelEnrollment {
  id: string;
  programEnrollmentId: string;
  levelId: string;
  startedAt: string | null;
  completedAt: string | null;
  status: "locked" | "active" | "completed";
}

export interface ModuleProgress {
  id: string;
  programEnrollmentId: string;
  moduleId: string;
  percentComplete: number;
  isUnlocked: boolean;
  completedAt: string | null;
}

export interface LessonCompletion {
  id: string;
  programEnrollmentId: string;
  lessonId: string;
  completedAt: string | null;
  durationMinutes: number | null;
  completionSource: "self-complete" | "assessment-pass" | "faculty-override";
}

export interface AssessmentAttempt {
  id: string;
  programEnrollmentId: string;
  assessmentId: string;
  submittedAt: string | null;
  score: number | null;
  passed: boolean;
  retryIndex: number;
  facultyReviewStatus: FacultyReviewStatus;
}

export interface AssessmentResponse {
  id: string;
  attemptId: string;
  assessmentItemId: string;
  responseText: string | null;
  selectedOptionIds: string[];
  scoreAwarded: number | null;
}

export interface FacultyReview {
  id: string;
  reviewerUserId: string;
  targetType: "attempt" | "practical-task";
  targetId: string;
  status: FacultyReviewStatus;
  rubricSummary: string;
  notes: string;
  reviewedAt: string | null;
}

export interface CompetencyRecord {
  id: string;
  programEnrollmentId: string;
  competencyId: string;
  status: CompetencyStatus;
  achievedAt: string | null;
}

export interface CompetencyEvidence {
  id: string;
  competencyRecordId: string;
  sourceType: "assessment-attempt" | "practical-task" | "faculty-review" | "lesson-completion";
  sourceId: string;
  accepted: boolean;
}

export interface CertificateRecord {
  id: string;
  programEnrollmentId: string;
  levelId: string | null;
  certificateTemplateKey: string;
  issuedAt: string;
  downloadUrl: string;
}

export interface BadgeRecord {
  id: string;
  programEnrollmentId: string;
  levelId: string | null;
  badgeTemplateKey: string;
  issuedAt: string;
  downloadUrl: string;
}

export interface Cohort {
  id: string;
  streamSlug: AcademyStreamSlug;
  title: string;
  startsAt: string | null;
  endsAt: string | null;
}

export interface Clinic {
  id: string;
  name: string;
  slug: string;
}

export interface ClinicLicense {
  id: string;
  clinicId: string;
  streamSlug: AcademyStreamSlug;
  status: "draft" | "active" | "expired";
  startsAt: string | null;
  endsAt: string | null;
}

export interface ClinicStaffMembership {
  id: string;
  clinicId: string;
  userId: string;
  role: "manager" | "educator" | "learner";
}

export interface ManagerAssignment {
  id: string;
  managerUserId: string;
  targetUserId: string;
  clinicId: string | null;
  cohortId: string | null;
}

export interface AuditEvent {
  id: string;
  actorUserId: string | null;
  entityType: string;
  entityId: string;
  action: string;
  createdAt: string;
  metadata: Record<string, string | number | boolean | null>;
}
