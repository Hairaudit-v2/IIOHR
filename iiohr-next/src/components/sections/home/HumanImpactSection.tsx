import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
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
    <section
      className="relative z-10 border-b border-section-charcoal-border section-dark-gradient"
      aria-label="Human impact"
      data-section-tone="dark"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:py-24 lg:py-28">
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
              description="Better surgeons come from repeated practice, review, and support over time rather than isolated short-course exposure."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12">
              {impactItems.map((item) => (
                <Card
                  key={item}
                  className="border-section-charcoal-border bg-section-charcoal-foreground/10 shadow-none"
                >
                  <p className="text-sm leading-relaxed text-section-charcoal-muted">{item}</p>
                </Card>
              ))}
            </div>
            <div className="mt-12 pt-2">
              <SectionCTA
                variant="dark"
                primary={{ href: "/apply", label: "Apply Now" }}
                secondary={[{ href: "/training-pathways", label: "Explore Pathways" }]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
