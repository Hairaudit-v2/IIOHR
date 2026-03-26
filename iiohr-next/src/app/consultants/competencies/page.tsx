import type { Metadata } from "next";
import { ProtectedAcademyAccessBoundary } from "@/components/academy/shared/ProtectedAcademyAccessBoundary";
import { CompetencyTranscriptTable } from "@/components/academy/shared/CompetencyTranscriptTable";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProtectedAcademyAccess } from "@/lib/academy/access";
import { getProgramCompetencies } from "@/lib/academy/content-loader";

const programSlug = "certificate-hair-loss-consultation-clinical-patient-coordination";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ConsultantsCompetenciesPage() {
  const access = await getProtectedAcademyAccess("consultants", "/consultants/competencies");
  if (!access.hasProtectedAccess) {
    return <ProtectedAcademyAccessBoundary {...access} />;
  }

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
