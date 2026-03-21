import Image from "next/image";
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
  /** Optional lab/DNA background visual when sectionTone is dark (homepage). */
  labImage?: { src: string; alt: string };
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
  labImage,
}: GlobalHairIntelligenceSectionProps) {
  const isDark = sectionTone === "dark";
  const sectionClass = isDark
    ? "relative z-10 scroll-mt-24 section-dark section-ecosystem section-flow"
    : "relative z-10 scroll-mt-20 section-light-muted section-flow";
  const isHeroCenterpiece = isDark && size === "hero";

  return (
    <section
      id={id}
      className={`${sectionClass} ${className}`}
      aria-labelledby={`${id}-heading`}
      data-section-tone={isDark ? "dark" : undefined}
    >
      {isDark && labImage ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div className="relative size-full">
            <Image
              src={labImage.src}
              alt={labImage.alt}
              fill
              className="object-cover object-center opacity-[0.12] blur-[4px]"
              sizes="100vw"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-b from-section-charcoal/70 via-transparent to-section-charcoal/70"
            aria-hidden
          />
        </div>
      ) : null}
      {isHeroCenterpiece ? (
        <div className="ghn-glow-diffusion" aria-hidden />
      ) : null}
      <div
        className={`relative z-10 mx-auto w-full max-w-6xl px-5 ${
          isHeroCenterpiece ? "py-32 md:py-40 lg:py-48" : "py-28 md:py-32 lg:py-36"
        }`}
      >
        <div className={isHeroCenterpiece ? "ghn-centerpiece-heading" : undefined}>
          <SectionHeading
            eyebrow="Connected System"
            title={heading}
            description={description}
            align="center"
          />
        </div>
        <div
          className={`mx-auto w-full min-w-0 ${isHeroCenterpiece ? "mt-16 md:mt-20" : isDark ? "mt-10 md:mt-12" : "mt-12 md:mt-14"}`}
        >
          {diagramSlot ?? (
            <div
              className={
                isDark
                  ? "ghn-diagram-glow relative mx-auto max-w-5xl rounded-2xl border border-section-charcoal-border/50 bg-gradient-to-b from-section-charcoal-foreground/[0.08] to-section-charcoal/60 p-5 sm:p-6 md:p-8 shadow-token-ghn-diagram backdrop-blur-sm"
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
          className={`mx-auto w-full min-w-0 ${isHeroCenterpiece ? "mt-20 md:mt-24 lg:mt-28" : "mt-14 md:mt-16 lg:mt-20"}`}
          aria-label="Ecosystem platforms"
        >
          <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground md:mb-8">
            Explore each platform
          </p>
          <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${isDark ? "ghn-platform-cards" : ""}`}>
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
                "block h-full cursor-pointer rounded-lg no-underline text-foreground hover:text-foreground focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 " +
                (isDark
                  ? "focus-visible:ring-intel/50 focus-visible:ring-offset-section-charcoal"
                  : "focus-visible:ring-intel/45 focus-visible:ring-offset-background");
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
