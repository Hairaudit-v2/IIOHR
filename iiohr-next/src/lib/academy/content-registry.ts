import doctorStreamJson from "@/content/academy/streams/doctors/index.json";
import consultantStreamJson from "@/content/academy/streams/consultants/index.json";
import consultantAssessmentItemsJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/assessment-items/index.json";
import consultantAssessmentsJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/assessments/index.json";
import consultantCaseStudiesJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/case-studies/index.json";
import consultantComplianceNoticesJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/compliance-notices/index.json";
import consultantCompetenciesJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/competencies/index.json";
import consultantFacultyNotesJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/faculty-notes/index.json";
import consultantLessonsJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/lessons/index.json";
import consultantLevelsJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/levels/index.json";
import consultantModulesJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/modules/index.json";
import consultantProgramJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/index.json";
import consultantPracticalTasksJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/practical-tasks/index.json";
import consultantReferencesJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/references/index.json";
import consultantResourcesJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/resources/index.json";
import consultantSectionsJson from "@/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/sections/index.json";
import doctorCompetenciesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/competencies/index.json";
import doctorComplianceNoticesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/compliance-notices/index.json";
import doctorFacultyNotesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/faculty-notes/index.json";
import doctorLevelsJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/levels/index.json";
import doctorProgramJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/index.json";
import legacyCasePromptsJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/case-prompts/index.json";
import legacyLessonsJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/lessons/index.json";
import legacyModulesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/modules/index.json";
import legacyQuizzesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/quizzes/index.json";
import legacyReferencesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/references/index.json";
import legacyResourcesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/resources/index.json";
import legacyVolumeJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/index.json";
import legacyCasePromptsVol2Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-2/case-prompts/index.json";
import legacyLessonsVol2Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-2/lessons/index.json";
import legacyModulesVol2Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-2/modules/index.json";
import legacyQuizzesVol2Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-2/quizzes/index.json";
import legacyReferencesVol2Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-2/references/index.json";
import legacyResourcesVol2Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-2/resources/index.json";
import legacyVolume2Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-2/index.json";
import legacyCasePromptsVol3Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-3/case-prompts/index.json";
import legacyLessonsVol3Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-3/lessons/index.json";
import legacyModulesVol3Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-3/modules/index.json";
import legacyQuizzesVol3Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-3/quizzes/index.json";
import legacyReferencesVol3Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-3/references/index.json";
import legacyResourcesVol3Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-3/resources/index.json";
import legacyVolume3Json from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-3/index.json";
import type { AcademyAssessment, AssessmentItem } from "@/lib/academy/assessment-types";
import type { ScopeSafeCopyBlock } from "@/lib/academy/compliance-types";
import type {
  AcademyLesson,
  AcademyLevel,
  AcademyModule,
  AcademyProgram,
  AcademyReference,
  AcademySection,
  AcademyStream,
  ClinicalReasoningBox,
  ComplianceNotice,
  CompletionRule,
  DownloadableResource,
  EvidenceTierNote,
  FacultyNote,
} from "@/lib/academy/content-types";
import type { Competency } from "@/lib/academy/competency-types";
import type { CaseStudy, PracticalTask } from "@/lib/academy/compliance-types";

type LegacyModule = {
  id: string;
  moduleNumber: number;
  slug: string;
  title: string;
  shortTitle: string;
  status: AcademyModule["status"];
  estimatedStudyMinutes: number;
  overview: {
    summary: string;
    clinicalContext?: string;
    learningObjectives: string[];
    keyTakeaways?: string[];
    redFlags?: string[];
    evidenceTierNotes?: Array<{ label: string; tier: string; note: string }>;
  };
};

function buildDoctorModuleOverview(module: LegacyModule): string {
  const parts: string[] = [module.overview.summary, module.overview.clinicalContext].filter(Boolean) as string[];
  const kt = module.overview.keyTakeaways;
  if (kt?.length) {
    parts.push(`Key takeaways\n${kt.map((k) => `• ${k}`).join("\n")}`);
  }
  const rf = module.overview.redFlags;
  if (rf?.length) {
    parts.push(`Clinical cautions\n${rf.map((r) => `• ${r}`).join("\n")}`);
  }
  const etn = module.overview.evidenceTierNotes;
  if (etn?.length) {
    parts.push(
      `Evidence framing\n${etn.map((e) => `• ${e.label} (${e.tier}): ${e.note}`).join("\n")}`
    );
  }
  return parts.join("\n\n");
}

