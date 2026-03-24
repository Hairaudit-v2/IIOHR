import type {
  ComplianceNoticeType,
  FacultyReviewStatus,
  PracticalTaskType,
} from "@/lib/academy/constants";

export interface PracticalTaskRubricCriterion {
  id: string;
  label: string;
  weight: number;
  guidance: string;
}

export interface PracticalTask {
  id: string;
  programId: string;
  moduleId: string;
  slug: string;
  title: string;
  taskType: PracticalTaskType;
  status: "draft" | "review" | "approved" | "published" | "archived";
  instructions: string;
  submissionFormat: string[];
  facultyReviewRequired: boolean;
  rubric: PracticalTaskRubricCriterion[];
  linkedCompetencyIds: string[];
  linkedComplianceNoticeIds: string[];
}

export interface CaseStudy {
  id: string;
  programId: string;
  moduleId: string;
  slug: string;
  title: string;
  status: "draft" | "review" | "approved" | "published" | "archived";
  scenarioSummary: string;
  patientContext: string;
  redFlags: string[];
  discussionPrompts: string[];
  expectedEscalationPath: string;
  linkedCompetencyIds: string[];
  facultyNoteIds: string[];
  referenceIds: string[];
}

export interface FacultyReviewGate {
  status: FacultyReviewStatus;
  summary: string;
}

export interface ScopeSafeCopyBlock {
  title: string;
  body: string;
  noticeType: ComplianceNoticeType;
}
