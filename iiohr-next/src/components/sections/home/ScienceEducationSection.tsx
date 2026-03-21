import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import {
  HOME_IMAGES,
  dnaBridgeImage,
  hormonesModuleImage,
  follicleModuleImage,
  hairCycleModuleImage,
  geneticsModuleImage,
} from "@/lib/homeImages";

const modules = [
  {
    title: "Hormones",
    description: "Androgen sensitivity and DHT.",
    src: HOME_IMAGES.science.hormones,
    alt: hormonesModuleImage.alt,
  },
  {
    title: "Follicle",
    description: "Structure, biology, donor–recipient dynamics.",
    src: HOME_IMAGES.science.follicle,
    alt: follicleModuleImage.alt,
  },
  {
    title: "Hair cycle",
    description: "Phases and timing for planning.",
    src: HOME_IMAGES.science.hairCycle,
    alt: hairCycleModuleImage.alt,
  },
  {
    title: "Genetics",
    description: "Susceptibility in assessment.",
    src: HOME_IMAGES.science.genetics,
    alt: geneticsModuleImage.alt,
  },
] as const;

/** Single editorial band: why science matters, then the four domains—no repeated hero framing. */
export function ScienceEducationSection() {
  return (
    <SectionShell aria-label="Science and biological foundations">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="Science"
            title="Biology before technique"
            description="Restoration that holds up starts with causes, progression, and the follicle—not only operative steps."
          />
          <div className="mt-10">
            <Button href="/hair-loss-science" variant="primary">
              Hair loss science
            </Button>
          </div>
        </div>
        <ImageWrapper
          src={HOME_IMAGES.science.dna}
          alt={dnaBridgeImage.alt}
          className="aspect-[4/3] min-h-[220px] w-full"
          sizes="(max-width: 1024px) 100vw, 50vw"
          glowOnHover
        />
      </div>

      <div className="mt-12 border-t border-border/20 pt-10 md:mt-14 md:pt-12">
        <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          Four domains that ground surgical judgment.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-9 lg:grid-cols-4 lg:gap-5">
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
                <div className="p-3.5 md:p-4">
                  <h3 className="text-base font-semibold tracking-tight text-heading">{mod.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{mod.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