/** First block of body text, trimmed for use as a lesson overview (not a mid-sentence slice). */
function lessonLeadOverview(bodyContent: string, maxLen = 280): string {
  const first = bodyContent.split(/\n\n+/)[0]?.trim().replace(/\s+/g, " ") ?? "";
  if (first.length <= maxLen) {
    return first;
  }
  const cut = first.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  const end = lastSpace > 48 ? lastSpace : maxLen;
  return `${cut.slice(0, end)}…`;
}

const DOCTOR_VOL1_MODULE_COMPETENCIES: Record<string, string[]> = {
  module_foundations_intro: ["doctors_vol1_comp_introduction_scope"],
  module_follicle_biology_scalp_science: ["doctors_vol1_comp_follicle_biology"],
  module_molecular_hormonal_regulation: ["doctors_vol1_comp_molecular_hormonal"],
  module_clinical_consultation_history_taking: ["doctors_vol1_comp_consultation_history"],
};

const DOCTOR_VOL1_MODULE_FACULTY_NOTES: Record<string, string[]> = {
  module_foundations_intro: ["doctors_note_vol1_mod1"],
  module_follicle_biology_scalp_science: ["doctors_note_vol1_mod2"],
  module_molecular_hormonal_regulation: ["doctors_note_vol1_mod3"],
  module_clinical_consultation_history_taking: ["doctors_note_vol1_mod4"],
};

const DOCTOR_VOL2_MODULE_COMPETENCIES: Record<string, string[]> = {
  module_diagnostic_clinical_examination_hair_scalp: ["doctors_vol2_comp_clinical_examination"],
  module_diagnostic_trichoscopy_interpretation: ["doctors_vol2_comp_trichoscopy"],
  module_diagnostic_laboratory_biopsy_logic: ["doctors_vol2_comp_investigations_biopsy"],
  module_diagnostic_male_aga: ["doctors_vol2_comp_male_aga"],
  module_diagnostic_female_pattern_hormonal: ["doctors_vol2_comp_female_pattern"],
};

const DOCTOR_VOL2_MODULE_FACULTY_NOTES: Record<string, string[]> = {
  module_diagnostic_clinical_examination_hair_scalp: ["doctors_note_vol2_mod5"],
  module_diagnostic_trichoscopy_interpretation: ["doctors_note_vol2_mod6"],
  module_diagnostic_laboratory_biopsy_logic: ["doctors_note_vol2_mod7"],
  module_diagnostic_male_aga: ["doctors_note_vol2_mod8"],
  module_diagnostic_female_pattern_hormonal: ["doctors_note_vol2_mod9"],
};

const DOCTOR_VOL3_MODULE_COMPETENCIES: Record<string, string[]> = {
  module_vol3_telogen_effluvium_diffuse_shedding: ["doctors_vol3_comp_telogen_diffuse_shedding"],
  module_vol3_alopecia_areata_immune_mediated: ["doctors_vol3_comp_alopecia_areata"],
  module_vol3_hair_shaft_breakage_syndromes: ["doctors_vol3_comp_shaft_breakage"],
  module_vol3_principles_cicatricial_alopecia: ["doctors_vol3_comp_cicatricial_principles"],
  module_vol3_lymphocytic_cicatricial_alopecias: ["doctors_vol3_comp_lymphocytic_cicatricial"],
  module_vol3_neutrophilic_mixed_cicatricial: ["doctors_vol3_comp_neutrophilic_cicatricial"],
  module_vol3_inflammatory_infectious_scalp: ["doctors_vol3_comp_scalp_inflammatory_infectious"],
};

