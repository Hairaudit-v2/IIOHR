import type { AcademyAssessment } from "@/lib/academy/assessment-types";
import type { AcademyLevel, AcademyModule } from "@/lib/academy/content-types";
import type { Competency } from "@/lib/academy/competency-types";
import type {
  AssessmentAttempt,
  CompetencyEvidence,
  CompetencyRecord,
  LessonCompletion,
} from "@/lib/academy/operational-types";
import type { CertificateEligibilitySummary } from "@/lib/academy/certificate-types";
import { isAssessmentPassed } from "@/lib/academy/services/assessment-service";
import { isCompetencyAchieved } from "@/lib/academy/services/competency-service";

export function getWeightedScore(
  assessments: AcademyAssessment[],
  attempts: AssessmentAttempt[]
): number {
  const totalWeight = assessments.reduce((sum, assessment) => sum + assessment.weighting, 0);
  if (totalWeight === 0) {
    return 0;
  }

  const weightedScore = assessments.reduce((sum, assessment) => {
    const latestAttempt = attempts
      .filter((attempt) => attempt.assessmentId === assessment.id)
      .sort((a, b) => b.retryIndex - a.retryIndex)[0];
    const score = latestAttempt?.score ?? 0;
    return sum + score * assessment.weighting;
  }, 0);

  return Math.round(weightedScore / totalWeight);
}

export function getCertificateEligibilitySummary(params: {
  level: AcademyLevel;
  modules: AcademyModule[];
  assessments: AcademyAssessment[];
  attempts: AssessmentAttempt[];
  competencies: Competency[];
  competencyRecords: CompetencyRecord[];
  competencyEvidence: CompetencyEvidence[];
  lessonCompletions: LessonCompletion[];
}): CertificateEligibilitySummary {
  const { level, assessments, attempts, competencies, competencyRecords, competencyEvidence } = params;
  const weightedScore = getWeightedScore(assessments, attempts);
  const failedAssessments = assessments.filter((assessment) => {
    const latestAttempt = attempts
      .filter((attempt) => attempt.assessmentId === assessment.id)
      .sort((a, b) => b.retryIndex - a.retryIndex)[0];
    return !latestAttempt || !isAssessmentPassed(assessment, latestAttempt);
  });

  const competencyStatuses = Object.fromEntries(
    competencies.map((competency) => {
      const record = competencyRecords.find((entry) => entry.competencyId === competency.id);
      return [competency.id, record?.status ?? "not-started"];
    })
  );

  const unmetCompetencies = competencies.filter((competency) => {
    const record = competencyRecords.find((entry) => entry.competencyId === competency.id);
    return !isCompetencyAchieved(competency, record, competencyEvidence);
  });

  const unmetRequirements = [
    ...failedAssessments.map((assessment) => `Assessment not yet passed: ${assessment.title}`),
    ...unmetCompetencies.map((competency) => `Competency not yet achieved: ${competency.title}`),
  ];

  if (weightedScore < 80) {
    unmetRequirements.unshift(`${level.title} requires a weighted score of at least 80 percent.`);
  }

  return {
    isEligible: unmetRequirements.length === 0,
    unmetRequirements,
    scoreSummary: {
      overallScore: weightedScore,
      weightedScore,
      passedDomains: [],
      failedDomains: [],
    },
    competencyStatuses,
  };
}
