# IIOHR public PDF guides

## Where the final PDFs go

- **Directory:** `iiohr-next/public/guides/iiohr/`
- **Filenames (stable — do not rename):**
  - `why-iiohr-executive-guide.pdf`
  - `iiohr-admissions-guide.pdf`
  - `iiohr-institutional-guide.pdf`

Replace files in place to update content. Public URLs stay:

- `https://www.iiohr.com/guides/iiohr/why-iiohr-executive-guide.pdf` (and the same path on the deployed host)
- Same pattern for the other two filenames.

In-app, PDFs are still referenced with root-relative paths (e.g. `/guides/iiohr/...`). Absolute URLs for embedding in PDFs or email are built in code — see below.

## Destination URL constants (single source of truth)

- **`src/lib/guides/iiohr-guide-destinations.ts`**
  - Nine keyed destinations: `iiohrHome`, `academy`, `apply`, `admissionsReview`, `doctorsPathway`, `consultantsPathway`, `follicleIntelligence`, `hli`, `hairAudit`
  - IIOHR pages use origin **`https://www.iiohr.com`** for absolute URLs (PDF-safe).
  - Ecosystem URLs mirror `siteConfig.links` (HairAudit, Follicle Intelligence, Hair Longevity Institute).
  - **`IIOHR_GUIDE_FOR_CLINICS`** — institutional / partnership page (`/for-clinics`); not part of the nine-key enum.

## Guide metadata

- **`src/lib/guides/iiohr-guides.ts`** — titles, PDF paths, `relatedDestinationRefs` for on-site hub cards.
- **`getIiohrGuidePrimaryPdfAbsoluteUrls(guide)`** — `primaryViewUrl` / `primaryDownloadUrl` (same href today; stable for tooling).

## In-PDF hyperlink map (authoring reference)

- **`src/lib/guides/iiohr-guide-hyperlink-map.ts`**
  - `IIOHR_PDF_HYPERLINK_REFERENCE_TABLE` — every named anchor id and **exact URL** to paste into PDF editors.
  - `IIOHR_GUIDE_HYPERLINK_PLAN` — per-guide list of recommended anchors for the executive, admissions, and institutional PDFs.

There is **no** automated PDF post-processing in this repo; the map is the contract for design/production when adding clickable links inside the files.

## What still requires manual PDF work

- Open each final PDF in your authoring tool and add links using the URLs from `iiohr-guide-hyperlink-map.ts` (or from `iiohr-guide-destinations.ts`).
- After linking, spot-check that `apply` links include the `#application-form` fragment where the form should open.

## Where CTAs render

- **Hub (section layout + related links):** `/about#iiohr-guides` — `IiohrGuidesSection`.
- **Compact blocks (PDF only, no related list):** `/admissions`, `/apply`, `/apply/doctors`, `/apply/consultants`, `/apply/clinics`.
- **Training Pathways / For Clinics:** section layouts with PDFs + related links where the section shows multiple cards.
- **Home:** `CTASection` — executive PDF View/Download unchanged; ecosystem row uses destination constants.
- **Footer:** “Downloadable guides” → `/about#iiohr-guides`.

## UI behavior

- **View PDF** / **Download PDF** → always the static files under `/guides/iiohr/*.pdf`.
- **Related pages** (hub cards only) → `sitePath` via Next `Link` when on-site; absolute URLs open in a new tab for ecosystem sites.

## Unresolved / out of scope

- No dedicated “contact-only” institutional URL beyond **`/for-clinics`** and signed-in **`/apply/clinics`** continuation; the hyperlink plan notes this.
- If marketing standardizes on non-`www` or a different apex domain, update **`IIOHR_GUIDE_SITE_ORIGIN`** in `iiohr-guide-destinations.ts` and re-export PDFs with matching links.