const DOCTOR_VOL3_MODULE_FACULTY_NOTES: Record<string, string[]> = {
  module_vol3_telogen_effluvium_diffuse_shedding: ["doctors_note_vol3_mod10"],
  module_vol3_alopecia_areata_immune_mediated: ["doctors_note_vol3_mod11"],
  module_vol3_hair_shaft_breakage_syndromes: ["doctors_note_vol3_mod12"],
  module_vol3_principles_cicatricial_alopecia: ["doctors_note_vol3_mod13"],
  module_vol3_lymphocytic_cicatricial_alopecias: ["doctors_note_vol3_mod14"],
  module_vol3_neutrophilic_mixed_cicatricial: ["doctors_note_vol3_mod15"],
  module_vol3_inflammatory_infectious_scalp: ["doctors_note_vol3_mod16"],
};

type LegacyLesson = {
  id: string;
  moduleId: string;
  lessonNumber: number;
  slug: string;
  title: string;
  status: AcademyLesson["status"];
  estimatedStudyMinutes: number;
  learningObjectives: string[];
  body: AcademyLesson["body"];
  keyTakeaways: string[];
  redFlags: string[];
  evidenceTier: {
    overall: AcademyLesson["evidenceTier"]["overall"];
    summaryNote: string;
    notes?: EvidenceTierNote[];
  };
  clinicalReasoningBoxes?: ClinicalReasoningBox[];
  downloadableResourceIds: string[];
  quizId: string | null;
  casePromptIds: string[];
  referenceIds: string[];
  displayFlags: {
    showEvidencePanel: boolean;
    showRedFlagsPanel: boolean;
    showClinicalReasoning: boolean;
  };
};

type LegacyQuiz = {
  id: string;
  slug: string;
  moduleId: string;
  title: string;
  status: AcademyAssessment["status"];
  passMark: number;
  retries: number;
  items: Array<{
    id: string;
    type: "mcq" | "image-interpretation" | "short-answer" | "case-reasoning";
    stem: string;
    options: AssessmentItem["options"];
    correctAnswer: AssessmentItem["correctAnswer"];
    rationale: string;
    evidenceTier: AssessmentItem["evidenceTier"];
    facultyReviewRequired: boolean;
  }>;
};

type LegacyCasePrompt = {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  status: CaseStudy["status"];
  clinicalScenario: string;
  discussionPrompts: string[];
  moderatorNotes: string;
  linkedCompetencies: string[];
  evidenceTier: string;
  redFlags?: string[];
};

type ProgramBundle = {
  stream: AcademyStream;
  program: AcademyProgram;
  levels: AcademyLevel[];
  sections: AcademySection[];
  modules: AcademyModule[];
  lessons: AcademyLesson[];
  assessments: AcademyAssessment[];
  assessmentItems: AssessmentItem[];
  caseStudies: CaseStudy[];
  practicalTasks: PracticalTask[];
  competencies: Competency[];
  facultyNotes: FacultyNote[];
  complianceNotices: ComplianceNotice[];
  references: AcademyReference[];
  resources: DownloadableResource[];
};

function toLegacyAssessmentType(
  quiz: LegacyQuiz
): AcademyAssessment["assessmentType"] {
  if (quiz.items.some((item) => item.type === "image-interpretation")) return "image-interpretation";
  if (quiz.items.some((item) => item.type === "short-answer")) return "short-answer";
  if (quiz.items.some((item) => item.type === "case-reasoning")) return "case-triage-task";
  return "weekly-quiz";
}

function createLegacyCompletionRules(hasAssessment: boolean): CompletionRule[] {
  const rules: CompletionRule[] = [
    {
      id: "legacy-view-rule",
      type: "view",
      description: "Complete the lesson reading.",
      required: true,
    },
  ];

  if (hasAssessment) {
    rules.push({
      id: "legacy-assessment-rule",
      type: "pass-linked-assessment",
      description: "Pass the linked assessment.",
      required: true,
    });
  }

  return rules;
}

type DoctorVolumeMeta = { slug: string; title: string; status: AcademySection["status"] };

