import {
  getProgram,
  getProgramAssessmentBySlug,
  getProgramLessonBySlug,
  getProgramLevelBySlug,
  getProgramModuleBySlug,
  getProgramStream,
} from "@/lib/academy/content-loader";

export interface BreadcrumbItem {
  href: string;
  label: string;
}

export function buildStreamBreadcrumbs(
  streamSlug: "doctors" | "consultants",
  items: BreadcrumbItem[]
): BreadcrumbItem[] {
  return [
    { href: `/${streamSlug}`, label: streamSlug === "doctors" ? "Doctors" : "Consultants" },
    ...items,
  ];
}

export function resolveProgramRoute(programSlug: string) {
  const stream = getProgramStream(programSlug);
  const program = getProgram(programSlug);

  if (!stream || !program) {
    return null;
  }

  return { stream, program };
}

export function resolveLevelRoute(programSlug: string, levelSlug: string) {
  const context = resolveProgramRoute(programSlug);
  const level = getProgramLevelBySlug(programSlug, levelSlug);

  if (!context || !level) {
    return null;
  }

  return { ...context, level };
}

export function resolveModuleRoute(programSlug: string, moduleSlug: string) {
  const context = resolveProgramRoute(programSlug);
  const academyModule = getProgramModuleBySlug(programSlug, moduleSlug);

  if (!context || !academyModule) {
    return null;
  }

  return { ...context, module: academyModule };
}

export function resolveLessonRoute(programSlug: string, lessonSlug: string) {
  const context = resolveProgramRoute(programSlug);
  const lesson = getProgramLessonBySlug(programSlug, lessonSlug);

  if (!context || !lesson) {
    return null;
  }

  return { ...context, lesson };
}

export function resolveAssessmentRoute(programSlug: string, assessmentSlug: string) {
  const context = resolveProgramRoute(programSlug);
  const assessment = getProgramAssessmentBySlug(programSlug, assessmentSlug);

  if (!context || !assessment) {
    return null;
  }

  return { ...context, assessment };
}
