import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const modelComponents = [
  {
    title: "Standards-led placement",
    description:
      "Admissions and pathway placement are designed to match applicants to the right route rather than treating all development as the same.",
  },
  {
    title: "Staged progression",
    description:
      "Capability is expected to build in sequence, with clearer transitions between foundations, supervised development, review, and advancement.",
  },
  {
    title: "Practical development",
    description:
      "Learning is tied to real clinical application so education stays close to patient-facing reality.",
  },
  {
    title: "Review and accountability",
    description:
      "Standards, supervision, mentor input, and review loops are used to guide improvement rather than relying on confidence alone.",
  },
] as const;

export function InstituteDifferenceSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Institute Model"
        title="How the institute model works"
        description="The model is structured around pathway placement, explicit standards, staged development, and ongoing review."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {modelComponents.map((item) => (
          <Card key={item.title} interactive>
            <h3 className="text-lg font-semibold text-heading">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
