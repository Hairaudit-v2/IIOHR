import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export interface HeroImage {
  src: string;
  alt: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  /** Tertiary CTA — text link below primary/secondary (e.g. Learn More). */
  tertiaryCta?: { href: string; label: string };
  /** Optional hero image for side panel. Use .img-panel styling. */
  image?: HeroImage;
  /** Set true for LCP hero (e.g. homepage) to prioritize loading. */
  imagePriority?: boolean;
  /** "dark" = charcoal hero with light text (homepage); default = light ivory. */
  variant?: "light" | "dark";
}

/** Hero — light (ivory) or dark (charcoal) with generous whitespace. */
export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  tertiaryCta,
  image,
  imagePriority = false,
  variant = "light",
}: PageHeroProps) {
  const isDark = variant === "dark";
  const sectionClass = isDark
    ? "section-dark-anchor section-sep-dark"
    : "section-light-anchor section-flow";
  const imgPanelBg = isDark ? "bg-section-charcoal-foreground/10" : "bg-parchment";
  /** Only render next/image when we have a valid public path (e.g. /images/... or /hero/...). */
  const hasValidImage =
    image?.src &&
    typeof image.src === "string" &&
    image.src.startsWith("/") &&
    !image.src.includes("\\");

  return (
    <section
      className={`relative overflow-hidden ${sectionClass}`}
      data-section-tone={isDark ? "dark" : "default"}
    >
      <div
        className={`section-grid-overlay ${isDark ? "section-grid-overlay-dark" : "section-grid-overlay-light"}`}
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 md:py-28 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-end lg:gap-16 xl:gap-20">
          <div>
            <Eyebrow variant={isDark ? "dark" : "light"}>{eyebrow}</Eyebrow>
            <div className="section-kicker-rule mt-4" aria-hidden />
            <h1 className="mt-8 max-w-4xl text-heading text-4xl leading-[1.04] font-semibold tracking-[-0.03em] md:text-5xl lg:text-[3.1rem] [text-wrap:balance]">
              {title}
            </h1>
            <p
              className={`mt-9 max-w-2xl text-base leading-relaxed md:text-[1.07rem] [line-height:1.72] ${
                isDark ? "text-muted-foreground" : "text-readable-muted"
              }`}
            >
              {description}
            </p>
            {(primaryCta || secondaryCta || tertiaryCta) && (
              <div className="mt-14 flex flex-col gap-12">
                <div className="flex flex-wrap items-center gap-5 md:gap-6">
                  {primaryCta ? (
                    <Button href={primaryCta.href} variant={isDark ? "dark" : "primary"}>
                      {primaryCta.label}
                    </Button>
                  ) : null}
                  {secondaryCta ? (
                    <Button
                      href={secondaryCta.href}
                      variant={isDark ? "darkSecondary" : "secondary"}
                    >
                      {secondaryCta.label}
                    </Button>
                  ) : null}
                </div>
                {tertiaryCta ? (
                  <div className="pt-2">
                    <div
                      className={
                        isDark
                          ? "mb-3 h-px max-w-xs bg-gradient-to-r from-section-charcoal-border/35 via-section-charcoal-border/12 to-transparent"
                          : "mb-3 h-px max-w-xs bg-gradient-to-r from-border/85 via-border/40 to-transparent"
                      }
                      aria-hidden
                    />
                    <p className="text-sm">
                      <Button href={tertiaryCta.href} variant="tertiary">
                        {tertiaryCta.label}
                      </Button>
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <div className="hero-visual-panel">
              <div className="relative min-h-[420px] w-full overflow-hidden">
                {hasValidImage ? (
                  <Image
                    src={image.src}
                    alt={image.alt ?? ""}
                    fill
                    className="h-full w-full object-cover object-center"
                    priority={imagePriority}
                    sizes="(max-width: 1279px) 40vw, 420px"
                  />
                ) : (
                  <div className={`h-full min-h-[420px] w-full ${imgPanelBg}`} aria-hidden />
                )}
                <div
                  className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-bg-dark/54 via-transparent to-white/8"
                  aria-hidden
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-3">
              <div className="hero-visual-rail h-9" aria-hidden />
              <div className="hero-visual-rail h-9 opacity-70" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
