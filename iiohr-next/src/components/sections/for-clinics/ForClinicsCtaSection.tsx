import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const mailtoClass =
  "inline-flex min-h-10 items-center justify-center rounded-md border-2 border-foreground/16 bg-surface px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ForClinicsCtaSection() {
  return (
    <SectionShell anchor>
      <SectionHeading
        eyebrow="Partnership enquiry"
        title="Discuss a clinic partnership pathway"
        description="Contact the IIOHR team to define a development plan for your surgeons, standards, and quality goals. Clinics can apply via the form or email directly."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={`mailto:${siteConfig.applicationEmail}?subject=Clinic%20partnership%20enquiry`}
          className={mailtoClass}
        >
          Email: clinic partnership
        </a>
        <Button href="/apply" variant="secondary">
          Submit application (clinic)
        </Button>
      </div>
      <p className="mt-6 text-sm text-readable-muted">
        <Link href="/admissions" className="link-premium">
          Understand readiness and entry
        </Link>
        {" · "}
        <Link href="/certification-framework" className="link-premium">
          View certification framework
        </Link>
      </p>
    </SectionShell>
  );
}
