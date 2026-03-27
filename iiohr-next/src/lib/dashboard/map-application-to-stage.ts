import type { ApplicationRow } from "@/lib/academy/db/types";
import type { StageBadgeVm, TimelineItemState } from "@/lib/dashboard/types";

export function applicationStatusToStageBadge(app: ApplicationRow | null): StageBadgeVm | null {
  if (!app) return null;
  const labels: Record<ApplicationRow["status"], { stage: string; tone: StageBadgeVm["tone"] }> = {
    draft: { stage: "Application draft", tone: "neutral" },
    submitted: { stage: "Submitted", tone: "attention" },
    under_review: { stage: "Under admissions review", tone: "attention" },
    needs_more_information: { stage: "More information requested", tone: "attention" },
    accepted: { stage: "Accepted — onboarding next", tone: "positive" },
    rejected: { stage: "Not admitted", tone: "neutral" },
    declined: { stage: "Declined", tone: "neutral" },
    waitlisted: { stage: "Waitlisted", tone: "attention" },
    withdrawn: { stage: "Withdrawn", tone: "neutral" },
  };
  const row = labels[app.status];
  return {
    label: "Admissions",
    stageName: row.stage,
    tone: row.tone,
  };
}

function currentStepIndex(status: ApplicationRow["status"]): number {
  switch (status) {
    case "draft":
      return 0;
    case "submitted":
      return 1;
    case "under_review":
    case "needs_more_information":
    case "waitlisted":
      return 2;
    case "accepted":
      return 3;
    case "rejected":
    case "declined":
    case "withdrawn":
      return 3;
    default:
      return 0;
  }
}

export function applicationToAdmissionsTimeline(app: ApplicationRow | null): {
  id: string;
  label: string;
  detail?: string;
  state: TimelineItemState;
}[] {
  const steps: { id: string; label: string }[] = [
    { id: "draft", label: "Draft & submit" },
    { id: "submitted", label: "Submitted to admissions" },
    { id: "review", label: "Review & alignment" },
    { id: "outcome", label: "Decision & pathway start" },
  ];

  if (!app) {
    return steps.map((s, i) => ({
      ...s,
      state: (i === 0 ? "current" : "upcoming") as TimelineItemState,
    }));
  }

  if (app.status === "accepted") {
    return steps.map((s) => ({ ...s, state: "complete" as const }));
  }

  const cur = currentStepIndex(app.status);
  return steps.map((s, i) => {
    let state: TimelineItemState;
    if (i < cur) state = "complete";
    else if (i === cur) state = "current";
    else state = "upcoming";

    const detail =
      i === 3 && ["rejected", "declined", "withdrawn", "waitlisted"].includes(app.status)
        ? `Record: ${app.status.replace(/_/g, " ")}`
        : undefined;

    return { ...s, state, detail };
  });
}
