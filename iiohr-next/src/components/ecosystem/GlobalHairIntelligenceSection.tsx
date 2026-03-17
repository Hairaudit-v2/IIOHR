import { GlobalHairIntelligenceNetwork } from "@/components/ecosystem/GlobalHairIntelligenceNetwork";
import type { GlobalNetworkTheme, GlobalNetworkVariant } from "@/components/ecosystem/GlobalHairIntelligenceNetwork";
import { GLOBAL_NETWORK_NODE_LINKS } from "@/components/ecosystem/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ReactNode } from "react";

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
    ? "relative z-10 scroll-mt-20 border-b border-section-charcoal-border bg-section-charcoal section-ai-accent"
    : "relative z-10 scroll-mt-20 border-b border-border-soft bg-section-ivory-alt";
  return (
    <section
      id={id}
      className={`${sectionClass} ${className}`}
      aria-labelledby={`${id}-heading`}
      data-section-tone={isDark ? "dark" : undefined}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:py-24 lg:py-28">
        <SectionHeading
          eyebrow="Connected System"
          title={heading}
          description={description}
          align="center"
        />
        <div className="mx-auto mt-12 w-full min-w-0 md:mt-14">
          {diagramSlot ?? (
            <GlobalHairIntelligenceNetwork
              variant={variant}
              theme={sectionTone === "dark" ? "dark" : theme}
              size={size}
              title="Global Hair Intelligence Network"
              nodeLinks={nodeLinks}
            />
          )}
        </div>
      </div>
    </section>
  );
}
