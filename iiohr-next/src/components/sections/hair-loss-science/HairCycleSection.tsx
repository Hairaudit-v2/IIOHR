import Image from "next/image";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { hairCycleModuleImage } from "@/lib/homeImages";

const hairCycleCards = [
  {
    title: "Anagen",
    description:
      "The active growth phase. Understanding duration and variability helps inform donor assessment and timing of intervention.",
  },
  {
    title: "Catagen",
    description:
      "The transitional phase. Recognition of cycle dynamics supports planning and expectation setting for restoration outcomes.",
  },
  {
    title: "Telogen",
    description:
      "The resting phase. Integrating cycle knowledge with assessment improves case selection and long-term planning.",
  },
];

export function HairCycleSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Hair cycle"
        title="Growth phases in clinical context"
        description="Surgeons at IIOHR learn to apply hair cycle fundamentals—anagen, catagen, and telogen—to diagnostic and treatment-planning decisions."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {hairCycleCards.map((card) => (
          <Card key={card.title}>
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
          </Card>
        ))}
      </div>
      <div className="mt-16 max-w-3xl section-prose">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
          <Image
            src={hairCycleModuleImage.src}
            alt={hairCycleModuleImage.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 48rem"
          />
        </div>
      </div>
    </SectionShell>
  );
}
