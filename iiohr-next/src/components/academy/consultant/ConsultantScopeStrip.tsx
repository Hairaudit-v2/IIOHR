import type { ComplianceNotice } from "@/lib/academy/content-types";

interface ConsultantScopeStripProps {
  notices: ComplianceNotice[];
}

/**
 * High-visibility programme-level scope reminders at the top of consultant learning pages.
 */
export function ConsultantScopeStrip({ notices }: ConsultantScopeStripProps) {
  if (notices.length === 0) {
    return null;
  }

  const ordered = [...notices].sort((a, b) => {
    const rank = { critical: 0, caution: 1, info: 2 } as const;
    return rank[a.severity as keyof typeof rank] - rank[b.severity as keyof typeof rank];
  });

  return (
    <div className="rounded-lg border border-[color-mix(in_srgb,var(--gold-primary)_28%,transparent)] bg-[var(--bg-secondary)] px-4 py-3 sm:px-5">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-readable-muted">
        Consultant academy · scope and safety
      </p>
      <ul className="mt-2 space-y-1.5 text-sm text-foreground">
        {ordered.slice(0, 4).map((n) => (
          <li key={n.id} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold-primary)]" aria-hidden />
            <span>
              <span className="font-medium">{n.title}</span>
              <span className="text-readable-muted"> — {n.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
