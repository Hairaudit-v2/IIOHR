import type { Metadata } from "next";
import { ApplicantApplicationStatusPanel } from "@/components/academy/admissions/ApplicantApplicationStatusPanel";
import { DoctorDashboardWorkspace } from "@/components/dashboard/workspaces/DoctorDashboardWorkspace";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { getLatestApplicationForUserStream } from "@/lib/academy/admissions/application-queries";
import { loadApplicantAdmissionsTimeline } from "@/lib/academy/admissions/applicant-timeline";
import { buildDoctorDashboardVm, loadDashboardDisplayName } from "@/lib/dashboard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DoctorsDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const displayName = user ? await loadDashboardDisplayName(supabase, user.id, user.email ?? undefined) : null;
  const latestApp = user ? await getLatestApplicationForUserStream(supabase, user.id, "doctors") : null;
  const timelineEntries =
    user && latestApp ? await loadApplicantAdmissionsTimeline(supabase, latestApp.id) : [];

  const vm = await buildDoctorDashboardVm(supabase, {
    userId: user?.id ?? "",
    displayName,
    application: latestApp,
  });

  return (
    <SectionShell>
      <DoctorDashboardWorkspace
        vm={vm}
        admissionsPanel={
          latestApp ? (
            <ApplicantApplicationStatusPanel
              stream="doctors"
              app={latestApp}
              applyPath="/apply/doctors"
              variant="compact"
              timelineEntries={timelineEntries}
            />
          ) : undefined
        }
      />
    </SectionShell>
  );
}
