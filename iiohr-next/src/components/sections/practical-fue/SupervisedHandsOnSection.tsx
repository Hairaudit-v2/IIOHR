import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const supervisionBlocks = [
  {
    title: "Supervised hands-on training on live patients",
    description:
      "The brochure positions India as a setting where supervised practical exposure can take place on live patients rather than simulations or mannequin-based practice.",
  },
  {
    title: "Doctor-driven, structured, outcome-oriented",
    description:
      "The training model is presented as doctor-led and structured, with progression anchored in clinical discipline rather than volume-led technician delivery.",
  },
  {
    title: "Real clinical exposure",
    description:
      "Active patient care is positioned as the basis for building practical skill under supervision and repeated real-case exposure.",
  },
  {
    title: "World-class faculty",
    description:
      "Faculty-led delivery is central to the Gurgaon partner site, with named clinical and trichology leadership presented throughout the training offer.",
  },
  {
    title: "Superior economics",
    description:
      "The brochure frames India as offering high-quality training at a fraction of typical global costs, supporting international doctors who need practical exposure and economic efficiency.",
  },
];

export function SupervisedHandsOnSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Why India"
        title="Clinical partner delivery positioned around live exposure and structured supervision"
        description="For international doctors, the Gurgaon partner site is framed as a doctor-driven environment with supervised hands-on experience, real clinical exposure, world-class faculty, and stronger training economics."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {supervisionBlocks.map((block) => (
          <Card key={block.title}>
            <h3 className="text-lg font-semibold">{block.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
