import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { applyTrainingHref } from "@/lib/navigation";

export function AboutCtaSection() {
  return (
    <SectionShell anchor>
      <SectionHeading
        eyebrow="Next step"
        title="Choose the next step into the institute"
        description="Use admissions to review pathway fit, apply when ready, or explore the doctor, consultant, and clinic routes in more detail."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/admissions" variant="primary">
          Start Admissions Review
        </Button>
        <Button href={applyTrainingHref} variant="secondary">
          Apply to IIOHR
        </Button>
        <Button href="/for-clinics" variant="ghost">
          Explore Clinic Pathways
        </Button>
      </div>
      <div className="mt-6">
        <Button href="/training-pathways" variant="tertiary">
          View training pathways
        </Button>
      </div>
    </SectionShell>
  );
}
