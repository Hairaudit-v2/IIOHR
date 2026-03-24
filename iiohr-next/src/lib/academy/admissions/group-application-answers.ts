import type { ApplicationAnswerRow } from "@/lib/academy/db/types";
import {
  applicantApplicationQuestionKeys,
  applicantFormLabels,
  type ApplicantQuestionKey,
} from "@/lib/academy/admissions/applicant-fields";
import {
  consultantApplicationQuestionKeys,
  doctorApplicationQuestionKeys,
  streamFormLabels,
} from "@/lib/academy/admissions/stream-forms";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import { answerToPlainString } from "@/lib/academy/admissions/answer-utils";

export type GroupedAnswer = { key: string; label: string; value: string };

function labelForKey(stream: AcademyStreamSlug, key: string): string {
  if (key.startsWith("applicant:")) {
    return applicantFormLabels[key as ApplicantQuestionKey]?.label ?? key;
  }
  const streamLabels = streamFormLabels[stream];
  return streamLabels[key as keyof typeof streamLabels]?.label ?? key;
}

const applicantKeyOrder = new Map(applicantApplicationQuestionKeys.map((k, i) => [k, i]));
const doctorKeyOrder = new Map(doctorApplicationQuestionKeys.map((k, i) => [k, i]));
const consultantKeyOrder = new Map(consultantApplicationQuestionKeys.map((k, i) => [k, i]));

function sortByKeyOrder(items: GroupedAnswer[], order: Map<string, number>): void {
  items.sort((a, b) => (order.get(a.key) ?? 999) - (order.get(b.key) ?? 999));
}

export function groupAnswersForReview(
  stream: AcademyStreamSlug,
  answers: ApplicationAnswerRow[]
): {
  applicant: GroupedAnswer[];
  streamSpecific: GroupedAnswer[];
  other: GroupedAnswer[];
} {
  const applicant: GroupedAnswer[] = [];
  const streamSpecific: GroupedAnswer[] = [];
  const other: GroupedAnswer[] = [];

  for (const row of answers) {
    const value = answerToPlainString(row.answer);
    const item = { key: row.question_key, label: labelForKey(stream, row.question_key), value };
    if (row.question_key.startsWith("applicant:")) {
      applicant.push(item);
    } else if (row.question_key.startsWith("doctor:") || row.question_key.startsWith("consultant:")) {
      streamSpecific.push(item);
    } else {
      other.push(item);
    }
  }

  sortByKeyOrder(applicant, applicantKeyOrder);
  sortByKeyOrder(
    streamSpecific,
    stream === "doctors" ? doctorKeyOrder : consultantKeyOrder
  );
  other.sort((a, b) => a.label.localeCompare(b.label));

  return { applicant, streamSpecific, other };
}
