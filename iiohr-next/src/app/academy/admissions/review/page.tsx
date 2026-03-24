import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAdmissionsService } from "@/lib/academy/services/admissions-persistence";
import type { ApplicationReviewRow } from "@/lib/academy/services/academy-service-contracts";
import {
  admissionsAcceptAction,
  admissionsMarkUnderReviewAction,
  admissionsRejectAction,
} from "./actions";

export const metadata: Metadata = {
  title: "Admissions review",
  description: "Review submitted academy applications (admin).",
};

export const dynamic = "force-dynamic";

function formatAnswer(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export default async function AdmissionsReviewPage() {
  let error: string | null = null;
  let canAccess = false;
  let userId: string | null = null;
  let rows: ApplicationReviewRow[] = [];

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
        rows = await admissions.listApplicationsForReview();
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Error";
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-sm text-foreground">
      <p className="text-[var(--text-secondary)]">
        <Link href="/academy" className="link-premium font-medium">
          Academy
        </Link>
      </p>
      <h1 className="mt-4 text-lg font-medium">Admissions review</h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        Lists applications in <code className="rounded bg-muted px-1">submitted</code> or{" "}
        <code className="rounded bg-muted px-1">under_review</code>. Accepting runs RPC{" "}
        <code className="rounded bg-muted px-1">academy_admissions_accept_application</code> (creates stream membership
        and program enrollment). Requires <code className="rounded bg-muted px-1">user_roles.role = admin</code>.
      </p>

      {error ? (
        <p className="mt-6 rounded border border-destructive/40 bg-destructive/5 p-4 text-destructive">{error}</p>
      ) : null}

      {!userId ? (
        <p className="mt-6">Sign in to use this page.</p>
      ) : !canAccess ? (
        <p className="mt-6">Your account does not have the admin role.</p>
      ) : rows.length === 0 ? (
        <p className="mt-6">No applications in the queue.</p>
      ) : (
        <ul className="mt-8 space-y-10">
          {rows.map((app) => (
            <li key={app.id} className="rounded border border-border p-4">
              <p className="font-medium">
                Application <span className="font-mono text-xs">{app.id}</span>
              </p>
              <p className="mt-1 text-[var(--text-secondary)]">
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

              <dl className="mt-4 space-y-2 border-t border-border pt-4">
                {app.answers.map((a) => (
                  <div key={a.question_key}>
                    <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                      {a.question_key}
                    </dt>
                    <dd className="mt-0.5 whitespace-pre-wrap text-foreground">{formatAnswer(a.answer)}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-xs text-[var(--text-secondary)]">
                Consents on file: {app.consents.map((c) => c.consent_key).join(", ") || "—"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {app.status === "submitted" ? (
                  <form action={admissionsMarkUnderReviewAction}>
                    <input type="hidden" name="applicationId" value={app.id} />
                    <button
                      type="submit"
                      className="rounded border border-border px-3 py-1.5 hover:bg-muted/40"
                    >
                      Mark under review
                    </button>
                  </form>
                ) : null}
                <form action={admissionsAcceptAction}>
                  <input type="hidden" name="applicationId" value={app.id} />
                  <button
                    type="submit"
                    className="rounded border border-emerald-600/50 bg-emerald-600/10 px-3 py-1.5 text-emerald-900 dark:text-emerald-100"
                  >
                    Accept (enroll)
                  </button>
                </form>
                <form action={admissionsRejectAction}>
                  <input type="hidden" name="applicationId" value={app.id} />
                  <button type="submit" className="rounded border border-destructive/40 px-3 py-1.5 hover:bg-destructive/5">
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
