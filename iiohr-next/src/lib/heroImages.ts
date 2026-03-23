/**
 * Hero image config per page. Assets in public/images/ (see public/images/README.md).
 * Recommended: 340×255 px (4:3), clinical/educational, warm-toned.
 */

import { hairProgressionImage } from "./homeImages";

export interface HeroImageConfig {
  src: string;
  alt: string;
}

const PLACEHOLDER: HeroImageConfig = {
  src: "/hero/placeholder.svg",
  alt: "",
};

export const heroImages = {
  home: hairProgressionImage,
  academy: {
    src: "/images/science/science-dna-lab.jpg",
    alt: "Clinical training and research context supporting structured surgeon development.",
  },
  about: {
    src: "/images/trust/trust-doctor-portrait.jpg",
    alt: "Clinical faculty presence within an institute-led training environment.",
  },
  hairLossScience: {
    src: "/images/hero/follicle thinning.jpg",
    alt: "Close-up follicular anatomy supporting diagnosis and treatment planning.",
  },
  trainingPathways: {
    src: "/images/science/science-dna-lab.jpg",
    alt: "Clinical research environment supporting structured progression and review.",
  },
  practicalFue: {
    src: "/images/science/science-follicle-cross-section.jpg",
    alt: "Close-up clinical and follicular detail relevant to practical FUE training.",
  },
  forClinics: {
    src: "/images/trust/trust-doctor-portrait.jpg",
    alt: "Clinical mentorship and surgeon development environment for clinic teams.",
  },
  facultyAndMentorship: {
    src: "/images/trust/trust-doctor-portrait.jpg",
    alt: "Faculty-led mentorship and supervised clinical development.",
  },
  apply: {
    src: "/images/hero/follicle thinning.jpg",
    alt: "Clinical and technical detail associated with advanced hair restoration training.",
  },
} as const;

/**
 * Returns hero image for a page. Falls back to placeholder if the preferred asset is not yet available.
 * In production you can switch to always return the real path once assets exist.
 */
export function getHeroImage(page: keyof typeof heroImages): HeroImageConfig {
  return heroImages[page];
}

/**
 * Placeholder for hero panel when no page-specific image is used.
 */
export function getHeroPlaceholder(): HeroImageConfig {
  return PLACEHOLDER;
}
