import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";

const segmentLinks = [
  { href: "/apply", label: "New to hair restoration", description: "Apply for training" },
  { href: "/apply", label: "Already practising", description: "Refine your practice" },
  { href: "/for-clinics", label: "Clinic or group", description: "Partnership enquiry" },
  { href: "/apply", label: "International applicant", description: "Apply from overseas" },
];

export function CTASection() {
  return (
    <SectionShell dark>
      <SectionHeading
        eyebrow="Next step"
        title="Begin your institute pathway"
        description="Whether you’re entering the field, refining your practice, or building clinic capability, we’ll match you to the right pathway. Apply now or explore pathways below."
      />
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/apply" variant="dark">
          Apply Now
        </Button>
        <Button href="/training-pathways" variant="darkSecondary">
          Explore Pathways
        </Button>
        <Button href="/for-clinics" variant="darkSecondary">
          Enquire About Training
        </Button>
      </div>
      <div className="mt-12 border-t border-section-charcoal-border pt-8">
        <p className="text-xs font-semibold tracking-[0.12em] text-section-charcoal-muted uppercase">
          I am…
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {segmentLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block rounded-lg border border-section-charcoal-border bg-section-charcoal-foreground/5 px-4 py-3 text-sm text-section-charcoal-foreground transition-colors hover:bg-section-charcoal-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-section-charcoal"
              >
                <span className="font-medium">{item.label}</span>
                <span className="mt-1 block text-xs text-section-charcoal-muted">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
