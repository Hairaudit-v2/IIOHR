import { ApplicantApplicationStatusPanel } from "@/components/academy/admissions/ApplicantApplicationStatusPanel";
import { ProgressSummaryCard } from "@/components/academy/shared/ProgressSummaryCard";
import { getLatestApplicationForUserStream } from "@/lib/academy/admissions/application-queries";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const dynamic = "force-dynamic";

export default async function ConsultantsDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const latestApp = user ? await getLatestApplicationForUserStream(supabase, user.id, "consultants") : null;

  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Consultant Dashboard"
        title="Consultant learner dashboard"
        description="Dashboard routes are now consultant-specific and ready to connect to progress, competency, faculty review, and certificate services."
      />
      {latestApp ? (
        <div className="mt-8 max-w-2xl">
          <ApplicantApplicationStatusPanel
            stream="consultants"
            app={latestApp}
            applyPath="/apply/consultants"
            variant="compact"
          />
        </div>
      ) : null}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <ProgressSummaryCard title="Levels" value="3" supportingText="Foundation, advanced, and diploma pathways are seeded." />
        <ProgressSummaryCard title="Modules" value="15" supportingText="Consultant curriculum backbone is now content-driven." />
        <ProgressSummaryCard title="Competencies" value="15" supportingText="Competencies are first-class entities, not certificate prose." />
      </div>
    </SectionShell>
  );
}
