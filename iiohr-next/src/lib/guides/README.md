# IIOHR public PDF guides

## Canonical host (production)

- **Site-wide:** `https://iiohr.com` — see `app/layout.tsx` (`metadataBase`), `siteConfig.links.iiohr`, and per-page `canonical` constants.
- **Guide absolute URLs:** Built with **`IIOHR_GUIDE_SITE_ORIGIN`** in `iiohr-guide-destinations.ts`, sourced from `siteConfig.links.iiohr`, so PDF/embed links stay consistent with SEO canonicals.

Public **paths** are always root-relative in the app (e.g. `/guides/iiohr/...`, `/admissions`); only share/PDF-authoring URLs include the origin.

---

## Stable public PDF paths (do not change)

Files on disk:

- **Folder:** `iiohr-next/public/guides/iiohr/`
- **Filenames (exact):**
  - `why-iiohr-executive-guide.pdf`
  - `iiohr-admissions-guide.pdf`
  - `iiohr-institutional-guide.pdf`

Public URLs (same on production):

- `/guides/iiohr/why-iiohr-executive-guide.pdf`
- `/guides/iiohr/iiohr-admissions-guide.pdf`
- `/guides/iiohr/iiohr-institutional-guide.pdf`

Absolute examples (origin from `IIOHR_GUIDE_SITE_ORIGIN`):

- `https://iiohr.com/guides/iiohr/why-iiohr-executive-guide.pdf` (and the two sibling filenames)

---

## Pre-flight checklist: replacing PDF files

Use this before or after dropping in final exported PDFs.

1. **Location:** Replace only under `iiohr-next/public/guides/iiohr/` (not under `src/`).
2. **Filenames:** Keep the three names above exactly — no renames, no extra segments.
3. **In-PDF links:** When adding clickable links inside the PDFs, use URLs from **`iiohr-guide-hyperlink-map.ts`** (`IIOHR_PDF_HYPERLINK_REFERENCE_TABLE` / per-guide plan) or from **`iiohr-guide-destinations.ts`** so they match production.
4. **After replacement:** In the deployed or local site, open each guide card (About hub is enough) and verify **View PDF** (new tab) and **Download PDF** both serve the new file.
5. **Related pages:** Spot-check **Related pages** on hub cards and the home CTA ecosystem row — internal routes still use `sitePath`; external ecosystem URLs come from `siteConfig.links`.

---

## Destination URL constants (single source of truth)

- **`src/lib/guides/iiohr-guide-destinations.ts`**
  - Nine keyed destinations: `iiohrHome`, `academy`, `apply`, `admissionsReview`, `doctorsPathway`, `consultantsPathway`, `follicleIntelligence`, `hli`, `hairAudit`
  - On-site IIOHR pages use **`IIOHR_GUIDE_SITE_ORIGIN`** + path (aligned with apex canonical host).
  - Ecosystem URLs mirror `siteConfig.links` (HairAudit, Follicle Intelligence, Hair Longevity Institute).
  - **`IIOHR_GUIDE_FOR_CLINICS`** — institutional / partnership page (`/for-clinics`); not part of the nine-key enum.

## Guide metadata

- **`src/lib/guides/iiohr-guides.ts`** — titles, PDF paths, `relatedDestinationRefs` for on-site hub cards.
- **`getIiohrGuidePrimaryPdfAbsoluteUrls(guide)`** — `primaryViewUrl` / `primaryDownloadUrl` using `IIOHR_GUIDE_SITE_ORIGIN` + `guide.fileUrl`.

## In-PDF hyperlink map (authoring reference)

- **`src/lib/guides/iiohr-guide-hyperlink-map.ts`**
  - `IIOHR_PDF_HYPERLINK_REFERENCE_TABLE` — named anchor ids and **exact URLs** for PDF editors.
  - `IIOHR_GUIDE_HYPERLINK_PLAN` — per-guide recommended anchors.

There is **no** automated PDF post-processing in this repo.

## Where CTAs render

