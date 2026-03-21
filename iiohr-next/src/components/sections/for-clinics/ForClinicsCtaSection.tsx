import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const mailtoClass =
  "inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(108,132,168,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const inlineLink = "font-medium text-accent underline underline-offset-2 hover:text-accent-muted";

export function ForClinicsCtaSection() {
  return (
    <SectionShell muted>
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
      <p className="mt-6 text-sm text-muted-foreground">
        <Link href="/admissions" className={inlineLink}>
          Understand readiness and entry
        </Link>
        {" · "}
        <Link href="/certification-framework" className={inlineLink}>
          View certification framework
        </Link>
      </p>
    </SectionShell>
  );
}
