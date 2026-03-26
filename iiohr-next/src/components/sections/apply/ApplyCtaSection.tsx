import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const mailtoClass =
  "inline-flex min-h-10 items-center justify-center rounded-md border-2 border-foreground/16 bg-surface px-5 py-2.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ApplyCtaSection() {
  return (
    <SectionShell anchor>
      <SectionHeading
        eyebrow="Support"
        title="Use the route that best fits your next step"
        description="Complete the form if you are ready to submit, or use the links below if you need role-specific guidance before continuing."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="#application-form" variant="primary">
          Complete Form
        </Button>
        <a href={`mailto:${siteConfig.applicationEmail}`} className={mailtoClass}>
          Enquire by Email
        </a>
        <Button href="/admissions" variant="ghost">
          Start Admissions Review
        </Button>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/doctors" variant="secondary">
          Explore Doctors
        </Button>
        <Button href="/consultants" variant="secondary">
          Explore Consultants / nurses
        </Button>
        <Button href="/for-clinics" variant="secondary">
          Explore For Clinics
        </Button>
      </div>
      <div className="mt-6">
        <Button href="/login?redirectTo=%2Fapply" variant="tertiary">
          Sign In / Access Account
        </Button>
      </div>
    </SectionShell>
  );
}
