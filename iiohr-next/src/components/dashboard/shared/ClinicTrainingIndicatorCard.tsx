import { Card } from "@/components/ui/Card";
import type { ConsultantClinicTrainingVm } from "@/lib/dashboard/types";

export function ClinicTrainingIndicatorCard({ vm }: { vm: ConsultantClinicTrainingVm }) {
  if (!vm.visible) {
    return (
      <Card quiet className="h-full border-dashed border-border/90">
        <h3 className="text-base font-semibold text-heading">Clinic-assigned training</h3>
        <p className="mt-2 text-sm leading-relaxed text-readable-muted">{vm.message}</p>
      </Card>
    );
  }

  return (
    <Card quiet className="h-full border-[color-mix(in_srgb,var(--accent-blue)_22%,transparent)]">
      <h3 className="text-base font-semibold text-heading">Clinic-assigned training</h3>
      <p className="mt-2 text-sm text-readable-muted">
        {vm.clinicName ? (
          <>
            Active for <span className="font-semibold text-foreground">{vm.clinicName}</span>
            {vm.pathwayLabel ? (
              <>
                {" "}
                — <span className="text-foreground">{vm.pathwayLabel}</span>
              </>
            ) : null}
            .
          </>
        ) : (
          vm.message
        )}
      </p>
    </Card>
  );
}
