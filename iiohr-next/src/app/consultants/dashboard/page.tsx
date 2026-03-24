import { ProgressSummaryCard } from "@/components/academy/shared/ProgressSummaryCard";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ConsultantsDashboardPage() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Consultant Dashboard"
        title="Consultant learner dashboard"
        description="Dashboard routes are now consultant-specific and ready to connect to progress, competency, faculty review, and certificate services."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <ProgressSummaryCard title="Levels" value="3" supportingText="Foundation, advanced, and diploma pathways are seeded." />
        <ProgressSummaryCard title="Modules" value="15" supportingText="Consultant curriculum backbone is now content-driven." />
        <ProgressSummaryCard title="Competencies" value="15" supportingText="Competencies are first-class entities, not certificate prose." />
      </div>
    </SectionShell>
  );
}
