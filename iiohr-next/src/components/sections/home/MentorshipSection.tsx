import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { Card } from "@/components/ui/Card";

export function MentorshipSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Mentorship"
        title="Expert guidance across the full pathway"
        description="Development is supported by experienced surgeons who mentor, review cases, and refine judgment across the pathway."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          "Live feedback during practical development",
          "Structured case review and improvement planning",
          "Longitudinal support beyond initial training",
        ].map((item) => (
          <Card key={item}>
            <p className="text-sm font-medium">{item}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
