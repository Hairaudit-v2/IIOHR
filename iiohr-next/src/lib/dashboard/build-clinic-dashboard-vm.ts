import type { SupabaseClient } from "@supabase/supabase-js";
import { getProgram } from "@/lib/academy/content-loader";
import type { ClinicDashboardVm } from "@/lib/dashboard/types";
import { fetchClinicDashboardSnapshot } from "@/lib/dashboard/readers/clinic-dashboard-snapshot";
import { siteConfig } from "@/lib/site";

function defaultTrainingByRole(): ClinicDashboardVm["trainingByRole"] {
  return [
    { roleLabel: "Surgeons / doctors", pathwayLabel: "Practical FUE staged track", assigned: true },
    { roleLabel: "Consultants & nurses", pathwayLabel: "Consultant competency pathway", assigned: true },
    { roleLabel: "Front-of-house", pathwayLabel: "Patient experience basics", assigned: false, note: "Optional add-on" },
  ];
}

function defaultCertificates(): ClinicDashboardVm["certificatesOverview"] {
  return {
    headline: "Certificates & completions",
    body: "Aggregate view when team members complete levels (placeholder until roster and awards are fully wired).",
    items: [
      { label: "Active credentials (team)", state: "in_progress" },
      { label: "Completed in last 90 days", state: "pending" },
    ],
    downloadReadyCount: 0,
  };
}

export async function buildClinicDashboardVm(
  supabase: SupabaseClient,
  input: { userId: string; displayName: string | null }
): Promise<ClinicDashboardVm> {
  const snap = await fetchClinicDashboardSnapshot(supabase, input.userId);

  const setupIncomplete = !snap.isClinicManager && !snap.clinicId;

  const teamMembers: ClinicDashboardVm["teamMembers"] =
    snap.teamEnrollments.length > 0
      ? snap.teamEnrollments.map((row, i) => ({
          id: row.id,
          name: `Learner ${i + 1}`,
          role: row.stream_slug === "doctors" ? "Doctor track" : "Consultant track",
          pathwayLabel: getProgram(row.program_slug)?.title ?? row.program_slug,
          progressPercent: snap.progressByEnrollmentId[row.id] ?? 0,
          lastActivityHint: "Enrollment-backed",
        }))
      : [];

  const hasDoc = snap.teamEnrollments.some((t) => t.stream_slug === "doctors");
  const hasCon = snap.teamEnrollments.some((t) => t.stream_slug === "consultants");

  const trainingByRole: ClinicDashboardVm["trainingByRole"] =
    snap.teamEnrollments.length > 0
      ? [
          {
            roleLabel: "Surgeons / doctors",
            pathwayLabel: "IIOHR doctor stream",
            assigned: hasDoc,
            note: hasDoc ? undefined : "No active doctor enrollment under this clinic scope",
          },
          {
            roleLabel: "Consultants & nurses",
            pathwayLabel: "IIOHR consultant stream",
            assigned: hasCon,
            note: hasCon ? undefined : "No active consultant enrollment under this clinic scope",
          },
          {
            roleLabel: "Front-of-house",
            pathwayLabel: "Patient experience basics",
            assigned: false,
            note: "Optional add-on",
          },
        ]
      : defaultTrainingByRole();

  const overview: ClinicDashboardVm["overview"] = {
    clinicName: input.displayName ? `${input.displayName}'s organisation` : "Your clinic",
    seatSummary: snap.clinicId
      ? snap.teamEnrollments.length > 0
        ? `${snap.teamEnrollments.length} active enrollment(s) under this clinic scope.`
        : "Clinic scope on record — team rows appear when learners are enrolled with this clinic_id (RLS may limit visibility until policies are extended)."
      : "No clinic scope detected on this account — link your organisation through admissions or internal provisioning.",
    pathwayMixSummary:
      snap.teamEnrollments.length > 0
        ? `Active streams: ${[hasDoc && "doctors", hasCon && "consultants"].filter(Boolean).join(", ") || "—"}.`
      : "Doctor and consultant tracks can run in parallel for the same site.",
  };

  const certificatesOverview: ClinicDashboardVm["certificatesOverview"] =
    snap.teamEnrollments.length > 0
      ? {
          headline: "Certificates & completions",
          body: "Team has active enrollments — certificate roll-ups will reflect issued awards per learner as they complete programs.",
          items: [
            { label: "Active program enrollments (team)", state: "in_progress" },
            { label: "Issued credentials (aggregate)", state: "pending" },
          ],
          downloadReadyCount: 0,
        }
      : defaultCertificates();

  const implementation: ClinicDashboardVm["implementation"] = {
    title: "Implementation & readiness",
    pillars: [
      {
        label: "Clinic provisioning",
        state: snap.isClinicManager && snap.clinicId ? "ready" : snap.isClinicManager ? "in_progress" : "not_started",
        detail: snap.isClinicManager
          ? snap.clinicId
            ? "Clinic manager role with clinic scope"
            : "Manager role — awaiting clinic_id linkage"
          : "Requires clinic manager role",
      },
      {
        label: "Training roster",
        state: snap.teamEnrollments.length > 0 ? "in_progress" : "not_started",
        detail:
          snap.teamEnrollments.length > 0
            ? `${snap.teamEnrollments.length} enrollment(s) visible`
            : "No team enrollments visible yet",
      },
      {
        label: "Pathway assignment",
        state: hasDoc || hasCon ? "in_progress" : "not_started",
        detail: "Inferred from active enrollments by stream",
      },
      {
        label: "Quality loop",
        state: "not_started",
        detail: "HairAudit / review cadence",
      },
    ],
  };

  return {
    accent: "clinic",
    heroTitle: input.displayName ? `Clinic workspace — ${input.displayName}` : "Clinic workspace",
    heroSubtitle:
      "Team development, pathway assignment by role, and completion visibility — aligned to IIOHR’s clinic promise.",
    overview,
    teamMembers,
    trainingByRole,
    teamProgress: teamMembers,
    certificatesOverview,
    implementation,
    setupIncomplete,
    emptyState: setupIncomplete
      ? {
          title: "Clinic setup incomplete",
          body: `Ensure this account has the clinic manager role and a linked clinic scope. Continue your clinic journey or contact ${siteConfig.emails.clinics}.`,
          primaryHref: "/apply/clinics",
          primaryLabel: "Clinic continuation",
        }
      : undefined,
  };
}
