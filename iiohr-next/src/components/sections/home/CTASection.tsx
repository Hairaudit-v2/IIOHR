import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionCTA } from "@/components/ui/SectionCTA";

const segmentLinks = [
  {
    href: "/doctors",
    label: "Doctors",
    description: "Academy overview, admissions route, and doctor application entry point.",
  },
  {
    href: "/consultants",
    label: "Consultants / nurses",
    description: "Consultant pathway overview, admissions route, and account-based next steps.",
  },
  {
    href: "/for-clinics",
    label: "Clinics",
    description: "Team development, standards, and implementation.",
  },
];

export function CTASection() {
  return (
    <SectionShell anchor>
      <SectionHeading
        eyebrow="Next step"
        title="Choose your route"
        description="Select the page that matches your role, then move into admissions when ready."
      />
      <SectionCTA
        variant="light"
        primary={{ href: "/admissions", label: "Start Admissions Review" }}
        secondary={[
          { href: "/training-pathways", label: "View Training Pathways" },
          { href: "/for-clinics", label: "Explore Clinic Pathways" },
        ]}
        className="mt-16"
      />
      <div className="mt-16 pt-12">
        <div
          className="mb-10 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-border/65 to-transparent"
          aria-hidden
        />
        <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
          Guided routes
        </p>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
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
