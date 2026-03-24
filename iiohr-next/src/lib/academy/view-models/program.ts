import { programPageLayout } from "@/lib/academy/layouts/page-layouts";
import { getCurriculumMap } from "@/lib/academy/curriculum-map";

export function getProgramPageViewModel(programSlug: string) {
  const curriculum = getCurriculumMap(programSlug);
  if (!curriculum) {
    return null;
  }

  return {
    ...curriculum,
    layout: programPageLayout,
  };
}
