import type { ApplicantAdmissionsTimelineEntry } from "@/lib/academy/admissions/applicant-timeline";

export function ApplicantAdmissionsTimeline({
  entries,
  compact = false,
}: {
  entries: ApplicantAdmissionsTimelineEntry[];
  compact?: boolean;
}) {
  if (entries.length === 0) {
    return (
      <div className={compact ? "mt-3 text-xs text-readable-muted" : "mt-4 text-sm text-readable-muted"}>
        No recorded milestones yet. After you submit, your progress will appear here.
      </div>
    );
  }

  return (
    <div className={compact ? "mt-3" : "mt-4"}>
      <h3
        className={
          compact
            ? "text-xs font-semibold uppercase tracking-wide text-readable-muted"
            : "text-xs font-semibold uppercase tracking-wide text-readable-muted"
        }
      >
        Your progress
      </h3>
      <ol className="mt-2 space-y-3 border-l border-border pl-4">
        {entries.map((e) => (
          <li key={e.eventId} className="relative text-sm">
            <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-border" aria-hidden />
            <time className="text-xs text-readable-muted" dateTime={e.occurredAt}>
              {new Date(e.occurredAt).toLocaleString()}
            </time>
            <p className="mt-0.5 font-medium text-foreground">{e.title}</p>
            {e.detail?.trim() ? (
              <p className="mt-1 whitespace-pre-wrap text-xs text-readable-muted leading-relaxed">{e.detail}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
