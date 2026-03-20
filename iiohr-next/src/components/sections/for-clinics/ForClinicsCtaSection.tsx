import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function ForClinicsCtaSection() {
  return (
    <SectionShell dark>
      <SectionHeading
        eyebrow="Partnership enquiry"
        title="Discuss a clinic partnership pathway"
        description="Contact the IIOHR team to define a development plan for your surgeons, standards, and quality goals. Clinics can apply via the form or email directly."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={`mailto:${siteConfig.applicationEmail}?subject=Clinic%20partnership%20enquiry`}
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-primary-foreground px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          Email: clinic partnership
        </a>
        <Button
          href="/apply"
          variant="ghost"
          className="border-primary-foreground/50 bg-transparent text-primary-foreground"
        >
          Submit application (clinic)
        </Button>
      </div>
      <p className="mt-6 text-sm text-primary-foreground/85">
        <Link href="/certification-framework" className="font-medium underline hover:text-primary-foreground">
          View certification framework
        </Link>
      </p>
    </SectionShell>
  );
}
