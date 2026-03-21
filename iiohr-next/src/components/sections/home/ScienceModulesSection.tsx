import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import {
  HOME_IMAGES,
  hormonesModuleImage,
  follicleModuleImage,
  hairCycleModuleImage,
  geneticsModuleImage,
} from "@/lib/homeImages";

const modules = [
  {
    title: "Hormones",
    description: "Androgen sensitivity and DHT in pattern hair loss.",
    src: HOME_IMAGES.science.hormones,
    alt: hormonesModuleImage.alt,
  },
  {
    title: "Follicle",
    description: "Structure, biology, and donor-recipient dynamics.",
    src: HOME_IMAGES.science.follicle,
    alt: follicleModuleImage.alt,
  },
  {
    title: "Hair cycle",
    description: "Growth phases and timing for treatment planning.",
    src: HOME_IMAGES.science.hairCycle,
    alt: hairCycleModuleImage.alt,
  },
  {
    title: "Genetics",
    description: "Susceptibility and progression in clinical assessment.",
    src: HOME_IMAGES.science.genetics,
    alt: geneticsModuleImage.alt,
  },
] as const;

export function ScienceModulesSection() {
  return (
    <SectionShell aria-label="Science modules">
      <SectionHeading
        eyebrow="Hair Loss Science"
        title="Four pillars of biological understanding"
        description="Training at IIOHR builds on hormones, follicle biology, the hair cycle, and genetics—so surgical decisions are grounded in science."
        align="center"
      />
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
        {modules.map((mod) => (
          <Link
            key={mod.title}
            href="/hair-loss-science"
            className="group block h-full rounded-lg focus-visible:outline focus-visible:ring-2 focus-visible:ring-[rgba(108,132,168,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Card interactive className="h-full">
              <ImageWrapper
                src={mod.src}
                alt={mod.alt}
                className="aspect-[4/3] w-full rounded-t-lg"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight text-heading">{mod.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{mod.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
