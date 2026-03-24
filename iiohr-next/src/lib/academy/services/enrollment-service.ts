import type { AcademyEnrollment, ProgramEnrollment } from "@/lib/academy/operational-types";

export function isEnrollmentActive(
  academyEnrollment: AcademyEnrollment | undefined,
  programEnrollment: ProgramEnrollment | undefined
): boolean {
  return academyEnrollment?.status === "active" && programEnrollment?.status === "active";
}
