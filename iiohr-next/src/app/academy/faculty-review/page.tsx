import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import { getAssessmentTitleById } from "@/lib/academy/content-loader";
import type { FacultyReviewQueueItem } from "@/lib/academy/services/academy-service-contracts";
import { createFacultyReviewService } from "@/lib/academy/services/faculty-review-persistence";
import { facultyClaimAttemptAction, facultyFinalizeAttemptAction } from "./actions";

export const dynamic = "force-dynamic";

function parseStreamParam(raw: string | string[] | undefined): AcademyStreamSlug {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "consultants" ? "consultants" : "doctors";
}

export default async function AcademyFacultyReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ stream?: string | string[] }>;
}) {
  const sp = await searchParams;
  const streamSlug = parseStreamParam(sp.stream);
  const returnPath = `/academy/faculty-review?stream=${streamSlug}`;
  const streamDescription =
    streamSlug === "consultants"
      ? "Consultant / nurse academy — documentation, communication, and scope-gated tasks."
      : "Doctor academy stream.";

  let error: string | null = null;
  let queue: FacultyReviewQueueItem[] = [];
  let canAccess = false;
  let userId: string | null = null;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
    if (user) {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      const r = (roles ?? []) as { role: string }[];
      canAccess = r.some((x) => x.role === "faculty" || x.role === "admin");
      if (canAccess) {
        const faculty = createFacultyReviewService(supabase);
        queue = await faculty.listPendingForReviewer({
          reviewerUserId: user.id,
          streamSlug,
        });
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
        <h1 className="text-lg font-medium">Faculty review queue</h1>
        <p className="mt-2 text-readable-muted">{streamDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/academy/faculty-review?stream=doctors"
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              streamSlug === "doctors"
                ? "border-[color-mix(in_srgb,var(--gold-primary)_45%,transparent)] bg-[var(--gold-soft)] text-foreground"
                : "border-border text-readable-muted hover:border-[color-mix(in_srgb,var(--gold-primary)_30%,transparent)]"
            }`}
          >
            Doctors stream
          </Link>
          <Link
            href="/academy/faculty-review?stream=consultants"
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              streamSlug === "consultants"
                ? "border-[color-mix(in_srgb,var(--gold-primary)_45%,transparent)] bg-[var(--gold-soft)] text-foreground"
                : "border-border text-readable-muted hover:border-[color-mix(in_srgb,var(--gold-primary)_30%,transparent)]"
            }`}
          >
            Consultants / nurses stream
          </Link>
        </div>

        <p className="mt-4 text-xs text-readable-muted">
          RPCs:{" "}
          <code className="rounded bg-[var(--bg-soft)] px-1 font-mono text-[0.85em]">
            academy_faculty_claim_attempt
          </code>
          ,{" "}
          <code className="rounded bg-[var(--bg-soft)] px-1 font-mono text-[0.85em]">
            academy_faculty_finalize_attempt
          </code>
          . After actions, this page revalidates{" "}
          <code className="rounded bg-[var(--bg-soft)] px-1 font-mono text-[0.85em]">{returnPath}</code>.
        </p>

        {error ? (
          <p className="mt-6 rounded border border-destructive/40 bg-destructive/5 p-4 text-destructive">{error}</p>
        ) : null}

        {!userId ? (
          <p className="mt-6">
            <Link
              href={`/login?redirectTo=${encodeURIComponent(returnPath)}`}
              className="link-premium font-medium"
            >
              Sign in
            </Link>{" "}
            to use this page.
          </p>
        ) : !canAccess ? (
          <p className="mt-6">Your account does not have faculty or admin role.</p>
        ) : queue.length === 0 ? (
          <p className="mt-6 text-readable-muted">
            No pending or in-review attempts for this stream. Switch streams above if you expected items in another
            queue.
          </p>
        ) : (
          <ul className="mt-8 space-y-8">
            {queue.map(({ attempt, enrollment }) => {
              const assessmentTitle = getAssessmentTitleById(attempt.assessment_id);
              return (
                <li key={attempt.id} className="rounded-lg border border-border bg-[var(--bg-secondary)] p-4">
                  <p className="font-medium">
                    {assessmentTitle ?? "Assessment"}
                    {assessmentTitle ? (
                      <span className="ml-2 text-xs font-normal text-readable-muted">({attempt.assessment_id})</span>
                    ) : null}
                  </p>
                  <p className="mt-2 text-sm text-readable-muted">
                    Learner enrollment · programme{" "}
                    <span className="font-mono text-[0.85em] text-foreground">{enrollment.program_slug}</span> ·
                    stream <span className="font-medium text-foreground">{enrollment.stream_slug}</span>
                  </p>
                  <p className="mt-1 text-xs text-readable-muted">
                    Attempt <span className="font-mono">{attempt.id}</span> · status{" "}
                    <span className="font-medium text-foreground">{attempt.faculty_review_status}</span> · score{" "}
                    {attempt.score ?? "—"}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {attempt.faculty_review_status === "pending" ? (
                      <form action={facultyClaimAttemptAction}>
                        <input type="hidden" name="attemptId" value={attempt.id} />
                        <input type="hidden" name="returnPath" value={returnPath} />
                        <button
                          type="submit"
                          className="rounded border border-border bg-[var(--bg-primary)] px-3 py-1.5 hover:bg-[var(--bg-soft)]"
                        >
                          Claim (pending → in_review)
                        </button>
                      </form>
                    ) : null}
                    <form action={facultyFinalizeAttemptAction} className="flex flex-wrap items-end gap-2">
                      <input type="hidden" name="attemptId" value={attempt.id} />
                      <input type="hidden" name="returnPath" value={returnPath} />
                      <label className="flex flex-col gap-1 text-xs">
                        Notes
                        <input
                          name="notes"
                          className="rounded border border-border bg-[var(--bg-secondary)] px-2 py-1 text-sm text-foreground"
                        />
                      </label>
                      <label className="flex flex-col gap-1 text-xs">
                        Rubric summary
                        <input
                          name="rubricSummary"
                          className="rounded border border-border bg-[var(--bg-secondary)] px-2 py-1 text-sm text-foreground"
                        />
                      </label>
                      <button
                        type="submit"
                        name="outcome"
                        value="approved"
                        className="rounded border border-border bg-[var(--bg-primary)] px-3 py-1.5 hover:bg-[var(--bg-soft)]"
                      >
                        Approve
                      </button>
                      <button
                        type="submit"
                        name="outcome"
                        value="revision_required"
                        className="rounded border border-border bg-[var(--bg-primary)] px-3 py-1.5 hover:bg-[var(--bg-soft)]"
                      >
                        Request revision
                      </button>
                      <button
                        type="submit"
                        name="outcome"
                        value="rejected"
                        className="rounded border border-border bg-[var(--bg-primary)] px-3 py-1.5 hover:bg-[var(--bg-soft)]"
                      >
                        Reject
                      </button>
                    </form>
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
