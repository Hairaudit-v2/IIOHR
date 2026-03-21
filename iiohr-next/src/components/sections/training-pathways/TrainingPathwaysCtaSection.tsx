import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const mailtoClass =
  "inline-flex min-h-10 items-center justify-center rounded-md border-2 border-foreground/18 bg-surface px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-accent/45 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const inlineLink = "font-medium text-accent underline underline-offset-2 hover:text-accent-muted";

export function TrainingPathwaysCtaSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Next step"
        title="Apply or enquire about pathway fit"
        description="Individual doctors and clinic teams can apply through the same intake. We’ll identify the right entry stage from your background and goals. Explore practical FUE and hair loss science as part of the pathway."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/apply" variant="primary">
          Apply as an individual
        </Button>
        <Button href="/for-clinics" variant="secondary">
          Clinic enquiry
        </Button>
        <a href={`mailto:${siteConfig.applicationEmail}`} className={mailtoClass}>
          Enquire by email
        </a>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        <Link href="/practical-fue" className={inlineLink}>
          Practical FUE
        </Link>
        {" · "}
        <Link href="/hair-loss-science" className={inlineLink}>
          Hair loss science
        </Link>
        {" · "}
        <Link href="/certification-framework" className={inlineLink}>
          Certification framework
        </Link>
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        Not sure where to start?{" "}
        <Link href="/admissions" className={inlineLink}>
          Review admissions and readiness
        </Link>
        .
      </p>
    </SectionShell>
  );
}
