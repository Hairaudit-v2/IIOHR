import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function TrainingPathwaysCtaSection() {
  return (
    <SectionShell dark>
      <SectionHeading
        eyebrow="Next step"
        title="Apply or enquire about pathway fit"
        description="Individual doctors and clinic teams can apply through the same intake. We’ll identify the right entry stage from your background and goals. Explore practical FUE and hair loss science as part of the pathway."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          href="/apply"
          variant="secondary"
          className="border-primary-foreground text-primary-foreground"
        >
          Apply as an individual
        </Button>
        <Button
          href="/for-clinics"
          variant="ghost"
          className="border-primary-foreground/50 bg-transparent text-primary-foreground"
        >
          Clinic enquiry
        </Button>
        <a
          href={`mailto:${siteConfig.applicationEmail}`}
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-primary-foreground/50 px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          Enquire by email
        </a>
      </div>
      <p className="mt-6 text-sm text-primary-foreground/85">
        <Link href="/practical-fue" className="font-medium underline hover:text-primary-foreground">
          Practical FUE
        </Link>
        {" · "}
        <Link href="/hair-loss-science" className="font-medium underline hover:text-primary-foreground">
          Hair loss science
        </Link>
        {" · "}
        <Link href="/certification-framework" className="font-medium underline hover:text-primary-foreground">
          Certification framework
        </Link>
      </p>
      <p className="mt-3 text-sm text-primary-foreground/85">
        Not sure where to start?{" "}
        <Link href="/admissions" className="font-medium underline hover:text-primary-foreground">
          Review admissions and readiness
        </Link>
        .
      </p>
    </SectionShell>
  );
}
