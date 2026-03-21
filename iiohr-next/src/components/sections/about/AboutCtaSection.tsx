import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function AboutCtaSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Next step"
        title="Explore pathways or begin your application"
        description="Whether you’re entering the field or leading a clinic, we’ll match you to the right pathway. Review the framework below or apply directly."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/training-pathways" variant="primary">
          Explore pathways
        </Button>
        <Button href="/apply" variant="secondary">
          Apply to IIOHR
        </Button>
        <Button href="/for-clinics" variant="ghost">
          For clinics
        </Button>
      </div>
      <div className="mt-6">
        <Button href="/admissions" variant="tertiary">
          Explore admissions
        </Button>
      </div>
    </SectionShell>
  );
}
