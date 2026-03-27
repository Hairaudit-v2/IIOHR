import type { MilestoneVm } from "@/lib/dashboard/types";

interface MilestoneChecklistProps {
  heading: string;
  milestones: MilestoneVm[];
}

export function MilestoneChecklist({ heading, milestones }: MilestoneChecklistProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-wide text-foreground">{heading}</h3>
      <ul className="space-y-3">
        {milestones.map((m) => (
          <li key={m.id} className="flex gap-3 text-sm">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[10px] font-bold ${
                m.done
                  ? "border-slate-800 bg-slate-800 text-white"
                  : "border-border/90 bg-surface-elevated/60 text-readable-muted"
              }`}
              aria-hidden
            >
              {m.done ? "✓" : ""}
            </span>
            <div className="min-w-0">
              <p className={`leading-snug ${m.done ? "text-foreground" : "text-readable-muted"}`}>{m.label}</p>
              {m.dueHint ? <p className="mt-0.5 text-xs text-readable-subtle">{m.dueHint}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
