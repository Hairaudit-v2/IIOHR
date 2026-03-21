import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const mailtoClass =
  "inline-flex min-h-10 items-center justify-center rounded-md border-2 border-foreground/18 bg-surface px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-accent/45 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const inlineLink = "font-medium text-accent underline underline-offset-2 hover:text-accent-muted";

export function HairLossScienceCtaSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Next Step"
        title="Develop surgical capability with deeper scientific grounding"
        description="Apply to IIOHR or contact the admissions team to discuss a pathway that combines practical progression with robust biological education. Science training is integrated with our training pathways and practical FUE programme."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/apply" variant="primary">
          Apply for Training
        </Button>
        <a href={`mailto:${siteConfig.applicationEmail}`} className={mailtoClass}>
          Enquire by Email
        </a>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        <Link href="/training-pathways" className={inlineLink}>
          Training pathways
        </Link>
        {" · "}
        <Link href="/practical-fue" className={inlineLink}>
          Practical FUE
        </Link>
      </p>
    </SectionShell>
  );
}
