/** View-models for protected dashboards — UI-facing shapes only; not tied to raw DB rows. */

import type { ClinicBillingEntitlementCounts } from "@/lib/clinic/fetch-clinic-billing-entitlement";

export type DashboardRoleAccent = "doctor" | "consultant" | "clinic";

export type TimelineItemState = "complete" | "current" | "upcoming";

export interface PathwaySummaryVm {
  title: string;
  subtitle: string;
  /** Short slug e.g. "Practical FUE — staged progression" */
  pathwayLabel: string;
}

export interface StageBadgeVm {
  label: string;
  /** Human-readable stage name */
  stageName: string;
  tone: "neutral" | "attention" | "positive";
}

export interface ProgressMeterVm {
  label: string;
  percent: number;
  caption: string;
}

export interface TimelineItemVm {
  id: string;
  label: string;
  detail?: string;
  state: TimelineItemState;
}

export interface MilestoneVm {
  id: string;
  label: string;
  done: boolean;
  dueHint?: string;
}

export interface AssignedModuleVm {
  id: string;
  title: string;
  status: "not_started" | "in_progress" | "complete";
  etaHint?: string;
}

export interface NextActionVm {
  id: string;
  label: string;
  href?: string;
  emphasis?: boolean;
}

export interface AuditBenchmarkVm {
  title: string;
  body: string;
  metrics: { label: string; value: string; hint?: string }[];
}

export interface CertificateStatusVm {
  headline: string;
  body: string;
  items: { label: string; state: "pending" | "in_progress" | "ready" | "issued" }[];
  downloadReadyCount: number;
}

export interface ClinicTeamMemberVm {
  id: string;
  name: string;
  role: string;
  pathwayLabel: string;
  progressPercent: number;
  lastActivityHint?: string;
  /** From `clinic_team_members` or enrollment-derived. */
  assignmentStatus?: string;
  /** Intended pathway (stream + program slug or title). */
  pathwayAssignedLabel?: string;
  memberRecordId?: string | null;
  userId?: string;
}

export interface ClinicPendingInviteVm {
  memberId: string;
  email: string;
  targetStreamSlug: string;
  targetProgramSlug: string | null;
}

/** Server-driven team management (forms post to RPCs). */
export interface ClinicManagementVm {
  enabled: boolean;
  clinicId: string | null;
  pendingInvites: ClinicPendingInviteVm[];
  /** Learners with enrollments under this clinic (pathway assignment target). */
  pathwayAssignees: { userId: string; displayLabel: string }[];
}

export interface ClinicOverviewVm {
  clinicName: string;
  /** Team placement, invites, and enrollment roster — not subscription math. */
  placementSummary: string;
  /** Seat entitlement / internal billing counters (managers). */
  billingSummary: string;
  pathwayMixSummary: string;
}

/** Seat snapshot for billing card; mirrors `get_clinic_billing_entitlement_snapshot`. */
export interface ClinicSeatEntitlementVm {
  seatLimit: number | null;
  seatsUsed: number;
  seatsAvailable: number | null;
  overLimit: boolean;
  completedEnrollmentConsumesSeat: boolean;
  counts: ClinicBillingEntitlementCounts;
  loadError?: string;
}

export interface TrainingAssignmentVm {
  roleLabel: string;
  pathwayLabel: string;
  assigned: boolean;
  note?: string;
}

export interface ImplementationReadinessVm {
  title: string;
  pillars: { label: string; state: "not_started" | "in_progress" | "ready"; detail?: string }[];
}

export interface ConsultantClinicTrainingVm {
  visible: boolean;
  clinicName?: string;
  pathwayLabel?: string;
  message: string;
}

export interface DoctorDashboardVm {
  accent: DashboardRoleAccent;
  heroTitle: string;
  heroSubtitle: string;
  pathway: PathwaySummaryVm;
  /** Section title above `stageTimeline` (admissions vs learning milestones). */
  timelineHeading: string;
  /** Admissions or pre-enrolment pathway stage. */
  stageBadge: StageBadgeVm;
  overallProgress: ProgressMeterVm;
  stageTimeline: TimelineItemVm[];
  milestones: MilestoneVm[];
  assignedModules: AssignedModuleVm[];
  nextActions: NextActionVm[];
  auditBenchmark: AuditBenchmarkVm;
  certificates: CertificateStatusVm;
  hairAuditLink: { href: string; title: string; description: string };
  setupIncomplete: boolean;
  emptyState?: { title: string; body: string; primaryHref: string; primaryLabel: string };
}

export interface ConsultantDashboardVm {
  accent: DashboardRoleAccent;
  heroTitle: string;
  heroSubtitle: string;
  pathway: PathwaySummaryVm;
  overallProgress: ProgressMeterVm;
  assignedModules: AssignedModuleVm[];
  milestones: MilestoneVm[];
  assessments: MilestoneVm[];
  certificates: CertificateStatusVm;
  clinicTraining: ConsultantClinicTrainingVm;
  setupIncomplete: boolean;
  emptyState?: { title: string; body: string; primaryHref: string; primaryLabel: string };
}

export interface ClinicDashboardVm {
  accent: DashboardRoleAccent;
  heroTitle: string;
  heroSubtitle: string;
  overview: ClinicOverviewVm;
  teamMembers: ClinicTeamMemberVm[];
  trainingByRole: TrainingAssignmentVm[];
  teamProgress: ClinicTeamMemberVm[];
  certificatesOverview: CertificateStatusVm;
  implementation: ImplementationReadinessVm;
  setupIncomplete: boolean;
  emptyState?: { title: string; body: string; primaryHref: string; primaryLabel: string };
  /** When set, renders team invite / pathway forms (additive panel). */
  management?: ClinicManagementVm;
  /** Replaces generic team table caption when present. */
  teamProgressCaption?: string;
  /** Present for clinic managers with clinic scope; drives Billing / access card. */
  seatEntitlement?: ClinicSeatEntitlementVm;
}
