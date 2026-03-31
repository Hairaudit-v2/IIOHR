import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { IIOHR_GUIDE_DESTINATIONS } from "@/lib/guides/iiohr-guide-destinations";
import { getIiohrGuide } from "@/lib/guides/iiohr-guides";
import { iiohrGuideDownloadFilename } from "@/lib/guides/iiohr-guides";

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
  const executiveGuide = getIiohrGuide("why-iiohr-executive");
  const execFile = executiveGuide ? iiohrGuideDownloadFilename(executiveGuide) : "";

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
        analyticsPage="/"
        analyticsSection="next_step"
        className="mt-16"
      />
      {executiveGuide ? (
        <div className="mt-12 rounded-xl border border-border/75 bg-surface/72 px-4 py-4 sm:px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">PDF guide</p>
          <p className="mt-2 text-sm text-foreground">
            <span className="font-medium">{executiveGuide.shortTitle}</span>
            <span className="text-muted-foreground"> — </span>
            <span className="text-muted-foreground">Executive overview</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a
              href={executiveGuide.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-premium font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/50 focus-visible:ring-offset-2"
              aria-label={`${executiveGuide.primaryCtaLabel} — ${executiveGuide.shortTitle} (opens in new tab)`}
              data-analytics-event="guide_pdf_view"
              data-analytics-page="/"
              data-analytics-section="home_cta_guides"
              data-analytics-guide-id={executiveGuide.id}
              data-analytics-destination={executiveGuide.fileUrl}
            >
              {executiveGuide.primaryCtaLabel}
            </a>
            <a
              href={executiveGuide.fileUrl}
              download={execFile}
              className="link-premium font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/50 focus-visible:ring-offset-2"
              aria-label={`${executiveGuide.secondaryCtaLabel} — ${executiveGuide.shortTitle}`}
              data-analytics-event="guide_pdf_download"
              data-analytics-page="/"
              data-analytics-section="home_cta_guides"
              data-analytics-guide-id={executiveGuide.id}
              data-analytics-destination={executiveGuide.fileUrl}
            >
              {executiveGuide.secondaryCtaLabel}
            </a>
            <Link
              href="/about#iiohr-guides"
              className="link-premium font-semibold"
              data-analytics-event="funnel_cta_clicked"
              data-analytics-page="/"
              data-analytics-cta="All guides"
              data-analytics-section="home_cta_guides"
              data-analytics-destination="/about#iiohr-guides"
            >
              All guides
            </Link>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold uppercase tracking-[0.12em]">Ecosystem</span>
            {" · "}
            <a
              href={IIOHR_GUIDE_DESTINATIONS.hairAudit.absoluteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-premium font-medium"
              data-analytics-event="guide_related_link"
              data-analytics-page="/"
              data-analytics-section="home_cta_guides_ecosystem"
              data-analytics-destination={IIOHR_GUIDE_DESTINATIONS.hairAudit.absoluteUrl}
            >
              HairAudit
            </a>
            {" · "}
            <a
              href={IIOHR_GUIDE_DESTINATIONS.hli.absoluteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-premium font-medium"
              data-analytics-event="guide_related_link"
              data-analytics-page="/"
              data-analytics-section="home_cta_guides_ecosystem"
              data-analytics-destination={IIOHR_GUIDE_DESTINATIONS.hli.absoluteUrl}
            >
              Hair Longevity Institute
            </a>
            {" · "}
            <a
              href={IIOHR_GUIDE_DESTINATIONS.follicleIntelligence.absoluteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-premium font-medium"
              data-analytics-event="guide_related_link"
              data-analytics-page="/"
              data-analytics-section="home_cta_guides_ecosystem"
              data-analytics-destination={IIOHR_GUIDE_DESTINATIONS.follicleIntelligence.absoluteUrl}
            >
              Follicle Intelligence
            </a>
          </p>
        </div>
      ) : null}
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
                data-analytics-event="funnel_cta_clicked"
                data-analytics-page="/"
                data-analytics-cta={item.label}
                data-analytics-section="guided_routes"
                data-analytics-destination={item.href}
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
