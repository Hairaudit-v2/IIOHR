import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import {
  HOME_IMAGES,
  dnaBridgeImage,
} from "@/lib/homeImages";

const modules = [
  {
    title: "Hormones",
    description: "Androgen sensitivity and DHT.",
  },
  {
    title: "Follicle",
    description: "Structure, biology, donor–recipient dynamics.",
  },
  {
    title: "Hair cycle",
    description: "Phases and timing for planning.",
  },
  {
    title: "Genetics",
    description: "Susceptibility in assessment.",
  },
] as const;

/** Single editorial band: why science matters, then the four domains—no repeated hero framing. */
export function ScienceEducationSection() {
  return (
    <SectionShell continuous aria-label="Science and biological foundations">
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
        />
      </div>

      <div className="mt-14 pt-12 md:mt-16 md:pt-14">
        <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          Four domains that ground surgical judgment.
        </p>
        <div className="authority-panel mt-8 grid gap-0 overflow-hidden sm:grid-cols-2 lg:mt-9 lg:grid-cols-4">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className="border-b border-border/35 px-5 py-5 last:border-b-0 sm:px-6 sm:py-6 sm:[&:not(:nth-child(odd))]:border-l sm:[&:not(:nth-child(odd))]:border-border/35 lg:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-border/35"
            >
              <p className="text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                {mod.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-readable-muted">{mod.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
