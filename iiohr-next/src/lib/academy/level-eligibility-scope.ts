import type { AcademyAssessment } from "@/lib/academy/assessment-types";
import type { AcademyLevel, AcademyModule } from "@/lib/academy/content-types";
import type { Competency } from "@/lib/academy/competency-types";
import {
  getProgramAssessments,
  getProgramCompetencies,
  getProgramLessons,
  getProgramLevels,
  getProgramModules,
} from "@/lib/academy/content-loader";

export interface LevelEligibilityScope {
  level: AcademyLevel;
  modules: AcademyModule[];
  assessments: AcademyAssessment[];
  competencies: Competency[];
  assessmentIdSet: Set<string>;
}

/** Modules that belong to this level (explicit level.moduleIds or fallback via module.levelId). */
export function getModulesInLevel(programSlug: string, level: AcademyLevel): AcademyModule[] {
  const all = getProgramModules(programSlug);
  if (level.moduleIds.length > 0) {
    const allowed = new Set(level.moduleIds);
    return all.filter((m) => allowed.has(m.id));
  }
  return all.filter((m) => m.levelId === level.id);
}

export function resolveEligibilityLevel(
  programSlug: string,
  levelSlug?: string | null
): AcademyLevel | null {
  const levels = [...getProgramLevels(programSlug)].sort((a, b) => a.sequence - b.sequence);
  if (levels.length === 0) {
    return null;
  }
  if (levelSlug) {
    return levels.find((l) => l.slug === levelSlug) ?? null;
  }
  return levels[0] ?? null;
}

/** Level that owns this module (for module-scoped eligibility). */
export function resolveLevelForModule(programSlug: string, moduleId: string): AcademyLevel | null {
  const mod = getProgramModules(programSlug).find((m) => m.id === moduleId);
  if (!mod) {
    return null;
  }
  return getProgramLevels(programSlug).find((l) => l.id === mod.levelId) ?? null;
}

export function buildLevelEligibilityScope(programSlug: string, level: AcademyLevel): LevelEligibilityScope {
  const modules = getModulesInLevel(programSlug, level);
  const moduleIdSet = new Set(modules.map((m) => m.id));
  const assessments = getProgramAssessments(programSlug).filter((a) => moduleIdSet.has(a.moduleId));
  const competencyIdSet = new Set(level.competencyIds);
  const competencies =
    competencyIdSet.size > 0
      ? getProgramCompetencies(programSlug).filter((c) => competencyIdSet.has(c.id))
      : getProgramCompetencies(programSlug);
  return {
    level,
    modules,
    assessments,
    competencies,
    assessmentIdSet: new Set(assessments.map((a) => a.id)),
  };
}

/** Single-module slice (pilot / module drill-down): assessments & competencies for that module only. */
export function buildModuleEligibilityScope(
  programSlug: string,
  moduleId: string
): LevelEligibilityScope | null {
  const moduleRow = getProgramModules(programSlug).find((m) => m.id === moduleId);
  if (!moduleRow) {
    return null;
  }
  const level =
    getProgramLevels(programSlug).find((l) => l.id === moduleRow.levelId) ?? resolveEligibilityLevel(programSlug);
  if (!level) {
    return null;
  }
  const assessments = getProgramAssessments(programSlug).filter((a) => a.moduleId === moduleId);
  const competencyIdSet = new Set(moduleRow.competencyIds);
  const competencies =
    competencyIdSet.size > 0
      ? getProgramCompetencies(programSlug).filter((c) => competencyIdSet.has(c.id))
      : [];
  return {
    level,
    modules: [moduleRow],
    assessments,
    competencies,
    assessmentIdSet: new Set(assessments.map((a) => a.id)),
  };
}

export function getLessonsInScope(programSlug: string, scope: LevelEligibilityScope) {
  const moduleIdSet = new Set(scope.modules.map((m) => m.id));
  return getProgramLessons(programSlug)
    .filter((l) => moduleIdSet.has(l.moduleId))
    .sort((a, b) => a.sequence - b.sequence);
}

/** Resolve level from optional slug; used when caller passes programSlug + levelSlug only. */
export function resolveLevelFromSlug(programSlug: string, levelSlug: string | undefined): AcademyLevel | null {
  return resolveEligibilityLevel(programSlug, levelSlug ?? undefined);
}
