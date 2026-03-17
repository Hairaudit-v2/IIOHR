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
    ? "border-b border-section-charcoal-border bg-section-charcoal"
    : "border-b border-border-soft bg-section-ivory";
  const imgPanelBg = isDark ? "bg-section-charcoal-foreground/10" : "bg-parchment";

  return (
    <section className={sectionClass} data-section-tone={isDark ? "dark" : undefined}>
      <div className="mx-auto w-full max-w-6xl px-5 py-16 md:py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,340px)] lg:items-start lg:gap-14">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 max-w-4xl text-heading text-4xl leading-tight font-semibold tracking-tight md:text-5xl lg:text-[2.75rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
            {(primaryCta || secondaryCta || tertiaryCta) && (
              <div className="mt-9 flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
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
                  <p className="text-sm">
                    <Button href={tertiaryCta.href} variant="tertiary">
                      {tertiaryCta.label}
                    </Button>
                  </p>
                ) : null}
              </div>
            )}
          </div>
          {(
            <div className="img-panel hidden min-h-[220px] w-full lg:block">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={340}
                  height={255}
                  className="h-full w-full object-cover"
                  priority={imagePriority}
                  sizes="340px"
                />
              ) : (
                <div className={`h-full min-h-[220px] w-full ${imgPanelBg}`} aria-hidden />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
