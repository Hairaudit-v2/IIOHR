import { Card } from "@/components/ui/Card";
import type { AuditBenchmarkVm } from "@/lib/dashboard/types";

export function AuditBenchmarkCard({ vm }: { vm: AuditBenchmarkVm }) {
  return (
    <Card quiet>
      <h3 className="text-base font-semibold text-heading">{vm.title}</h3>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-readable-muted">{vm.body}</p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        {vm.metrics.map((m) => (
          <div key={m.label} className="rounded-md border border-border/70 bg-surface-elevated/45 px-4 py-3">
            <dt className="text-xs font-medium tracking-wide text-readable-muted uppercase">{m.label}</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-foreground">{m.value}</dd>
            {m.hint ? <p className="mt-1 text-xs text-readable-subtle">{m.hint}</p> : null}
          </div>
        ))}
      </dl>
    </Card>
  );
}
