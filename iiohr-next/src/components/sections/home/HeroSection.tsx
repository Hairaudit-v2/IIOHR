"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HOME_IMAGES } from "@/lib/homeImages";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollScale, setScrollScale] = useState(1);
  const [contentOffsetY, setContentOffsetY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionBottom = rect.bottom;
      const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800;
      const progress = sectionBottom <= windowHeight ? Math.min(1, (windowHeight - sectionBottom) / windowHeight) : 0;
      setScrollScale(1 + progress * 0.08);
      setContentOffsetY(progress * 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[75vh] w-full overflow-hidden section-dark-anchor section-flow"
      aria-label="Hero"
      data-section-tone="dark"
    >
      {/* Full-width background texture — object-cover + slight zoom on scroll */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <div
          className="h-full w-full transition-transform duration-150 ease-out"
          style={{ transform: `scale(${scrollScale})` }}
        >
          <Image
            src={HOME_IMAGES.hero.texture}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Overlay: depth and readability (gradient system) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-section-charcoal/86 via-section-charcoal/50 to-section-charcoal/30"
        aria-hidden
      />
      {/* Subtle accent gradient behind text area for contrast */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-accent opacity-[0.16]"
        aria-hidden
        style={{ maskImage: "linear-gradient(to right, black 40%, transparent 85%)" }}
      />

      {/* Content — fade-in, strong contrast */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 md:py-28 lg:py-36">
        <div className="relative max-w-2xl">
          <div className="hero-text-backdrop" aria-hidden />
          <div
            className="relative z-10 transition-transform duration-150 ease-out"
            style={{ transform: `translateY(${contentOffsetY}px)` }}
          >
            <div className="hero-content-fade-in">
            <Eyebrow variant="dark">International Institute of Hair Restoration</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-section-charcoal-foreground md:text-5xl lg:text-[2.75rem] [text-wrap:balance]">
              Beyond the short course. From technician to surgeon.
            </h1>
            <p className="mt-9 max-w-2xl text-base leading-relaxed text-section-charcoal-muted md:text-lg [line-height:1.7]">
              A global education and mentorship platform for hair restoration: clinically grounded training, practical surgical exposure, and standards-based progression for doctors and clinics.
            </p>
            <div className="mt-14 flex flex-col gap-12">
              <div className="flex flex-wrap items-center gap-5 md:gap-6">
                <Button href="/apply" variant="dark">
                  Apply Now
                </Button>
                <Button href="/training-pathways" variant="darkSecondary">
                  Explore Pathways
                </Button>
              </div>
              <div className="pt-2">
                <div
                  className="mb-3 h-px max-w-xs bg-gradient-to-r from-section-charcoal-border/35 via-section-charcoal-border/15 to-transparent"
                  aria-hidden
                />
                <p className="text-sm">
                  <Button href="/about" variant="tertiary">
                    Learn More
                  </Button>
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
