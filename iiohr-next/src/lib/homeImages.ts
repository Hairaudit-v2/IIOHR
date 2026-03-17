/**
 * Centralized homepage image config. All paths live under:
 * /images/hero/ | /images/science/ | /images/human/ | /images/trust/ | /images/ecosystem/
 * Components should import from this file instead of hardcoding paths.
 */

export const HOME_IMAGES = {
  hero: {
    texture: "/images/hero/hero-hair-texture.jpg",
    progression: "/images/hero/hero-hair-progression.jpg",
  },
  science: {
    follicle: "/images/science/science-follicle-cross-section.png",
    follicleRender: "/images/science/science-follicle-render.png",
    hairCycle: "/images/science/science-hair-cycle.jpg",
    dna: "/images/science/science-dna-lab.jpg",
    genetics: "/images/science/science-genetics.jpg",
    hormones: "/images/science/science-hormones-dht.jpg",
  },
  human: {
    mirror: "/images/human/human-mirror-check.jpg",
  },
  trust: {
    doctor: "/images/trust/trust-doctor-portrait.jpg",
  },
  ecosystem: {
    dnaLab: "/images/ecosystem/ecosystem-dna-lab.jpg",
  },
} as const;

export interface SectionImage {
  src: string;
  alt: string;
}

/** Alt text for each image (single source of truth for a11y). */
const HOME_IMAGE_ALTS = {
  hero: {
    texture: "Hair texture and scalp detail.",
    progression: "Hair progression and pattern in context of restoration planning.",
  },
  science: {
    follicle: "Follicle structure and scalp biology.",
    follicleRender: "Follicle render and biological detail.",
    hairCycle: "Hair cycle and growth phases.",
    dna: "Research and data-driven analysis supporting surgical outcomes and benchmarking.",
    genetics: "Genetics and susceptibility in hair loss.",
    hormones: "Hormones and androgen sensitivity in hair loss.",
  },
  human: {
    mirror: "Human impact and patient outcomes in hair restoration.",
  },
  trust: {
    doctor: "Clinical education and mentorship in hair restoration surgery.",
  },
  ecosystem: {
    dnaLab: "Lab and research context for the Global Hair Intelligence ecosystem.",
  },
} as const;

/** Hero — hair progression (homepage hero). */
export const hairProgressionImage: SectionImage = {
  src: HOME_IMAGES.hero.progression,
  alt: HOME_IMAGE_ALTS.hero.progression,
};

/** Science bridge — DNA / research. */
export const dnaBridgeImage: SectionImage = {
  src: HOME_IMAGES.science.dna,
  alt: HOME_IMAGE_ALTS.science.dna,
};

/** Follicle Intelligence section (research / data). */
export const follicleSectionImage: SectionImage = {
  src: HOME_IMAGES.science.dna,
  alt: HOME_IMAGE_ALTS.science.dna,
};

/** Mentorship — doctor portrait. */
export const heroEducationImage: SectionImage = {
  src: HOME_IMAGES.trust.doctor,
  alt: HOME_IMAGE_ALTS.trust.doctor,
};

/** Science module — hormones / DHT. */
export const hormonesModuleImage: SectionImage = {
  src: HOME_IMAGES.science.hormones,
  alt: HOME_IMAGE_ALTS.science.hormones,
};

/** Science module — follicle cross-section. */
export const follicleModuleImage: SectionImage = {
  src: HOME_IMAGES.science.follicle,
  alt: HOME_IMAGE_ALTS.science.follicle,
};

/** Science module — follicle render (e.g. diagram). */
export const follicleRenderImage: SectionImage = {
  src: HOME_IMAGES.science.follicleRender,
  alt: HOME_IMAGE_ALTS.science.follicleRender,
};

/** Science module — hair cycle. */
export const hairCycleModuleImage: SectionImage = {
  src: HOME_IMAGES.science.hairCycle,
  alt: HOME_IMAGE_ALTS.science.hairCycle,
};

/** Science module — genetics. */
export const geneticsModuleImage: SectionImage = {
  src: HOME_IMAGES.science.genetics,
  alt: HOME_IMAGE_ALTS.science.genetics,
};

/** Human impact — mirror. */
export const humanImpactImage: SectionImage = {
  src: HOME_IMAGES.human.mirror,
  alt: HOME_IMAGE_ALTS.human.mirror,
};

/** Ecosystem — lab DNA visual. */
export const ecosystemLabImage: SectionImage = {
  src: HOME_IMAGES.ecosystem.dnaLab,
  alt: HOME_IMAGE_ALTS.ecosystem.dnaLab,
};
