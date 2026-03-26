import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionCTA } from "@/components/ui/SectionCTA";

const pillars = [
  "Supervised practical FUE with live-patient progression",
  "Science and trichology for clinical decisions",
  "Donor stewardship and operative discipline",
  "Audit and Follicle Intelligence linked to outcomes",
  "Mentorship and faculty feedback beyond initial training",
  "Explicit milestones for clinical progression",
] as const;

export function DifferenceAndCurriculumSection() {
  return (
    <SectionShell continuous muted joinPrevious>
      <SectionHeading
        eyebrow="Model"
        title="An institute model, not a short course"
        description="Science, surgery, audit, and mentorship sit inside one training model, so development stays structured from first principles to practice."
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
          primary={{ href: "/training-pathways", label: "View Pathway Structure" }}
          secondary={[{ href: "/practical-fue", label: "View Practical FUE Overview" }]}
          tertiary={[
            { href: "/admissions", label: "Start Admissions Review" },
            { href: "/apply", label: "Apply to IIOHR" },
          ]}
        />
      </div>
    </SectionShell>
  );
}
