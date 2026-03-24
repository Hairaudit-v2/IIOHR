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
  facultyReviewPending: boolean;
  certificateEligible: boolean;
  summary: CertificateEligibilitySummary;
}
