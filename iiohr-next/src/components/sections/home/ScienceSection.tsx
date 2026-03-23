import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { Card } from "@/components/ui/Card";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import {
  HOME_IMAGES,
  follicleModuleImage,
  hairCycleModuleImage,
  hormonesModuleImage,
  geneticsModuleImage,
} from "@/lib/homeImages";

const scienceItems = [
  {
    key: "follicle",
    src: HOME_IMAGES.science.follicle,
    alt: follicleModuleImage.alt,
    title: "Follicle",
    caption: "Structure, biology, and donor-recipient dynamics.",
  },
  {
    key: "hairCycle",
    src: HOME_IMAGES.science.hairCycle,
    alt: hairCycleModuleImage.alt,
    title: "Hair cycle",
    caption: "Growth phases and timing for treatment planning.",
  },
  {
    key: "hormones",
    src: HOME_IMAGES.science.hormones,
    alt: hormonesModuleImage.alt,
    title: "Hormones",
    caption: "Androgen sensitivity and DHT in pattern hair loss.",
  },
  {
    key: "genetics",
    src: HOME_IMAGES.science.genetics,
    alt: geneticsModuleImage.alt,
    title: "Genetics",
    caption: "Susceptibility and progression in clinical assessment.",
  },
] as const;

export function ScienceSection() {
  return (
    <SectionShell muted id="science" className="relative overflow-hidden">
      {/* Optional background accent: DNA image, low opacity */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={HOME_IMAGES.science.dna}
          alt=""
          fill
          className="object-cover object-center opacity-[0.05]"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10">
        <SectionHeading
          eyebrow="Hair loss science"
          title="Four pillars of biological understanding"
          description="Training at IIOHR builds on follicle biology, the hair cycle, hormones, and genetics—so surgical decisions are grounded in science."
          align="center"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:gap-8">
          {scienceItems.map((item) => (
            <Card key={item.key} interactive className="overflow-hidden p-0">
              <ImageWrapper
                src={item.src}
                alt={item.alt}
                className="aspect-[4/3] w-full rounded-b-none"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="p-5 md:p-6">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.caption}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
