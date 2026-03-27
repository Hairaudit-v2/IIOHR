import { AssignedModulesCard } from "@/components/dashboard/shared/AssignedModulesCard";
import { AuditBenchmarkCard } from "@/components/dashboard/shared/AuditBenchmarkCard";
import { BillingAccessCard } from "@/components/dashboard/shared/BillingAccessCard";
import { CertificatesCard } from "@/components/dashboard/shared/CertificatesCard";
import { DashboardEmptyState } from "@/components/dashboard/shared/DashboardEmptyState";
import { DashboardHero } from "@/components/dashboard/shared/DashboardHero";
import { ExternalPlatformLinkCard } from "@/components/dashboard/shared/ExternalPlatformLinkCard";
import { MilestoneChecklist } from "@/components/dashboard/shared/MilestoneChecklist";
import { NextActionsCard } from "@/components/dashboard/shared/NextActionsCard";
import { PathwaySummaryCard } from "@/components/dashboard/shared/PathwaySummaryCard";
import { ProgressMeter } from "@/components/dashboard/shared/ProgressMeter";
import { StageBadgePill } from "@/components/dashboard/shared/StageBadgePill";
import { StageTimeline } from "@/components/dashboard/shared/StageTimeline";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import type { DoctorDashboardVm } from "@/lib/dashboard/types";

export function DoctorDashboardWorkspace({
  vm,
  admissionsPanel,
}: {
  vm: DoctorDashboardVm;
  /** Preserves compact admissions status from existing academy flow. */
  admissionsPanel?: ReactNode;
}) {
  return (
    <div className="space-y-10">
      <DashboardHero
        accent={vm.accent}
        eyebrow="Doctor workspace"
        title={vm.heroTitle}
        subtitle={vm.heroSubtitle}
        badge={<StageBadgePill vm={vm.stageBadge} />}
      />

      {admissionsPanel ? <div className="max-w-2xl">{admissionsPanel}</div> : null}

      {vm.setupIncomplete && vm.emptyState ? (
        <DashboardEmptyState
          title={vm.emptyState.title}
          body={vm.emptyState.body}
          primaryHref={vm.emptyState.primaryHref}
          primaryLabel={vm.emptyState.primaryLabel}
        />
      ) : null}

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PathwaySummaryCard vm={vm.pathway} />
        </div>
        <Card quiet className="h-full">
          <ProgressMeter
            label={vm.overallProgress.label}
            percent={vm.overallProgress.percent}
            caption={vm.overallProgress.caption}
          />
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card quiet className="h-full">
          <StageTimeline heading={vm.timelineHeading} items={vm.stageTimeline} />
        </Card>
        <Card quiet className="h-full">
          <MilestoneChecklist heading="Milestones" milestones={vm.milestones} />
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AssignedModulesCard modules={vm.assignedModules} />
        <CertificatesCard vm={vm.certificates} />
        <ExternalPlatformLinkCard
          title={vm.hairAuditLink.title}
          description={vm.hairAuditLink.description}
          href={vm.hairAuditLink.href}
          linkLabel="Open HairAudit"
          variant="ecosystem"
        />
      </div>

      <AuditBenchmarkCard vm={vm.auditBenchmark} />

      <div className="grid gap-5 md:grid-cols-2">
        <BillingAccessCard />
        <NextActionsCard actions={vm.nextActions} />
      </div>
    </div>
  );
}
