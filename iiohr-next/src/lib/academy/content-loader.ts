import { getProgramBundleBySlug, getProgramBundles } from "@/lib/academy/content-registry";
import type { AcademyAssessment, AssessmentItem } from "@/lib/academy/assessment-types";
import type {
  AcademyLesson,
  AcademyModule,
  AcademyProgram,
  AcademyReference,
  AcademySection,
  AcademyStream,
  ComplianceNotice,
  DownloadableResource,
  FacultyNote,
} from "@/lib/academy/content-types";
import type { Competency } from "@/lib/academy/competency-types";
import type { CaseStudy, PracticalTask } from "@/lib/academy/compliance-types";

export interface ProgramContentBundle {
  stream: AcademyStream;
  program: AcademyProgram;
  levels: ReturnType<typeof getProgramLevels>;
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
}

function requireProgramBundle(programSlug: string) {
  return getProgramBundleBySlug(programSlug);
}

export function getStreamPrograms(streamSlug: AcademyStream["slug"]): AcademyProgram[] {
  return getProgramBundles()
    .filter((bundle) => bundle.stream.slug === streamSlug)
    .map((bundle) => bundle.program);
}

export function getProgram(programSlug: string): AcademyProgram | null {
  return requireProgramBundle(programSlug)?.program ?? null;
}

export function getProgramStream(programSlug: string): AcademyStream | null {
  return requireProgramBundle(programSlug)?.stream ?? null;
}

export function getProgramLevels(programSlug: string) {
  return requireProgramBundle(programSlug)?.levels ?? [];
}

export function getProgramSections(programSlug: string) {
  return requireProgramBundle(programSlug)?.sections ?? [];
}

export function getProgramModules(programSlug: string) {
  return requireProgramBundle(programSlug)?.modules ?? [];
}

export function getProgramLessons(programSlug: string) {
  return requireProgramBundle(programSlug)?.lessons ?? [];
}

export function getProgramAssessments(programSlug: string) {
  return requireProgramBundle(programSlug)?.assessments ?? [];
}

export function getProgramAssessmentItems(programSlug: string) {
  return requireProgramBundle(programSlug)?.assessmentItems ?? [];
}

export function getProgramCaseStudies(programSlug: string) {
  return requireProgramBundle(programSlug)?.caseStudies ?? [];
}

export function getProgramPracticalTasks(programSlug: string) {
  return requireProgramBundle(programSlug)?.practicalTasks ?? [];
}

export function getProgramCompetencies(programSlug: string) {
  return requireProgramBundle(programSlug)?.competencies ?? [];
}

export function getProgramFacultyNotes(programSlug: string) {
  return requireProgramBundle(programSlug)?.facultyNotes ?? [];
}

export function getProgramComplianceNotices(programSlug: string) {
  return requireProgramBundle(programSlug)?.complianceNotices ?? [];
}

export function getProgramReferences(programSlug: string) {
  return requireProgramBundle(programSlug)?.references ?? [];
}

export function getProgramResources(programSlug: string) {
  return requireProgramBundle(programSlug)?.resources ?? [];
}

export function getProgramContentBundle(programSlug: string): ProgramContentBundle | null {
  const bundle = requireProgramBundle(programSlug);
  if (!bundle) {
    return null;
  }

  return {
    ...bundle,
    levels: bundle.levels,
  };
}

export function getProgramLevelBySlug(programSlug: string, levelSlug: string) {
  return getProgramLevels(programSlug).find((level) => level.slug === levelSlug) ?? null;
}

export function getProgramSectionById(programSlug: string, sectionId: string) {
  return getProgramSections(programSlug).find((section) => section.id === sectionId) ?? null;
}

export function getProgramModuleBySlug(programSlug: string, moduleSlug: string) {
  return getProgramModules(programSlug).find((module) => module.slug === moduleSlug) ?? null;
}

export function getProgramLessonBySlug(programSlug: string, lessonSlug: string) {
  return getProgramLessons(programSlug).find((lesson) => lesson.slug === lessonSlug) ?? null;
}

export function getProgramAssessmentBySlug(programSlug: string, assessmentSlug: string) {
  return getProgramAssessments(programSlug).find((assessment) => assessment.slug === assessmentSlug) ?? null;
}

export function getAssessmentItemsForAssessment(programSlug: string, assessmentId: string) {
  return getProgramAssessmentItems(programSlug).filter((item) => item.assessmentId === assessmentId);
}

export function getLessonsForModule(programSlug: string, moduleId: string) {
  return getProgramLessons(programSlug).filter((lesson) => lesson.moduleId === moduleId);
}

export function getAssessmentsForModule(programSlug: string, moduleId: string) {
  return getProgramAssessments(programSlug).filter((assessment) => assessment.moduleId === moduleId);
}

export function getCaseStudiesForModule(programSlug: string, moduleId: string) {
  return getProgramCaseStudies(programSlug).filter((caseStudy) => caseStudy.moduleId === moduleId);
}

export function getPracticalTasksForModule(programSlug: string, moduleId: string) {
  return getProgramPracticalTasks(programSlug).filter((task) => task.moduleId === moduleId);
}

export function getReferencesByIds(programSlug: string, referenceIds: string[]) {
  const ids = new Set(referenceIds);
  return getProgramReferences(programSlug).filter((reference) => ids.has(reference.id));
}

export function getResourcesByIds(programSlug: string, resourceIds: string[]) {
  const ids = new Set(resourceIds);
  return getProgramResources(programSlug).filter((resource) => ids.has(resource.id));
}

export function getComplianceNoticesByIds(programSlug: string, complianceNoticeIds: string[]) {
  const ids = new Set(complianceNoticeIds);
  return getProgramComplianceNotices(programSlug).filter((notice) => ids.has(notice.id));
}

export function getFacultyNotesByIds(programSlug: string, facultyNoteIds: string[]) {
  const ids = new Set(facultyNoteIds);
  return getProgramFacultyNotes(programSlug).filter((note) => ids.has(note.id));
}

export function getCompetenciesByIds(programSlug: string, competencyIds: string[]) {
  const ids = new Set(competencyIds);
  return getProgramCompetencies(programSlug).filter((competency) => ids.has(competency.id));
}
