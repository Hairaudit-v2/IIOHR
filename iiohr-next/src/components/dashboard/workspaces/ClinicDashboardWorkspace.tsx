import Link from "next/link";
import { BillingAccessCard } from "@/components/dashboard/shared/BillingAccessCard";
import { CertificatesCard } from "@/components/dashboard/shared/CertificatesCard";
import { DashboardEmptyState } from "@/components/dashboard/shared/DashboardEmptyState";
import { DashboardHero } from "@/components/dashboard/shared/DashboardHero";
import { TeamProgressTable } from "@/components/dashboard/shared/TeamProgressTable";
import { ClinicTeamManagementPanel } from "@/components/dashboard/workspaces/ClinicTeamManagementPanel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/lib/site";
import type { ClinicDashboardVm, TrainingAssignmentVm } from "@/lib/dashboard/types";

function TrainingAssignmentRow({ row }: { row: TrainingAssignmentVm }) {
  return (
    <li className="flex flex-col gap-1 border-b border-border/60 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-foreground">{row.roleLabel}</p>
        <p className="text-xs text-readable-muted">{row.pathwayLabel}</p>
        {row.note ? <p className="mt-0.5 text-xs text-readable-subtle">{row.note}</p> : null}
      </div>
      <span
        className={`shrink-0 text-xs font-semibold tracking-wide uppercase ${
          row.assigned ? "text-emerald-900" : "text-readable-muted"
        }`}
      >
        {row.assigned ? "Assigned" : "Available"}
      </span>
    </li>
  );
}

export function ClinicDashboardWorkspace({ vm }: { vm: ClinicDashboardVm }) {
  return (
    <div className="space-y-10">
      <DashboardHero accent={vm.accent} eyebrow="Clinic workspace" title={vm.heroTitle} subtitle={vm.heroSubtitle} />

      {vm.setupIncomplete && vm.emptyState ? (
        <DashboardEmptyState
          title={vm.emptyState.title}
          body={vm.emptyState.body}
          primaryHref={vm.emptyState.primaryHref}
          primaryLabel={vm.emptyState.primaryLabel}
        />
      ) : null}

      <div className="grid gap-5 md:grid-cols-3">
        <Card quiet className="md:col-span-2">
          <h3 className="text-base font-semibold text-heading">Clinic overview</h3>
          <p className="mt-2 text-sm font-medium text-foreground">{vm.overview.clinicName}</p>
          <p className="mt-2 text-sm text-readable-muted">{vm.overview.seatSummary}</p>
          <p className="mt-3 text-sm text-readable-muted">{vm.overview.pathwayMixSummary}</p>
          <p className="mt-5 text-sm">
            <Link href="/for-clinics" className="link-premium font-medium">
              For Clinics overview
            </Link>
            <span className="text-readable-subtle"> · </span>
            <a className="link-premium font-medium" href={`mailto:${siteConfig.emails.clinics}`}>
              {siteConfig.emails.clinics}
            </a>
          </p>
        </Card>
        <Card quiet>
          <h3 className="text-base font-semibold text-heading">Team members</h3>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-foreground">{vm.teamMembers.length}</p>
          <p className="mt-1 text-xs text-readable-muted">Learners with enrollments under your clinic scope.</p>
          <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-4 text-sm text-readable-muted">
            {vm.teamMembers.slice(0, 5).map((m) => (
              <li key={m.id}>
                <span className="font-medium text-foreground">{m.name}</span>
                <span className="text-readable-subtle"> — {m.role}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-2">
            <Button href={`mailto:${siteConfig.emails.training}?subject=Invite%20team%20member`} variant="primary">
              Invite / add member
            </Button>
            <Button href="/apply/clinics" variant="secondary">
              Clinic continuation
            </Button>
          </div>
        </Card>
      </div>

      {vm.management?.enabled ? <ClinicTeamManagementPanel vm={vm} /> : null}

      <Card quiet>
        <h3 className="text-base font-semibold text-heading">Assign training pathway by role</h3>
        <p className="mt-1 text-sm text-readable-muted">
          High-level mix for your site. Use team management above for per-learner pathway placement when enrollments exist.
        </p>
        <ul className="mt-4 divide-y divide-border/50 border-t border-border/60">
          {vm.trainingByRole.map((row) => (
            <TrainingAssignmentRow key={row.roleLabel} row={row} />
          ))}
        </ul>
      </Card>

      <Card quiet>
        <TeamProgressTable
          heading="Team progress"
          caption={vm.teamProgressCaption ?? "Enrollment progress for learners under this clinic."}
          members={vm.teamProgress}
        />
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <CertificatesCard vm={vm.certificatesOverview} />
        <Card quiet>
          <h3 className="text-base font-semibold text-heading">{vm.implementation.title}</h3>
          <ul className="mt-4 space-y-3">
            {vm.implementation.pillars.map((p) => (
              <li key={p.label} className="flex gap-3 text-sm">
                <span
                  className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                    p.state === "ready"
                      ? "bg-emerald-800"
                      : p.state === "in_progress"
                        ? "bg-[var(--gold-primary)]"
                        : "bg-border"
                  }`}
                  aria-hidden
                />
                <div>
                  <p className="font-medium text-foreground">{p.label}</p>
                  {p.detail ? <p className="text-xs text-readable-muted">{p.detail}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <BillingAccessCard />
    </div>
  );
}
