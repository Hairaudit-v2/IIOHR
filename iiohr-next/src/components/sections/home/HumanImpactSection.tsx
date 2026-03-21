import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { HOME_IMAGES, humanImpactImage } from "@/lib/homeImages";

const impactItems = [
  "Repetition through supervised practical exposure",
  "Feedback loops from structured auditing",
  "Benchmarking that clarifies improvement priorities",
  "Case-based reflection tied to outcomes",
  "Mentorship continuity beyond initial training",
  "Science-led decision support in daily practice",
];

export function HumanImpactSection() {
  return (
    <SectionShell aria-label="Human impact" joinPrevious>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-24">
          <ImageWrapper
            src={HOME_IMAGES.human.mirror}
            alt={humanImpactImage.alt}
            className="aspect-[4/3] min-h-[220px] w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
            glowOnHover
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Outcomes"
            title="Why this model produces better surgeons"
            description="Practice, review, and support over time—instead of a course, then silence."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 lg:gap-5">
            {impactItems.map((item) => (
              <Card key={item} interactive>
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </Card>
            ))}
          </div>
          <div className="mt-12 pt-2 md:mt-14">
            <SectionCTA
              variant="light"
              primary={{ href: "/apply", label: "Apply Now" }}
              secondary={[{ href: "/training-pathways", label: "Explore Pathways" }]}
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
