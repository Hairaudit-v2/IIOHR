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
  /** "dark" = charcoal hero with light text. */
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
  variant = "dark",
}: PageHeroProps) {
  const isDark = variant === "dark";
  const sectionClass = isDark ? "section-dark section-sep-dark" : "section-light section-flow";
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
      data-section-tone={isDark ? "dark" : "light"}
    >
      <div
        className={`section-grid-overlay ${isDark ? "section-grid-overlay-dark" : "section-grid-overlay-light"}`}
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 md:py-32 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] lg:items-end lg:gap-16 xl:gap-20">
          <div>
            <Eyebrow variant={isDark ? "dark" : "light"}>{eyebrow}</Eyebrow>
            <div className="section-kicker-rule mt-4" aria-hidden />
            <h1 className="mt-8 max-w-4xl text-heading text-5xl leading-[1.01] font-semibold tracking-[-0.035em] md:text-6xl lg:text-[3.85rem] [text-wrap:balance]">
              {title}
            </h1>
            <p
              className={`mt-10 max-w-2xl text-[1.05rem] leading-relaxed md:text-[1.14rem] [line-height:1.82] ${
                isDark ? "text-muted-foreground" : "text-readable-muted"
              }`}
            >
              {description}
            </p>
            {(primaryCta || secondaryCta || tertiaryCta) && (
              <div className="mt-14 flex flex-col gap-12">
                <div className="flex flex-wrap items-center gap-4 md:gap-5">
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
                    <div className="mb-3 h-px max-w-xs bg-border/75" aria-hidden />
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
                <div className="pointer-events-none absolute inset-0 z-[2] bg-black/10" aria-hidden />
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
