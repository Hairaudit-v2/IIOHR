import { CertificateEligibilityCard } from "@/components/academy/shared/CertificateEligibilityCard";
import { DigitalBadgeCard } from "@/components/academy/shared/DigitalBadgeCard";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function DoctorsCertificatesPage() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Doctor Certificates"
        title="Doctor certificate outputs"
        description="Certificate and badge surfaces are now separated by stream, even while they share the same eligibility and issuance engine underneath."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <CertificateEligibilityCard
          isEligible={false}
          unmetRequirements={[
            "Connect live learner progress data to calculate doctor stream eligibility.",
          ]}
        />
        <DigitalBadgeCard title="Doctor Program Badge" status="Badge issuance can be connected once live completion records exist." />
      </div>
    </SectionShell>
  );
}
