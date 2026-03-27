import { AssignedModulesCard } from "@/components/dashboard/shared/AssignedModulesCard";
import { BillingAccessCard } from "@/components/dashboard/shared/BillingAccessCard";
import { CertificatesCard } from "@/components/dashboard/shared/CertificatesCard";
import { ClinicTrainingIndicatorCard } from "@/components/dashboard/shared/ClinicTrainingIndicatorCard";
import { DashboardEmptyState } from "@/components/dashboard/shared/DashboardEmptyState";
import { DashboardHero } from "@/components/dashboard/shared/DashboardHero";
import { MilestoneChecklist } from "@/components/dashboard/shared/MilestoneChecklist";
import { PathwaySummaryCard } from "@/components/dashboard/shared/PathwaySummaryCard";
import { ProgressMeter } from "@/components/dashboard/shared/ProgressMeter";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import type { ConsultantDashboardVm } from "@/lib/dashboard/types";

export function ConsultantDashboardWorkspace({
  vm,
  admissionsPanel,
}: {
  vm: ConsultantDashboardVm;
  admissionsPanel?: ReactNode;
}) {
  return (
    <div className="space-y-10">
      <DashboardHero accent={vm.accent} eyebrow="Consultant workspace" title={vm.heroTitle} subtitle={vm.heroSubtitle} />

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
        <AssignedModulesCard title="Current modules" modules={vm.assignedModules} />
        <ClinicTrainingIndicatorCard vm={vm.clinicTraining} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card quiet className="h-full">
          <MilestoneChecklist heading="Milestones" milestones={vm.milestones} />
        </Card>
        <Card quiet className="h-full">
          <MilestoneChecklist heading="Assessments" milestones={vm.assessments} />
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <CertificatesCard vm={vm.certificates} />
        <BillingAccessCard />
      </div>
    </div>
  );
}
