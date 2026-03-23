import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const mailtoClass =
  "inline-flex min-h-10 items-center justify-center rounded-md border-2 border-foreground/16 bg-surface px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function PracticalFueCtaSection() {
  return (
    <SectionShell anchor>
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
      <p className="mt-6 text-sm text-readable-muted">
        <Link href="/training-pathways" className="link-premium">
          Full training pathway
        </Link>
        {" · "}
        <Link href="/hair-loss-science" className="link-premium">
          Hair loss science
        </Link>
        {" · "}
        <Link href="/admissions" className="link-premium">
          Understand readiness and entry
        </Link>
      </p>
    </SectionShell>
  );
}
