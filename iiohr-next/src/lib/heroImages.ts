/**
 * Hero image config per page. Replace paths with final assets when ready.
 * Recommended: 340×255 px (4:3), clinical/educational, warm-toned.
 */

export interface HeroImageConfig {
  src: string;
  alt: string;
}

const PLACEHOLDER: HeroImageConfig = {
  src: "/hero/placeholder.svg",
  alt: "",
};

export const heroImages = {
  home: {
    src: "/hero/placeholder.svg",
    alt: "IIOHR education and training in hair restoration",
  },
  about: {
    src: "/hero/placeholder.svg",
    alt: "International Institute of Hair Restoration",
  },
  hairLossScience: {
    src: "/hero/placeholder.svg",
    alt: "Hair loss science and trichology training",
  },
  trainingPathways: {
    src: "/hero/placeholder.svg",
    alt: "Structured training pathways and progression",
  },
  practicalFue: {
    src: "/hero/placeholder.svg",
    alt: "Practical FUE surgical training",
  },
  forClinics: {
    src: "/hero/placeholder.svg",
    alt: "Surgeon development for clinics",
  },
  apply: {
    src: "/hero/placeholder.svg",
    alt: "Apply for IIOHR training",
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
