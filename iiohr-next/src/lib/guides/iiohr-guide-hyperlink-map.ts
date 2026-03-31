/**
 * Production hyperlink plan for IIOHR public PDF guides.
 *
 * Use this when authoring embedded links inside the exported PDFs (Acrobat, InDesign, etc.):
 * each row is a named target with the exact URL to paste. The app does not modify PDF bytes.
 *
 * @see ./iiohr-guide-destinations.ts — canonical absolute URLs
 * @see ./README.md — workflow notes
 */

import type { IiohrGuideId } from "./iiohr-guides";
import {
  IIOHR_GUIDE_DESTINATIONS,
  IIOHR_GUIDE_FOR_CLINICS,
  type IiohrGuideDestinationKey,
} from "./iiohr-guide-destinations";

/** Stable id for PDF producers (named destination / link metadata / style guide). */
export type IiohrPdfAnchorId =
  | "iiohr-home"
  | "academy"
  | "apply"
  | "admissions-review"
  | "doctors-pathway"
  | "consultants-pathway"
  | "for-clinics"
  | "hairaudit"
  | "hli"
  | "follicle-intelligence";

export interface IiohrPdfHyperlinkRow {
  anchorId: IiohrPdfAnchorId;
  /** Paste this URL into the PDF link */
  destinationUrl: string;
  label: string;
  typicalUse: string;
}

const ROWS: Record<IiohrPdfAnchorId, IiohrPdfHyperlinkRow> = {
  "iiohr-home": {
    anchorId: "iiohr-home",
    destinationUrl: IIOHR_GUIDE_DESTINATIONS.iiohrHome.absoluteUrl,
    label: IIOHR_GUIDE_DESTINATIONS.iiohrHome.linkLabel,
    typicalUse: "Institution home / overview CTAs",
  },
  academy: {
    anchorId: "academy",
    destinationUrl: IIOHR_GUIDE_DESTINATIONS.academy.absoluteUrl,
    label: IIOHR_GUIDE_DESTINATIONS.academy.linkLabel,
    typicalUse: "Academy overview, curriculum context",
  },
  apply: {
    anchorId: "apply",
    destinationUrl: IIOHR_GUIDE_DESTINATIONS.apply.absoluteUrl,
    label: IIOHR_GUIDE_DESTINATIONS.apply.linkLabel,
    typicalUse: "Apply / application form entry",
  },
  "admissions-review": {
    anchorId: "admissions-review",
    destinationUrl: IIOHR_GUIDE_DESTINATIONS.admissionsReview.absoluteUrl,
    label: IIOHR_GUIDE_DESTINATIONS.admissionsReview.linkLabel,
    typicalUse: "Admissions review before applying",
  },
  "doctors-pathway": {
    anchorId: "doctors-pathway",
    destinationUrl: IIOHR_GUIDE_DESTINATIONS.doctorsPathway.absoluteUrl,
    label: IIOHR_GUIDE_DESTINATIONS.doctorsPathway.linkLabel,
    typicalUse: "Doctor stream public pathway",
  },
  "consultants-pathway": {
    anchorId: "consultants-pathway",
    destinationUrl: IIOHR_GUIDE_DESTINATIONS.consultantsPathway.absoluteUrl,
    label: IIOHR_GUIDE_DESTINATIONS.consultantsPathway.linkLabel,
    typicalUse: "Consultant / nurse pathway",
  },
  "for-clinics": {
    anchorId: "for-clinics",
    destinationUrl: IIOHR_GUIDE_FOR_CLINICS.absoluteUrl,
    label: IIOHR_GUIDE_FOR_CLINICS.linkLabel,
    typicalUse: "Clinic / group partnership and institutional inquiry",
  },
  hairaudit: {
    anchorId: "hairaudit",
    destinationUrl: IIOHR_GUIDE_DESTINATIONS.hairAudit.absoluteUrl,
    label: IIOHR_GUIDE_DESTINATIONS.hairAudit.linkLabel,
    typicalUse: "Ecosystem — audit / measurement",
  },
  hli: {
    anchorId: "hli",
    destinationUrl: IIOHR_GUIDE_DESTINATIONS.hli.absoluteUrl,
    label: IIOHR_GUIDE_DESTINATIONS.hli.linkLabel,
    typicalUse: "Ecosystem — biology-first / longevity context",
  },
  "follicle-intelligence": {
    anchorId: "follicle-intelligence",
    destinationUrl: IIOHR_GUIDE_DESTINATIONS.follicleIntelligence.absoluteUrl,
    label: IIOHR_GUIDE_DESTINATIONS.follicleIntelligence.linkLabel,
    typicalUse: "Ecosystem — analysis / intelligence layer",
  },
};

