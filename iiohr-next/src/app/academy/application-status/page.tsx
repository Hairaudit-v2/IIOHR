import type { Metadata } from "next";
import Link from "next/link";
import { ApplicantApplicationStatusPanel } from "@/components/academy/admissions/ApplicantApplicationStatusPanel";
import { loadApplicantAdmissionsTimeline } from "@/lib/academy/admissions/applicant-timeline";
import type { ApplicationRow } from "@/lib/academy/db/types";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import { pickPrimaryApplicationForStatusDisplay } from "@/lib/auth/iiohr-post-login";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Application status",
  robots: { index: false, follow: false },
};

function applyPathForStream(stream: AcademyStreamSlug): string {
  return stream === "doctors" ? "/apply/doctors" : "/apply/consultants";
}

export default async function AcademyApplicationStatusPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: rows, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(12);

  const apps = (error ? [] : (rows ?? [])) as ApplicationRow[];
  const displayApp = pickPrimaryApplicationForStatusDisplay(apps);
  const stream: AcademyStreamSlug =
    displayApp?.target_stream_slug === "consultants" ? "consultants" : "doctors";
  const applyPath = applyPathForStream(stream);

  const timelineEntries =
    displayApp ? await loadApplicantAdmissionsTimeline(supabase, displayApp.id) : [];

  return (
    <main
      className="section-light section-flow w-full min-h-[50vh] text-sm text-foreground"
      data-section-tone="light"
    >
      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="text-readable-muted">
          <Link href="/academy" className="link-premium font-medium">
            Academy
          </Link>
          {" · "}
          <Link href="/apply" className="link-premium font-medium">
            Apply
          </Link>
        </p>
        <h1 className="mt-4 text-lg font-semibold tracking-tight">Application status</h1>
        <p className="mt-2 leading-relaxed text-readable-muted">
          Your latest academy application progress and messages from admissions.
        </p>

        {displayApp ? (
          <div className="mt-8">
            <ApplicantApplicationStatusPanel
              stream={stream}
              app={displayApp}
              applyPath={applyPath}
              variant="full"
              timelineEntries={timelineEntries}
            />
          </div>
        ) : (
          <p className="mt-8 rounded-lg border border-border bg-[var(--bg-soft)] p-4 text-readable-muted">
            No application is on file for this account yet. Start with the{" "}
            <Link href="/apply/doctors" className="link-premium font-medium">
              doctor
            </Link>{" "}
            or{" "}
            <Link href="/apply/consultants" className="link-premium font-medium">
              consultant / nurse
            </Link>{" "}
            apply flow.
          </p>
        )}
      </div>
    </main>
  );
}
