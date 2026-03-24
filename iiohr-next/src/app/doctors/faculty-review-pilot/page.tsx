import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FacultyReviewQueueItem } from "@/lib/academy/services/academy-service-contracts";
import { createFacultyReviewService } from "@/lib/academy/services/faculty-review-persistence";
import { facultyClaimAttemptAction, facultyFinalizeAttemptAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function FacultyReviewPilotPage() {
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
          streamSlug: "doctors",
        });
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Error";
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-sm text-foreground">
      <h1 className="text-lg font-medium">Faculty review pilot</h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        Uses RPCs <code className="rounded bg-muted px-1">academy_faculty_claim_attempt</code> and{" "}
        <code className="rounded bg-muted px-1">academy_faculty_finalize_attempt</code>. Requires{" "}
        <code className="rounded bg-muted px-1">user_roles</code> row with role{" "}
        <code className="rounded bg-muted px-1">faculty</code> or <code className="rounded bg-muted px-1">admin</code>.
      </p>

      {error ? (
        <p className="mt-6 rounded border border-destructive/40 bg-destructive/5 p-4 text-destructive">{error}</p>
      ) : null}

      {!userId ? (
        <p className="mt-6">Sign in to use this page.</p>
      ) : !canAccess ? (
        <p className="mt-6">Your account does not have faculty or admin role.</p>
      ) : queue.length === 0 ? (
        <p className="mt-6">No pending or in-review attempts for the doctors stream.</p>
      ) : (
        <ul className="mt-8 space-y-8">
          {queue.map(({ attempt, enrollment }) => (
            <li key={attempt.id} className="rounded border border-border p-4">
              <p className="font-medium">Attempt {attempt.id}</p>
              <p className="mt-1 text-[var(--text-secondary)]">
                Enrollment {enrollment.id} · program {enrollment.program_slug} · assessment{" "}
                {attempt.assessment_id} · status {attempt.faculty_review_status} · score{" "}
                {attempt.score ?? "—"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {attempt.faculty_review_status === "pending" ? (
                  <form action={facultyClaimAttemptAction}>
                    <input type="hidden" name="attemptId" value={attempt.id} />
                    <button
                      type="submit"
                      className="rounded border border-border px-3 py-1.5 hover:bg-muted/40"
                    >
                      Claim (pending → in_review)
                    </button>
                  </form>
                ) : null}
                <form action={facultyFinalizeAttemptAction} className="flex flex-wrap items-end gap-2">
                  <input type="hidden" name="attemptId" value={attempt.id} />
                  <label className="flex flex-col gap-1 text-xs">
                    Notes
                    <input name="notes" className="rounded border border-border px-2 py-1 text-sm" />
                  </label>
                  <label className="flex flex-col gap-1 text-xs">
                    Rubric summary
                    <input name="rubricSummary" className="rounded border border-border px-2 py-1 text-sm" />
                  </label>
                  <button type="submit" name="outcome" value="approved" className="rounded border border-border px-3 py-1.5 hover:bg-muted/40">
                    Approve
                  </button>
                  <button
                    type="submit"
                    name="outcome"
                    value="revision_required"
                    className="rounded border border-border px-3 py-1.5 hover:bg-muted/40"
                  >
                    Request revision
                  </button>
                  <button type="submit" name="outcome" value="rejected" className="rounded border border-border px-3 py-1.5 hover:bg-muted/40">
                    Reject
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
