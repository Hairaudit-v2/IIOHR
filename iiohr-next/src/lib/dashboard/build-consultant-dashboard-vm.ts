import type { SupabaseClient } from "@supabase/supabase-js";
import type { ApplicationRow } from "@/lib/academy/db/types";
import {
  buildAssignedModulesVm,
  buildConsultantAssessmentMilestones,
  buildModuleMilestonesVm,
  computeOverallPercent,
  mapCertificatesVm,
  pathwaySummaryFromProgram,
} from "@/lib/dashboard/learner-vm-shared";
import { fetchLearnerDashboardSnapshot } from "@/lib/dashboard/readers/learner-dashboard-snapshot";
import type { ConsultantDashboardVm, MilestoneVm } from "@/lib/dashboard/types";

const PATHWAY: ConsultantDashboardVm["pathway"] = {
  title: "Consultant / nurse pathway",
  subtitle: "Competency-led modules, assessments, and certificates aligned to clinic standards.",
  pathwayLabel: "Consultant professional track",
};

function defaultModules(): ConsultantDashboardVm["assignedModules"] {
  return [
    { id: "c1", title: "Patient journey & counselling", status: "in_progress", etaHint: "In progress" },
    { id: "c2", title: "Theatre protocols & safety", status: "not_started" },
    { id: "c3", title: "Graft care & post-op briefing", status: "not_started" },
  ];
}

function defaultMilestones(): MilestoneVm[] {
  return [
    { id: "cm1", label: "Module checkpoint 1", done: true },
    { id: "cm2", label: "Formative assessment", done: false, dueHint: "After module 4" },
    { id: "cm3", label: "Competency sign-off", done: false },
  ];
}

function defaultAssessments(): MilestoneVm[] {
  return [
    { id: "as1", label: "Knowledge check — foundations", done: true },
    { id: "as2", label: "OSCE-style practical review", done: false },
    { id: "as3", label: "Faculty review item", done: false },
  ];
}

function defaultCertificates(): ConsultantDashboardVm["certificates"] {
  return {
    headline: "Certificates & downloads",
    body: "Completed levels generate downloadable credentials when eligibility rules pass.",
    items: [
      { label: "Foundation certificate", state: "in_progress" },
      { label: "Advanced practice", state: "pending" },
    ],
    downloadReadyCount: 0,
  };
}

export async function buildConsultantDashboardVm(
  supabase: SupabaseClient,
  input: {
    userId: string;
    displayName: string | null;
    application: ApplicationRow | null;
  }
): Promise<ConsultantDashboardVm> {
  const applyPath = "/apply/consultants";
  const hasApp = Boolean(input.application);

  const snapshot = await fetchLearnerDashboardSnapshot(supabase, input.userId, "consultants");
  const enrollment = snapshot.enrollment;
  const hasEnrollment = Boolean(enrollment);
  const setupIncomplete = !hasApp && !hasEnrollment;

  const programSlug = enrollment?.program_slug ?? "";

  const pathway: ConsultantDashboardVm["pathway"] = enrollment
    ? pathwaySummaryFromProgram(programSlug)
    : PATHWAY;

  const overallPercent = enrollment
    ? computeOverallPercent(programSlug, snapshot.moduleProgress)
    : hasApp
      ? input.application?.status === "accepted"
        ? 12
        : 6
      : 0;

  let caption: string;
  if (enrollment) {
    const p = pathwaySummaryFromProgram(programSlug);
    const bits = [`Program: ${p.pathwayLabel}`, `Enrollment: ${enrollment.status.replace(/_/g, " ")}`];
    if (snapshot.lessonCompletionCount > 0) {
      bits.push(`${snapshot.lessonCompletionCount} lesson completion(s)`);
    }
    if (snapshot.assessmentAttempts.length > 0) {
      bits.push(`${snapshot.assessmentAttempts.length} assessment attempt(s)`);
    }
    caption = bits.join(" · ");
  } else if (input.application?.status === "accepted") {
    caption = "Admissions accepted — enrollment appears when provisioned.";
  } else if (input.application) {
    caption = "Admissions — pathway expands after acceptance and enrollment.";
  } else {
    caption = "Apply to assign your consultant track.";
  }

  const overallProgress: ConsultantDashboardVm["overallProgress"] = {
    label: "Pathway progress",
    percent: overallPercent,
    caption,
  };

  const assignedModules: ConsultantDashboardVm["assignedModules"] = enrollment
    ? buildAssignedModulesVm(programSlug, snapshot.moduleProgress)
    : defaultModules();

  const milestones: MilestoneVm[] = enrollment
    ? buildModuleMilestonesVm(programSlug, snapshot.moduleProgress)
    : defaultMilestones();

  const assessments: MilestoneVm[] = enrollment
    ? buildConsultantAssessmentMilestones(programSlug, snapshot.assessmentAttempts)
    : defaultAssessments();

  const certificates = mapCertificatesVm(snapshot.certificates, defaultCertificates());

  const clinicTraining: ConsultantDashboardVm["clinicTraining"] = enrollment?.clinic_id
    ? {
        visible: true,
        pathwayLabel: pathwaySummaryFromProgram(programSlug).pathwayLabel,
        message:
          "Your enrollment is linked to a clinic organisation. Training coordination may be managed by your clinic lead alongside IIOHR modules.",
      }
    : {
        visible: false,
        message:
          "When your clinic assigns a pathway, the active track and sponsor clinic will appear here. No clinic_id on your enrollment yet.",
      };

  return {
    accent: "consultant",
    heroTitle: input.displayName ? `Welcome back, ${input.displayName}` : "Consultant workspace",
    heroSubtitle:
      "Current modules, assessments, milestones, and certificate progress — structured for team-based hair restoration delivery.",
    pathway,
    overallProgress,
    assignedModules,
    milestones,
    assessments,
    certificates,
    clinicTraining,
    setupIncomplete,
    emptyState: setupIncomplete
      ? {
          title: "Finish application to activate your track",
          body:
            "Your account can reach this dashboard. Complete the consultant application so modules and assessments can be provisioned — or continue once an enrollment exists.",
          primaryHref: applyPath,
          primaryLabel: "Continue application",
        }
      : undefined,
  };
}
