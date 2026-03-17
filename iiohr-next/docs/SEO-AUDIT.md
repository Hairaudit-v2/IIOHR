# IIOHR Next.js — Full SEO Audit

**Date:** March 2025  
**Scope:** All pages, metadata, structure, technical SEO.

---

## 1. Executive summary

| Area | Status | Notes |
|------|--------|------|
| **Title & meta description** | ✅ Good | Root + per-page; template used. |
| **Open Graph / Twitter** | ⚠️ Partial | Root only; inner pages lack page-specific OG URL/image. |
| **Canonical URLs** | ❌ Missing | No per-page canonical. |
| **Sitemap** | ❌ Missing | No `sitemap.xml`. |
| **robots.txt** | ❌ Missing | No `robots.txt` (crawlability OK via metadata.robots). |
| **Heading hierarchy** | ✅ Good | One h1 per page (PageHero), SectionHeading = h2, cards = h3. |
| **Semantic HTML** | ✅ Good | `<main>`, sections, skip link, landmarks. |
| **Structured data (JSON-LD)** | ❌ Missing | No Organization or WebSite schema. |
| **Images** | ✅ N/A | No content images; favicon/apple-touch only. |
| **Internal linking** | ✅ Good | Nav + footer + CTAs; no broken internal links. |
| **URL structure** | ✅ Good | Clean, lowercase, hyphenated. |
| **Mobile / responsive** | ✅ Good | Viewport and responsive layout in place. |
| **Performance (SEO impact)** | ✅ Good | Font display swap, no render-blocking; build clean. |

**Overall:** Solid base. Fix sitemap, robots, and per-page OG/canonical for stronger indexing and sharing.

---

## 2. Metadata

### 2.1 Root layout (`layout.tsx`)

- **metadataBase:** `https://iiohr.com` ✅
- **title:** default + template `%s | IIOHR` ✅
- **description:** from `siteConfig.description` ✅
- **openGraph:** type, locale (en_AU), url (root), siteName, title, description ✅
- **twitter:** card (summary), title, description ✅
- **robots:** index, follow ✅
- **icons:** favicon.svg, apple-touch-icon.svg ✅

**Gaps:** No `openGraph.images` or `twitter.images` — social shares use no image. Optional: add default OG image (e.g. 1200×630) for better CTR when sharing.

### 2.2 Per-page metadata

| Page | Title | Description | OG URL / Canonical |
|------|--------|-------------|---------------------|
| `/` | From layout | From layout | Uses root; OK. |
| `/about` | "About" | Yes | ❌ Not set |
| `/apply` | "Apply" | Yes | ❌ Not set |
| `/training-pathways` | "Training Pathways" | Yes | ❌ Not set |
| `/practical-fue` | "Practical FUE" | Yes | ❌ Not set |
| `/hair-loss-science` | "Hair Loss Science" | Yes | ❌ Not set |
| `/for-clinics` | "For Clinics" | Yes | ❌ Not set |
| `/privacy-policy` | "Privacy Policy" | Yes | ❌ Not set |
| `/terms-of-use` | "Terms of Use" | Yes | ❌ Not set |
| `/cookie-policy` | "Cookie Policy" | Yes | ❌ Not set |

**Issue:** When a user shares e.g. `/training-pathways`, many platforms will still show the root URL and root title/description. **Recommendation:** Set `openGraph.url` and `alternates.canonical` per page (and optionally per-page `openGraph.title` / `openGraph.description` so shares show page-specific copy).

---

## 3. Sitemap & robots

- **sitemap.xml:** Not present. Crawlers can discover URLs via links, but a sitemap improves discovery and signals priority/change frequency.
- **robots.txt:** Not present. Root metadata has `robots: { index: true, follow: true }`, so indexing is allowed; a `robots.txt` that allows `/` and points to the sitemap is best practice.

**Recommendation:** Add `app/sitemap.ts` and `app/robots.ts` (Next.js metadata route convention).

---

## 4. Heading & content structure

- **h1:** One per page — hero (PageHero) or legal page title ✅
- **h2:** Section titles via `SectionHeading` (default `as="h2"`) ✅
- **h3:** Cards, list items, sub-blocks ✅
- **Landmarks:** `<main id="main-content">`, `<section>`, header/footer; skip link to `#main-content` ✅

No duplicate h1s or skipped levels. SectionHeading supports `as="h1"` where needed (not used on content pages; heroes use PageHero’s h1).

---

## 5. Structured data (JSON-LD)

- No `application/ld+json` found. **Recommendation:** Add Organization (and optionally WebSite with searchAction if you add site search later) for rich results and knowledge panel potential.

---

## 6. Technical

- **Lang:** `<html lang="en">` ✅
- **Viewport:** Handled by Next.js default ✅
- **Internal links:** All point to existing routes; external links use `rel="noopener noreferrer"` and `target="_blank"` ✅
- **Duplicate content:** No obvious duplicate URLs; single canonical domain assumed (no duplicate content from trailing slash or multiple domains checked in code).

---

## 7. Recommendations (priority order)

1. **High:** Add `sitemap.ts` and `robots.ts` so crawlers get a sitemap and explicit allow rules.
2. **High:** Add per-page `openGraph.url` and `alternates.canonical` (and optionally openGraph.title/description) for inner pages.
3. **Medium:** Add default OG image (1200×630) in layout or per page for better social CTR.
4. **Medium:** Add JSON-LD Organization (and optionally WebSite) in the root layout.
5. **Low:** Consider `twitter:card: summary_large_image` when an OG image is added.
6. **Low:** If you add content images later, use Next.js `Image` with descriptive `alt` text.

---

## 8. Checklist (post-fix)

- [x] `/sitemap.xml` returns all public pages (implemented via `app/sitemap.ts`).
- [x] `/robots.txt` allows `/` and references `https://iiohr.com/sitemap.xml` (implemented via `app/robots.ts`).
- [x] Inner pages have canonical and OG URL set (all 9 inner pages updated).
- [ ] (Optional) Default OG image set; Twitter card updated if needed.
- [ ] (Optional) JSON-LD Organization present in layout.
