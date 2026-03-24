import { CertificateEligibilityCard } from "@/components/academy/shared/CertificateEligibilityCard";
import { DigitalBadgeCard } from "@/components/academy/shared/DigitalBadgeCard";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ConsultantsCertificatesPage() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Consultant Certificates"
        title="Certificate, badge, and transcript outputs"
        description="Consultant certification remains competency-led and safety-gated, with room for future clinic recognition integration."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <CertificateEligibilityCard
          isEligible={false}
          unmetRequirements={[
            "Weighted score must reach 80 percent.",
            "Mandatory pass is required in ethics-scope and red-flag escalation domains.",
            "Required faculty-reviewed tasks must be approved.",
          ]}
        />
        <DigitalBadgeCard
          title="Consultant Academy Digital Badge"
          status="Issued when level certificate eligibility is satisfied."
        />
      </div>
    </SectionShell>
  );
}
