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
  /** Optional hero image for side panel. Use .img-panel styling. */
  image?: HeroImage;
  /** Set true for LCP hero (e.g. homepage) to prioritize loading. */
  imagePriority?: boolean;
}

/** Chapter-opener style hero — warm neutral, bronze heading, generous whitespace */
export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  imagePriority = false,
}: PageHeroProps) {
  return (
    <section className="border-b border-border-soft bg-background">
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
            {(primaryCta || secondaryCta) && (
              <div className="mt-9 flex flex-wrap gap-3.5">
                {primaryCta ? <Button href={primaryCta.href}>{primaryCta.label}</Button> : null}
                {secondaryCta ? (
                  <Button href={secondaryCta.href} variant="secondary">
                    {secondaryCta.label}
                  </Button>
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
                <div className="h-full min-h-[220px] w-full bg-parchment" aria-hidden />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
