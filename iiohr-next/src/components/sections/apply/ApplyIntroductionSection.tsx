import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { LinkArrow } from "@/components/ui/LinkArrow";

const introPoints = [
  "We review your clinical background, experience level, and development goals.",
  "Individual doctors and clinic teams use the same intake process.",
  "You receive a pathway recommendation after initial review.",
];

export function ApplyIntroductionSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Before You Apply"
        title="Structured intake process"
        description="We match you to the right pathway stage based on your background and goals, ensuring safe, realistic progression."
      />
      <div className="mt-10">
        <LinkArrow href="/admissions">Not sure if you are ready? Review admissions criteria</LinkArrow>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {introPoints.map((point) => (
          <Card key={point}>
            <p className="text-sm leading-relaxed text-readable-muted">{point}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
