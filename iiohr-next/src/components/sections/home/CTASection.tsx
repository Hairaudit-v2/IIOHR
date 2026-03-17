import Link from "next/link";
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
        description="Whether you’re entering the field, refining your practice, or building clinic capability, we’ll match you to the right pathway. Apply for training or explore pathways below."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/apply"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary-foreground bg-primary-foreground/10 px-5 py-2.5 text-[13px] font-semibold tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          Apply for training
        </Link>
        <Link
          href="/training-pathways"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary-foreground/50 bg-transparent px-5 py-2.5 text-[13px] font-semibold tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          Explore pathways
        </Link>
        <Link
          href="/for-clinics"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary-foreground/50 bg-transparent px-5 py-2.5 text-[13px] font-semibold tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          For clinics
        </Link>
      </div>
      <div className="mt-10 border-t border-primary-foreground/20 pt-8">
        <p className="text-xs font-semibold tracking-[0.12em] text-primary-foreground/80 uppercase">
          I am…
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {segmentLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 text-sm text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                <span className="font-medium">{item.label}</span>
                <span className="mt-1 block text-xs text-primary-foreground/70">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
