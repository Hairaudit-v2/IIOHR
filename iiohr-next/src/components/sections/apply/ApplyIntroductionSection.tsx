import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

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
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {introPoints.map((point) => (
          <Card key={point}>
            <p className="text-sm leading-relaxed text-muted-foreground">{point}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
