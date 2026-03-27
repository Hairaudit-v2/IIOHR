import type { StageBadgeVm } from "@/lib/dashboard/types";

export function StageBadgePill({ vm }: { vm: StageBadgeVm }) {
  const tone =
    vm.tone === "positive"
      ? "border-emerald-900/20 bg-emerald-950/[0.07] text-emerald-950"
      : vm.tone === "attention"
        ? "border-[color-mix(in_srgb,var(--gold-primary)_40%,transparent)] bg-[var(--gold-soft)] text-foreground"
        : "border-border/90 bg-surface-elevated/70 text-readable-muted";

  return (
    <div className={`max-w-xs rounded-[10px] border px-4 py-3 text-left ${tone}`}>
      <p className="text-[10px] font-semibold tracking-[0.18em] text-readable-subtle uppercase">{vm.label}</p>
      <p className="mt-1.5 text-sm font-semibold leading-snug text-foreground">{vm.stageName}</p>
    </div>
  );
}
