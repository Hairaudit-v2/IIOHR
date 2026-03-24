import type { AcademyAssessment } from "@/lib/academy/assessment-types";
import { getAssessmentItemsForAssessment } from "@/lib/academy/content-loader";

export interface ItemResponsePayload {
  selectedOptionIds?: string[];
  text?: string;
}

/**
 * Auto-score items where possible. Faculty-gated items contribute 0 until review (pilot).
 */
export function scoreAssessmentResponses(params: {
  programSlug: string;
  assessment: AcademyAssessment;
  responses: Record<string, unknown>;
}): { score: number; autoGradedPoints: number; maxAutoGradablePoints: number } {
  const items = getAssessmentItemsForAssessment(params.programSlug, params.assessment.id);
  let autoGradedPoints = 0;
  let maxAutoGradablePoints = 0;

  const autoGradableTypes = new Set(["mcq", "multi-select", "image-interpretation"]);

  for (const item of items) {
    const raw = params.responses[item.id];
    const payload = (typeof raw === "object" && raw !== null ? raw : {}) as ItemResponsePayload;

    if (item.facultyReviewRequired && !autoGradableTypes.has(item.type)) {
      maxAutoGradablePoints += item.scoringRubric.maxScore;
      continue;
    }

    maxAutoGradablePoints += item.scoringRubric.maxScore;

    if (item.type === "mcq" || item.type === "multi-select" || item.type === "image-interpretation") {
      const correct = new Set(item.correctAnswer.optionIds ?? []);
      const selected = new Set(payload.selectedOptionIds ?? []);
      const same =
        correct.size === selected.size && [...correct].every((id) => selected.has(id));
      if (same) {
        autoGradedPoints += item.scoringRubric.maxScore;
      }
      continue;
    }

    if (item.facultyReviewRequired) {
      continue;
    }
  }

  const score =
    maxAutoGradablePoints > 0 ? Math.round((autoGradedPoints / maxAutoGradablePoints) * 100) : 0;

  return { score, autoGradedPoints, maxAutoGradablePoints };
}
