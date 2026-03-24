import { getCurriculumMap } from "@/lib/academy/curriculum-map";
import { levelPageLayout } from "@/lib/academy/layouts/page-layouts";

export function getLevelPageViewModel(programSlug: string, levelSlug: string) {
  const curriculum = getCurriculumMap(programSlug);
  const level = curriculum?.levels.find((entry) => entry.slug === levelSlug) ?? null;

  if (!curriculum || !level) {
    return null;
  }

  return {
    stream: curriculum.stream,
    program: curriculum.program,
    level,
    layout: levelPageLayout,
  };
}