export const IIOHR_PDF_HYPERLINK_REFERENCE_TABLE: readonly IiohrPdfHyperlinkRow[] = [
  ROWS["iiohr-home"],
  ROWS.academy,
  ROWS["admissions-review"],
  ROWS.apply,
  ROWS["doctors-pathway"],
  ROWS["consultants-pathway"],
  ROWS["for-clinics"],
  ROWS.hairaudit,
  ROWS.hli,
  ROWS["follicle-intelligence"],
];

export interface IiohrGuideHyperlinkPlan {
  guideId: IiohrGuideId;
  notes: string;
  /** Anchor ids recommended when embedding links in this PDF */
  recommendedPdfAnchors: readonly IiohrPdfAnchorId[];
  /** Crosswalk: destination keys → anchor rows (for tooling / spreadsheets) */
  keyToAnchor: Partial<Record<IiohrGuideDestinationKey, IiohrPdfAnchorId>>;
}

export const IIOHR_GUIDE_HYPERLINK_PLAN: readonly IiohrGuideHyperlinkPlan[] = [
  {
    guideId: "why-iiohr-executive",
    notes:
      "Executive orientation: IIOHR institution, admissions and apply funnel, then ecosystem partners (HairAudit, HLI, Follicle Intelligence).",
    recommendedPdfAnchors: [
      "iiohr-home",
      "admissions-review",
      "apply",
      "hairaudit",
      "hli",
      "follicle-intelligence",
    ],
    keyToAnchor: {
      iiohrHome: "iiohr-home",
      admissionsReview: "admissions-review",
      apply: "apply",
      hairAudit: "hairaudit",
      hli: "hli",
      follicleIntelligence: "follicle-intelligence",
    },
  },
  {
    guideId: "iiohr-admissions",
    notes:
      "Applicant journey: admissions review, apply form, role-specific pathways (doctors, consultants/nurses), academy and institute home for broader context.",
    recommendedPdfAnchors: [
      "admissions-review",
      "apply",
      "doctors-pathway",
      "consultants-pathway",
      "academy",
      "iiohr-home",
    ],
    keyToAnchor: {
      admissionsReview: "admissions-review",
      apply: "apply",
      doctorsPathway: "doctors-pathway",
      consultantsPathway: "consultants-pathway",
      academy: "academy",
      iiohrHome: "iiohr-home",
    },
  },
  {
    guideId: "iiohr-institutional",
    notes:
      "Partners and clinics: institute home, admissions, apply, for-clinics partnership page, ecosystem links. No separate “contact only” route beyond for-clinics + apply/clinics continuation in-app.",
    recommendedPdfAnchors: [
      "iiohr-home",
      "admissions-review",
      "apply",
      "for-clinics",
      "hairaudit",
      "hli",
      "follicle-intelligence",
    ],
    keyToAnchor: {
      iiohrHome: "iiohr-home",
      admissionsReview: "admissions-review",
      apply: "apply",
      hairAudit: "hairaudit",
      hli: "hli",
      follicleIntelligence: "follicle-intelligence",
    },
  },
];

/** Resolve a row for copy/paste when authoring PDF links */
export function getIiohrPdfHyperlinkRow(anchorId: IiohrPdfAnchorId): IiohrPdfHyperlinkRow {
  return ROWS[anchorId];
}
