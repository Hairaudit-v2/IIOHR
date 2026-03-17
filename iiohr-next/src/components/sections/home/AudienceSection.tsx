import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";

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
    <SectionShell>
      <SectionHeading
        eyebrow="Who It Is For"
        title="For doctors and clinics at every stage"
        description="IIOHR supports new entrants, practising surgeons, and clinic teams through one connected pathway—clinician-facing education with clear entry points and progression."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {audienceItems.map((item) => (
          <Card key={item.title}>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        <Link href="/training-pathways" className="font-medium text-foreground underline decoration-heading/40 hover:text-heading hover:decoration-heading">
          Explore training pathways
        </Link>
        {" · "}
        <Link href="/apply" className="font-medium text-foreground underline decoration-heading/40 hover:text-heading hover:decoration-heading">
          Apply for training
        </Link>
        {" · "}
        <Link href="/for-clinics" className="font-medium text-foreground underline decoration-heading/40 hover:text-heading hover:decoration-heading">
          For clinics
        </Link>
      </p>
    </SectionShell>
  );
}
