import { CompetencyTranscriptTable } from "@/components/academy/shared/CompetencyTranscriptTable";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProgramCompetencies } from "@/lib/academy/content-loader";

const programSlug = "certificate-hair-loss-consultation-clinical-patient-coordination";

export default function ConsultantsCompetenciesPage() {
  const competencies = getProgramCompetencies(programSlug);

  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Consultant Competencies"
        title="Competency transcript"
        description="Competencies are modeled as first-class records so future transcript, faculty sign-off, and clinic reporting layers can build on a stable foundation."
      />
      <div className="mt-12">
        <CompetencyTranscriptTable
          rows={competencies.map((competency) => ({
            id: competency.id,
            title: competency.title,
            status: competency.mustBeFacultyVerified ? "Faculty verification required" : "Assessment-led",
          }))}
        />
      </div>
    </SectionShell>
  );
}
