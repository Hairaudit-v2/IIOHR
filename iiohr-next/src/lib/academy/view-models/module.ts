import {
  getAssessmentsForModule,
  getCaseStudiesForModule,
  getCompetenciesByIds,
  getComplianceNoticesByIds,
  getFacultyNotesByIds,
  getLessonsForModule,
  getProgramModuleBySlug,
  getProgramModules,
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

  const order = program.moduleIds;
  const modIndex = order.indexOf(academyModule.id);
  const modulesById = getProgramModules(programSlug);
  const resolveModule = (id: string) => modulesById.find((m) => m.id === id) ?? null;

  const lessons = getLessonsForModule(programSlug, academyModule.id).sort(
    (a, b) => a.sequence - b.sequence
  );
  const assessmentsRaw = getAssessmentsForModule(programSlug, academyModule.id);
  const assessmentOrder = new Map(academyModule.assessmentIds.map((id, i) => [id, i]));
  const assessments = [...assessmentsRaw].sort(
    (a, b) => (assessmentOrder.get(a.id) ?? 999) - (assessmentOrder.get(b.id) ?? 999)
  );

  return {
    stream,
    program,
    module: academyModule,
    lessons,
    assessments,
    caseStudies: getCaseStudiesForModule(programSlug, academyModule.id),
    practicalTasks: getPracticalTasksForModule(programSlug, academyModule.id),
    competencies: getCompetenciesByIds(programSlug, academyModule.competencyIds),
    facultyNotes: getFacultyNotesByIds(programSlug, academyModule.facultyNoteIds),
    complianceNotices: getComplianceNoticesByIds(programSlug, academyModule.complianceNoticeIds),
    programComplianceNotices: getComplianceNoticesByIds(programSlug, program.complianceNoticeIds),
    references: getReferencesByIds(programSlug, academyModule.referenceIds),
    resources: getResourcesByIds(programSlug, academyModule.resourceIds),
    layout: modulePageLayout,
    moduleSequence:
      modIndex >= 0
        ? {
            position: modIndex + 1,
            total: order.length,
            prevModule: modIndex > 0 ? resolveModule(order[modIndex - 1]!) : null,
            nextModule: modIndex < order.length - 1 ? resolveModule(order[modIndex + 1]!) : null,
          }
        : null,
  };
}
