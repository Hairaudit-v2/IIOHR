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
          className="object-cover object-center [filter:saturate(.54)_contrast(1.08)_brightness(.42)]"
          sizes="100vw"
          priority
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-section-charcoal/82" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-28 bg-black/26"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 md:py-32 lg:py-36 xl:py-40">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] lg:items-end lg:gap-14">
          <div className="relative max-w-2xl">
            <div className="hero-content-fade-in">
              <Eyebrow variant="dark">International Institute of Hair Restoration</Eyebrow>
              <div className="section-kicker-rule mt-4" aria-hidden />
              <h1 className="mt-9 max-w-4xl text-[3.35rem] font-semibold leading-[0.98] tracking-[-0.038em] text-section-charcoal-foreground md:text-[4.3rem] lg:text-[4.95rem] [text-wrap:balance]">
                Hair restoration training for doctors, consultants, and clinics.
              </h1>
              <p className="mt-10 max-w-2xl text-[1.05rem] leading-relaxed text-section-charcoal-muted md:text-[1.14rem] [line-height:1.82]">
                Science-first teaching, supervised clinical exposure, and defined progression for practitioners and teams building capability through an institute model.
              </p>
              <div className="mt-10 flex flex-col gap-10">
                <div className="flex flex-wrap items-center gap-4 md:gap-5">
                  <Button href="/admissions" variant="dark">
                    Start Admissions Review
                  </Button>
                  <Button href="/training-pathways" variant="darkSecondary" className="opacity-95">
                    View Training Pathways
                  </Button>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-section-charcoal-muted/90">
                  Doctors and consultants can begin admissions review. Clinics can explore team development.
                </p>
                <div className="pt-2">
                  <div className="mb-2 h-px max-w-xs bg-section-charcoal-border/65" aria-hidden />
                  <p className="text-sm">
                    <Button href="/about" variant="tertiary">
                      About IIOHR
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
                  className="object-cover object-center [filter:saturate(.82)_contrast(1.02)_brightness(.86)]"
                  sizes="(max-width: 1279px) 38vw, 410px"
                />
                <div className="pointer-events-none absolute inset-0 z-[2] bg-black/24" aria-hidden />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-3 opacity-55">
              <div className="hero-visual-rail h-7" aria-hidden />
              <div className="hero-visual-rail h-7 opacity-60" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
