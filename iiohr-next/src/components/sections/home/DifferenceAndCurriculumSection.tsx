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
      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-14 lg:grid-cols-2 lg:gap-7">
        {pillars.map((item, index) => (
          <Card
            key={item}
            interactive
            marker={`0${index + 1}`}
            className="h-full border-foreground/18 bg-surface-elevated/92 py-7 md:px-7 md:py-8 [&>div>span]:h-10 [&>div>span]:w-10 [&>div>span]:border-foreground/30 [&>div>span]:bg-surface [&>div>span]:text-sm [&>div>span]:font-bold [&>div>span]:tracking-[0.08em]"
          >
            <p className="text-[1.03rem] font-semibold leading-relaxed tracking-[-0.01em] text-heading">
              {item}
            </p>
          </Card>
        ))}
      </div>
      <div className="authority-panel mt-14 px-6 py-6 md:mt-16 md:px-7 md:py-7">
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
