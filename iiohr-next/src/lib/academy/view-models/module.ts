import {
  getAssessmentsForModule,
  getCaseStudiesForModule,
  getCompetenciesByIds,
  getComplianceNoticesByIds,
  getFacultyNotesByIds,
  getLessonsForModule,
  getProgramModuleBySlug,
  getProgramStream,
  getProgram,
  getPracticalTasksForModule,
  getReferencesByIds,
  getResourcesByIds,
} from "@/lib/academy/content-loader";
import { modulePageLayout } from "@/lib/academy/layouts/page-layouts";

export function getModulePageViewModel(programSlug: string, moduleSlug: string) {
  const stream = getProgramStream(programSlug);
  const program = getProgram(programSlug);
  const academyModule = getProgramModuleBySlug(programSlug, moduleSlug);

  if (!stream || !program || !academyModule) {
    return null;
  }

  return {
    stream,
    program,
    module: academyModule,
    lessons: getLessonsForModule(programSlug, academyModule.id),
    assessments: getAssessmentsForModule(programSlug, academyModule.id),
    caseStudies: getCaseStudiesForModule(programSlug, academyModule.id),
    practicalTasks: getPracticalTasksForModule(programSlug, academyModule.id),
    competencies: getCompetenciesByIds(programSlug, academyModule.competencyIds),
    facultyNotes: getFacultyNotesByIds(programSlug, academyModule.facultyNoteIds),
    complianceNotices: getComplianceNoticesByIds(programSlug, academyModule.complianceNoticeIds),
    references: getReferencesByIds(programSlug, academyModule.referenceIds),
    resources: getResourcesByIds(programSlug, academyModule.resourceIds),
    layout: modulePageLayout,
  };
}