- **Hub (section layout + related links):** `/about#iiohr-guides` — `IiohrGuidesSection`.
- **Compact blocks (PDF only, no related list):** `/admissions`, `/apply`, `/apply/doctors`, `/apply/consultants`, `/apply/clinics`.
- **Training Pathways / For Clinics:** section layouts with PDFs + related links.
- **Home:** `CTASection` — executive PDF View/Download; ecosystem row uses destination constants.
- **Footer:** “Downloadable guides” → `/about#iiohr-guides`.

## UI behavior

- **View PDF** / **Download PDF** → static files under `/guides/iiohr/*.pdf` (paths unchanged).
- **Related pages** (hub cards) → Next `Link` + `sitePath` on-site; ecosystem `<a href={absoluteUrl}>` in a new tab.

## What remains manual outside the codebase

- Exporting final PDF binaries and copying them into `public/guides/iiohr/` (checklist above).
- Embedding and testing links inside PDF binaries using the hyperlink map.
- DNS / hosting: ensuring `iiohr.com` (and any `www` redirect) serves the same app so relative `/guides/...` links always work.

## Unresolved / out of scope

- No dedicated “contact-only” institutional URL beyond **`/for-clinics`** and signed-in **`/apply/clinics`** continuation; the hyperlink plan notes this.
- If the marketing apex URL changes, update **`siteConfig.links.iiohr`** (and layout metadata if needed); guide destinations follow via `IIOHR_GUIDE_SITE_ORIGIN`.

---

## Preview QA pass (guide PDFs + surfaces)

**Asset status:** The three files under `public/guides/iiohr/` are **production-sized** (not byte placeholders), start with **`%PDF-1.7`**, and keep the exact required filenames. To refresh content later, overwrite those files in place (see pre-flight checklist above).

**Static / code verification (no browser session):**

- **PDF paths:** `/guides/iiohr/why-iiohr-executive-guide.pdf`, `iiohr-admissions-guide.pdf`, `iiohr-institutional-guide.pdf` — served from `public/` by Next; no dynamic routes.
- **Absolute helpers:** `IIOHR_GUIDE_SITE_ORIGIN` resolves to `https://iiohr.com` via `siteConfig.links.iiohr`; `getIiohrGuidePrimaryPdfAbsoluteUrls` = that origin + root-relative `guide.fileUrl`.
- **Hyperlink map:** `iiohr-guide-hyperlink-map.ts` builds rows from `IIOHR_GUIDE_DESTINATIONS` — same apex host for on-site targets.
- **`next build`:** Run before preview deploy to confirm guide components compile (no guide-specific hydration logic; hub uses `Link` + static anchors).

**Surfaces to exercise in a live click-through (staging / preview URL):**

| Location | Expected |
|----------|----------|
| `/` (CTASection) | Executive guide View/Download; “All guides” → `/about#iiohr-guides`; ecosystem: HairAudit, HLI, Follicle Intelligence |
| `/about#iiohr-guides` | All three guides; View/Download each; Related pages per card |
| `/admissions` | Compact admissions guide; link to hub |
| `/apply` | Compact admissions guide (ApplyIntroductionSection) |
| `/apply/doctors`, `/apply/consultants` | Compact admissions guide |
| `/apply/clinics` | Admissions + institutional compacts |
| `/training-pathways` | Executive + institutional cards + hub link |
| `/for-clinics` | Institutional card + hub link |
| Footer “Downloadable guides” | `/about#iiohr-guides` |

**Still manual outside the app**

- Opening each PDF in a browser to confirm content is the intended final export (visual QA).
- Clicking **embedded links inside** the PDF files (authoring), not the React shell.
- Cross-browser download behavior for the `download` attribute on same-origin PDFs.

**Caveats**

- Preview readiness for stakeholders assumes the **deployed** host serves `public/guides/iiohr/*.pdf` with correct cache headers; after replacing files, hard-refresh or cache-bust if an old PDF appears.
- No PDF metadata (title/author) is read by the UI; longer documents do not affect layout.
