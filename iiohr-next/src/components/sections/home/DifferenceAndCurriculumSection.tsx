import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionCTA } from "@/components/ui/SectionCTA";

/** Merged “IIOHR difference” + training pillars — one model narrative, fewer section breaks. */
const pillars = [
  "Practical FUE with supervised live-patient exposure and progressive hands-on development",
  "Hair loss science and trichology for diagnostic rigor and clinical judgment",
  "Clinical discipline and donor stewardship from first principles",
  "Follicle Intelligence audit loops and measurable outcome feedback",
  "Longitudinal mentorship and structured surgeon development",
  "Explicit clinical standards and globally aligned progression",
] as const;

export function DifferenceAndCurriculumSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Education & standards"
        title="The IIOHR difference"
        description="A training model built on practical surgery, hair restoration science, and measured development—integrated through supervision, audit, and mentorship under one standards-based pathway."
      />
      <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {pillars.map((item) => (
          <Card key={item} interactive>
            <h3 className="text-base leading-snug font-semibold tracking-tight text-heading">{item}</h3>
          </Card>
        ))}
      </div>
      <div className="mt-14 pt-2 md:mt-16">
        <SectionCTA
          variant="light"
          primary={{ href: "/training-pathways", label: "Explore Pathways" }}
          secondary={[{ href: "/practical-fue", label: "View Curriculum" }]}
          tertiary={[{ href: "/about", label: "Learn More" }]}
        />
      </div>
    </SectionShell>
  );
}
