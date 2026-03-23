"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HOME_IMAGES, heroDetailImage } from "@/lib/homeImages";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[74vh] w-full overflow-hidden section-dark section-flow"
      aria-label="Hero"
      data-section-tone="dark"
    >
      <div className="section-grid-overlay section-grid-overlay-dark" aria-hidden />

      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={HOME_IMAGES.hero.texture}
          alt=""
          fill
          className="object-cover object-center [filter:saturate(.58)_contrast(1.06)_brightness(.5)]"
          sizes="100vw"
          priority
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-section-charcoal/76" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 md:py-32 lg:py-36 xl:py-40">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] lg:items-end lg:gap-16">
          <div className="relative max-w-2xl">
            <div className="hero-content-fade-in">
              <Eyebrow variant="dark">International Institute of Hair Restoration</Eyebrow>
              <div className="section-kicker-rule mt-4" aria-hidden />
              <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.01] tracking-[-0.035em] text-section-charcoal-foreground md:text-6xl lg:text-[4rem] [text-wrap:balance]">
                Beyond the short course. From technician to surgeon.
              </h1>
              <p className="mt-10 max-w-2xl text-[1.05rem] leading-relaxed text-section-charcoal-muted md:text-[1.14rem] [line-height:1.82]">
                A global education and mentorship platform for hair restoration: clinically grounded training, practical surgical exposure, and standards-based progression for doctors and clinics.
              </p>
              <div className="mt-14 flex flex-col gap-12">
                <div className="flex flex-wrap items-center gap-4 md:gap-5">
                  <Button href="/apply" variant="dark">
                    Apply Now
                  </Button>
                  <Button href="/training-pathways" variant="darkSecondary">
                    Explore Pathways
                  </Button>
                </div>
                <div className="pt-2">
                  <div className="mb-3 h-px max-w-xs bg-section-charcoal-border/75" aria-hidden />
                  <p className="text-sm">
                    <Button href="/about" variant="tertiary">
                      Learn More
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="hero-visual-panel">
              <div className="relative min-h-[430px] w-full overflow-hidden">
                <Image
                  src={HOME_IMAGES.hero.detail}
                  alt={heroDetailImage.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1279px) 38vw, 410px"
                />
                <div className="pointer-events-none absolute inset-0 z-[2] bg-black/12" aria-hidden />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-3">
              <div className="hero-visual-rail h-9" aria-hidden />
              <div className="hero-visual-rail h-9 opacity-70" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
