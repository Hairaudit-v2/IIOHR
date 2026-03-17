import Link from "next/link";
import { GlobalHairIntelligenceNetwork } from "@/components/ecosystem/GlobalHairIntelligenceNetwork";
import type { GlobalNetworkTheme, GlobalNetworkVariant } from "@/components/ecosystem/GlobalHairIntelligenceNetwork";
import { GLOBAL_NETWORK_NODE_LINKS } from "@/components/ecosystem/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ECOSYSTEM_PLATFORMS } from "@/lib/ecosystemAuthority";
import type { ReactNode } from "react";

const SUPPORTING_PLATFORM_ORDER: Array<"iiohr" | "hairaudit" | "hli" | "fi"> = [
  "iiohr",
  "hairaudit",
  "hli",
  "fi",
];

export type { GlobalNetworkVariant };

export interface GlobalHairIntelligenceSectionProps {
  /** Which ecosystem site is rendering (HLI, HairAudit, Follicle Intelligence, IIOHR). */
  variant: GlobalNetworkVariant;
  /** Section heading (site-specific). */
  heading: string;
  /** Short explanatory copy below the heading (site-specific). */
  description: string;
  /** "hero" = large feature section; "compact" = smaller for secondary pages. */
  size?: "hero" | "compact";
  /** Light or dark theme for the network. Default follows light section styling. */
  theme?: GlobalNetworkTheme;
  /** "light" = ivory background; "dark" = charcoal with light text (homepage premium block). */
  sectionTone?: "light" | "dark";
  /** Optional id for the section (e.g. for anchor links). */
  id?: string;
  /** Optional className for the section wrapper. */
  className?: string;
  /** Override node links (default: canonical ecosystem URLs). */
  nodeLinks?: Partial<Record<"iiohr" | "hli" | "hairaudit" | "fi", string>>;
  /** Optional slot for future shared animated diagram implementation. */
  diagramSlot?: ReactNode;
}

/**
 * Reusable section wrapper for the Global Hair Intelligence Network.
 * Use on homepage (size="hero") or secondary pages (size="compact").
 * Copy and supporting text are passed in so the component stays brand-neutral.
 * Styles use a soft light background; adapt tokens per site (e.g. bg-subtle when available).
 */
export function GlobalHairIntelligenceSection({
  variant,
  heading,
  description,
  size = "hero",
  theme = "light",
  sectionTone = "light",
  id = "global-hair-intelligence-network",
  className = "",
  nodeLinks = GLOBAL_NETWORK_NODE_LINKS,
  diagramSlot,
}: GlobalHairIntelligenceSectionProps) {
  const isDark = sectionTone === "dark";
  const sectionClass = isDark
    ? "relative z-10 scroll-mt-24 border-b border-section-charcoal-border ghn-section-dark"
    : "relative z-10 scroll-mt-20 border-b border-border-soft bg-section-ivory-alt";
  return (
    <section
      id={id}
      className={`${sectionClass} ${className}`}
      aria-labelledby={`${id}-heading`}
      data-section-tone={isDark ? "dark" : undefined}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-24 md:py-28 lg:py-32">
        <SectionHeading
          eyebrow="Connected System"
          title={heading}
          description={description}
          align="center"
        />
        <div className={`mx-auto w-full min-w-0 ${isDark ? "mt-10 md:mt-12" : "mt-12 md:mt-14"}`}>
          {diagramSlot ?? (
            <div
              className={
                isDark
                  ? "relative mx-auto max-w-5xl rounded-2xl border border-section-charcoal-border/60 bg-section-charcoal/40 p-5 sm:p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur-sm"
                  : ""
              }
            >
              <GlobalHairIntelligenceNetwork
                variant={variant}
                theme={sectionTone === "dark" ? "dark" : theme}
                size={size}
                title="Global Hair Intelligence Network"
                nodeLinks={nodeLinks}
              />
            </div>
          )}
        </div>

        <div
          className={`mx-auto mt-12 w-full min-w-0 md:mt-14 lg:mt-16`}
          aria-label="Ecosystem platforms"
        >
          <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground md:mb-8">
            Explore each platform
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORTING_PLATFORM_ORDER.map((id) => {
              const platform = ECOSYSTEM_PLATFORMS.find((p) => p.id === id);
              if (!platform) return null;
              const displayName = platform.id === "iiohr" ? "IIOHR" : platform.name;
              const ctaLabel = "Visit platform";
              const cardContent = (
                <>
                  <h3 className="text-heading text-lg font-semibold tracking-tight">
                    {displayName}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {platform.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.04em] text-accent">
                    {ctaLabel}
                    <span aria-hidden>→</span>
                  </span>
                </>
              );
              const cardClass =
                "block h-full no-underline text-foreground hover:text-foreground cursor-pointer rounded-lg focus-visible:outline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 " +
                (isDark ? "focus-visible:ring-offset-section-charcoal" : "focus-visible:ring-offset-background");
              return (
                <Card key={platform.id} interactive className="h-full min-w-0">
                  {platform.isInternal ? (
                    <Link href="/" className={cardClass} aria-label={`${displayName}. ${ctaLabel}.`}>
                      {cardContent}
                    </Link>
                  ) : (
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                      aria-label={`${displayName}. ${ctaLabel}.`}
                    >
                      {cardContent}
                    </a>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
