import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { Card } from "@/components/ui/Card";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { HOME_IMAGES, humanImpactImage } from "@/lib/homeImages";

const problemItems = [
  "Short and shallow training windows",
  "Doctors left without mentorship after completion",
  "Limited outcome feedback and audit loops",
  "No clear progression from observation to independent practice",
];

export function ProblemSection() {
  return (
    <SectionShell continuous joinPrevious id="problem">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
        {/* Image left (stacked first on mobile) */}
        <div className="relative order-2 min-h-[220px] lg:order-1">
          <ImageWrapper
            src={HOME_IMAGES.human.mirror}
            alt={humanImpactImage.alt}
            className="aspect-[4/3] w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/12 via-transparent to-transparent"
              aria-hidden
            />
          </ImageWrapper>
        </div>

        {/* Text right */}
        <div className="order-1 min-w-0 lg:order-2">
          <SectionHeading
            eyebrow="Context"
            title="The problem with traditional training"
            description="Too short, too shallow, and too little support to build lasting judgment."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 lg:gap-5">
            {problemItems.map((item) => (
              <Card key={item} quiet>
                <p className="text-sm font-medium leading-snug tracking-tight text-foreground">
                  {item}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
