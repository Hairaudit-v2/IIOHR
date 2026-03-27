import type { TimelineItemVm } from "@/lib/dashboard/types";

interface StageTimelineProps {
  heading: string;
  items: TimelineItemVm[];
}

function stateStyles(state: TimelineItemVm["state"]): { dot: string; label: string } {
  switch (state) {
    case "complete":
      return {
        dot: "border-slate-800 bg-slate-800",
        label: "text-foreground",
      };
    case "current":
      return {
        dot: "border-[var(--gold-primary)] bg-[var(--gold-soft)]",
        label: "text-foreground font-semibold",
      };
    default:
      return {
        dot: "border-border bg-surface",
        label: "text-readable-muted",
      };
  }
}

export function StageTimeline({ heading, items }: StageTimelineProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold tracking-wide text-foreground">{heading}</h3>
      <ol className="space-y-0">
        {items.map((item, index) => {
          const st = stateStyles(item.state);
          const isLast = index === items.length - 1;
          return (
            <li key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast ? (
                <span
                  className="absolute top-[14px] left-[7px] h-[calc(100%-8px)] w-px bg-border/80"
                  aria-hidden
                />
              ) : null}
              <span className={`relative z-[1] mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 ${st.dot}`} />
              <div className="min-w-0 pt-0.5">
                <p className={`text-sm leading-snug ${st.label}`}>{item.label}</p>
                {item.detail ? <p className="mt-1 text-xs text-readable-muted">{item.detail}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
