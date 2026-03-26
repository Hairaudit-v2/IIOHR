import type { Metadata } from "next";
import { AuditStandardsMentorshipSection } from "@/components/sections/for-clinics/AuditStandardsMentorshipSection";
import { ClinicImplementationSection } from "@/components/sections/for-clinics/ClinicImplementationSection";
import { ClinicPathwaysSection } from "@/components/sections/for-clinics/ClinicPathwaysSection";
import { ForClinicsCtaSection } from "@/components/sections/for-clinics/ForClinicsCtaSection";
import { ForClinicsHero } from "@/components/sections/for-clinics/ForClinicsHero";
import { InternalTalentBenefitsSection } from "@/components/sections/for-clinics/InternalTalentBenefitsSection";
import { StructuredDevelopmentNeedSection } from "@/components/sections/for-clinics/StructuredDevelopmentNeedSection";

const canonical = "https://iiohr.com/for-clinics";

export const metadata: Metadata = {
  title: "For Clinics and Groups",
  description:
    "IIOHR partners with clinics and medical groups to build structured surgeon development pathways with standards alignment and audit-backed improvement.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

export default function ForClinicsPage() {
  return (
    <>
      <ForClinicsHero />
      <StructuredDevelopmentNeedSection />
      <InternalTalentBenefitsSection />
      <AuditStandardsMentorshipSection />
      <ClinicImplementationSection />
      <ClinicPathwaysSection />
      <ForClinicsCtaSection />
    </>
  );
}
