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
import doctorComplianceNoticesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/compliance-notices/index.json";
import doctorLevelsJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/levels/index.json";
import doctorProgramJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/index.json";
import legacyCasePromptsJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/case-prompts/index.json";
import legacyLessonsJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/lessons/index.json";
import legacyModulesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/modules/index.json";
import legacyQuizzesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/quizzes/index.json";
import legacyReferencesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/references/index.json";
import legacyResourcesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/resources/index.json";
import legacyVolumeJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-1/index.json";
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
  ComplianceNotice,
  CompletionRule,
  DownloadableResource,
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
    learningObjectives: string[];
  };
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
  };
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

function createDoctorBundle(): ProgramBundle {
  const stream = doctorStreamJson as AcademyStream;
  const program = doctorProgramJson as AcademyProgram;
  const levels = doctorLevelsJson as AcademyLevel[];
  const complianceNotices = doctorComplianceNoticesJson as ComplianceNotice[];
  const legacyModules = legacyModulesJson as LegacyModule[];
  const legacyLessons = legacyLessonsJson as LegacyLesson[];
  const legacyQuizzes = legacyQuizzesJson as LegacyQuiz[];
  const legacyCasePrompts = legacyCasePromptsJson as LegacyCasePrompt[];
  const references = legacyReferencesJson as AcademyReference[];
  const resources = legacyResourcesJson as DownloadableResource[];
  const legacyVolume = legacyVolumeJson as { id: string; title: string; slug: string; status: AcademySection["status"] };

  const section: AcademySection = {
    id: "section_doctors_volume_1",
    programId: program.id,
    levelId: levels[0]?.id ?? "level_doctors_postgraduate_certificate",
    slug: legacyVolume.slug,
    title: legacyVolume.title,
    sequence: 1,
    status: legacyVolume.status,
    overview: "Doctor-facing seed section adapted from the current volume 1 content model.",
    moduleIds: legacyModules.map((module) => module.id),
  };

  const modules: AcademyModule[] = legacyModules.map((module) => ({
    id: module.id,
    programId: program.id,
    levelId: section.levelId,
    sectionId: section.id,
    slug: module.slug,
    title: module.title,
    shortTitle: module.shortTitle,
    sequence: module.moduleNumber,
    status: module.status,
    estimatedStudyMinutes: module.estimatedStudyMinutes,
    moduleOverview: module.overview.summary,
    learningOutcomes: module.overview.learningObjectives,
    competencyIds: [],
    unlockRules: [],
    assessmentRules: legacyQuizzes
      .filter((quiz) => quiz.moduleId === module.id)
      .map((quiz) => ({
        id: `doctor-assessment-rule-${quiz.id}`,
        description: "Pass the linked doctor assessment.",
        requiredAssessmentIds: [quiz.id],
        mandatoryDomainTags: [],
      })),
    facultyNoteIds: [],
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
    levelId: section.levelId,
    moduleId: lesson.moduleId,
    slug: lesson.slug,
    title: lesson.title,
    sequence: lesson.lessonNumber,
    status: lesson.status,
    estimatedStudyMinutes: lesson.estimatedStudyMinutes,
    overview: lesson.body.content.slice(0, 180),
    learningObjectives: lesson.learningObjectives,
    body: lesson.body,
    patientCommunicationExamples: [],
    roleBoundaryNotes: [],
    keyTakeaways: lesson.keyTakeaways,
    redFlags: lesson.redFlags,
    escalationTriggers: [],
    evidenceTier: {
      overall: lesson.evidenceTier.overall,
      summaryNote: lesson.evidenceTier.summaryNote,
      notes: [],
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
    },
  }));

  const assessments: AcademyAssessment[] = legacyQuizzes.map((quiz, index) => ({
    id: quiz.id,
    programId: program.id,
    levelId: section.levelId,
    moduleId: quiz.moduleId,
    slug: quiz.slug,
    title: quiz.title,
    assessmentType: toLegacyAssessmentType(quiz),
    status: quiz.status,
    instructions: "Complete the linked doctor-facing assessment.",
    passMark: quiz.passMark,
    retryLimit: quiz.retries,
    weighting: index === legacyQuizzes.length - 1 ? 10 : 5,
    facultyReviewRequired: quiz.items.some((item) => item.facultyReviewRequired),
    mandatoryDomainTags: [],
    competencyIds: [],
    itemIds: quiz.items.map((item) => item.id),
    submissionRules: {
      allowDraftSave: false,
      acceptedFormats: ["online"],
      facultyReviewRequired: quiz.items.some((item) => item.facultyReviewRequired),
    },
    completionRules: {
      passMarkRequired: true,
      facultyApprovalRequired: quiz.items.some((item) => item.facultyReviewRequired),
      mandatoryDomainTags: [],
    },
  }));

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
    redFlags: [],
    discussionPrompts: casePrompt.discussionPrompts,
    expectedEscalationPath: casePrompt.moderatorNotes,
    linkedCompetencyIds: casePrompt.linkedCompetencies,
    facultyNoteIds: [],
    referenceIds: [],
  }));

  return {
    stream,
    program: {
      ...program,
      sectionIds: [section.id],
      moduleIds: modules.map((module) => module.id),
    },
    levels,
    sections: [section],
    modules,
    lessons,
    assessments,
    assessmentItems,
    caseStudies,
    practicalTasks: [],
    competencies: [],
    facultyNotes: [],
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
