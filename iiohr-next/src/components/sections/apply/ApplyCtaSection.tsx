import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const mailtoClass =
  "inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(108,132,168,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ApplyCtaSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Ready to Proceed"
        title="Begin your IIOHR application pathway"
        description="Whether you are an individual clinician or a clinic team, IIOHR provides a clear review and response process with direct admissions support."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="#application-form" variant="primary">
          Complete Form
        </Button>
        <a href={`mailto:${siteConfig.applicationEmail}`} className={mailtoClass}>
          Enquire by Email
        </a>
      </div>
    </SectionShell>
  );
}
