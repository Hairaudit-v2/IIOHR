import type { SupabaseClient } from "@supabase/supabase-js";
import type { ApplicationRow } from "@/lib/academy/db/types";
import {
  applicationStatusToStageBadge,
  applicationToAdmissionsTimeline,
} from "@/lib/dashboard/map-application-to-stage";
import type { DoctorDashboardVm, MilestoneVm, StageBadgeVm, TimelineItemVm } from "@/lib/dashboard/types";
import {
  buildAssignedModulesVm,
  buildModuleMilestonesVm,
  buildModuleTimelineVm,
  computeOverallPercent,
  mapCertificatesVm,
  pathwaySummaryFromProgram,
} from "@/lib/dashboard/learner-vm-shared";
import { fetchLearnerDashboardSnapshot } from "@/lib/dashboard/readers/learner-dashboard-snapshot";
import { siteConfig } from "@/lib/site";

const PATHWAY_PLACEHOLDER: DoctorDashboardVm["pathway"] = {
  title: "Doctor pathway",
  subtitle: "Staged progression from foundations through practical FUE and outcome review.",
  pathwayLabel: "IIOHR surgeon development track",
};

function defaultLearningTimeline(): TimelineItemVm[] {
  return [
    { id: "m1", label: "Foundations & consent architecture", state: "complete" },
    { id: "m2", label: "Practical FUE immersion", state: "current", detail: "Tutor-led cases" },
    { id: "m3", label: "Assessment & faculty review", state: "upcoming" },
    { id: "m4", label: "Certificates & ecosystem audit", state: "upcoming" },
  ];
}

function defaultMilestones(): MilestoneVm[] {
  return [
    { id: "ms1", label: "Pre-clinical modules signed off", done: true },
    { id: "ms2", label: "Supervised case log threshold", done: false, dueHint: "Set when enrolled" },
    { id: "ms3", label: "Summative assessment cleared", done: false },
  ];
}

function defaultModules(): DoctorDashboardVm["assignedModules"] {
  return [
    { id: "mod1", title: "FUE planning & donor stewardship", status: "in_progress", etaHint: "Continue" },
    { id: "mod2", title: "Graft handling & theatre discipline", status: "not_started" },
    { id: "mod3", title: "Complications & escalation", status: "not_started" },
  ];
}

function defaultNextActions(applyPath: string, hasApp: boolean, hasEnrollment: boolean): DoctorDashboardVm["nextActions"] {
  if (hasEnrollment) {
    return [
      { id: "a1", label: "Open your programs hub", href: "/doctors/programs", emphasis: true },
      { id: "a2", label: "Review pilot academy resources", href: "/doctors/pilot-academy" },
    ];
  }
  if (!hasApp) {
    return [
      { id: "a1", label: "Complete or start your doctor application", href: applyPath, emphasis: true },
      { id: "a2", label: "Review Practical FUE pathway (public)", href: "/training/practical-fue" },
    ];
  }
  return [
    { id: "a1", label: "Open your programs hub when provisioned", href: "/doctors/programs", emphasis: true },
    { id: "a2", label: "Review pilot academy resources", href: "/doctors/pilot-academy" },
  ];
}

function defaultCertificates(): DoctorDashboardVm["certificates"] {
  return {
    headline: "Certificates & eligibility",
    body: "Eligibility and issuance follow faculty review and assessment clearance. Downloads appear when issued.",
    items: [
      { label: "Level credential", state: "pending" },
      { label: "Practical FUE attestation", state: "pending" },
    ],
    downloadReadyCount: 0,
  };
}

function hairAuditCopy(enrollment: { clinic_id: string | null; status: string } | null): {
  href: string;
  title: string;
  description: string;
} {
  const base = {
    href: siteConfig.links.hairAudit,
    title: "HairAudit",
  };
  if (enrollment?.clinic_id) {
    return {
      ...base,
      description:
        "Your enrollment is linked to a clinic organisation. HairAudit is the ecosystem surgical audit workspace — open it when your cohort enables audit workflows or SSO.",
    };
  }
  if (enrollment?.status === "active") {
    return {
      ...base,
      description:
        "Active program enrollment on record. HairAudit extends IIOHR with measurement and audit — use it when faculty enables linkage for your cohort.",
    };
  }
  return {
    ...base,
    description:
      "External surgical audit and measurement workspace. Use your institute credentials where Single Sign-On is enabled; otherwise open HairAudit in a new tab.",
  };
}

