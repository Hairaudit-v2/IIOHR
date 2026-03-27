import {
  getAssessmentsByIds,
  getCaseStudiesForModule,
  getComplianceNoticesByIds,
  getFacultyNotesByIds,
  getLessonsForModule,
  getPracticalTasksByIds,
  getProgram,
  getProgramLessonBySlug,
  getProgramModules,
  getProgramStream,
  getReferencesByIds,
  getResourcesByIds,
} from "@/lib/academy/content-loader";
import { lessonPageLayout } from "@/lib/academy/layouts/page-layouts";

export type LessonPageViewModel = NonNullable<ReturnType<typeof getLessonPageViewModel>>;

export function getLessonPageViewModel(programSlug: string, lessonSlug: string) {
  const stream = getProgramStream(programSlug);
  const program = getProgram(programSlug);
  const lesson = getProgramLessonBySlug(programSlug, lessonSlug);

  if (!stream || !program || !lesson) {
    return null;
  }

  const moduleLessons = getLessonsForModule(programSlug, lesson.moduleId).sort(
    (a, b) => a.sequence - b.sequence
  );
  const lessonIndex = moduleLessons.findIndex((l) => l.id === lesson.id);
  const moduleRow = getProgramModules(programSlug).find((m) => m.id === lesson.moduleId) ?? null;

  return {
    stream,
    program,
    lesson,
    caseStudies: getCaseStudiesForModule(programSlug, lesson.moduleId).filter((caseStudy) =>
      lesson.caseStudyIds.includes(caseStudy.id)
    ),
    practicalTasks: getPracticalTasksByIds(programSlug, lesson.practicalTaskIds),
    linkedAssessments: getAssessmentsByIds(programSlug, lesson.assessmentIds),
    facultyNotes: getFacultyNotesByIds(programSlug, lesson.facultyNoteIds),
    complianceNotices: getComplianceNoticesByIds(programSlug, lesson.complianceNoticeIds),
    programComplianceNotices: getComplianceNoticesByIds(programSlug, program.complianceNoticeIds),
    references: getReferencesByIds(programSlug, lesson.referenceIds),
    resources: getResourcesByIds(programSlug, lesson.resourceIds),
    layout: lessonPageLayout,
    moduleForLesson: moduleRow,
    lessonSequence:
      lessonIndex >= 0
        ? {
            position: lessonIndex + 1,
            total: moduleLessons.length,
            prevLesson: lessonIndex > 0 ? moduleLessons[lessonIndex - 1]! : null,
            nextLesson:
              lessonIndex < moduleLessons.length - 1 ? moduleLessons[lessonIndex + 1]! : null,
          }
        : null,
  };
}