function buildDoctorVolumeRuntime(params: {
  program: AcademyProgram;
  levelId: string;
  complianceNotices: ComplianceNotice[];
  sectionId: string;
  sectionSequence: number;
  volumeMeta: DoctorVolumeMeta;
  sectionOverview: string;
  legacyModules: LegacyModule[];
  legacyLessons: LegacyLesson[];
  legacyQuizzes: LegacyQuiz[];
  legacyCasePrompts: LegacyCasePrompt[];
  references: AcademyReference[];
  resources: DownloadableResource[];
  moduleCompetencies: Record<string, string[]>;
  moduleFacultyNotes: Record<string, string[]>;
  assessmentVolumeLabel: string;
}): {
  section: AcademySection;
  modules: AcademyModule[];
  lessons: AcademyLesson[];
  assessments: AcademyAssessment[];
  assessmentItems: AssessmentItem[];
  caseStudies: CaseStudy[];
} {
  const {
    program,
    levelId,
    complianceNotices,
    sectionId,
    sectionSequence,
    volumeMeta,
    sectionOverview,
    legacyModules,
    legacyLessons,
    legacyQuizzes,
    legacyCasePrompts,
    references,
    resources,
    moduleCompetencies,
    moduleFacultyNotes,
    assessmentVolumeLabel,
  } = params;

  const section: AcademySection = {
    id: sectionId,
    programId: program.id,
    levelId,
    slug: volumeMeta.slug,
    title: volumeMeta.title,
    sequence: sectionSequence,
    status: volumeMeta.status,
    overview: sectionOverview,
    moduleIds: legacyModules.map((module) => module.id),
  };

  const moduleTitleById = new Map(legacyModules.map((m) => [m.id, m.title]));

  const modules: AcademyModule[] = legacyModules.map((module) => ({
    id: module.id,
    programId: program.id,
    levelId,
    sectionId: section.id,
    slug: module.slug,
    title: module.title,
    shortTitle: module.shortTitle,
    sequence: module.moduleNumber,
    status: module.status,
    estimatedStudyMinutes: module.estimatedStudyMinutes,
    moduleOverview: buildDoctorModuleOverview(module),
    learningOutcomes: module.overview.learningObjectives,
    competencyIds: moduleCompetencies[module.id] ?? [],
    unlockRules: [],
    assessmentRules: legacyQuizzes
      .filter((quiz) => quiz.moduleId === module.id)
      .map((quiz) => ({
        id: `doctor-assessment-rule-${quiz.id}`,
        description: "Pass the linked doctor assessment.",
        requiredAssessmentIds: [quiz.id],
        mandatoryDomainTags: [],
      })),
    facultyNoteIds: moduleFacultyNotes[module.id] ?? [],
    complianceNoticeIds: complianceNotices.map((notice) => notice.id),
    lessonIds: legacyLessons.filter((lesson) => lesson.moduleId === module.id).map((lesson) => lesson.id),
    assessmentIds: legacyQuizzes.filter((quiz) => quiz.moduleId === module.id).map((quiz) => quiz.id),
    caseStudyIds: legacyCasePrompts.filter((casePrompt) => casePrompt.moduleId === module.id).map((casePrompt) => casePrompt.id),
    practicalTaskIds: [],
    referenceIds: references.filter((reference) => reference.parentId === module.id).map((reference) => reference.id),
    resourceIds: resources.filter((resource) => resource.parentId === module.id).map((resource) => resource.id),
  }));

  const lessons: AcademyLesson[] = legacyLessons.map((lesson) => ({
    id: lesson.id,
    programId: program.id,
    levelId,
    moduleId: lesson.moduleId,
    slug: lesson.slug,
    title: lesson.title,
    sequence: lesson.lessonNumber,
    status: lesson.status,
    estimatedStudyMinutes: lesson.estimatedStudyMinutes,
    overview: lessonLeadOverview(lesson.body.content),
    learningObjectives: lesson.learningObjectives,
    body: lesson.body,
    patientCommunicationExamples: [],
    roleBoundaryNotes: [],
    clinicalReasoningBoxes: lesson.clinicalReasoningBoxes,
    keyTakeaways: lesson.keyTakeaways,
    redFlags: lesson.redFlags,
    escalationTriggers: [],
    evidenceTier: {
      overall: lesson.evidenceTier.overall,
      summaryNote: lesson.evidenceTier.summaryNote,
      notes: lesson.evidenceTier.notes ?? [],
    },
    facultyNoteIds: [],
    complianceNoticeIds: complianceNotices.map((notice) => notice.id),
    referenceIds: lesson.referenceIds,
    resourceIds: lesson.downloadableResourceIds,
    assessmentIds: lesson.quizId ? [lesson.quizId] : [],
    caseStudyIds: lesson.casePromptIds,
    practicalTaskIds: [],
    completionRules: createLegacyCompletionRules(Boolean(lesson.quizId)),
    displayFlags: {
      showEvidencePanel: lesson.displayFlags.showEvidencePanel,
      showRedFlagsPanel: lesson.displayFlags.showRedFlagsPanel,
      showEscalationPanel: false,
      showFacultyNotes: false,
      showCompliancePanel: true,
      showClinicalReasoning: lesson.displayFlags.showClinicalReasoning,
    },
  }));

  const assessments: AcademyAssessment[] = legacyQuizzes.map((quiz) => {
    const modTitle = moduleTitleById.get(quiz.moduleId) ?? "this module";
    const facultyItems = quiz.items.some((item) => item.facultyReviewRequired);
    return {
      id: quiz.id,
      programId: program.id,
      levelId,
      moduleId: quiz.moduleId,
      slug: quiz.slug,
      title: quiz.title,
      assessmentType: toLegacyAssessmentType(quiz),
      status: quiz.status,
      instructions: `Complete the assessment for "${modTitle}". Demonstrate clinical reasoning aligned to ${assessmentVolumeLabel}. Pass mark ${quiz.passMark}%.${facultyItems ? " At least one item requires faculty review before the attempt is finalised." : ""}`,
      passMark: quiz.passMark,
      retryLimit: quiz.retries,
      weighting: 5,
      facultyReviewRequired: facultyItems,
      mandatoryDomainTags: [],
      competencyIds: moduleCompetencies[quiz.moduleId] ?? [],
      itemIds: quiz.items.map((item) => item.id),
      submissionRules: {
        allowDraftSave: false,
        acceptedFormats: ["online"],
        facultyReviewRequired: facultyItems,
      },
      completionRules: {
        passMarkRequired: true,
        facultyApprovalRequired: facultyItems,
        mandatoryDomainTags: [],
      },
    };
  });

  const assessmentItems: AssessmentItem[] = legacyQuizzes.flatMap((quiz) =>
    quiz.items.map((item) => ({
      id: item.id,
      assessmentId: quiz.id,
      type:
        item.type === "case-reasoning"
          ? "case-triage"
          : item.type === "short-answer"
            ? "short-answer"
            : item.type,
      prompt: item.stem,
      options: item.options,
      correctAnswer: item.correctAnswer,
      modelAnswer: item.correctAnswer.freeTextSample ?? "",
      rationale: item.rationale,
      scoringRubric: {
        maxScore: 1,
        criteria: [
          {
            id: `rubric-${item.id}`,
            label: "Assessment item performance",
            weight: 1,
            guidance: "Evaluate against the supplied rationale.",
          },
        ],
      },
      evidenceTier: item.evidenceTier,
      facultyReviewRequired: item.facultyReviewRequired,
      domainTags: [],
      imageAssetUrl: null,
    }))
  );

  const caseStudies: CaseStudy[] = legacyCasePrompts.map((casePrompt) => ({
    id: casePrompt.id,
    programId: program.id,
    moduleId: casePrompt.moduleId,
    slug: casePrompt.slug,
    title: casePrompt.title,
    status: casePrompt.status,
    scenarioSummary: casePrompt.clinicalScenario,
    patientContext: casePrompt.clinicalScenario,
    redFlags: casePrompt.redFlags ?? [],
    discussionPrompts: casePrompt.discussionPrompts,
    expectedEscalationPath: casePrompt.moderatorNotes,
    linkedCompetencyIds: casePrompt.linkedCompetencies,
    facultyNoteIds: [],
    referenceIds: [],
  }));

  return { section, modules, lessons, assessments, assessmentItems, caseStudies };
}

