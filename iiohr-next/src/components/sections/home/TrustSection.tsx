"use client";

import { useRef, useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { HOME_IMAGES, heroEducationImage } from "@/lib/homeImages";

export function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionShell muted id="trust" className="relative">
      <div ref={sectionRef} className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
        {/* Text left — fade-in */}
        <div
          className={`min-w-0 transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <SectionHeading
            eyebrow="Trust & expertise"
            title="Science in the hands of real practitioners"
            description="IIOHR faculty are practising surgeons who teach what they do. Training connects biological understanding and clinical standards to day-to-day practice—so you learn from those who deliver outcomes, not theory alone."
          />
        </div>

        {/* Image right (desktop); stacked below text on mobile */}
        <div
          className={`relative min-h-[280px] transition-all duration-700 ease-out delay-150 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <ImageWrapper
            src={HOME_IMAGES.trust.doctor}
            alt={heroEducationImage.alt}
            className="aspect-[4/3] w-full lg:aspect-[3/4]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-section-charcoal/24 via-transparent to-parchment/14"
              aria-hidden
            />
          </ImageWrapper>
        </div>
      </div>
    </SectionShell>
  );
}
