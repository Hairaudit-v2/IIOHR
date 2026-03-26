import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { LinkArrow } from "@/components/ui/LinkArrow";

const introPoints = [
  "Use this form if you appear broadly aligned and want pathway-fit review before deeper account-based access.",
  "You may be asked for your role, background, development goals, and current level of exposure.",
  "The submission helps admissions understand fit, likely direction, and the most appropriate next step.",
];

export function ApplyIntroductionSection() {
  return (
    <SectionShell muted joinPrevious>
      <SectionHeading
        eyebrow="Before You Apply"
        title="A guided submission, not a raw intake form"
        description="The purpose of this form is to give admissions enough context to review pathway fit and guide you toward the right route."
      />
      <div className="mt-10">
        <LinkArrow href="/admissions">Not sure if this is the right step? Review admissions first</LinkArrow>
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
