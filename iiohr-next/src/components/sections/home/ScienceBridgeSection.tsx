import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { HOME_IMAGES, dnaBridgeImage } from "@/lib/homeImages";

export function ScienceBridgeSection() {
  return (
    <section
      className="relative z-10 border-b border-section-charcoal-border section-dark-gradient"
      aria-label="Science bridge"
      data-section-tone="dark"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Science"
              title="From biology to better outcomes"
              description="Hair restoration that lasts starts with understanding causes, progression, and the science behind the follicle. IIOHR training grounds surgeons in biology first."
            />
            <div className="mt-8">
              <Button href="/hair-loss-science" variant="darkSecondary">
                Explore Hair Loss Science
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
      </div>
    </section>
  );
}
