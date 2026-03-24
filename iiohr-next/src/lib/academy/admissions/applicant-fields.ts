/**
 * Shared applicant identity + contact layer for all academy streams.
 * Stored in `application_answers` with `applicant:*` keys.
 */

export const applicantApplicationQuestionKeys = [
  "applicant:full_name",
  "applicant:email",
  "applicant:phone",
  "applicant:country",
  "applicant:city_region",
  "applicant:organisation_name",
  "applicant:professional_title",
  "applicant:preferred_contact_method",
] as const;

export type ApplicantQuestionKey = (typeof applicantApplicationQuestionKeys)[number];

/** Subset required at submit (both streams). Other applicant fields are optional but persisted. */
export const applicantKeysRequiredForSubmit: readonly ApplicantQuestionKey[] = [
  "applicant:full_name",
  "applicant:email",
  "applicant:phone",
  "applicant:country",
];

export const preferredContactOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "either", label: "Email or phone" },
] as const;

export const applicantFormLabels: Record<
  ApplicantQuestionKey,
  { label: string; placeholder?: string; type?: "text" | "email" | "tel" }
> = {
  "applicant:full_name": {
    label: "Full name",
    placeholder: "As it should appear on admissions correspondence",
  },
  "applicant:email": {
    label: "Email",
    type: "email",
    placeholder: "name@organisation.org",
  },
  "applicant:phone": {
    label: "Phone",
    type: "tel",
    placeholder: "Include country code if applicable",
  },
  "applicant:country": {
    label: "Country",
    placeholder: "Primary practice or residence",
  },
  "applicant:city_region": {
    label: "City / region",
    placeholder: "Optional",
  },
  "applicant:organisation_name": {
    label: "Organisation or clinic name",
    placeholder: "Optional",
  },
  "applicant:professional_title": {
    label: "Professional title",
    placeholder: "e.g. Dr, Consultant, Coordinator",
  },
  "applicant:preferred_contact_method": {
    label: "Preferred contact method",
  },
};

/** Shown in admissions review and consent records. */
export const admissionsCommunicationsConsent = {
  consentKey: "admissions.communications.contact.v1",
  consentVersion: "1.0.0",
  label: "Admissions and program communications",
  body:
    "I consent to being contacted by IIOHR regarding my application, enrolment, program updates, and admissions-related next steps.",
} as const;
