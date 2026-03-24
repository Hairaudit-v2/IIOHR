import type { AcademyStreamSlug } from "@/lib/academy/constants";
import {
  admissionsConsentDefinitions,
  consultantApplicationQuestionKeys,
  doctorApplicationQuestionKeys,
  consentFieldName,
  formFieldNameForQuestion,
} from "@/lib/academy/admissions/stream-forms";
import type { SubmitApplicationInput } from "@/lib/academy/services/academy-service-contracts";

function parseStream(formData: FormData): AcademyStreamSlug {
  const raw = formData.get("targetStream");
  if (raw !== "doctors" && raw !== "consultants") {
    throw new Error("Invalid or missing target stream.");
  }
  return raw;
}

export function formDataToSubmitApplicationInput(
  userId: string,
  formData: FormData
): SubmitApplicationInput {
  const targetStreamSlug = parseStream(formData);
  const keys =
    targetStreamSlug === "doctors"
      ? doctorApplicationQuestionKeys
      : consultantApplicationQuestionKeys;

  const answers = keys.map((question_key) => {
    const field = formFieldNameForQuestion(question_key);
    const val = formData.get(field);
    const str = typeof val === "string" ? val.trim() : "";
    return { question_key, answer: str };
  });

  const defs = admissionsConsentDefinitions[targetStreamSlug];
  const consents = [];
  for (const d of defs) {
    if (formData.get(consentFieldName(d.consentKey)) === "on") {
      consents.push({
        consent_key: d.consentKey,
        consent_version: d.consentVersion,
        accepted_at: new Date().toISOString(),
        text_hash: null,
      });
    }
  }

  const programRaw = formData.get("targetProgramSlug");
  const targetProgramSlug =
    typeof programRaw === "string" && programRaw.trim().length > 0 ? programRaw.trim() : null;

  return {
    userId,
    targetStreamSlug,
    targetProgramSlug,
    answers,
    consents,
  };
}
