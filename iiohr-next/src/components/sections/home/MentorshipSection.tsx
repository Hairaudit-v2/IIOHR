import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { HOME_IMAGES, heroEducationImage } from "@/lib/homeImages";

const mentorshipItems = [
  {
    title: "Live feedback",
    description: "Structured input while you operate under supervision.",
  },
  {
    title: "Case review",
    description: "Planning and debrief with experienced clinicians.",
  },
  {
    title: "Ongoing support",
    description: "Mentorship that continues after initial training.",
  },
];

export function MentorshipSection() {
  return (
    <SectionShell continuous aria-label="Mentorship" joinPrevious>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <ImageWrapper
          src={HOME_IMAGES.trust.doctor}
          alt={heroEducationImage.alt}
          className="aspect-[4/3] min-h-[220px] w-full"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div>
          <SectionHeading
            eyebrow="Mentorship"
            title="Practical mentorship across the pathway"
            description="Experienced surgeons mentor, review cases, and sharpen judgment in real clinical context."
          />
          <div className="list-rail mt-10 md:mt-12">
            {mentorshipItems.map((item) => (
              <div key={item.title} className="list-rail-item">
                <h3 className="text-sm font-semibold tracking-tight text-heading">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
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
