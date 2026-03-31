import { siteConfig } from "@/lib/site";

/**
 * Canonical origin for absolute URLs used in PDFs, emails, and external docs.
 * Aligns with public marketing URLs (e.g. doctors pathway).
 */
export const IIOHR_GUIDE_SITE_ORIGIN = "https://www.iiohr.com" as const;

/** Core IIOHR + ecosystem targets for guide CTAs and PDF hyperlink authoring. */
export type IiohrGuideDestinationKey =
  | "iiohrHome"
  | "academy"
  | "apply"
  | "admissionsReview"
  | "doctorsPathway"
  | "consultantsPathway"
  | "follicleIntelligence"
  | "hli"
  | "hairAudit";

export interface IiohrGuideDestination {
  /** Full URL for PDF embedding and off-site references */
  absoluteUrl: string;
  /** In-app navigation (Next.js `Link`); omitted for off-site destinations */
  sitePath?: string;
  /** Short label for UI and hyperlink planning docs */
  linkLabel: string;
}

function iiohrPage(path: string): Pick<IiohrGuideDestination, "absoluteUrl" | "sitePath"> {
  const sitePath = path.startsWith("/") ? path : `/${path}`;
  return {
    absoluteUrl: `${IIOHR_GUIDE_SITE_ORIGIN}${sitePath}`,
    sitePath,
  };
}

/**
 * Single source of truth for guide-related destinations (IIOHR pages + ecosystem).
 * Ecosystem URLs mirror `siteConfig.links` (already production URLs).
 */
export const IIOHR_GUIDE_DESTINATIONS: Record<IiohrGuideDestinationKey, IiohrGuideDestination> = {
  iiohrHome: {
    ...iiohrPage("/"),
    linkLabel: "International Institute of Hair Restoration",
  },
  academy: {
    ...iiohrPage("/academy"),
    linkLabel: "Academy | IIOHR",
  },
  apply: {
    absoluteUrl: `${IIOHR_GUIDE_SITE_ORIGIN}/apply#application-form`,
    sitePath: "/apply#application-form",
    linkLabel: "Apply to IIOHR | IIOHR",
  },
  admissionsReview: {
    ...iiohrPage("/admissions"),
    linkLabel: "Admissions Review | IIOHR",
  },
  doctorsPathway: {
    ...iiohrPage("/doctors"),
    linkLabel: "Doctors pathway | IIOHR",
  },
  consultantsPathway: {
    ...iiohrPage("/consultants"),
    linkLabel: "Consultants and Nurses Pathway | IIOHR",
  },
  follicleIntelligence: {
    absoluteUrl: siteConfig.links.follicleIntelligence,
    linkLabel: "Follicle Intelligence — central intelligence layer",
  },
  hli: {
    absoluteUrl: siteConfig.links.hairLongevityInstitute,
    linkLabel: "Hair Longevity Institute — hair loss analysis & biology-first planning",
  },
  hairAudit: {
    absoluteUrl: siteConfig.links.hairAudit,
    linkLabel: "HairAudit",
  },
};

/** Clinic / group partnership page (institutional guide); not part of the nine-key enum above. */
export const IIOHR_GUIDE_FOR_CLINICS: IiohrGuideDestination = {
  ...iiohrPage("/for-clinics"),
  linkLabel: "For clinics & groups | IIOHR",
};

export function getIiohrGuideDestination(key: IiohrGuideDestinationKey): IiohrGuideDestination {
  return IIOHR_GUIDE_DESTINATIONS[key];
}
