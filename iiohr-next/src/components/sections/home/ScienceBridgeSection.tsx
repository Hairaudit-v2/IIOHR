import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { HOME_IMAGES, dnaBridgeImage } from "@/lib/homeImages";

export function ScienceBridgeSection() {
  return (
    <SectionShell aria-label="Science bridge">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Science"
            title="From biology to better outcomes"
            description="Hair restoration that lasts starts with understanding causes, progression, and the science behind the follicle. IIOHR training grounds surgeons in biology first."
          />
          <div className="mt-16">
            <Button href="/hair-loss-science" variant="primary">
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
    </SectionShell>
  );
}
