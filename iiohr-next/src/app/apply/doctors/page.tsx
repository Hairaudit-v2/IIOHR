import type { Metadata } from "next";
import Link from "next/link";
import {
  ApplicantApplicationStatusPanel,
  applicantFormApplicationId,
  shouldShowApplyForm,
} from "@/components/academy/admissions/ApplicantApplicationStatusPanel";
import { StreamApplyFormFields } from "@/components/academy/admissions/StreamApplyFormFields";
import {
  getLatestApplicationForUserStream,
  isApplicationWritable,
  loadAnswerMapForApplication,
} from "@/lib/academy/admissions/application-queries";
import { loadApplicantAdmissionsTimeline } from "@/lib/academy/admissions/applicant-timeline";
import { mergeApplyInitialAnswers } from "@/lib/academy/admissions/merge-apply-initial-answers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { saveStreamApplicationDraftAction, submitStreamApplicationAction } from "../stream-application-actions";

export const metadata: Metadata = {
  title: "Apply — Doctor academy stream",
  description: "Submit an admissions application for the IIOHR doctor academy stream.",
};

export const dynamic = "force-dynamic";

export default async function ApplyDoctorsPage({
  searchParams,
}: {
  searchParams?: Promise<{ submitted?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const latestApp = user ? await getLatestApplicationForUserStream(supabase, user.id, "doctors") : null;
  const timelineEntries =
    user && latestApp ? await loadApplicantAdmissionsTimeline(supabase, latestApp.id) : [];

  let initialAnswers: Record<string, string> = {};
  if (user) {
    let draftMap: Record<string, string> = {};
    if (latestApp && isApplicationWritable(latestApp.status)) {
      draftMap = await loadAnswerMapForApplication(supabase, latestApp.id);
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, display_name")
      .eq("id", user.id)
      .maybeSingle();
    const p = profile as { full_name: string | null; display_name: string | null } | null;
    initialAnswers = mergeApplyInitialAnswers({
      draftMap,
      user,
      profileFullName: p?.full_name,
      profileDisplayName: p?.display_name,
    });
  }

  const showForm = shouldShowApplyForm(latestApp);
  const applicationId = applicantFormApplicationId(latestApp);

  return (
    <main
      className="section-light section-flow w-full min-h-[50vh] text-sm text-foreground"
      data-section-tone="light"
    >
      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="text-readable-muted">
          <Link href="/apply" className="link-premium font-medium">
            Apply
          </Link>
          {" · "}
          <Link href="/academy" className="link-premium font-medium">
            Academy
          </Link>
        </p>
        <h1 className="mt-4 text-lg font-semibold tracking-tight">Doctor stream application</h1>
        <p className="mt-2 text-readable-muted leading-relaxed">
          Complete your applicant and professional details, accept the required consents, then submit. You can save a draft
          at any time; your account email and name are pre-filled when available—please confirm before submitting.
        </p>

        {sp.submitted ? (
          <p className="mt-6 rounded-lg border border-border bg-[var(--bg-soft)] p-4 text-foreground">
            Thank you — your latest updates were submitted. Admissions will continue their review. You can explore the{" "}
            <Link href="/doctors" className="link-premium font-medium">
              doctor academy
            </Link>{" "}
            areas that are open to you.
          </p>
        ) : null}

        {!user ? (
          <p className="mt-8 rounded-lg border border-border bg-[var(--bg-secondary)] p-4 text-readable-muted">
            You need to be signed in to apply.{" "}
            <Link
              href={`/login?redirectTo=${encodeURIComponent("/apply/doctors")}`}
              className="link-premium font-medium"
            >
              Sign in
            </Link>
          </p>
        ) : (
          <>
            {latestApp ? (
              <div className="mt-8">
                <ApplicantApplicationStatusPanel
                  stream="doctors"
                  app={latestApp}
                  applyPath="/apply/doctors"
                  timelineEntries={timelineEntries}
                />
              </div>
            ) : null}

            {showForm ? (
              <form className="mt-8 space-y-8">
                <StreamApplyFormFields
                  stream="doctors"
                  applicationId={applicationId}
                  initialAnswers={initialAnswers}
                />
                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    formAction={saveStreamApplicationDraftAction}
                    className="rounded-md border border-border bg-[var(--bg-secondary)] px-4 py-2 text-sm font-medium text-foreground hover:bg-[var(--bg-soft)]"
                  >
                    Save draft
                  </button>
                  <button
                    type="submit"
                    formAction={submitStreamApplicationAction}
                    className="rounded-md border border-transparent bg-[var(--text-primary)] px-4 py-2 text-sm font-medium text-[var(--bg-secondary)] hover:opacity-90"
                  >
                    Submit application
                  </button>
                </div>
              </form>
            ) : (
              <p className="mt-8 rounded-lg border border-border bg-[var(--bg-secondary)] p-4 text-readable-muted">
                This application is not editable in its current state. If you believe this is an error, contact admissions.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
