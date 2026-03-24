import type { AcademyStreamSlug } from "@/lib/academy/constants";

/** Default program slugs when an application does not override `target_program_slug`. */
export const DEFAULT_ACADEMY_PROGRAM_BY_STREAM: Record<AcademyStreamSlug, string> = {
  doctors: "postgraduate-certificate-clinical-trichology-hair-restoration-medicine",
  consultants: "certificate-hair-loss-consultation-clinical-patient-coordination",
};

export function defaultProgramSlugForStream(stream: AcademyStreamSlug): string {
  return DEFAULT_ACADEMY_PROGRAM_BY_STREAM[stream];
}

/** MVP: only the canonical program per stream may be targeted (keeps RPC/stream alignment safe). */
export function resolveProgramSlugForStream(
  stream: AcademyStreamSlug,
  requested: string | null | undefined
): string {
  const canonical = defaultProgramSlugForStream(stream);
  const trimmed = requested?.trim();
  if (trimmed && trimmed !== canonical) {
    throw new Error(`Invalid program for this stream. Expected "${canonical}".`);
  }
  return canonical;
}
