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
    ? "section-dark section-sep-dark"
    : "section-light section-flow";
  const imgPanelBg = isDark ? "bg-section-charcoal-foreground/10" : "bg-parchment";
  /** Only render next/image when we have a valid public path (e.g. /images/... or /hero/...). */
  const hasValidImage =
    image?.src &&
    typeof image.src === "string" &&
    image.src.startsWith("/") &&
    !image.src.includes("\\");

  return (
    <section className={sectionClass} data-section-tone={isDark ? "dark" : undefined}>
      <div className="mx-auto w-full max-w-6xl px-5 py-24 md:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,340px)] lg:items-start lg:gap-16">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-8 max-w-4xl text-heading text-4xl leading-tight font-semibold tracking-tight md:text-5xl lg:text-[2.75rem] [text-wrap:balance]">
              {title}
            </h1>
            <p className="mt-9 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg [line-height:1.7]">
              {description}
            </p>
            {(primaryCta || secondaryCta || tertiaryCta) && (
              <div className="mt-14 flex flex-col gap-10">
                <div className="flex flex-wrap items-center gap-4">
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
                          : "mb-3 h-px max-w-xs bg-gradient-to-r from-border/60 via-border/25 to-transparent"
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
          <div className="img-panel relative hidden min-h-[220px] w-full overflow-hidden rounded-2xl lg:block">
            {hasValidImage ? (
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                width={340}
                height={255}
                className="h-full w-full object-cover object-center"
                priority={imagePriority}
                sizes="340px"
              />
            ) : (
              <div className={`h-full min-h-[220px] w-full ${imgPanelBg}`} aria-hidden />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
