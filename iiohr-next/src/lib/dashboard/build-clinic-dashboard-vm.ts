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

function formatLastActivity(iso: string | null | undefined): string | undefined {
  if (!iso) return undefined;
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return undefined;
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return undefined;
  }
}

function pathwayAssignedLabel(row: {
  assigned_pathway_stream?: string;
  assigned_pathway_program?: string | null;
  stream_slug: string;
  program_slug: string;
}): string {
  const slug = row.assigned_pathway_program ?? row.program_slug;
  const title = getProgram(slug)?.title ?? slug;
  const stream = row.assigned_pathway_stream ?? row.stream_slug;
  return `${stream} — ${title}`;
}

export async function buildClinicDashboardVm(
  supabase: SupabaseClient,
  input: { userId: string; displayName: string | null }
): Promise<ClinicDashboardVm> {
  const snap = await fetchClinicDashboardSnapshot(supabase, input.userId);

  const setupIncomplete = !snap.isClinicManager && !snap.clinicId;

  const teamVm: ClinicDashboardVm["teamMembers"] =
    snap.teamMembers.length > 0
      ? snap.teamMembers.map((row) => {
          const activity = formatLastActivity(row.last_activity_at);
          const statusLabel = row.enrollment_status?.replace(/_/g, " ") ?? "";
          const assign = row.assignment_status?.replace(/_/g, " ") ?? "";
          const hintParts = [assign && `Placement: ${assign}`, statusLabel && `Enrollment: ${statusLabel}`, activity].filter(
            Boolean
          );
          return {
            id: row.enrollment_id,
            name: row.display_name?.trim() ? row.display_name.trim() : "Learner",
            role: row.stream_slug === "doctors" ? "Doctor track" : "Consultant track",
            pathwayLabel: pathwayAssignedLabel(row),
            progressPercent: row.progress_percent ?? 0,
            lastActivityHint: hintParts.length > 0 ? hintParts.join(" · ") : "—",
            assignmentStatus: row.assignment_status,
            pathwayAssignedLabel: pathwayAssignedLabel(row),
            memberRecordId: row.member_record_id ?? null,
            userId: row.user_id,
          };
        })
      : [];

  const hasDoc = snap.teamMembers.some((t) => t.stream_slug === "doctors" || t.assigned_pathway_stream === "doctors");
  const hasCon = snap.teamMembers.some(
    (t) => t.stream_slug === "consultants" || t.assigned_pathway_stream === "consultants"
  );
  const hasPendingInvites = snap.pendingInvites.length > 0;

  const trainingByRole: ClinicDashboardVm["trainingByRole"] =
    snap.teamMembers.length > 0 || hasPendingInvites
      ? [
          {
            roleLabel: "Surgeons / doctors",
            pathwayLabel: "IIOHR doctor stream",
            assigned: hasDoc,
            note: hasDoc ? undefined : "No doctor stream enrollments or placements yet",
          },
          {
            roleLabel: "Consultants & nurses",
            pathwayLabel: "IIOHR consultant stream",
            assigned: hasCon,
            note: hasCon ? undefined : "No consultant stream enrollments or placements yet",
          },
          {
            roleLabel: "Front-of-house",
            pathwayLabel: "Patient experience basics",
            assigned: false,
            note: "Optional add-on",
          },
        ]
      : defaultTrainingByRole();

  const seatSummaryParts: string[] = [];
  if (snap.clinicId) {
    seatSummaryParts.push("Clinic scope resolved for this account.");
    if (snap.isClinicManager) {
      seatSummaryParts.push(
        "Pending email invites are linked to learner accounts automatically when they sign in with the same email (placement only — enrollment is provisioned separately)."
      );
    }
    if (snap.teamMembers.length > 0) {
      seatSummaryParts.push(`${snap.teamMembers.length} learner enrollment(s) in this clinic.`);
    } else if (snap.isClinicManager) {
      seatSummaryParts.push("No learner enrollments under this clinic_id yet.");
    }
    if (hasPendingInvites) {
      seatSummaryParts.push(`${snap.pendingInvites.length} pending email invite(s).`);
    }
    if (snap.teamSnapshotError) {
      seatSummaryParts.push(`Team snapshot: ${snap.teamSnapshotError}`);
    }
  } else {
    seatSummaryParts.push("No clinic scope on this account — map a clinic in admin or enrol with a clinic_id.");
  }

  const overview: ClinicDashboardVm["overview"] = {
    clinicName: input.displayName ? `${input.displayName}'s organisation` : "Your clinic",
    seatSummary: seatSummaryParts.join(" "),
    pathwayMixSummary:
      snap.teamMembers.length > 0 || hasPendingInvites
        ? `Streams: ${[hasDoc && "doctors", hasCon && "consultants"].filter(Boolean).join(", ") || "—"}.`
        : "Doctor and consultant tracks can run in parallel for the same site.",
  };

  const certificatesOverview: ClinicDashboardVm["certificatesOverview"] =
    snap.teamMembers.length > 0
      ? {
          headline: "Certificates & completions",
          body:
            snap.teamCertificateTotal > 0
              ? `Total certificate awards recorded across the team: ${snap.teamCertificateTotal}. Individual PDF downloads are managed in each learner’s own dashboard, not here.`
              : "No certificate awards recorded for this team yet — they will appear as learners complete eligible programs.",
          items: [
            {
              label: "Certificates issued (team aggregate)",
              state: snap.teamCertificateTotal > 0 ? "in_progress" : "pending",
            },
            {
              label: "Team enrollments tracked",
              state: "in_progress",
            },
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
            ? snap.clinicIds.length > 1
              ? `${snap.clinicIds.length} clinic scope(s) — dashboard shows primary`
              : "Clinic manager role with clinic scope"
            : "Manager role — add clinic_manager_clinics row or enroll with clinic_id"
          : "Requires clinic manager role",
      },
      {
        label: "Training roster",
        state: snap.teamMembers.length > 0 || hasPendingInvites ? "in_progress" : "not_started",
        detail: snap.teamSnapshotError
          ? `Snapshot: ${snap.teamSnapshotError}`
          : `${snap.teamMembers.length} enrollment(s); ${snap.pendingInvites.length} invite(s)`,
      },
      {
        label: "Pathway assignment",
        state: hasDoc || hasCon || hasPendingInvites ? "in_progress" : "not_started",
        detail: "Placements stored in clinic_team_members; invites pending until learners join",
      },
      {
        label: "Quality loop",
        state: "not_started",
        detail: "HairAudit / review cadence",
      },
    ],
  };

  const management: ClinicDashboardVm["management"] =
    snap.isClinicManager && snap.clinicId
      ? {
          enabled: true,
          clinicId: snap.clinicId,
          pendingInvites: snap.pendingInvites.map((p) => ({
            memberId: p.member_id,
            email: p.invite_email,
            targetStreamSlug: p.target_stream_slug,
            targetProgramSlug: p.target_program_slug,
          })),
          pathwayAssignees: snap.teamMembers.map((row) => ({
            userId: row.user_id,
            displayLabel: `${row.display_name?.trim() || "Learner"} · ${row.stream_slug}`,
          })),
        }
      : undefined;

  const teamProgressCaption =
    snap.teamSnapshotError
      ? `Could not load full snapshot: ${snap.teamSnapshotError}`
      : "Enrollment progress, pathway placement, and activity — from secure clinic snapshot (read-only aggregate).";

  return {
    accent: "clinic",
    heroTitle: input.displayName ? `Clinic workspace — ${input.displayName}` : "Clinic workspace",
    heroSubtitle:
      "Team development, pathway assignment by role, and completion visibility — aligned to IIOHR’s clinic promise.",
    overview,
    teamMembers: teamVm,
    trainingByRole,
    teamProgress: teamVm,
    certificatesOverview,
    implementation,
    setupIncomplete,
    management,
    teamProgressCaption,
    emptyState: setupIncomplete
      ? {
          title: "Clinic setup incomplete",
          body: `Ensure this account has the clinic_manager role and a clinic mapping (admin-maintained clinic_manager_clinics or an enrollment with clinic_id). Contact ${siteConfig.emails.clinics}.`,
          primaryHref: "/apply/clinics",
          primaryLabel: "Clinic continuation",
        }
      : undefined,
  };
}
