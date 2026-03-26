import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { LinkArrow } from "@/components/ui/LinkArrow";

const introPoints = [
  "Confirm this route is appropriate for your current role and development stage.",
  "Prepare concise context on your background, goals, and present level of exposure.",
  "Submit for pathway-fit review so admissions can guide a clear next step.",
];

export function ApplyIntroductionSection() {
  return (
    <SectionShell muted joinPrevious>
      <SectionHeading
        eyebrow="Before You Apply"
        title="A guided submission, not a raw intake form"
        description="Use this short checklist before submitting so the form is faster to complete and admissions can review fit more clearly."
      />
      <div className="mt-10">
        <LinkArrow href="/admissions">Not sure if this is the right step? Review admissions first</LinkArrow>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {introPoints.map((point, index) => (
          <Card key={point} quiet className="h-full">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">Checklist</p>
            <p className="mt-2 text-sm font-medium text-foreground">{`0${index + 1}`}</p>
            <p className="mt-2 text-sm leading-relaxed text-readable-muted">{point}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
