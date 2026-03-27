import { Card } from "@/components/ui/Card";
import type { CertificateStatusVm } from "@/lib/dashboard/types";

interface CertificatesCardProps {
  vm: CertificateStatusVm;
}

function stateBadge(state: CertificateStatusVm["items"][number]["state"]): string {
  switch (state) {
    case "issued":
    case "ready":
      return "border-emerald-800/25 bg-emerald-950/[0.06] text-emerald-900";
    case "in_progress":
      return "border-[color-mix(in_srgb,var(--gold-primary)_35%,transparent)] bg-[var(--gold-soft)] text-foreground";
    default:
      return "border-border/80 bg-surface-elevated/50 text-readable-muted";
  }
}

export function CertificatesCard({ vm }: CertificatesCardProps) {
  return (
    <Card quiet className="h-full">
      <h3 className="text-base font-semibold text-heading">{vm.headline}</h3>
      <p className="mt-1 text-sm text-readable-muted">{vm.body}</p>
      <ul className="mt-5 space-y-2.5">
        {vm.items.map((item) => (
          <li
            key={item.label}
            className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm ${stateBadge(item.state)}`}
          >
            <span className="font-medium">{item.label}</span>
            <span className="text-xs font-semibold tracking-wide uppercase">
              {item.state.replace(/_/g, " ")}
            </span>
          </li>
        ))}
      </ul>
      {vm.downloadReadyCount > 0 ? (
        <p className="mt-4 text-xs text-readable-muted">{vm.downloadReadyCount} download(s) ready.</p>
      ) : (
        <p className="mt-4 text-xs text-readable-subtle">No downloads yet — eligibility pending.</p>
      )}
    </Card>
  );
}
