import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionCTA } from "@/components/ui/SectionCTA";

const pillars = [
  "Supervised practical FUE with live-patient progression",
  "Science and trichology for decisions—not slide decks alone",
  "Donor stewardship and operative discipline from first principles",
  "Audit and Follicle Intelligence tied to real outcomes",
  "Mentorship and case review that continues after initial training",
  "Staged milestones against explicit clinical standards",
] as const;

export function DifferenceAndCurriculumSection() {
  return (
    <SectionShell continuous muted joinPrevious>
      <SectionHeading
        eyebrow="Model"
        title="The IIOHR difference"
        description="Surgery, science, audit, and mentorship in one standards-led pathway—not a short course with theory bolted on."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-2 lg:gap-5">
        {pillars.map((item, index) => (
          <Card key={item} interactive marker={`0${index + 1}`} className="h-full md:p-6">
            <p className="text-sm font-semibold leading-snug tracking-tight text-heading">{item}</p>
          </Card>
        ))}
      </div>
      <div className="authority-panel mt-12 px-6 py-6 md:mt-14 md:px-7 md:py-7">
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
