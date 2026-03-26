import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function PracticalFueCtaSection() {
  return (
    <SectionShell anchor>
      <SectionHeading
        eyebrow="Next Step"
        title="Progress through admissions and pathway selection"
        description="Practical FUE sits within the wider IIOHR development pathway, alongside foundational science, supervised practice, and ongoing review. Use the route that matches your current role and stage."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/admissions" variant="primary">
          Start Admissions Review
        </Button>
        <Button href="/apply/doctors" variant="secondary">
          Apply as a Doctor
        </Button>
        <Button href="/doctors" variant="ghost">
          Explore Doctors
        </Button>
        <Button href="/login?redirectTo=%2Fapply" variant="ghost">
          Sign In / Access Account
        </Button>
      </div>
      <p className="mt-6 text-sm text-readable-muted">
        <Link href="/training-pathways" className="link-premium">
          Full training pathway
        </Link>
        {" · "}
        <Link href="/hair-loss-science" className="link-premium">
          Hair loss science
        </Link>
        {" · "}
        <Link href="/admissions" className="link-premium">
          Understand readiness and entry
        </Link>
        {" · "}
        <a href={`mailto:${siteConfig.applicationEmail}`} className="link-premium">
          Contact admissions
        </a>
      </p>
    </SectionShell>
  );
}
