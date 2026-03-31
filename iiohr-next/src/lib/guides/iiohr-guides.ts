/**
 * Central metadata for public IIOHR PDF guides (conversion / orientation assets).
 * File paths are under `public/` — URLs are root-relative for the Next app.
 */

import {
  IIOHR_GUIDE_FOR_CLINICS,
  IIOHR_GUIDE_SITE_ORIGIN,
  getIiohrGuideDestination,
  type IiohrGuideDestination,
  type IiohrGuideDestinationKey,
} from "./iiohr-guide-destinations";

export type IiohrGuideId = "why-iiohr-executive" | "iiohr-admissions" | "iiohr-institutional";

export type IiohrGuideCategory = "executive-overview" | "admissions" | "institutional";

/** Optional contextual links on hub cards; compact layouts omit these to reduce noise. */
export type IiohrGuideRelatedRef = IiohrGuideDestinationKey | "forClinics";

export interface IiohrGuide {
  id: IiohrGuideId;
  title: string;
  shortTitle: string;
  description: string;
  audience: string;
  category: IiohrGuideCategory;
  /** Root-relative URL to the PDF in `public/` */
  fileUrl: string;
  /** Optional cover; drop asset under `public/` and set when ready (e.g. `/guides/iiohr/covers/executive.jpg`). */
  coverImageSrc: string | null;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  sortOrder: number;
  /** Keys into `IIOHR_GUIDE_DESTINATIONS`, plus `forClinics` for `/for-clinics` (institutional context). */
  relatedDestinationRefs?: readonly IiohrGuideRelatedRef[];
}

const GUIDE_BASE = "/guides/iiohr";

export const IIOHR_GUIDES = [
  {
    id: "why-iiohr-executive",
    title: "Why IIOHR — Executive guide",
    shortTitle: "Why IIOHR",
    description:
      "A concise executive-oriented overview of why the institute exists, how it differs from ad hoc training, and how standards-led progression fits serious clinical development.",
    audience: "Leaders, sponsors, clinical directors, and partners evaluating IIOHR at a high level.",
    category: "executive-overview",
    fileUrl: `${GUIDE_BASE}/why-iiohr-executive-guide.pdf`,
    coverImageSrc: null,
    primaryCtaLabel: "View PDF",
    secondaryCtaLabel: "Download PDF",
    sortOrder: 1,
    relatedDestinationRefs: [
      "iiohrHome",
      "admissionsReview",
      "apply",
      "hairAudit",
      "hli",
      "follicleIntelligence",
    ],
  },
  {
    id: "iiohr-admissions",
    title: "IIOHR Admissions guide",
    shortTitle: "Admissions guide",
    description:
      "How admissions review works at a public-safe level, what applicants can expect from pathway matching, and how to move from enquiry toward application.",
    audience: "Doctors, consultants, nurses, and clinic representatives before or during application.",
    category: "admissions",
    fileUrl: `${GUIDE_BASE}/iiohr-admissions-guide.pdf`,
    coverImageSrc: null,
    primaryCtaLabel: "View PDF",
    secondaryCtaLabel: "Download PDF",
    sortOrder: 2,
    relatedDestinationRefs: [
      "admissionsReview",
      "apply",
      "doctorsPathway",
      "consultantsPathway",
      "academy",
      "iiohrHome",
    ],
  },
  {
    id: "iiohr-institutional",
    title: "IIOHR general / institutional guide",
    shortTitle: "Institutional guide",
    description:
      "Institute-level framing for clinics, groups, and partners: governance, standards, team development, and how IIOHR relates to wider ecosystem capabilities.",
    audience: "Clinic leaders, group medical directors, and institutional partners.",
    category: "institutional",
    fileUrl: `${GUIDE_BASE}/iiohr-institutional-guide.pdf`,
    coverImageSrc: null,
    primaryCtaLabel: "View PDF",
    secondaryCtaLabel: "Download PDF",
    sortOrder: 3,
    relatedDestinationRefs: [
      "iiohrHome",
      "admissionsReview",
      "apply",
      "forClinics",
      "hairAudit",
      "hli",
      "follicleIntelligence",
    ],
  },
].sort((a, b) => a.sortOrder - b.sortOrder) as readonly IiohrGuide[];

const byId = new Map<IiohrGuideId, IiohrGuide>(IIOHR_GUIDES.map((g) => [g.id, g]));

export function getIiohrGuide(id: IiohrGuideId): IiohrGuide | undefined {
  return byId.get(id);
}

export function getIiohrGuidesByIds(ids: readonly IiohrGuideId[]): IiohrGuide[] {
  return ids.map((id) => byId.get(id)).filter((g): g is IiohrGuide => Boolean(g));
}

export function iiohrGuideDownloadFilename(guide: IiohrGuide): string {
  const path = guide.fileUrl.split("/").pop();
  return path && path.endsWith(".pdf") ? path : `${guide.id}.pdf`;
}

/** Absolute URLs for PDFs (embed in final PDFs / share links); paths stay under `/guides/iiohr/`. */
export function getIiohrGuidePrimaryPdfAbsoluteUrls(guide: IiohrGuide): {
  primaryViewUrl: string;
  primaryDownloadUrl: string;
} {
  const base = `${IIOHR_GUIDE_SITE_ORIGIN}${guide.fileUrl}`;
  return { primaryViewUrl: base, primaryDownloadUrl: base };
}

export function resolveIiohrGuideRelatedRef(ref: IiohrGuideRelatedRef): IiohrGuideDestination {
  if (ref === "forClinics") {
    return IIOHR_GUIDE_FOR_CLINICS;
  }
  return getIiohrGuideDestination(ref);
}
