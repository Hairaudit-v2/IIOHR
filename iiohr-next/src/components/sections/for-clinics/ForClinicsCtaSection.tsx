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
        eyebrow="Next Step"
        title="Choose the right next step for your clinic"
        description="Use admissions if you want to review fit first, apply or enquire when you are ready, or explore the doctor and consultant routes that sit around the wider clinic model."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/admissions" variant="primary">
          Start Admissions Review
        </Button>
        <Button href="/apply" variant="secondary">
          Apply / Enquire
        </Button>
        <a
          href={`mailto:${siteConfig.applicationEmail}?subject=Clinic%20partnership%20enquiry`}
          className={mailtoClass}
        >
          Email clinic enquiry
        </a>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/doctors" variant="ghost">
          Explore Doctors
        </Button>
        <Button href="/consultants" variant="ghost">
          Explore Consultants
        </Button>
      </div>
      <p className="mt-6 text-sm text-readable-muted">
        <Link href="/admissions" className="link-premium">
          Understand readiness and entry
        </Link>
        {" · "}
        <Link href="/apply" className="link-premium">
          Review application route
        </Link>
      </p>
    </SectionShell>
  );
}
