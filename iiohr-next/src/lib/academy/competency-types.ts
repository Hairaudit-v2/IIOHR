import type { CompetencyDomain } from "@/lib/academy/constants";

export interface CompetencyEvidenceRequirement {
  id: string;
  description: string;
  evidenceType: "assessment" | "practical-task" | "faculty-review" | "lesson-completion";
  requiredCount: number;
}

export interface Competency {
  id: string;
  programId: string;
  levelId: string;
  slug: string;
  title: string;
  domain: CompetencyDomain;
  description: string;
  sequence: number;
  requiredForAward: boolean;
  evidenceRequirements: CompetencyEvidenceRequirement[];
  mustBeFacultyVerified: boolean;
}
