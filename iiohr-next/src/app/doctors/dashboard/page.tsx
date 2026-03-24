import { ApplicantApplicationStatusPanel } from "@/components/academy/admissions/ApplicantApplicationStatusPanel";
import { ProgressSummaryCard } from "@/components/academy/shared/ProgressSummaryCard";
import { getLatestApplicationForUserStream } from "@/lib/academy/admissions/application-queries";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const dynamic = "force-dynamic";

export default async function DoctorsDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const latestApp = user ? await getLatestApplicationForUserStream(supabase, user.id, "doctors") : null;

  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Doctor Dashboard"
        title="Doctor learner dashboard"
        description="Dashboard routes now exist as doctor-specific academy surfaces on top of the shared progress and certification engine."
      />
      {latestApp ? (
        <div className="mt-8 max-w-2xl">
          <ApplicantApplicationStatusPanel
            stream="doctors"
            app={latestApp}
            applyPath="/apply/doctors"
            variant="compact"
          />
        </div>
      ) : null}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <ProgressSummaryCard title="Programs" value="1" supportingText="Doctor stream programs currently registered." />
        <ProgressSummaryCard title="Route Model" value="Live" supportingText="Doctor routes now resolve through the academy core." />
        <ProgressSummaryCard title="Certificates" value="Ready" supportingText="Certificate surfaces can now connect to the shared eligibility engine." />
      </div>
    </SectionShell>
  );
}
