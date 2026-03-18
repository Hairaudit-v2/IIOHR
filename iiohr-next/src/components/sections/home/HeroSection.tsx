"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HOME_IMAGES } from "@/lib/homeImages";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollScale, setScrollScale] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionBottom = rect.bottom;
      const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800;
      // Slight zoom out as section scrolls up (parallax: image appears to move slower)
      const progress = sectionBottom <= windowHeight ? Math.min(1, (windowHeight - sectionBottom) / windowHeight) : 0;
      setScrollScale(1 + progress * 0.08);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[75vh] w-full overflow-hidden border-b border-section-charcoal-border"
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

      {/* Overlay gradient: dark → transparent for headline readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-section-charcoal/90 via-section-charcoal/50 to-section-charcoal/30"
        aria-hidden
      />

      {/* Content — strong contrast over overlay */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-20 md:py-24 lg:py-32">
        <div className="max-w-2xl">
          <Eyebrow>International Institute of Hair Restoration</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-section-charcoal-foreground md:text-5xl lg:text-[2.75rem]">
            Beyond the short course. From technician to surgeon.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-section-charcoal-muted md:text-lg">
            A global education and mentorship platform for hair restoration: clinically grounded training, practical surgical exposure, and standards-based progression for doctors and clinics.
          </p>
          <div className="mt-10 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/apply" variant="dark">
                Apply Now
              </Button>
              <Button href="/training-pathways" variant="darkSecondary">
                Explore Pathways
              </Button>
            </div>
            <p className="text-sm">
              <Button href="/about" variant="tertiary">
                Learn More
              </Button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