function createDoctorBundle(): ProgramBundle {
  const stream = doctorStreamJson as AcademyStream;
  const program = doctorProgramJson as AcademyProgram;
  const levels = doctorLevelsJson as AcademyLevel[];
  const complianceNotices = doctorComplianceNoticesJson as ComplianceNotice[];
  const competencies = doctorCompetenciesJson as Competency[];
  const facultyNotes = doctorFacultyNotesJson as FacultyNote[];

  const levelId = levels[0]?.id ?? "level_doctors_postgraduate_certificate";
  const legacyVolume = legacyVolumeJson as DoctorVolumeMeta;
  const legacyVolume2 = legacyVolume2Json as DoctorVolumeMeta;
  const legacyVolume3 = legacyVolume3Json as DoctorVolumeMeta;

  const vol1 = buildDoctorVolumeRuntime({
    program,
    levelId,
    complianceNotices,
    sectionId: "section_doctors_volume_1",
    sectionSequence: 1,
    volumeMeta: legacyVolume,
    sectionOverview:
      "Foundations of Clinical Trichology (Volume 1): physician-led scope, follicular science, molecular and hormonal regulation, and structured consultation—aligned to the academy Volume 1 teaching manual.",
    legacyModules: legacyModulesJson as LegacyModule[],
    legacyLessons: legacyLessonsJson as LegacyLesson[],
    legacyQuizzes: legacyQuizzesJson as LegacyQuiz[],
    legacyCasePrompts: legacyCasePromptsJson as LegacyCasePrompt[],
    references: legacyReferencesJson as AcademyReference[],
    resources: legacyResourcesJson as DownloadableResource[],
    moduleCompetencies: DOCTOR_VOL1_MODULE_COMPETENCIES,
    moduleFacultyNotes: DOCTOR_VOL1_MODULE_FACULTY_NOTES,
    assessmentVolumeLabel: "Volume 1 — Foundations of Clinical Trichology",
  });

  const vol2 = buildDoctorVolumeRuntime({
    program,
    levelId,
    complianceNotices,
    sectionId: "section_doctors_volume_2",
    sectionSequence: 2,
    volumeMeta: legacyVolume2,
    sectionOverview:
      "Diagnostic Trichology and Pattern Hair Loss Medicine (Volume 2): structured examination, trichoscopy, phenotype-led investigation and biopsy logic, and male and female pattern hair loss medicine—aligned to the academy Volume 2 teaching manual.",
    legacyModules: legacyModulesVol2Json as LegacyModule[],
    legacyLessons: legacyLessonsVol2Json as LegacyLesson[],
    legacyQuizzes: legacyQuizzesVol2Json as LegacyQuiz[],
    legacyCasePrompts: legacyCasePromptsVol2Json as LegacyCasePrompt[],
    references: legacyReferencesVol2Json as AcademyReference[],
    resources: legacyResourcesVol2Json as DownloadableResource[],
    moduleCompetencies: DOCTOR_VOL2_MODULE_COMPETENCIES,
    moduleFacultyNotes: DOCTOR_VOL2_MODULE_FACULTY_NOTES,
    assessmentVolumeLabel: "Volume 2 — Diagnostic Trichology and Pattern Hair Loss Medicine",
  });

  const vol3 = buildDoctorVolumeRuntime({
    program,
    levelId,
    complianceNotices,
    sectionId: "section_doctors_volume_3",
    sectionSequence: 3,
    volumeMeta: legacyVolume3,
    sectionOverview:
      "Diffuse Shedding, Cicatricial Alopecia, and Scalp Disease (Volume 3): telogen effluvium and diffuse shedding; alopecia areata; hair shaft and breakage disorders; principles and subtypes of cicatricial alopecia; neutrophilic scarring folliculitis; and inflammatory and infectious scalp disease—aligned to the academy Volume 3 teaching manual.",
    legacyModules: legacyModulesVol3Json as LegacyModule[],
    legacyLessons: legacyLessonsVol3Json as LegacyLesson[],
    legacyQuizzes: legacyQuizzesVol3Json as LegacyQuiz[],
    legacyCasePrompts: legacyCasePromptsVol3Json as LegacyCasePrompt[],
    references: legacyReferencesVol3Json as AcademyReference[],
    resources: legacyResourcesVol3Json as DownloadableResource[],
    moduleCompetencies: DOCTOR_VOL3_MODULE_COMPETENCIES,
    moduleFacultyNotes: DOCTOR_VOL3_MODULE_FACULTY_NOTES,
    assessmentVolumeLabel: "Volume 3 — Diffuse Shedding, Cicatricial Alopecia, and Scalp Disease",
  });

  // Certificate weighted score: last assessment in the merged array gets weight 10; others 5.
  // When adding Volume 4+, revisit this rule so the final quiz is not arbitrarily “most important.”
  const mergedAssessments = [...vol1.assessments, ...vol2.assessments, ...vol3.assessments].map(
    (assessment, index, arr) => ({
      ...assessment,
      weighting: index === arr.length - 1 ? 10 : 5,
    })
  );

  const references = [
    ...(legacyReferencesJson as AcademyReference[]),
    ...(legacyReferencesVol2Json as AcademyReference[]),
    ...(legacyReferencesVol3Json as AcademyReference[]),
  ];
  const resources = [
    ...(legacyResourcesJson as DownloadableResource[]),
    ...(legacyResourcesVol2Json as DownloadableResource[]),
    ...(legacyResourcesVol3Json as DownloadableResource[]),
  ];

  return {
    stream,
    program: {
      ...program,
      sectionIds: [vol1.section.id, vol2.section.id, vol3.section.id],
      moduleIds: [...vol1.modules, ...vol2.modules, ...vol3.modules].map((module) => module.id),
      competencyIds: competencies.map((c) => c.id),
    },
    levels,
    sections: [vol1.section, vol2.section, vol3.section],
    modules: [...vol1.modules, ...vol2.modules, ...vol3.modules],
    lessons: [...vol1.lessons, ...vol2.lessons, ...vol3.lessons],
    assessments: mergedAssessments,
    assessmentItems: [...vol1.assessmentItems, ...vol2.assessmentItems, ...vol3.assessmentItems],
    caseStudies: [...vol1.caseStudies, ...vol2.caseStudies, ...vol3.caseStudies],
    practicalTasks: [],
    competencies,
    facultyNotes,
    complianceNotices,
    references,
    resources,
  };
}

