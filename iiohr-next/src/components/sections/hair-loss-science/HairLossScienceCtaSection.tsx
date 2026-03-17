import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function HairLossScienceCtaSection() {
  return (
    <SectionShell dark>
      <SectionHeading
        eyebrow="Next Step"
        title="Develop surgical capability with deeper scientific grounding"
        description="Apply to IIOHR or contact the admissions team to discuss a pathway that combines practical progression with robust biological education."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          href="/apply"
          variant="secondary"
          className="border-primary-foreground text-primary-foreground"
        >
          Apply for Training
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
