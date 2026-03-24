import type { AssessmentDomainTag, CompetencyStatus } from "@/lib/academy/constants";

export interface AwardEligibility {
  isEligible: boolean;
  unmetRequirements: string[];
}

export interface ProgramScoreSummary {
  overallScore: number;
  weightedScore: number;
  passedDomains: AssessmentDomainTag[];
  failedDomains: AssessmentDomainTag[];
}

export interface CertificateEligibilitySummary extends AwardEligibility {
  scoreSummary: ProgramScoreSummary;
  competencyStatuses: Record<string, CompetencyStatus>;
}

/** Pilot / API read model: enrollment + module metrics + full certificate summary. */
export interface AcademyEligibilityReadModel {
  enrolled: boolean;
  programEnrollmentId: string | null;
  /** When `moduleId` is provided to the service; otherwise program-wide lesson completion. */
  lessonCompletionPercent: number;
  /** Required module assessments passed / total (module-scoped when moduleId set). */
  requiredAssessmentCompletionPercent: number;
  /** Any attempt still in pending or in_review (faculty queue). */
  facultyReviewPending: boolean;
  /** Latest attempt for a faculty-gated assessment is revision_required (learner should resubmit). */
  hasFacultyRevisionRequested: boolean;
  /** Latest attempt for a faculty-gated assessment was rejected. */
  hasFacultyRejectedAttempt: boolean;
  /** Certificate blocked until faculty-approved (or not required) for all gated assessments. */
  certificateBlockedByFacultyGate: boolean;
  certificateEligible: boolean;
  summary: CertificateEligibilitySummary;
  /** Content level used for eligibility, weighted score, and faculty gating scope (null when not enrolled). */
  eligibilityScopeLevelSlug: string | null;
  eligibilityScopeLevelTitle: string | null;
}
