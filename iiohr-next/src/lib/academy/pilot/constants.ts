/** Doctor stream pilot — first module in legacy volume-1 bundle (see content-registry). */
export const PILOT_DOCTOR_PROGRAM_SLUG = "postgraduate-certificate-clinical-trichology-hair-restoration-medicine";

export const PILOT_DOCTOR_MODULE_ID = "module_foundations_intro";

/** First lesson in module 1 (for demo actions). */
export const PILOT_DOCTOR_LESSON_ID = "lesson_vol1_mod1_01";

/** Module knowledge check (quiz) for pilot assessment submit. */
export const PILOT_DOCTOR_ASSESSMENT_ID = "quiz_vol1_mod1";

/** Demo responses for pilot quiz (MCQ correct + short-answer placeholder). */
export const PILOT_DOCTOR_ASSESSMENT_RESPONSES: Record<string, { selectedOptionIds?: string[]; text?: string }> = {
  quiz_vol1_mod1_item_01: { selectedOptionIds: ["a"] },
  quiz_vol1_mod1_item_02: { text: "Pilot short-answer submission (pending faculty review)." },
};
