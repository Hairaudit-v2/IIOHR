import type { CertificateAwardRow, ModuleProgressRow } from "@/lib/academy/db/types";
import { getProgram, getProgramAssessments, getProgramModules } from "@/lib/academy/content-loader";
import type {
  AssignedModuleVm,
  CertificateStatusVm,
  MilestoneVm,
  TimelineItemVm,
} from "@/lib/dashboard/types";
import type { LearnerDashboardSnapshot } from "@/lib/dashboard/readers/learner-dashboard-snapshot";

export function computeOverallPercent(programSlug: string, moduleProgress: ModuleProgressRow[]): number {
  const modules = getProgramModules(programSlug);
  const byId = new Map(moduleProgress.map((m) => [m.module_id, m.percent_complete]));
  if (modules.length === 0) {
    if (moduleProgress.length === 0) return 0;
    return Math.round(
      moduleProgress.reduce((s, m) => s + m.percent_complete, 0) / moduleProgress.length
    );
  }
  let sum = 0;
  for (const mod of modules) {
    sum += byId.get(mod.id) ?? 0;
  }
  return Math.round(sum / modules.length);
}

export function buildAssignedModulesVm(programSlug: string, moduleProgress: ModuleProgressRow[]): AssignedModuleVm[] {
  const modules = getProgramModules(programSlug);
  const byId = new Map(moduleProgress.map((m) => [m.module_id, m]));

  if (modules.length > 0) {
    return modules.slice(0, 8).map((mod) => {
      const row = byId.get(mod.id);
      const pct = row?.percent_complete ?? 0;
      let status: AssignedModuleVm["status"] = "not_started";
      if (pct >= 100) status = "complete";
      else if (pct > 0) status = "in_progress";
      const etaHint =
        pct > 0 && pct < 100 ? `${pct}%` : pct >= 100 ? "Complete" : undefined;
      return {
        id: mod.id,
        title: mod.title,
        status,
        etaHint,
      };
    });
  }

  return moduleProgress.slice(0, 8).map((row) => ({
    id: row.module_id,
    title: `Module ${row.module_id}`,
    status:
      row.percent_complete >= 100 ? "complete" : row.percent_complete > 0 ? "in_progress" : "not_started",
    etaHint:
      row.percent_complete > 0 && row.percent_complete < 100
        ? `${row.percent_complete}%`
        : undefined,
  }));
}

export function buildModuleTimelineVm(programSlug: string, moduleProgress: ModuleProgressRow[]): TimelineItemVm[] {
  const modules = getProgramModules(programSlug);
  const byId = new Map(moduleProgress.map((m) => [m.module_id, m.percent_complete]));
  if (modules.length === 0) {
    const sorted = [...moduleProgress].sort((a, b) => a.module_id.localeCompare(b.module_id));
    let seenCurrent = false;
    return sorted.slice(0, 6).map((row) => {
      const pct = row.percent_complete;
      let state: TimelineItemVm["state"];
      if (pct >= 100) state = "complete";
      else if (!seenCurrent) {
        state = "current";
        seenCurrent = true;
      } else state = "upcoming";
      return {
        id: row.module_id,
        label: `Module ${row.module_id}`,
        detail: pct > 0 && pct < 100 ? `${pct}%` : undefined,
        state,
      };
    });
  }

  let seenCurrent = false;
  return modules.map((mod) => {
    const pct = byId.get(mod.id) ?? 0;
    let state: TimelineItemVm["state"];
    if (pct >= 100) state = "complete";
    else if (!seenCurrent) {
      state = "current";
      seenCurrent = true;
    } else state = "upcoming";
    return {
      id: mod.id,
      label: mod.title,
      detail: pct > 0 && pct < 100 ? `${pct}% complete` : undefined,
      state,
    };
  });
}

export function buildModuleMilestonesVm(programSlug: string, moduleProgress: ModuleProgressRow[]): MilestoneVm[] {
  const modules = getProgramModules(programSlug);
  const byId = new Map(moduleProgress.map((m) => [m.module_id, m.percent_complete]));
  const source = modules.length > 0 ? modules.slice(0, 5) : [];
  if (source.length === 0) {
    return moduleProgress.slice(0, 5).map((row) => ({
      id: row.module_id,
      label: `Module ${row.module_id}`,
      done: row.percent_complete >= 100,
      dueHint: row.percent_complete > 0 && row.percent_complete < 100 ? `${row.percent_complete}%` : undefined,
    }));
  }
  return source.map((mod) => {
    const pct = byId.get(mod.id) ?? 0;
    return {
      id: mod.id,
      label: mod.title,
      done: pct >= 100,
      dueHint: pct > 0 && pct < 100 ? `${pct}%` : undefined,
    };
  });
}

export function mapCertificatesVm(
  certificates: CertificateAwardRow[],
  emptyFallback: CertificateStatusVm
): CertificateStatusVm {
  if (certificates.length === 0) {
    return emptyFallback;
  }
  const downloadReadyCount = certificates.filter((c) => Boolean(c.storage_path)).length;
  return {
    headline: "Certificates & eligibility",
    body: "Issued credentials from your active program enrollment. Downloads are available when storage is linked.",
    items: certificates.map((c) => {
      const state: CertificateStatusVm["items"][number]["state"] = c.storage_path ? "issued" : "ready";
      return {
        label: c.level_id ? `Credential — ${c.level_id}` : `Certificate ${c.certificate_number}`,
        state,
      };
    }),
    downloadReadyCount,
  };
}

export function buildConsultantAssessmentMilestones(
  programSlug: string,
  attempts: LearnerDashboardSnapshot["assessmentAttempts"]
): MilestoneVm[] {
  const assessments = getProgramAssessments(programSlug);
  const best = new Map<string, { passed: boolean; submitted: boolean }>();
  for (const a of attempts) {
    if (!best.has(a.assessment_id)) {
      best.set(a.assessment_id, {
        passed: a.passed,
        submitted: Boolean(a.submitted_at),
      });
    }
  }
  if (assessments.length > 0) {
    return assessments.slice(0, 8).map((as) => {
      const b = best.get(as.id);
      return {
        id: as.id,
        label: as.title,
        done: b?.passed ?? false,
        dueHint: b && !b.passed && b.submitted ? "Awaiting outcome" : undefined,
      };
    });
  }
  return Array.from(best.entries()).map(([id, b]) => ({
    id,
    label: `Assessment ${id}`,
    done: b.passed,
    dueHint: b.submitted && !b.passed ? "Submitted" : undefined,
  }));
}

export function pathwaySummaryFromProgram(programSlug: string): {
  title: string;
  subtitle: string;
  pathwayLabel: string;
} {
  const program = getProgram(programSlug);
  if (!program) {
    return {
      title: "Program",
      subtitle: "Your enrolled program pathway.",
      pathwayLabel: programSlug,
    };
  }
  const overview = program.overview?.trim() ?? "";
  const subtitle =
    overview.length > 0
      ? overview.slice(0, 220) + (overview.length > 220 ? "…" : "")
      : program.whoItsFor?.[0] ?? "Your enrolled program pathway.";
  return {
    title: program.title,
    subtitle,
    pathwayLabel: program.workingTitle || program.title,
  };
}
