import { Card } from "@/components/ui/Card";
import type { AssignedModuleVm } from "@/lib/dashboard/types";

interface AssignedModulesCardProps {
  title?: string;
  modules: AssignedModuleVm[];
}

function statusLabel(s: AssignedModuleVm["status"]): string {
  switch (s) {
    case "complete":
      return "Complete";
    case "in_progress":
      return "In progress";
    default:
      return "Not started";
  }
}

export function AssignedModulesCard({ title = "Assigned modules", modules }: AssignedModulesCardProps) {
  return (
    <Card quiet className="h-full">
      <h3 className="text-base font-semibold text-heading">{title}</h3>
      <p className="mt-1 text-sm text-readable-muted">Next actions tie to these modules when your enrolment is live.</p>
      <ul className="mt-5 space-y-3">
        {modules.map((mod) => (
          <li
            key={mod.id}
            className="flex flex-col gap-1 border-b border-border/60 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm font-medium text-foreground">{mod.title}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{statusLabel(mod.status)}</span>
              {mod.etaHint ? <span className="text-xs text-readable-subtle">{mod.etaHint}</span> : null}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
