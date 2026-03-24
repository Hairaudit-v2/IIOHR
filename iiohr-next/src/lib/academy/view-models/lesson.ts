import {
  getCaseStudiesForModule,
  getComplianceNoticesByIds,
  getFacultyNotesByIds,
  getProgram,
  getProgramLessonBySlug,
  getProgramStream,
  getReferencesByIds,
  getResourcesByIds,
} from "@/lib/academy/content-loader";
import { lessonPageLayout } from "@/lib/academy/layouts/page-layouts";

export function getLessonPageViewModel(programSlug: string, lessonSlug: string) {
  const stream = getProgramStream(programSlug);
  const program = getProgram(programSlug);
  const lesson = getProgramLessonBySlug(programSlug, lessonSlug);

  if (!stream || !program || !lesson) {
    return null;
  }

  return {
    stream,
    program,
    lesson,
    caseStudies: getCaseStudiesForModule(programSlug, lesson.moduleId).filter((caseStudy) =>
      lesson.caseStudyIds.includes(caseStudy.id)
    ),
    facultyNotes: getFacultyNotesByIds(programSlug, lesson.facultyNoteIds),
    complianceNotices: getComplianceNoticesByIds(programSlug, lesson.complianceNoticeIds),
    references: getReferencesByIds(programSlug, lesson.referenceIds),
    resources: getResourcesByIds(programSlug, lesson.resourceIds),
    layout: lessonPageLayout,
  };
}
