"use client";

import { EcosystemDiagramAnimated } from "./EcosystemDiagramAnimated";

export interface EcosystemSectionProps {
  /** Visual theme: light (default) or dark. */
  variant?: "light" | "dark";
  /** Optional className for the section wrapper. */
  className?: string;
}

export function EcosystemSection({ variant = "light", className = "" }: EcosystemSectionProps) {
  const isDark = variant === "dark";
  return (
    <section
      className={`py-16 md:py-24 ${isDark ? "bg-[#1E2A38] text-[#F7F5F1]" : "bg-[#EDE9E1] text-[#222]"} ${className}`}
      id="ecosystem"
      aria-labelledby="ecosystem-heading"
    >
      <div className="mx-auto max-w-[70rem] px-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#B79A67]">
          Connected system
        </p>
        <h2 id="ecosystem-heading" className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          Training Within a Connected Intelligence System
        </h2>
        <p className="max-w-[42em] text-lg leading-relaxed text-[#222] mb-4">
          IIOHR is the education and certification pillar within the broader Hair Intelligence ecosystem. Our training connects directly to surgical quality, treatment understanding, and analytical intelligence — positioning the institute as a standards-setting body for surgeon development, not only a course provider.
        </p>
        <p className="max-w-[42em] text-base leading-relaxed text-[#5A6169] mb-10">
          Follicle Intelligence™ provides the central analytical engine. HairAudit™ delivers surgical audit and scoring; Hair Longevity Institute™ focuses on diagnosis and treatment pathways. IIOHR™ delivers the training and certification that underpin competence across all of these — so education and standards sit at the heart of the system.
        </p>
        <EcosystemDiagramAnimated variant={variant} highlightNode="iiohr" />
        <nav
          className="flex flex-wrap justify-center gap-4 mt-10 text-sm font-medium"
          aria-label="Ecosystem platforms"
        >
          <a href="/" className="text-[#5A6169] hover:text-[#B79A67] transition-colors">
            IIOHR (training)
          </a>
          <a
            href="https://hairaudit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5A6169] hover:text-[#B79A67] transition-colors"
          >
            HairAudit (measurement)
          </a>
          <a href="https://follicleintelligence.ai" target="_blank" rel="noopener noreferrer" className="text-[#5A6169] hover:text-[#B79A67] transition-colors">
            Follicle Intelligence (analysis)
          </a>
          <a
            href="https://hairlongevityinstitute.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5A6169] hover:text-[#B79A67] transition-colors"
          >
            Hair Longevity Institute (biology)
          </a>
        </nav>
        <p className="mt-10 text-center">
          <a
            href="/training-pathways"
            className="inline-flex items-center justify-center rounded border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[#222] transition-colors hover:border-[#B79A67] hover:text-[#B79A67]"
          >
            Explore the Training Pathway
          </a>
        </p>
      </div>
    </section>
  );
}

export default EcosystemSection;
