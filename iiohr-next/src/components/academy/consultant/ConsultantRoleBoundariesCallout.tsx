import type { RoleBoundaryNote } from "@/lib/academy/content-types";

interface ConsultantRoleBoundariesCalloutProps {
  notes: RoleBoundaryNote[];
}

export function ConsultantRoleBoundariesCallout({ notes }: ConsultantRoleBoundariesCalloutProps) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border bg-[var(--bg-secondary)] px-5 py-5 sm:px-6">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--gold-primary)]">
        Role boundaries (non-diagnostic practice)
      </p>
      <ul className="mt-4 space-y-3">
        {notes.map((n) => (
          <li key={n.id}>
            <p className="font-medium text-foreground">{n.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-readable-muted">{n.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
