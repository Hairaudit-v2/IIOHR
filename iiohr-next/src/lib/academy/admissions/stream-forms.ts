import type { AcademyStreamSlug } from "@/lib/academy/constants";

/** `application_answers.question_key` values — namespaced per stream. */
export const doctorApplicationQuestionKeys = [
  "doctor:clinical_role",
  "doctor:license_jurisdiction",
  "doctor:learning_goals",
  "doctor:scope_attestation",
] as const;

export const consultantApplicationQuestionKeys = [
  "consultant:role_context",
  "consultant:supervision_commitment",
  "consultant:learning_goals",
  "consultant:scope_attestation",
] as const;

export type DoctorApplicationQuestionKey = (typeof doctorApplicationQuestionKeys)[number];
export type ConsultantApplicationQuestionKey = (typeof consultantApplicationQuestionKeys)[number];

/** Required consents for submission (`application_consents`). */
export const admissionsConsentDefinitions: Record<
  AcademyStreamSlug,
  Array<{ consentKey: string; consentVersion: string; label: string; body: string }>
> = {
  doctors: [
    {
      consentKey: "admissions.doctors.accuracy.v1",
      consentVersion: "1.0.0",
      label: "Accuracy of professional information",
      body:
        "I confirm that the clinical role, licensure, and jurisdiction information I provide is accurate to the best of my knowledge.",
    },
    {
      consentKey: "admissions.doctors.scope-boundaries.v1",
      consentVersion: "1.0.0",
      label: "Scope and supervision",
      body:
        "I understand this program does not replace independent medical licensure or institutional supervision, and I will practise within my lawful scope.",
    },
  ],
  consultants: [
    {
      consentKey: "admissions.consultants.accuracy.v1",
      consentVersion: "1.0.0",
      label: "Accuracy of role information",
      body:
        "I confirm that my described role, supervision arrangements, and learning goals are accurate.",
    },
    {
      consentKey: "admissions.consultants.scope-boundaries.v1",
      consentVersion: "1.0.0",
      label: "Non-diagnostic scope",
      body:
        "I understand the consultant stream supports coordination and education within scope-of-practice boundaries and does not grant independent diagnostic authority.",
    },
  ],
};

export const streamFormLabels: Record<
  AcademyStreamSlug,
  Record<string, { label: string; placeholder?: string; type?: "text" | "textarea" }>
> = {
  doctors: {
    "doctor:clinical_role": {
      label: "Clinical role",
      placeholder: "e.g. GP, dermatologist, surgical trainee",
    },
    "doctor:license_jurisdiction": {
      label: "Primary license jurisdiction",
      placeholder: "Country / state or region",
    },
    "doctor:learning_goals": {
      label: "Learning goals for this program",
      type: "textarea",
      placeholder: "What you aim to achieve in the next 12–24 months",
    },
    "doctor:scope_attestation": {
      label: "Scope attestation (type YES to confirm)",
      placeholder: "Type YES to confirm you will remain within your lawful scope of practice",
    },
  },
  consultants: {
    "consultant:role_context": {
      label: "Your role in the clinic",
      placeholder: "e.g. patient coordinator, nurse advisor",
    },
    "consultant:supervision_commitment": {
      label: "Medical supervision",
      placeholder: "How clinical decisions are overseen in your setting",
    },
    "consultant:learning_goals": {
      label: "Learning goals",
      type: "textarea",
      placeholder: "What you want to strengthen through the certificate",
    },
    "consultant:scope_attestation": {
      label: "Scope attestation (type YES to confirm)",
      placeholder: "Type YES to confirm you understand the non-diagnostic boundaries of this stream",
    },
  },
};

/** Stable `FormData` keys for question fields (`doctor:role` → `q_doctor__role`). */
export function formFieldNameForQuestion(questionKey: string): string {
  return `q_${questionKey.replace(/:/g, "__")}`;
}

/** Stable checkbox names for consents (dots/colons → underscores). */
export function consentFieldName(consentKey: string): string {
  return `c_${consentKey.replace(/[^a-zA-Z0-9]/g, "_")}`;
}
