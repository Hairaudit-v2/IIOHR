export interface LessonChapterNavItem {
  id: string;
  label: string;
}

export interface ConsultantLessonNavInput {
  showScopeStrip: boolean;
  hasRoleBoundaries: boolean;
  showEvidence: boolean;
  hasCommunicationExamples: boolean;
  hasScenarios: boolean;
  hasAssessments: boolean;
  hasReferencesOrResources: boolean;
}

export function buildConsultantLessonChapterNav(input: ConsultantLessonNavInput): LessonChapterNavItem[] {
  const items: LessonChapterNavItem[] = [{ id: "lesson-hero", label: "Overview" }];

  if (input.showScopeStrip) {
    items.push({ id: "lesson-scope", label: "Academy scope" });
  }
  if (input.hasRoleBoundaries) {
    items.push({ id: "lesson-pathway", label: "Role & boundaries" });
  }

  items.push({ id: "lesson-focus", label: "Learning focus" });
  items.push({ id: "lesson-reading", label: "Core reading" });

  if (input.showEvidence) {
    items.push({ id: "lesson-evidence", label: "Evidence tier" });
  }
  if (input.hasCommunicationExamples) {
    items.push({ id: "lesson-communication", label: "Communication" });
  }
  if (input.hasScenarios) {
    items.push({ id: "lesson-scenarios", label: "Scenarios & tasks" });
  }
  if (input.hasAssessments) {
    items.push({ id: "lesson-assessment", label: "Assessment" });
  }

  items.push({ id: "lesson-safety", label: "Safety & escalation" });
  items.push({ id: "lesson-compliance", label: "Compliance" });
  items.push({ id: "lesson-completion", label: "Completion" });

  if (input.hasReferencesOrResources) {
    items.push({ id: "lesson-references", label: "References" });
  }

  return items;
}

export interface ConsultantPilotLessonNavInput extends ConsultantLessonNavInput {
  hasModuleContext: boolean;
  showLessonIntro: boolean;
  hasOutcomes: boolean;
  hasClinicalApplication: boolean;
  hasTakeaways: boolean;
}

/** Chapter rail for consultant gold-standard pilot: extra context bands + knowledge check label. */
export function buildConsultantPilotLessonChapterNav(
  input: ConsultantPilotLessonNavInput
): LessonChapterNavItem[] {
  const items: LessonChapterNavItem[] = [{ id: "lesson-hero", label: "Title" }];

  if (input.showScopeStrip) {
    items.push({ id: "lesson-scope", label: "Academy scope" });
  }
  if (input.hasModuleContext) {
    items.push({ id: "lesson-why", label: "Module context" });
  }
  if (input.showLessonIntro) {
    items.push({ id: "lesson-intro", label: "This lesson" });
  }
  if (input.hasOutcomes) {
    items.push({ id: "lesson-outcomes", label: "Outcomes" });
  }
  if (input.hasRoleBoundaries) {
    items.push({ id: "lesson-pathway", label: "Role & boundaries" });
  }

  items.push({ id: "lesson-reading", label: "Core reading" });

  if (input.showEvidence) {
    items.push({ id: "lesson-evidence", label: "Evidence tier" });
  }
  if (input.hasClinicalApplication) {
    items.push({ id: "lesson-application", label: "Clinical application" });
  }
  if (input.hasTakeaways) {
    items.push({ id: "lesson-takeaways", label: "Key takeaways" });
  }
  if (input.hasAssessments) {
    items.push({ id: "lesson-check", label: "Knowledge check" });
  }

  items.push({ id: "lesson-safety", label: "Safety & escalation" });
  items.push({ id: "lesson-compliance", label: "Compliance" });
  items.push({ id: "lesson-completion", label: "Completion" });

  if (input.hasReferencesOrResources) {
    items.push({ id: "lesson-references", label: "Resources" });
  }

  return items;
}

export interface DoctorLessonNavInput {
  showEvidence: boolean;
  showClinicalReasoning: boolean;
  hasScenarios: boolean;
  hasAssessments: boolean;
  showRedFlags: boolean;
  hasReferencesOrResources: boolean;
}

export function buildDoctorLessonChapterNav(input: DoctorLessonNavInput): LessonChapterNavItem[] {
  const items: LessonChapterNavItem[] = [{ id: "lesson-hero", label: "Overview" }];

  items.push({ id: "lesson-focus", label: "Learning focus" });
  items.push({ id: "lesson-reading", label: "Core reading" });

  if (input.showClinicalReasoning) {
    items.push({ id: "lesson-reasoning", label: "Clinical reasoning" });
  }
  if (input.showEvidence) {
    items.push({ id: "lesson-evidence", label: "Evidence tier" });
  }
  if (input.hasScenarios || input.hasAssessments) {
    items.push({ id: "lesson-scenarios", label: "Scenarios & assessment" });
  }
  if (input.showRedFlags) {
    items.push({ id: "lesson-safety", label: "Red flags" });
  }

  items.push({ id: "lesson-completion", label: "Completion" });

  if (input.hasReferencesOrResources) {
    items.push({ id: "lesson-references", label: "References" });
  }

  items.push({ id: "lesson-compliance", label: "Compliance" });

  return items;
}
