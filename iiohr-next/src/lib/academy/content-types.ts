import type {
  AcademyAudience,
  AcademyStreamSlug,
  AwardType,
  CompletionRuleType,
  ComplianceDisplayMode,
  ComplianceNoticeSeverity,
  ContentStatus,
  EvidenceTier,
  LessonContentFormat,
  LineageNodeType,
  ReferenceSourceType,
  ResourceAccessMode,
  ResourceType,
} from "@/lib/academy/constants";

export interface RichTextBlock {
  format: LessonContentFormat;
  content: string;
}

export interface EvidenceTierNote {
  label: string;
  tier: EvidenceTier;
  note: string;
}

export interface CurriculumLink {
  type: LineageNodeType;
  id: string;
}

export interface CompletionRule {
  id: string;
  type: CompletionRuleType;
  description: string;
  required: boolean;
}

export interface UnlockRule {
  id: string;
  description: string;
  dependsOnType: LineageNodeType;
  dependsOnId: string;
}

export interface AssessmentRule {
  id: string;
  description: string;
  requiredAssessmentIds: string[];
  mandatoryDomainTags: string[];
}

export interface DisplayFlags {
  showEvidencePanel: boolean;
  showRedFlagsPanel: boolean;
  showEscalationPanel: boolean;
  showFacultyNotes: boolean;
  showCompliancePanel: boolean;
}

export interface PatientCommunicationExample {
  id: string;
  title: string;
  example: string;
  rationale: string;
}

export interface RoleBoundaryNote {
  id: string;
  title: string;
  note: string;
}

export interface EscalationTrigger {
  id: string;
  title: string;
  trigger: string;
  action: string;
}

export interface ProgramDuration {
  deliveryWindowMonths: number | null;
  estimatedStudyHours: number | null;
  pacingModel: string;
}

export interface ProgramCallToAction {
  href: string;
  label: string;
}

export interface AcademyStream {
  id: string;
  slug: AcademyStreamSlug;
  title: string;
  shortTitle: string;
  status: ContentStatus;
  audiences: AcademyAudience[];
  positioning: string;
  guidingPrinciples: string[];
  complianceNoticeIds: string[];
  programIds: string[];
  brandProfiles: string[];
}

export interface AcademyProgram {
  id: string;
  streamSlug: AcademyStreamSlug;
  slug: string;
  title: string;
  workingTitle: string;
  awardType: AwardType;
  status: ContentStatus;
  overview: string;
  whoItsFor: string[];
  whyItMatters: string[];
  deliveryModel: string[];
  certificationSummary: string[];
  clinicLicensingSummary: string[];
  faqSummary: string[];
  applyCta: ProgramCallToAction;
  duration: ProgramDuration;
  levelIds: string[];
  sectionIds: string[];
  moduleIds: string[];
  competencyIds: string[];
  complianceNoticeIds: string[];
}

export interface AcademyLevel {
  id: string;
  programId: string;
  slug: string;
  title: string;
  awardLabel: string;
  sequence: number;
  status: ContentStatus;
  overview: string;
  entryRequirements: string[];
  progressionRules: string[];
  completionRules: string[];
  sectionIds: string[];
  moduleIds: string[];
  competencyIds: string[];
  certificateTemplateKey: string;
  badgeTemplateKey: string;
}

export interface AcademySection {
  id: string;
  programId: string;
  levelId: string;
  slug: string;
  title: string;
  sequence: number;
  status: ContentStatus;
  overview: string;
  moduleIds: string[];
}

export interface AcademyModule {
  id: string;
  programId: string;
  levelId: string;
  sectionId: string;
  slug: string;
  title: string;
  shortTitle: string;
  sequence: number;
  status: ContentStatus;
  estimatedStudyMinutes: number;
  moduleOverview: string;
  learningOutcomes: string[];
  competencyIds: string[];
  unlockRules: UnlockRule[];
  assessmentRules: AssessmentRule[];
  facultyNoteIds: string[];
  complianceNoticeIds: string[];
  lessonIds: string[];
  assessmentIds: string[];
  caseStudyIds: string[];
  practicalTaskIds: string[];
  referenceIds: string[];
  resourceIds: string[];
}

export interface AcademyLesson {
  id: string;
  programId: string;
  levelId: string;
  moduleId: string;
  slug: string;
  title: string;
  sequence: number;
  status: ContentStatus;
  estimatedStudyMinutes: number;
  overview: string;
  learningObjectives: string[];
  body: RichTextBlock;
  patientCommunicationExamples: PatientCommunicationExample[];
  roleBoundaryNotes: RoleBoundaryNote[];
  keyTakeaways: string[];
  redFlags: string[];
  escalationTriggers: EscalationTrigger[];
  evidenceTier: {
    overall: EvidenceTier;
    summaryNote: string;
    notes: EvidenceTierNote[];
  };
  facultyNoteIds: string[];
  complianceNoticeIds: string[];
  referenceIds: string[];
  resourceIds: string[];
  assessmentIds: string[];
  caseStudyIds: string[];
  practicalTaskIds: string[];
  completionRules: CompletionRule[];
  displayFlags: DisplayFlags;
}

export interface FacultyNote {
  id: string;
  parentType: LineageNodeType;
  parentId: string;
  title: string;
  note: string;
  visibility: "faculty-only" | "learner-visible";
  reviewPurpose: string;
}

export interface ComplianceNotice {
  id: string;
  programId: string;
  noticeType: string;
  title: string;
  body: string;
  severity: ComplianceNoticeSeverity;
  appliesTo: LineageNodeType[];
  displayMode: ComplianceDisplayMode;
}

export interface AcademyReference {
  id: string;
  parentType: LineageNodeType;
  parentId: string;
  citation: string;
  sourceType: ReferenceSourceType;
  year: number;
  url: string;
  notes: string;
  evidenceTier: EvidenceTier;
}

export interface DownloadableResource {
  id: string;
  parentType: LineageNodeType;
  parentId: string;
  title: string;
  resourceType: ResourceType;
  fileName: string;
  fileUrl: string;
  version: string;
  access: ResourceAccessMode;
  description: string;
}

export interface AcademyPageLayoutSection {
  id: string;
  label: string;
  emphasis: "primary" | "supporting" | "safety";
  description?: string;
}

export interface AcademyPageLayout {
  page: "program" | "level" | "module" | "lesson" | "assessment";
  tone: "premium-clinical-academic";
  sections: AcademyPageLayoutSection[];
}

export interface CurriculumNodeSummary {
  id: string;
  slug: string;
  title: string;
  status: ContentStatus;
}

export interface StreamRouteContext {
  stream: AcademyStream;
  program: AcademyProgram;
}
