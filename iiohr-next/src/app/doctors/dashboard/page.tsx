import { ProgressSummaryCard } from "@/components/academy/shared/ProgressSummaryCard";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function DoctorsDashboardPage() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Doctor Dashboard"
        title="Doctor learner dashboard"
        description="Dashboard routes now exist as doctor-specific academy surfaces on top of the shared progress and certification engine."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <ProgressSummaryCard title="Programs" value="1" supportingText="Doctor stream programs currently registered." />
        <ProgressSummaryCard title="Route Model" value="Live" supportingText="Doctor routes now resolve through the academy core." />
        <ProgressSummaryCard title="Certificates" value="Ready" supportingText="Certificate surfaces can now connect to the shared eligibility engine." />
      </div>
    </SectionShell>
  );
}
