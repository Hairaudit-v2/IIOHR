interface EvidenceTierBadgeProps {
  tier: string;
  summary?: string;
}

export function EvidenceTierBadge({ tier, summary }: EvidenceTierBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground">
      <span>Evidence {tier}</span>
      {summary ? <span className="text-readable-muted">{summary}</span> : null}
    </div>
  );
}
