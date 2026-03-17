/**
 * Canonical ecosystem platform data for authority wiring and cross-site consistency.
 * Use for homepage ecosystem section, footer, and any future ecosystem references.
 * Keeps naming and positioning consistent across IIOHR, HairAudit, Follicle Intelligence, HLI.
 */

export interface EcosystemPlatform {
  id: string;
  name: string;
  /** Short positioning sentence for cards and schema. */
  blurb: string;
  url: string;
  /** This site (IIOHR) — link is internal. */
  isInternal?: boolean;
}

export const ECOSYSTEM_PLATFORMS: EcosystemPlatform[] = [
  {
    id: "iiohr",
    name: "International Institute of Hair Restoration",
    blurb: "Global education, mentorship, and practical training in modern hair restoration.",
    url: "https://iiohr.com",
    isInternal: true,
  },
  {
    id: "hairaudit",
    name: "HairAudit",
    blurb: "Independent review and quality transparency for hair transplant outcomes.",
    url: "https://hairaudit.com",
  },
  {
    id: "fi",
    name: "Follicle Intelligence",
    blurb: "The intelligence core powering analysis, pattern recognition, and system-wide learning.",
    url: "https://follicleintelligence.ai",
  },
  {
    id: "hli",
    name: "Hair Longevity Institute",
    blurb: "Clinical understanding of hair loss biology, longevity, and patient-led decision support.",
    url: "https://hairlongevityinstitute.com",
  },
];
