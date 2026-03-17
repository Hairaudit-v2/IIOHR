import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function ApplyCtaSection() {
  return (
    <SectionShell dark>
      <SectionHeading
        eyebrow="Ready to Proceed"
        title="Begin your IIOHR application pathway"
        description="Whether you are an individual clinician or a clinic team, IIOHR provides a clear review and response process with direct admissions support."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          href="#application-form"
          variant="secondary"
          className="border-primary-foreground text-primary-foreground"
        >
          Complete Form
        </Button>
        <a
          href={`mailto:${siteConfig.applicationEmail}`}
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-primary-foreground/50 px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          Enquire by Email
        </a>
      </div>
    </SectionShell>
  );
}
