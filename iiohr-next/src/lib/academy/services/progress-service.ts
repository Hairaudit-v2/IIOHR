import type { AcademyLesson, AcademyModule } from "@/lib/academy/content-types";
import type { LessonCompletion, ModuleProgress } from "@/lib/academy/operational-types";

export function isLessonComplete(
  lesson: AcademyLesson,
  completion: LessonCompletion | null | undefined
): boolean {
  return Boolean(completion?.completedAt);
}

export function getModuleCompletionPercent(
  module: AcademyModule,
  lessons: AcademyLesson[],
  completions: LessonCompletion[]
): number {
  const moduleLessons = lessons.filter((lesson) => lesson.moduleId === module.id);
  if (moduleLessons.length === 0) {
    return 0;
  }

  const completed = moduleLessons.filter((lesson) =>
    completions.some((completion) => completion.lessonId === lesson.id && completion.completedAt)
  ).length;

  return Math.round((completed / moduleLessons.length) * 100);
}

export function createModuleProgressSnapshot(
  module: AcademyModule,
  lessons: AcademyLesson[],
  completions: LessonCompletion[]
): Pick<ModuleProgress, "moduleId" | "percentComplete" | "isUnlocked" | "completedAt"> {
  const percentComplete = getModuleCompletionPercent(module, lessons, completions);

  return {
    moduleId: module.id,
    percentComplete,
    isUnlocked: true,
    completedAt: percentComplete === 100 ? new Date().toISOString() : null,
  };
}
