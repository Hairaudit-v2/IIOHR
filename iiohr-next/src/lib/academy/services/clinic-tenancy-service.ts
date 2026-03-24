import type {
  Clinic,
  ClinicLicense,
  ClinicStaffMembership,
  Cohort,
} from "@/lib/academy/operational-types";

export function getClinicLicenseState(clinic: Clinic, licenses: ClinicLicense[]): ClinicLicense | null {
  return licenses.find((license) => license.clinicId === clinic.id) ?? null;
}

export function getClinicStaffCount(clinic: Clinic, memberships: ClinicStaffMembership[]): number {
  return memberships.filter((membership) => membership.clinicId === clinic.id).length;
}

export function getCohortsForClinic(clinic: Clinic, cohorts: Cohort[], memberships: ClinicStaffMembership[]) {
  const clinicUserIds = new Set(
    memberships.filter((membership) => membership.clinicId === clinic.id).map((membership) => membership.userId)
  );

  return cohorts.filter((cohort) => clinicUserIds.size > 0 && cohort.streamSlug);
}
