import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationReviewCardBody } from "@/components/academy/admissions/ApplicationReviewCardBody";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAdmissionsService } from "@/lib/academy/services/admissions-persistence";
import type { ApplicationReviewRow } from "@/lib/academy/services/academy-service-contracts";
import {
  admissionsAcceptAction,
  admissionsDeclineAction,
  admissionsMarkUnderReviewAction,
  admissionsRequestMoreInformationAction,
  admissionsUpdateInternalNotesAction,
} from "./actions";

export const metadata: Metadata = {
  title: "Admissions review",
  description: "Review submitted academy applications (admin).",
};

export const dynamic = "force-dynamic";

export default async function AdmissionsReviewPage({
  searchParams,
}: {
  searchParams?: Promise<{ archive?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const includeTerminal = sp.archive === "1";

  let error: string | null = null;
  let canAccess = false;
  let userId: string | null = null;
  let rows: ApplicationReviewRow[] = [];
  let reviewerLabelByUserId: Record<string, string> = {};

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
    if (user) {
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      canAccess = (roles ?? []).some((r: { role: string }) => r.role === "admin");
      if (canAccess) {
        const admissions = createAdmissionsService(supabase);
        rows = await admissions.listApplicationsForReview({ includeTerminal });
        const actorIds = new Set<string>();
        for (const r of rows) {
          for (const ev of r.admissions_events) {
            if (ev.actor_user_id) {
              actorIds.add(ev.actor_user_id);
            }
          }
        }
        const ids = [...actorIds];
        if (ids.length > 0) {
          const { data: profs } = await supabase
            .from("profiles")
            .select("id, display_name, full_name")
            .in("id", ids);
          const map: Record<string, string> = {};
          for (const p of profs ?? []) {
            const row = p as { id: string; display_name: string | null; full_name: string | null };
            map[row.id] = row.display_name?.trim() || row.full_name?.trim() || "Admissions reviewer";
          }
          reviewerLabelByUserId = map;
        }
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Error";
  }

  return (
    <main
      className="section-light section-flow w-full min-h-[50vh] text-sm text-foreground"
      data-section-tone="light"
    >
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-readable-muted">
          <Link href="/academy" className="link-premium font-medium">
            Academy
          </Link>
        </p>
        <h1 className="mt-4 text-lg font-medium">Admissions review</h1>
        <p className="mt-2 text-readable-muted leading-relaxed">
          Pipeline queue:{" "}
          <code className="rounded bg-[var(--bg-soft)] px-1 font-mono text-[0.85em]">submitted</code>,{" "}
          <code className="rounded bg-[var(--bg-soft)] px-1 font-mono text-[0.85em]">under_review</code>,{" "}
          <code className="rounded bg-[var(--bg-soft)] px-1 font-mono text-[0.85em]">needs_more_information</code>.
          Accept runs{" "}
          <code className="rounded bg-[var(--bg-soft)] px-1 font-mono text-[0.85em]">
            academy_admissions_accept_application
          </code>{" "}
          (stream membership + program enrollment). Requires{" "}
          <code className="rounded bg-[var(--bg-soft)] px-1 font-mono text-[0.85em]">user_roles.role = admin</code>.
        </p>
        <p className="mt-3 text-readable-muted">
          {includeTerminal ? (
            <>
              Showing outcomes archive (no drafts or withdrawn).{" "}
              <Link href="/academy/admissions/review" className="link-premium font-medium">
                Back to active queue
              </Link>
            </>
          ) : (
            <>
              <Link href="/academy/admissions/review?archive=1" className="link-premium font-medium">
                View outcomes archive
              </Link>{" "}
              (accepted, declined, waitlisted, etc.).
            </>
          )}
        </p>

        {error ? (
          <p className="mt-6 rounded border border-destructive/40 bg-destructive/5 p-4 text-destructive">{error}</p>
        ) : null}

        {!userId ? (
          <p className="mt-6">
            <Link
              href={`/login?redirectTo=${encodeURIComponent("/academy/admissions/review")}`}
              className="link-premium font-medium"
            >
              Sign in
            </Link>{" "}
            to use this page.
          </p>
        ) : !canAccess ? (
          <p className="mt-6">Your account does not have the admin role.</p>
        ) : rows.length === 0 ? (
          <p className="mt-6">No applications in this list.</p>
        ) : (
          <ul className="mt-8 space-y-10">
            {rows.map((app) => {
              const canAccept = app.status === "submitted" || app.status === "under_review";
              const canMarkReview =
                app.status === "submitted" || app.status === "needs_more_information";
              const canPipelineAct =
                app.status === "submitted" ||
                app.status === "under_review" ||
                app.status === "needs_more_information";

              return (
                <li key={app.id} className="rounded-lg border border-border bg-[var(--bg-secondary)] p-4">
                  <p className="font-medium">
                    Application <span className="font-mono text-xs">{app.id}</span>
                  </p>
                  <p className="mt-1 text-readable-muted">
                    Applicant <span className="font-mono text-xs">{app.user_id}</span> · stream{" "}
                    <span className="font-mono">{app.target_stream_slug}</span> · program{" "}
                    <span className="font-mono">{app.target_program_slug ?? "—"}</span> · status{" "}
                    <span className="font-mono">{app.status}</span>
                    {app.submitted_at ? (
                      <>
                        {" "}
                        · submitted <time dateTime={app.submitted_at}>{app.submitted_at}</time>
                      </>
                    ) : null}
                  </p>

                  <ApplicationReviewCardBody app={app} reviewerLabelByUserId={reviewerLabelByUserId} />

                  <form action={admissionsUpdateInternalNotesAction} className="mt-6 space-y-2 border-t border-border pt-4">
                    <input type="hidden" name="applicationId" value={app.id} />
                    <label className="block text-xs font-semibold uppercase tracking-wide text-readable-muted">
                      Internal notes (full document)
                    </label>
                    <textarea
                      name="internalNotes"
                      rows={4}
                      defaultValue={app.internal_notes ?? ""}
                      className="w-full rounded-md border border-border bg-[var(--bg-secondary)] px-3 py-2 text-sm text-foreground"
                    />
                    <button
                      type="submit"
                      className="rounded border border-border bg-[var(--bg-secondary)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--bg-soft)]"
                    >
                      Save internal notes
                    </button>
                  </form>

                  <div className="mt-6 flex flex-col gap-4 border-t border-border pt-4">
                    {canMarkReview ? (
                      <form action={admissionsMarkUnderReviewAction} className="space-y-2">
                        <input type="hidden" name="applicationId" value={app.id} />
                        <label className="block text-xs font-medium text-readable-muted">
                          Note (optional, appended on transition)
                        </label>
                        <textarea
                          name="internalNote"
                          rows={2}
                          className="w-full rounded-md border border-border bg-[var(--bg-secondary)] px-3 py-2 text-sm"
                          placeholder="Internal context for this transition…"
                        />
                        <button
                          type="submit"
                          className="rounded border border-border bg-[var(--bg-secondary)] px-3 py-1.5 hover:bg-[var(--bg-soft)]"
                        >
                          Mark under review
                        </button>
                      </form>
                    ) : null}

                    {canPipelineAct ? (
                      <form action={admissionsRequestMoreInformationAction} className="space-y-2">
                        <input type="hidden" name="applicationId" value={app.id} />
                        <label className="block text-xs font-medium text-readable-muted">
                          Message to applicant (required)
                        </label>
                        <textarea
                          name="applicantMessage"
                          rows={3}
                          required
                          className="w-full rounded-md border border-border bg-[var(--bg-secondary)] px-3 py-2 text-sm"
                          placeholder="What should the applicant provide or clarify?"
                        />
                        <label className="block text-xs font-medium text-readable-muted">
                          Internal note (optional)
                        </label>
                        <textarea
                          name="internalNote"
                          rows={2}
                          className="w-full rounded-md border border-border bg-[var(--bg-secondary)] px-3 py-2 text-sm"
                        />
                        <button
                          type="submit"
                          className="rounded border border-amber-700/30 bg-amber-600/10 px-3 py-1.5 text-amber-950"
                        >
                          Request more information
                        </button>
                      </form>
                    ) : null}

                    <div className="flex flex-wrap gap-2">
                      {canAccept ? (
                        <form action={admissionsAcceptAction}>
                          <input type="hidden" name="applicationId" value={app.id} />
                          <button
                            type="submit"
                            className="rounded border border-emerald-700/35 bg-emerald-600/15 px-3 py-1.5 text-emerald-950"
                          >
                            Accept (enroll)
                          </button>
                        </form>
                      ) : null}
                      {canPipelineAct ? (
                        <form action={admissionsDeclineAction} className="flex flex-col gap-2">
                          <input type="hidden" name="applicationId" value={app.id} />
                          <textarea
                            name="internalNote"
                            rows={2}
                            className="w-full min-w-[240px] rounded-md border border-border bg-[var(--bg-secondary)] px-3 py-2 text-sm"
                            placeholder="Optional internal note on decline…"
                          />
                          <button
                            type="submit"
                            className="rounded border border-destructive/40 px-3 py-1.5 hover:bg-destructive/5"
                          >
                            Decline
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
