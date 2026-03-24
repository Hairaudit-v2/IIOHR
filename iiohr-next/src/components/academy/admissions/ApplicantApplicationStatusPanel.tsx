import Link from "next/link";
import type { ApplicationRow } from "@/lib/academy/db/types";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import {
  applicantActionNeeded,
  applicantStatusDescription,
  applicantStatusTitle,
} from "@/lib/academy/admissions/applicant-status-copy";
import { isApplicationWritable } from "@/lib/academy/admissions/application-queries";
import { withdrawStreamApplicationAction } from "@/app/apply/stream-application-actions";
import { ApplicantAdmissionsTimeline } from "@/components/academy/admissions/ApplicantAdmissionsTimeline";
import type { ApplicantAdmissionsTimelineEntry } from "@/lib/academy/admissions/applicant-timeline";

const WITHDRAWABLE: ApplicationRow["status"][] = [
  "draft",
  "submitted",
  "under_review",
  "needs_more_information",
];

export function ApplicantApplicationStatusPanel({
  stream,
  app,
  applyPath,
  variant = "full",
  timelineEntries = [],
}: {
  stream: AcademyStreamSlug;
  app: ApplicationRow | null;
  applyPath: string;
  variant?: "full" | "compact";
  timelineEntries?: ApplicantAdmissionsTimelineEntry[];
}) {
  if (!app) {
    return null;
  }

  const action = applicantActionNeeded(app.status);
  const title = applicantStatusTitle(app.status);
  const description = applicantStatusDescription(app.status);
  const showWithdraw = variant === "full" && WITHDRAWABLE.includes(app.status);
  const currentAdmissionsMessage = app.applicant_message?.trim();

  return (
    <section
      data-academy-stream={stream}
      className={
        variant === "compact"
          ? "rounded-lg border border-border bg-[var(--bg-secondary)] p-4 text-sm"
          : "rounded-lg border border-border bg-[var(--bg-soft)] p-5 text-sm"
      }
      aria-label="Application status"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-readable-muted">Application status</p>
          <p className="mt-1 font-medium text-foreground">{title}</p>
          {description ? <p className="mt-2 text-readable-muted leading-relaxed">{description}</p> : null}
          {currentAdmissionsMessage ? (
            <div className="mt-3 rounded-md border border-border bg-[var(--bg-secondary)] p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-readable-muted">
                Current message from admissions
              </p>
              <p className="mt-1 whitespace-pre-wrap text-foreground">{currentAdmissionsMessage}</p>
            </div>
          ) : null}
          {action ? (
            <p className="mt-3 text-xs font-medium text-amber-900 dark:text-amber-200/90">
              Action needed: update your application on the{" "}
              <Link href={applyPath} className="link-premium underline-offset-2">
                apply
              </Link>{" "}
              page, then submit.
            </p>
          ) : (
            <p className="mt-3 text-xs text-readable-muted">No action required from you right now.</p>
          )}
        </div>
        {variant === "full" ? (
          <Link
            href={applyPath}
            className="shrink-0 rounded-md border border-border bg-[var(--bg-secondary)] px-3 py-1.5 text-xs font-medium text-foreground hover:bg-[var(--bg-soft)]"
          >
            Open application form
          </Link>
        ) : null}
      </div>

      <ApplicantAdmissionsTimeline entries={timelineEntries} compact={variant === "compact"} />

      {showWithdraw ? (
        <form action={withdrawStreamApplicationAction} className="mt-4 border-t border-border pt-4">
          <input type="hidden" name="applicationId" value={app.id} />
          <button
            type="submit"
            className="text-xs font-medium text-destructive underline-offset-2 hover:underline"
          >
            Withdraw this application
          </button>
          <p className="mt-1 text-xs text-readable-muted">
            You can start a new application later if you change your mind.
          </p>
        </form>
      ) : null}
    </section>
  );
}

export function applicantFormApplicationId(app: ApplicationRow | null): string | undefined {
  if (!app || !isApplicationWritable(app.status)) {
    return undefined;
  }
  return app.id;
}

export function shouldShowApplyForm(app: ApplicationRow | null): boolean {
  if (!app) {
    return true;
  }
  if (isApplicationWritable(app.status)) {
    return true;
  }
  if (app.status === "withdrawn") {
    return true;
  }
  return false;
}
