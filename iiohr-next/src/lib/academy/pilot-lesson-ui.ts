/** Pilot-only UI helpers — derive layout from existing lesson strings (no schema). */

export function splitScopeVersusDoctorObjective(objectiveText: string): {
  supportSide: string;
  doctorSide: string;
} | null {
  // Authoring note: for automatic lane split, write objective 3 as
  // "<support-side statement> versus <clinician-side statement>".
  // If "versus" is absent, the workflow visual stays hidden for that lesson.
  const parts = objectiveText.split(/\s+versus\s+/i);
  if (parts.length < 2) {
    return null;
  }
  return {
    supportSide: parts[0]!.trim(),
    doctorSide: parts.slice(1).join(" versus ").trim(),
  };
}
