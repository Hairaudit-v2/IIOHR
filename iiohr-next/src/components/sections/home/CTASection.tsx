import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionCTA } from "@/components/ui/SectionCTA";

const segmentLinks = [
  { href: "/apply", label: "New to hair restoration", description: "Apply for training" },
  { href: "/apply", label: "Already practising", description: "Refine your practice" },
  { href: "/for-clinics", label: "Clinic or group", description: "Partnership enquiry" },
  { href: "/apply", label: "International applicant", description: "Apply from overseas" },
];

export function CTASection() {
  return (
    <SectionShell anchor>
      <SectionHeading
        eyebrow="Next step"
        title="Begin your institute pathway"
        description="Whether you’re entering the field, refining your practice, or building clinic capability, we’ll match you to the right pathway. Apply now or explore pathways below."
      />
      <SectionCTA
        variant="light"
        primary={{ href: "/apply", label: "Apply Now" }}
        secondary={[
          { href: "/training-pathways", label: "Explore Pathways" },
          { href: "/for-clinics", label: "Enquire About Training" },
        ]}
        className="mt-16"
      />
      <div className="mt-16 pt-12">
        <div
          className="mb-10 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-border/65 to-transparent"
          aria-hidden
        />
        <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
          I am…
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {segmentLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="group block min-h-[44px] rounded-xl border border-border/75 bg-surface/72 px-4 py-3.5 text-sm text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-0"
              >
                <span className="font-medium">{item.label}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
