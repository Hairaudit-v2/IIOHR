import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionCTA } from "@/components/ui/SectionCTA";

const audienceItems = [
  {
    title: "New entrant doctors",
    description:
      "Build safe foundations in practical FUE with structured clinical support and progression checkpoints.",
  },
  {
    title: "Existing hair surgeons",
    description:
      "Refine outcomes through advanced science, auditing feedback, and case-led mentorship.",
  },
  {
    title: "Clinics developing internal talent",
    description:
      "Establish consistent surgeon development frameworks aligned with clinical quality expectations.",
  },
  {
    title: "International practitioners",
    description:
      "Adopt institute-led standards in a globally relevant, academically grounded training format.",
  },
];

export function AudienceSection() {
  return (
    <SectionShell joinPrevious>
      <SectionHeading
        eyebrow="Who It Is For"
        title="For doctors and clinics at every stage"
        description="IIOHR supports new entrants, practising surgeons, and clinic teams through one connected pathway—clinician-facing education with clear entry points and progression."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20">
        {audienceItems.map((item) => (
          <Card key={item.title} interactive>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
      <div className="mt-16 pt-6">
        <SectionCTA
          variant="light"
          primary={{ href: "/apply", label: "Apply Now" }}
          secondary={[
            { href: "/training-pathways", label: "Explore Pathways" },
            { href: "/for-clinics", label: "Enquire About Training" },
          ]}
          tertiary={[
            { href: "/training-pathways", label: "Explore training pathways" },
            { href: "/about", label: "Learn More" },
          ]}
        />
      </div>
    </SectionShell>
  );
}
