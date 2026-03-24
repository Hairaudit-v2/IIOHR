import {
  getAssessmentsForModule,
  getCaseStudiesForModule,
  getLessonsForModule,
  getProgram,
  getProgramLevels,
  getProgramModules,
  getPracticalTasksForModule,
  getProgramSections,
  getProgramStream,
} from "@/lib/academy/content-loader";

export function getCurriculumMap(programSlug: string) {
  const stream = getProgramStream(programSlug);
  const program = getProgram(programSlug);

  if (!stream || !program) {
    return null;
  }

  const levels = getProgramLevels(programSlug);
  const sections = getProgramSections(programSlug);
  const modules = getProgramModules(programSlug);

  return {
    stream,
    program,
    levels: levels.map((level) => ({
      ...level,
      sections: sections
        .filter((section) => section.levelId === level.id)
        .map((section) => ({
          ...section,
          modules: modules
            .filter((module) => module.sectionId === section.id)
            .map((module) => ({
              ...module,
              lessons: getLessonsForModule(programSlug, module.id),
              assessments: getAssessmentsForModule(programSlug, module.id),
              caseStudies: getCaseStudiesForModule(programSlug, module.id),
              practicalTasks: getPracticalTasksForModule(programSlug, module.id),
            })),
        })),
    })),
  };
}