function createConsultantBundle(): ProgramBundle {
  return {
    stream: consultantStreamJson as AcademyStream,
    program: consultantProgramJson as AcademyProgram,
    levels: consultantLevelsJson as AcademyLevel[],
    sections: consultantSectionsJson as AcademySection[],
    modules: consultantModulesJson as AcademyModule[],
    lessons: consultantLessonsJson as AcademyLesson[],
    assessments: consultantAssessmentsJson as AcademyAssessment[],
    assessmentItems: consultantAssessmentItemsJson as AssessmentItem[],
    caseStudies: consultantCaseStudiesJson as CaseStudy[],
    practicalTasks: consultantPracticalTasksJson as PracticalTask[],
    competencies: consultantCompetenciesJson as Competency[],
    facultyNotes: consultantFacultyNotesJson as FacultyNote[],
    complianceNotices: consultantComplianceNoticesJson as ComplianceNotice[],
    references: consultantReferencesJson as AcademyReference[],
    resources: consultantResourcesJson as DownloadableResource[],
  };
}

const programBundles = [createDoctorBundle(), createConsultantBundle()];

export function getAcademyStreams(): AcademyStream[] {
  return programBundles.map((bundle) => bundle.stream);
}

export function getProgramBundles(): ProgramBundle[] {
  return programBundles;
}

export function getProgramBundleBySlug(programSlug: string): ProgramBundle | null {
  return programBundles.find((bundle) => bundle.program.slug === programSlug) ?? null;
}

export function getProgramBundleByStream(streamSlug: AcademyStream["slug"]): ProgramBundle[] {
  return programBundles.filter((bundle) => bundle.stream.slug === streamSlug);
}

export const academyScopeSafeCopy: ScopeSafeCopyBlock[] = [
  {
    title: "Competency in support, education, and care coordination",
    body: "The consultant stream develops competency in consultation support, patient education, documentation, and care coordination.",
    noticeType: "scope-of-practice",
  },
  {
    title: "No independent diagnostic authority",
    body: "The consultant stream does not grant independent diagnostic authority.",
    noticeType: "diagnostic-boundary",
  },
  {
    title: "Not a substitute for surgical training",
    body: "The consultant stream does not replace regulated surgical training or medical licensure.",
    noticeType: "surgical-training-boundary",
  },
];
