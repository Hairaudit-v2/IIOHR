import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  PILOT_DOCTOR_MODULE_ID,
  PILOT_DOCTOR_PROGRAM_SLUG,
} from "@/lib/academy/pilot/constants";
import { getPilotProgramEnrollment } from "@/lib/academy/pilot/enrollment";
import { createCertificateEligibilityService } from "@/lib/academy/services/certificate-eligibility-service";
import { createProgressTrackingService } from "@/lib/academy/services/progress-tracking-service";
import { pilotMarkLessonAndRefreshAction, pilotSubmitAssessmentAttemptAction } from "./actions";

export const dynamic = "force-dynamic";

const flashMessages: Record<string, string> = {
  "auth-required": "Sign in required to run pilot actions.",
  "no-enrollment": "No active pilot enrollment — seed program_enrollments for this user in Supabase.",
  "lesson-complete": "Lesson marked complete and module progress refreshed.",
  "assessment-submitted": "Assessment attempt recorded.",
};

export default async function DoctorPilotAcademyPage({
  searchParams,
}: {
  searchParams: Promise<{ flash?: string }>;
}) {
  const sp = await searchParams;
  const flash = sp.flash ? flashMessages[sp.flash] ?? sp.flash : null;

  let configError: string | null = null;
  let signedIn = false;
  let userId: string | null = null;
  let eligibilityJson: string | null = null;
  let progressJson: string | null = null;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    signedIn = Boolean(user);
    userId = user?.id ?? null;

    if (user) {
      const enrollment = await getPilotProgramEnrollment(supabase, user.id);
      if (enrollment) {
        const progress = createProgressTrackingService(supabase);
        const summary = await progress.getLearnerModuleProgressSummary({
          programEnrollmentId: enrollment.id,
          moduleId: PILOT_DOCTOR_MODULE_ID,
          programSlug: PILOT_DOCTOR_PROGRAM_SLUG,
        });
        progressJson = JSON.stringify(
          {
            completedLessonCount: summary.completedLessonCount,
            totalLessons: summary.totalLessons,
            lessonCompletionPercent: summary.lessonCompletionPercent,
            modulePercentComplete: summary.moduleProgressRow.percent_complete,
          },
          null,
          2
        );

        const eligibility = createCertificateEligibilityService(supabase);
        const readModel = await eligibility.getEligibilityForEnrollment({
          userId: user.id,
          programEnrollmentId: enrollment.id,
          programSlug: PILOT_DOCTOR_PROGRAM_SLUG,
          streamSlug: "doctors",
          moduleId: PILOT_DOCTOR_MODULE_ID,
        });
        eligibilityJson = JSON.stringify(
          {
            enrolled: readModel.enrolled,
            lessonCompletionPercent: readModel.lessonCompletionPercent,
            requiredAssessmentCompletionPercent: readModel.requiredAssessmentCompletionPercent,
            facultyReviewPending: readModel.facultyReviewPending,
            hasFacultyRevisionRequested: readModel.hasFacultyRevisionRequested,
            hasFacultyRejectedAttempt: readModel.hasFacultyRejectedAttempt,
            certificateBlockedByFacultyGate: readModel.certificateBlockedByFacultyGate,
            certificateEligible: readModel.certificateEligible,
            unmetRequirements: readModel.summary.unmetRequirements.slice(0, 8),
            weightedScore: readModel.summary.scoreSummary.weightedScore,
          },
          null,
          2
        );
      }
    }
  } catch (e) {
    configError = e instanceof Error ? e.message : "Configuration error";
  }

  return (
    <main
      className="section-light section-flow w-full min-h-[50vh] text-sm text-foreground"
      data-section-tone="light"
    >
      <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-lg font-medium">Academy pilot (doctors)</h1>
      <p className="mt-2 text-readable-muted">
        Server actions + RLS. Requires{" "}
        <code className="rounded bg-[var(--bg-soft)] px-1 font-mono text-[0.85em]">NEXT_PUBLIC_SUPABASE_*</code> and a
        seeded{" "}
        <code className="rounded bg-[var(--bg-soft)] px-1 font-mono text-[0.85em]">program_enrollments</code> row for the
        signed-in user.
      </p>

      {configError ? (
        <p className="mt-6 rounded border border-destructive/40 bg-destructive/5 p-4 text-destructive">
          {configError}
        </p>
      ) : null}

      {flash ? (
        <p className="mt-6 rounded-lg border border-border bg-[var(--bg-soft)] p-3 text-foreground">{flash}</p>
      ) : null}

      <section className="mt-8 space-y-2">
        <p>
          <strong>Session:</strong> {signedIn ? `user ${userId}` : "not signed in"}
        </p>
        {!signedIn ? (
          <p>
            <Link
              href={`/login?redirectTo=${encodeURIComponent("/doctors/pilot-academy")}`}
              className="link-premium font-medium"
            >
              Sign in
            </Link>
          </p>
        ) : null}
      </section>

      {signedIn ? (
        <section className="mt-8 flex flex-wrap gap-4">
          <form action={pilotMarkLessonAndRefreshAction}>
            <button
              type="submit"
              className="rounded border border-border bg-[var(--bg-secondary)] px-3 py-2 text-foreground hover:bg-[var(--bg-soft)]"
            >
              Mark pilot lesson complete + refresh module
            </button>
          </form>
          <form action={pilotSubmitAssessmentAttemptAction}>
            <button
              type="submit"
              className="rounded border border-border bg-[var(--bg-secondary)] px-3 py-2 text-foreground hover:bg-[var(--bg-soft)]"
            >
              Submit pilot assessment attempt
            </button>
          </form>
        </section>
      ) : null}

      {progressJson ? (
        <section className="mt-10">
          <h2 className="font-medium">Module progress (pilot module)</h2>
          <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-[var(--bg-secondary)] p-3 text-xs text-foreground">
            {progressJson}
          </pre>
        </section>
      ) : null}

      {eligibilityJson ? (
        <section className="mt-6">
          <h2 className="font-medium">Eligibility read model</h2>
          <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-[var(--bg-secondary)] p-3 text-xs text-foreground">
            {eligibilityJson}
          </pre>
        </section>
      ) : signedIn ? (
        <p className="mt-10 text-readable-muted">No pilot enrollment — snapshot unavailable.</p>
      ) : null}

      <p className="mt-10 text-xs text-readable-muted">
        Faculty review sync: prefer narrow SECURITY DEFINER RPC — see docs/academy-faculty-review-architecture.md
      </p>
      </div>
    </main>
  );
}
