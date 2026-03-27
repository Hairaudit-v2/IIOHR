import type { Metadata } from "next";
import { ClinicDashboardWorkspace } from "@/components/dashboard/workspaces/ClinicDashboardWorkspace";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { buildClinicDashboardVm, loadDashboardDisplayName } from "@/lib/dashboard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ClinicsDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const displayName = user ? await loadDashboardDisplayName(supabase, user.id, user.email ?? undefined) : null;

  const vm = await buildClinicDashboardVm(supabase, {
    userId: user?.id ?? "",
    displayName,
  });

  return (
    <SectionShell>
      <ClinicDashboardWorkspace vm={vm} />
    </SectionShell>
  );
}
