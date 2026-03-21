import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const mailtoClass =
  "inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(108,132,168,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const inlineLink = "font-medium text-accent underline underline-offset-2 hover:text-accent-muted";

export function PracticalFueCtaSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Next Step"
        title="Apply for Practical FUE training"
        description="If you are ready for structured practical progression under supervision, submit an application or contact the admissions team. Practical FUE sits within the full training pathway alongside hair loss science and mentorship."
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
          Full training pathway
        </Link>
        {" · "}
        <Link href="/hair-loss-science" className={inlineLink}>
          Hair loss science
        </Link>
        {" · "}
        <Link href="/admissions" className={inlineLink}>
          Understand readiness and entry
        </Link>
      </p>
    </SectionShell>
  );
}
