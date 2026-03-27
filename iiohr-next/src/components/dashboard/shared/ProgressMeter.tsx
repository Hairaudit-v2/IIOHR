interface ProgressMeterProps {
  label: string;
  percent: number;
  caption: string;
}

export function ProgressMeter({ label, percent, caption }: ProgressMeterProps) {
  const safe = Number.isFinite(percent) ? Math.min(100, Math.max(0, percent)) : 0;
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs font-medium tabular-nums tracking-wide text-muted-foreground">{Math.round(safe)}%</p>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full border border-border/80 bg-surface-elevated/80"
        role="progressbar"
        aria-valuenow={Math.round(safe)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-slate-800 via-slate-700 to-[color-mix(in_srgb,var(--gold-primary)_55%,var(--text-primary)_45%)] transition-[width] duration-500 ease-out"
          style={{ width: `${safe}%` }}
        />
      </div>
      <p className="text-xs leading-relaxed text-readable-muted">{caption}</p>
    </div>
  );
}
