/**
 * Homepage section images. Assets live in public/images/ (copy from repo Images folder).
 * Mapping follows Images/README.md: clinical education, data/intelligence, mentorship.
 */

export interface SectionImage {
  src: string;
  alt: string;
}

/** Research-led / data / intelligence — Follicle Intelligence section */
export const follicleSectionImage: SectionImage = {
  src: "/images/A91fwobcw_qrrrks_ds8.jpg",
  alt: "Research and data-driven analysis supporting surgical outcomes and benchmarking.",
};

/** Doctor portrait / faculty / trust — hero and professional development */
export const heroEducationImage: SectionImage = {
  src: "/images/A9xyymvo_ncjkle_pfs.jpg",
  alt: "Clinical education and mentorship in hair restoration surgery.",
};
