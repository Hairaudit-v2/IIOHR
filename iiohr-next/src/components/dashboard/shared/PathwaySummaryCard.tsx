import { Card } from "@/components/ui/Card";
import type { PathwaySummaryVm } from "@/lib/dashboard/types";

export function PathwaySummaryCard({ vm }: { vm: PathwaySummaryVm }) {
  return (
    <Card quiet className="h-full">
      <h3 className="text-base font-semibold text-heading">{vm.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-readable-muted">{vm.subtitle}</p>
      <p className="mt-4 border-t border-border/70 pt-4 text-xs font-semibold tracking-wide text-foreground uppercase">
        {vm.pathwayLabel}
      </p>
    </Card>
  );
}
