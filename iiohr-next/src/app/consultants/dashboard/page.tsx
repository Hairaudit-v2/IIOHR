import type { Metadata } from "next";
import { ApplicantApplicationStatusPanel } from "@/components/academy/admissions/ApplicantApplicationStatusPanel";
import { ConsultantDashboardWorkspace } from "@/components/dashboard/workspaces/ConsultantDashboardWorkspace";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { getLatestApplicationForUserStream } from "@/lib/academy/admissions/application-queries";
import { loadApplicantAdmissionsTimeline } from "@/lib/academy/admissions/applicant-timeline";
import { buildConsultantDashboardVm, loadDashboardDisplayName } from "@/lib/dashboard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ConsultantsDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const displayName = user ? await loadDashboardDisplayName(supabase, user.id, user.email ?? undefined) : null;
  const latestApp = user ? await getLatestApplicationForUserStream(supabase, user.id, "consultants") : null;
  const timelineEntries =
    user && latestApp ? await loadApplicantAdmissionsTimeline(supabase, latestApp.id) : [];

  const vm = await buildConsultantDashboardVm(supabase, {
    userId: user?.id ?? "",
    displayName,
    application: latestApp,
  });

  return (
    <SectionShell>
      <ConsultantDashboardWorkspace
        vm={vm}
        admissionsPanel={
          latestApp ? (
            <ApplicantApplicationStatusPanel
              stream="consultants"
              app={latestApp}
              applyPath="/apply/consultants"
              variant="compact"
              timelineEntries={timelineEntries}
            />
          ) : undefined
        }
      />
    </SectionShell>
  );
}
