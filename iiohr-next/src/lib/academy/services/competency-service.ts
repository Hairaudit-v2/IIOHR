import type { Competency } from "@/lib/academy/competency-types";
import type { CompetencyEvidence, CompetencyRecord } from "@/lib/academy/operational-types";

export function isCompetencyAchieved(
  competency: Competency,
  record: CompetencyRecord | undefined,
  evidence: CompetencyEvidence[]
): boolean {
  if (!record || record.status !== "achieved") {
    return false;
  }

  const acceptedEvidence = evidence.filter(
    (entry) => entry.competencyRecordId === record.id && entry.accepted
  );

  const requiredEvidenceCount = competency.evidenceRequirements.reduce(
    (sum, requirement) => sum + requirement.requiredCount,
    0
  );

  return acceptedEvidence.length >= requiredEvidenceCount;
}
