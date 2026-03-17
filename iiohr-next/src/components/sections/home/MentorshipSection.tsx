import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { Card } from "@/components/ui/Card";
import { LinkArrow } from "@/components/ui/LinkArrow";

export function MentorshipSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Mentorship"
        title="Practical mentorship across the full pathway"
        description="Clinician-led development: experienced surgeons mentor, review cases, and refine judgment so progression is grounded in real practice, not theory alone."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          "Live feedback during supervised practical development",
          "Structured case review and improvement planning",
          "Longitudinal mentorship beyond initial training",
        ].map((item) => (
          <Card key={item}>
            <p className="text-sm font-medium">{item}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <LinkArrow href="/training-pathways">How the pathway works</LinkArrow>
      </div>
    </SectionShell>
  );
}