export async function buildDoctorDashboardVm(
  supabase: SupabaseClient,
  input: {
    userId: string;
    displayName: string | null;
    application: ApplicationRow | null;
  }
): Promise<DoctorDashboardVm> {
  const applyPath = "/apply/doctors";
  const hasApp = Boolean(input.application);

  const snapshot = await fetchLearnerDashboardSnapshot(supabase, input.userId, "doctors");
  const enrollment = snapshot.enrollment;
  const hasEnrollment = Boolean(enrollment);
  const setupIncomplete = !hasApp && !hasEnrollment;

  const programSlug = enrollment?.program_slug ?? "";

  const pathway: DoctorDashboardVm["pathway"] = enrollment
    ? pathwaySummaryFromProgram(programSlug)
    : PATHWAY_PLACEHOLDER;

  let stageBadge: StageBadgeVm;
  if (enrollment) {
    const label = pathwaySummaryFromProgram(programSlug);
    stageBadge = {
      label: "Enrollment",
      stageName:
        enrollment.status === "active"
          ? `Active — ${label.pathwayLabel}`
          : `${enrollment.status.replace(/_/g, " ")} — ${label.pathwayLabel}`,
      tone: enrollment.status === "active" ? "positive" : "attention",
    };
  } else if (input.application) {
    stageBadge =
      applicationStatusToStageBadge(input.application) ?? {
        label: "Pathway stage",
        stageName: "Pre-enrolment",
        tone: "neutral",
      };
  } else {
    stageBadge = {
      label: "Pathway stage",
      stageName: "Pre-enrolment",
      tone: "neutral",
    };
  }

  let timelineHeading: string;
  let stageTimeline: TimelineItemVm[];
  if (enrollment && (enrollment.status === "active" || enrollment.status === "paused" || enrollment.status === "completed")) {
    timelineHeading = "Program milestones";
    stageTimeline = buildModuleTimelineVm(programSlug, snapshot.moduleProgress);
  } else if (input.application) {
    timelineHeading = "Admissions timeline";
    stageTimeline = applicationToAdmissionsTimeline(input.application);
  } else {
    timelineHeading = "Pathway milestones";
    stageTimeline = defaultLearningTimeline();
  }

  const overallPercent = enrollment
    ? computeOverallPercent(programSlug, snapshot.moduleProgress)
    : input.application?.status === "accepted"
      ? 8
      : input.application
        ? 4
        : 0;

  let overallCaption: string;
  if (enrollment) {
    const parts: string[] = [`Program: ${pathway.pathwayLabel}`];
    parts.push(`Enrollment status: ${enrollment.status.replace(/_/g, " ")}`);
    if (snapshot.lessonCompletionCount > 0) {
      parts.push(`${snapshot.lessonCompletionCount} lesson completion(s) recorded`);
    }
    overallCaption = parts.join(" · ");
  } else if (input.application?.status === "accepted") {
    overallCaption = "Admissions accepted — enrollment appears when provisioned.";
  } else if (input.application) {
    overallCaption = "Admissions track — pathway unlocks after acceptance and enrollment.";
  } else {
    overallCaption = "Start your application to unlock staged progression.";
  }

  const overallProgress: DoctorDashboardVm["overallProgress"] = {
    label: "Program progress",
    percent: overallPercent,
    caption: overallCaption,
  };

  const milestones: MilestoneVm[] = enrollment
    ? buildModuleMilestonesVm(programSlug, snapshot.moduleProgress)
    : defaultMilestones();

  const assignedModules: DoctorDashboardVm["assignedModules"] = enrollment
    ? buildAssignedModulesVm(programSlug, snapshot.moduleProgress)
    : defaultModules();

  const certificates = mapCertificatesVm(snapshot.certificates, defaultCertificates());

  const auditBenchmark: DoctorDashboardVm["auditBenchmark"] = {
    title: "Audit & benchmarking",
    body:
      "When your cohort is active, surgical quality indicators and cohort benchmarks will surface here. HairAudit links the clinical audit layer to IIOHR standards.",
    metrics: [
      { label: "Cohort percentile", value: "—", hint: "Requires completed cases" },
      {
        label: "Standards alignment",
        value: enrollment ? "In training" : "Pending",
        hint: enrollment ? "Progress from your enrollment" : "Faculty review",
      },
      {
        label: "Clinic / audit context",
        value: enrollment?.clinic_id ? "Linked" : "Not linked",
        hint: enrollment?.clinic_id ? "clinic_id on enrollment" : "Optional clinic scope",
      },
    ],
  };

  return {
    accent: "doctor",
    heroTitle: input.displayName ? `Welcome back, ${input.displayName}` : "Doctor workspace",
    heroSubtitle:
      "Pathway-based training, staged progression, and ecosystem-linked outcome review — centred on your program enrolment.",
    pathway,
    timelineHeading,
    stageBadge,
    overallProgress,
    stageTimeline,
    milestones,
    assignedModules,
    nextActions: defaultNextActions(applyPath, hasApp, hasEnrollment),
    auditBenchmark,
    certificates,
    hairAuditLink: hairAuditCopy(enrollment),
    setupIncomplete,
    emptyState: setupIncomplete
      ? {
          title: "Complete setup to unlock your pathway",
          body:
            "You have dashboard access. Submit or continue your doctor application so admissions can align your cohort, modules, and certificate track — or continue once an enrollment is provisioned.",
          primaryHref: applyPath,
          primaryLabel: "Go to application",
        }
      : undefined,
  };
}
