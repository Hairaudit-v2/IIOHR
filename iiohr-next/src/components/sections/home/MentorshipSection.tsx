import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { Card } from "@/components/ui/Card";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { HOME_IMAGES, heroEducationImage } from "@/lib/homeImages";

const mentorshipItems = [
  {
    title: "Live feedback",
    description: "Structured input during supervised practical development so you refine technique in real time.",
  },
  {
    title: "Case review & planning",
    description: "Structured case review and improvement planning with experienced clinicians.",
  },
  {
    title: "Ongoing mentorship",
    description: "Longitudinal support beyond initial training so progression is sustained.",
  },
];

export function MentorshipSection() {
  return (
    <section
      className="relative z-10 border-b border-section-charcoal-border section-dark-gradient"
      aria-label="Mentorship"
      data-section-tone="dark"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <ImageWrapper
            src={HOME_IMAGES.trust.doctor}
            alt={heroEducationImage.alt}
            className="aspect-[4/3] min-h-[220px] w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
            glowOnHover
          />
          <div>
            <SectionHeading
              eyebrow="Mentorship"
              title="Practical mentorship across the full pathway"
              description="Clinician-led development: experienced surgeons mentor, review cases, and refine judgment so progression is grounded in real practice, not theory alone."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:mt-12">
              {mentorshipItems.map((item, index) => (
                <Card
                  key={item.title}
                  interactive
                  marker={index + 1}
                  className="border-section-charcoal-border bg-section-charcoal-foreground/10 shadow-none"
                >
                  <h3 className="text-base font-semibold tracking-tight text-section-charcoal-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-section-charcoal-muted">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
            <div className="mt-12 pt-2">
              <SectionCTA
                variant="dark"
                primary={{ href: "/apply", label: "Apply Now" }}
                secondary={[{ href: "/training-pathways", label: "Explore Pathways" }]}
                tertiary={[{ href: "/training-pathways", label: "How the pathway works" }]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
