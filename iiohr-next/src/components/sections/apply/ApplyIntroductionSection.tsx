import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { LinkArrow } from "@/components/ui/LinkArrow";

const introPoints = [
  "Applications are reviewed for clinical context, current experience level, and development goals.",
  "Both individual doctors and clinic groups can submit an enquiry through the same intake process.",
  "A pathway recommendation is provided after initial review and suitability discussion.",
];

export function ApplyIntroductionSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Before You Apply"
        title="A clear and structured application process"
        description="IIOHR intake is designed to match candidates and clinic teams to the most suitable pathway stage. This ensures progression is safe, realistic, and clinically useful."
      />
      <div className="mt-8">
        <LinkArrow href="/admissions">Not sure if you are ready? Review admissions criteria</LinkArrow>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {introPoints.map((point) => (
          <Card key={point}>
            <p className="text-sm leading-relaxed text-muted-foreground">{point}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
