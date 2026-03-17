import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const modelComponents = [
  {
    title: "Practical training",
    description:
      "Supervised operative development designed for consistency, safety, and progressive responsibility.",
  },
  {
    title: "Scientific depth",
    description:
      "Trichology and biological understanding are integrated to strengthen diagnostic and planning decisions.",
  },
  {
    title: "Mentorship continuity",
    description:
      "Structured mentor correction supports judgment refinement beyond initial technical training.",
  },
  {
    title: "Audit-backed review",
    description:
      "Performance analysis and benchmarking provide objective feedback loops for measurable improvement.",
  },
];

export function InstituteDifferenceSection() {
  return (
    <SectionShell dark>
      <SectionHeading
        eyebrow="The IIOHR Model"
        title="What makes IIOHR different"
        description="IIOHR combines practical training, science, mentorship, and auditing as one integrated development system."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {modelComponents.map((item) => (
          <Card key={item.title} className="border-white/20 bg-white/5 shadow-none">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
