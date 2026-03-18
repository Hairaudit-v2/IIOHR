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
}

const buttonGap = "gap-4";
const tertiaryGap = "gap-6";

/** Reusable CTA cluster: primary + secondary buttons + tertiary links. Use after major sections. */
export function SectionCTA({
  variant = "light",
  primary,
  secondary = [],
  tertiary = [],
  className = "",
}: SectionCTAProps) {
  const isDark = variant === "dark";
  const primaryV = isDark ? "dark" : "primary";
  const secondaryV = isDark ? "darkSecondary" : "secondary";

  const hasButtons = primary || secondary.length > 0;
  const hasTertiary = tertiary.length > 0;

  if (!hasButtons && !hasTertiary) return null;

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {hasButtons && (
        <div className={`flex flex-wrap items-center ${buttonGap}`}>
          {primary && (
            <Button href={primary.href} variant={primaryV}>
              {primary.label}
            </Button>
          )}
          {secondary.map((item) => (
            <Button key={item.href + item.label} href={item.href} variant={secondaryV}>
              {item.label}
            </Button>
          ))}
        </div>
      )}
      {hasTertiary && (
        <div className={`flex flex-wrap ${tertiaryGap}`}>
          {tertiary.map((item) =>
            item.external ? (
              <LinkArrow key={item.href + item.label} href={item.href} external>
                {item.label}
              </LinkArrow>
            ) : (
              <LinkArrow key={item.href + item.label} href={item.href}>
                {item.label}
              </LinkArrow>
            )
          )}
        </div>
      )}
    </div>
  );
}
