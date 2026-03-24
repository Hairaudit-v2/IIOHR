import type {
  AssessmentDomainTag,
  AssessmentItemType,
  AssessmentType,
  ContentStatus,
  EvidenceTier,
} from "@/lib/academy/constants";

export interface AssessmentOption {
  id: string;
  label: string;
}

export interface ScoringRubricCriterion {
  id: string;
  label: string;
  weight: number;
  guidance: string;
}

export interface AssessmentScoringRubric {
  maxScore: number;
  criteria: ScoringRubricCriterion[];
}

export interface AssessmentSubmissionRules {
  allowDraftSave: boolean;
  acceptedFormats: string[];
  facultyReviewRequired: boolean;
}

export interface AssessmentCompletionRules {
  passMarkRequired: boolean;
  facultyApprovalRequired: boolean;
  mandatoryDomainTags: AssessmentDomainTag[];
}

export interface AssessmentItem {
  id: string;
  assessmentId: string;
  type: AssessmentItemType;
  prompt: string;
  options: AssessmentOption[];
  correctAnswer: {
    optionIds?: string[];
    freeTextSample?: string;
  };
  modelAnswer: string;
  rationale: string;
  scoringRubric: AssessmentScoringRubric;
  evidenceTier: EvidenceTier;
  facultyReviewRequired: boolean;
  domainTags: AssessmentDomainTag[];
  imageAssetUrl: string | null;
}

export interface AcademyAssessment {
  id: string;
  programId: string;
  levelId: string;
  moduleId: string;
  slug: string;
  title: string;
  assessmentType: AssessmentType;
  status: ContentStatus;
  instructions: string;
  passMark: number;
  retryLimit: number;
  weighting: number;
  facultyReviewRequired: boolean;
  mandatoryDomainTags: AssessmentDomainTag[];
  competencyIds: string[];
  itemIds: string[];
  submissionRules: AssessmentSubmissionRules;
  completionRules: AssessmentCompletionRules;
}
