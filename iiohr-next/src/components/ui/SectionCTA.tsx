import { Button } from "@/components/ui/Button";
import { LinkArrow } from "@/components/ui/LinkArrow";

export interface CTAItem {
  href: string;
  label: string;
  external?: boolean;
}

interface SectionCTAProps {
  /** "light" = ivory section; "dark" = charcoal section (uses dark button variants) */
  variant?: "light" | "dark";
  /** Primary action — gold, single prominent button */
  primary?: CTAItem;
  /** Secondary actions — outline buttons, 1–2 recommended */
  secondary?: CTAItem[];
  /** Tertiary — text/arrow links for softer exploration */
  tertiary?: CTAItem[];
  /** Extra class on the wrapper */
  className?: string;
  /** Optional analytics page key for CTA tracking. */
  analyticsPage?: string;
  /** Optional analytics role key for CTA tracking. */
  analyticsRole?: "doctor" | "consultant_nurse" | "clinic_group" | "unknown";
  /** Optional analytics section key for CTA tracking. */
  analyticsSection?: string;
}

const buttonGap = "gap-x-4 gap-y-3 md:gap-x-5";
const tertiaryGap = "gap-x-6 gap-y-2.5";

/** Reusable CTA cluster: primary + secondary buttons + tertiary links. Use after major sections. */
export function SectionCTA({
  variant = "light",
  primary,
  secondary = [],
  tertiary = [],
  className = "",
  analyticsPage,
  analyticsRole = "unknown",
  analyticsSection = "section_cta",
}: SectionCTAProps) {
  const isDark = variant === "dark";
  const primaryV = isDark ? "dark" : "primary";
  const secondaryV = isDark ? "darkSecondary" : "secondary";

  const hasButtons = primary || secondary.length > 0;
  const hasTertiary = tertiary.length > 0;

  if (!hasButtons && !hasTertiary) return null;

  return (
    <div className={`flex flex-col gap-9 ${className}`}>
      {hasButtons && (
        <div className={`flex flex-wrap items-center ${buttonGap}`}>
          {primary && (
            <Button
              href={primary.href}
              variant={primaryV}
              analyticsEvent="funnel_cta_clicked"
              analyticsPage={analyticsPage}
              analyticsCta={primary.label}
              analyticsSection={analyticsSection}
              analyticsRole={analyticsRole}
            >
              {primary.label}
            </Button>
          )}
          {secondary.map((item) => (
            <Button
              key={item.href + item.label}
              href={item.href}
              variant={secondaryV}
              analyticsEvent="funnel_cta_clicked"
              analyticsPage={analyticsPage}
              analyticsCta={item.label}
              analyticsSection={analyticsSection}
              analyticsRole={analyticsRole}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}
      {hasTertiary && (
        <div className={`flex flex-wrap ${tertiaryGap}`}>
          {tertiary.map((item) =>
            item.external ? (
              <LinkArrow
                key={item.href + item.label}
                href={item.href}
                external
                analyticsEvent="funnel_cta_clicked"
                analyticsPage={analyticsPage}
                analyticsCta={item.label}
                analyticsSection={analyticsSection}
                analyticsRole={analyticsRole}
              >
                {item.label}
              </LinkArrow>
            ) : (
              <LinkArrow
                key={item.href + item.label}
                href={item.href}
                analyticsEvent="funnel_cta_clicked"
                analyticsPage={analyticsPage}
                analyticsCta={item.label}
                analyticsSection={analyticsSection}
                analyticsRole={analyticsRole}
              >
                {item.label}
              </LinkArrow>
            )
          )}
        </div>
      )}
    </div>
  );
}
