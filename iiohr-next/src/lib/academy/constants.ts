export const contentStatuses = ["draft", "review", "approved", "published", "archived"] as const;
export type ContentStatus = (typeof contentStatuses)[number];

export const academyStreamSlugs = ["doctors", "consultants"] as const;
export type AcademyStreamSlug = (typeof academyStreamSlugs)[number];

export const academyAudiences = [
  "doctor",
  "surgeon",
  "physician",
  "consultant",
  "nurse",
  "patient-coordinator",
  "treatment-coordinator",
  "clinic-manager",
  "senior-patient-facing-staff",
] as const;
export type AcademyAudience = (typeof academyAudiences)[number];

export const awardTypes = [
  "certificate",
  "advanced-certificate",
  "diploma",
  "postgraduate-certificate",
] as const;
export type AwardType = (typeof awardTypes)[number];

export const evidenceTiers = ["A", "B", "C", "consensus"] as const;
export type EvidenceTier = (typeof evidenceTiers)[number];

export const lineageNodeTypes = [
  "stream",
  "program",
  "level",
  "section",
  "module",
  "lesson",
  "assessment",
  "case-study",
  "practical-task",
  "competency",
] as const;
export type LineageNodeType = (typeof lineageNodeTypes)[number];

export const lessonContentFormats = ["richText"] as const;
export type LessonContentFormat = (typeof lessonContentFormats)[number];

export const assessmentTypes = [
  "weekly-quiz",
  "short-answer",
  "image-interpretation",
  "documentation-exercise",
  "consultation-note-task",
  "case-triage-task",
  "ethical-judgement-task",
  "communication-scenario",
  "capstone",
] as const;
export type AssessmentType = (typeof assessmentTypes)[number];

export const assessmentItemTypes = [
  "mcq",
  "multi-select",
  "short-answer",
  "long-answer",
  "image-interpretation",
  "documentation-exercise",
  "consultation-note",
  "case-triage",
  "ethical-judgement",
  "communication-scenario",
] as const;
export type AssessmentItemType = (typeof assessmentItemTypes)[number];

export const assessmentDomainTags = [
  "knowledge",
  "ethics-scope",
  "red-flags",
  "escalation",
  "documentation",
  "communication",
  "triage",
  "consent-support",
  "care-coordination",
] as const;
export type AssessmentDomainTag = (typeof assessmentDomainTags)[number];

export const facultyReviewStatuses = [
  "not-required",
  "pending",
  "in-review",
  "approved",
  "revision-required",
] as const;
export type FacultyReviewStatus = (typeof facultyReviewStatuses)[number];

export const competencyStatuses = [
  "not-started",
  "in-progress",
  "evidence-submitted",
  "faculty-review",
  "achieved",
  "needs-remediation",
] as const;
export type CompetencyStatus = (typeof competencyStatuses)[number];

export const competencyDomains = [
  "consultation-structure",
  "clinical-literacy",
  "ethical-practice",
  "scope-awareness",
  "escalation-safety",
  "patient-communication",
  "documentation-handover",
  "care-coordination",
  "leadership-quality",
] as const;
export type CompetencyDomain = (typeof competencyDomains)[number];

export const complianceNoticeTypes = [
  "scope-of-practice",
  "licensure-boundary",
  "diagnostic-boundary",
  "surgical-training-boundary",
  "consent-boundary",
  "escalation-boundary",
] as const;
export type ComplianceNoticeType = (typeof complianceNoticeTypes)[number];

export const complianceNoticeSeverities = ["info", "caution", "critical"] as const;
export type ComplianceNoticeSeverity = (typeof complianceNoticeSeverities)[number];

export const complianceDisplayModes = ["inline", "banner", "modal", "sidebar"] as const;
export type ComplianceDisplayMode = (typeof complianceDisplayModes)[number];

export const referenceSourceTypes = [
  "guideline",
  "systematic-review",
  "trial",
  "review",
  "textbook",
  "consensus",
] as const;
export type ReferenceSourceType = (typeof referenceSourceTypes)[number];

export const resourceTypes = [
  "pdf-summary",
  "atlas",
  "worksheet",
  "reading-list",
  "manual",
  "template",
  "checklist",
] as const;
export type ResourceType = (typeof resourceTypes)[number];

export const resourceAccessModes = ["public", "enrolled-only"] as const;
export type ResourceAccessMode = (typeof resourceAccessModes)[number];

export const practicalTaskTypes = [
  "roleplay",
  "communication",
  "documentation",
  "case-triage",
  "handover",
  "reflection",
] as const;
export type PracticalTaskType = (typeof practicalTaskTypes)[number];

export const completionRuleTypes = [
  "view",
  "pass-linked-assessment",
  "submit-linked-task",
  "faculty-approval",
  "acknowledge-compliance",
] as const;
export type CompletionRuleType = (typeof completionRuleTypes)[number];
