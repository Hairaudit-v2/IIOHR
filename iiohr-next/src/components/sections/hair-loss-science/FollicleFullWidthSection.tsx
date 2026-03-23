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
      className="relative z-10 section-light section-flow"
      aria-label="Follicle and biology"
      data-section-tone="light"
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
      <div className="mx-auto w-full max-w-6xl px-5 py-28 md:py-32 lg:py-36">
        <SectionHeading
          eyebrow="Biology, Treatment, and Surgery"
          title="Clinical planning improves when biology and treatment logic are integrated"
          description="IIOHR teaches surgeons to connect biological understanding with treatment strategy and surgical execution, reducing fragmented decision-making."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
          <Card interactive className="h-full">
            <h3 className="text-2xl font-semibold text-heading md:text-[1.75rem]">
              {planningBlocks[0]?.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {planningBlocks[0]?.description}
            </p>
          </Card>
          <ul className="list-rail">
            {planningBlocks.slice(1).map((block) => (
              <li key={block.title} className="list-rail-item">
                <h3 className="text-lg font-semibold text-heading">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {block.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
