/**
 * JSON-LD structured data for SEO.
 * Rendered as script type="application/ld+json" in layout (Organization, WebSite)
 * and on the homepage (WebPage).
 */

const BASE_URL = "https://iiohr.com";

/**
 * Logo URL for Organization schema.
 * TODO: Replace with a dedicated brand logo asset (e.g. /logo/iiohr-organization.png,
 * 1200x1200 or similar) when available. Favicon is used as a valid fallback for now.
 */
const ORGANIZATION_LOGO_URL = `${BASE_URL}/favicon.svg`;

const ORGANIZATION_SAME_AS = [
  "https://hairaudit.com",
  "https://follicleintelligence.ai",
  "https://hairlongevityinstitute.com",
] as const;

export interface JsonLdOrganizationInput {
  name: string;
  alternateName: string;
  description: string;
}

/**
 * Organization schema for the International Institute of Hair Restoration.
 * Use in root layout so it appears on every page without duplication.
 */
export function getOrganizationJsonLd(input: JsonLdOrganizationInput): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    alternateName: input.alternateName,
    url: BASE_URL,
    logo: ORGANIZATION_LOGO_URL,
    description: input.description,
    sameAs: [...ORGANIZATION_SAME_AS],
  };
}

export interface JsonLdWebSiteInput {
  name: string;
}

/**
 * WebSite schema. No search action — no on-site search feature.
 */
export function getWebSiteJsonLd(input: JsonLdWebSiteInput): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: input.name,
    url: BASE_URL,
  };
}

export interface JsonLdWebPageInput {
  name: string;
  description: string;
}

/**
 * WebPage schema for the homepage only.
 */
export function getWebPageJsonLd(input: JsonLdWebPageInput): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    url: BASE_URL,
    description: input.description,
    isPartOf: {
      "@type": "WebSite",
      name: input.name,
      url: BASE_URL,
    },
  };
}
