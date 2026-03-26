import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { HOME_IMAGES, hairProgressionImage } from "@/lib/homeImages";

const impactItems = [
  "More deliberate repetition in clinical settings",
  "Clearer feedback from audit and benchmarking",
  "Outcome review tied to improvement",
  "Support that continues beyond initial training",
];

export function HumanImpactSection() {
  return (
    <SectionShell continuous aria-label="Human impact" joinPrevious>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-24">
          <ImageWrapper
            src={HOME_IMAGES.hero.progression}
            alt={hairProgressionImage.alt}
            className="aspect-[4/3] min-h-[220px] w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Outcomes"
            title="Why the model improves practice"
            description="Capability grows when exposure, feedback, and support continue beyond the first training block."
          />
          <div className="list-rail mt-10 md:mt-12">
            {impactItems.map((item) => (
              <div key={item} className="list-rail-item">
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-2 md:mt-14">
            <SectionCTA
              variant="light"
              primary={{ href: "/training-pathways", label: "View Staged Progression" }}
              secondary={[{ href: "/apply", label: "Start Admissions Review" }]}
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
