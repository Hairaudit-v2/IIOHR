import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { follicleModuleImage } from "@/lib/homeImages";

const planningBlocks = [
  {
    title: "Scalp and follicular biology",
    description:
      "Assess biological context that influences donor strategy, recipient planning, healing dynamics, and long-term sustainability.",
  },
  {
    title: "Treatment understanding",
    description:
      "Integrate medical and adjunctive options with surgical pathways so interventions are sequenced appropriately.",
  },
  {
    title: "Biology-to-surgery connection",
    description:
      "Link diagnosis and treatment planning directly to operative decisions, improving suitability, precision, and durability.",
  },
];

export function FollicleFullWidthSection() {
  return (
    <section
      className="relative z-10 border-b border-section-charcoal-border bg-section-charcoal"
      aria-label="Follicle and biology"
      data-section-tone="dark"
    >
      {/* Full-width follicle image */}
      <div className="relative aspect-[21/9] w-full min-h-[200px] overflow-hidden md:aspect-[3/1]">
        <Image
          src={follicleModuleImage.src}
          alt={follicleModuleImage.alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:py-24 lg:py-28">
        <SectionHeading
          eyebrow="Biology, Treatment, and Surgery"
          title="Clinical planning improves when biology and treatment logic are integrated"
          description="IIOHR teaches surgeons to connect biological understanding with treatment strategy and surgical execution, reducing fragmented decision-making."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {planningBlocks.map((block) => (
            <Card
              key={block.title}
              className="border-section-charcoal-border bg-section-charcoal-foreground/10 shadow-none"
            >
              <h3 className="text-lg font-semibold text-section-charcoal-foreground">
                {block.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-section-charcoal-muted">
                {block.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
