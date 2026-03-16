# IIOHR Design System — UI & Visual Direction

**Brand goal:** IIOHR should feel like the world’s most advanced institute for hair restoration education, surgical development, and audit-backed progression.

**Visual direction:** Premium medical education · Global institute aesthetic · Restrained luxury · High-credibility clinical · Advanced but human · Subtle software-intelligence undertone.

**Avoid:** Cheap online-course aesthetics · Generic academy templates · Cluttered layouts · Overly blue corporate-hospital sameness · Cheesy hero graphics · Obvious stock-photo dependence.

**Desired feel:** Elite institute · Premium medical innovation · Surgical precision · Intelligent systems · Calm confidence.

---

## 1. Typography hierarchy

### Font stack
- **Headings:** Serif with gravitas and readability. *Direction:* Cormorant Garamond, or alternative: Instrument Serif / Source Serif 4 / Lora. Use one serif family for all headings.
- **Body:** Neutral, highly legible sans. *Direction:* DM Sans, or alternative: Inter / Source Sans 3 / Plus Jakarta Sans. Slightly warm or neutral; avoid cold tech sans.

### Scale and usage
| Level | Use | Size (mobile → desktop) | Weight | Line height |
|-------|-----|-------------------------|--------|-------------|
| **H1** | Page / hero headline only | 2.25rem → 4rem | 600 | 1.05–1.1 |
| **H2** | Section headings | 1.75rem → 2.75rem | 600 | 1.2–1.25 |
| **H3** | Card titles, sub-sections | 1.125rem → 1.25rem | 600 | 1.25 |
| **Lead** | Section intro paragraph | 1.125rem → 1.25rem | 400 | 1.6–1.75 |
| **Body** | Default copy | 1rem → 1.125rem | 400 | 1.55–1.65 |
| **Small** | Labels, captions, trust text | 0.875rem → 0.9375rem | 500 | 1.4 |
| **Label / overline** | Section labels, nav | 0.8125rem → 0.9375rem | 500 | 1.3 |

### Rules
- One H1 per page. H2s define sections; do not skip levels.
- Max line length for body: ~65–72 characters (e.g. `max-width: 38em`).
- Letter-spacing: slight negative on large headlines (-0.02em to -0.03em); slight positive on labels (0.06em–0.08em).
- No more than two type families. Avoid decorative or script fonts.

---

## 2. Color direction

### Palette roles
| Role | Purpose | Direction |
|------|---------|-----------|
| **Background (default)** | Page and card base | Warm off-white / light neutral (e.g. #fafaf9, #f5f4f2). Not pure white. |
| **Background (alt)** | Section contrast | Slightly deeper neutral (e.g. #f2f1ef, #ebeae8). |
| **Background (dark)** | Hero/CTA, premium blocks | Deep charcoal / navy (e.g. #1a1d23, #1e2228). Not hospital blue. |
| **Text (primary)** | Headings, body | Near-black (e.g. #1a1d23, #1c1e24). |
| **Text (secondary)** | Leads, captions | Muted grey (e.g. #4a4d55, #5c5f68). |
| **Text (on dark)** | Copy on dark sections | Soft white (e.g. #e8e7e5). Slight warmth OK. |
| **Accent** | Links, key UI, numerals | Muted teal / steel (e.g. #2d5a5a, #3d6b6b). Clinical, not playful. |
| **Border** | Dividers, cards | Light grey (e.g. #e0dfdd). Dark sections: rgba or #2d3038. |

### Principles
- **Restrained luxury:** Two to three main UI colors plus neutrals. No bright course-style oranges or purples.
- **Clinical credibility:** Cool-grey or muted teal accents read as medical/professional.
- **Contrast:** Meet WCAG AA for all body and UI text.
- **No “hospital blue” dominance:** If blue is used, keep it muted and secondary to charcoal/teal.

---

## 3. Spacing system

### Scale (recommended)
| Token | Value | Use |
|-------|-------|-----|
| `xs` | 0.5rem (8px) | Inline gaps, icon padding |
| `sm` | 1rem (16px) | Tight grouping, list spacing |
| `md` | 1.5rem (24px) | Component padding, related elements |
| `lg` | 2.5rem (40px) | Section padding horizontal, between blocks |
| `xl` | 4rem (64px) | Between section elements |
| `2xl` | 6rem (96px) | Major section breaks |
| `3xl` | 8rem (128px) | Section vertical padding (default) |

### Rules
- **Section padding:** Consistent vertical rhythm (e.g. `padding: var(--section-padding) 0`). Increase on key pages (e.g. homepage) if needed; never cramped.
- **Container max-width:** ~72rem (1152px) for main content; ~42rem (672px) for long-form or narrow reading.
- **Horizontal padding:** Same on both sides; minimum 1.5rem on small screens.
- **Whitespace as hierarchy:** More space above H2 than between H2 and lead; more space between sections than within sections.

---

## 4. Card styles

### Primary card (content / feature)
- **Background:** Default page background or very subtle tint.
- **Border:** 1px solid border color; optional very subtle shadow (e.g. 0 2px 8px rgba(0,0,0,0.04)).
- **Padding:** 1.5rem–2.5rem.
- **Radius:** 2px (or 0). No large rounded corners.
- **Hover:** Slight border darkening and/or shadow increase. No scale or flashy effects.
- **Content:** Title (H3), short body (small or base). Optional small label above title.

### Dark card (on dark section)
- **Background:** rgba(255,255,255,0.04)–0.06.
- **Border:** 1px solid dark border (e.g. #2d3038).
- **Same padding/radius as primary.** Hover: slight lighten of background and border (e.g. accent tint).

### Rules
- One primary card style for light sections, one for dark. Do not mix more than two card variants per page.
- No gradient fills, clip-art, or badge blobs on cards.
- Cards can be used in a grid (e.g. 2–3 columns desktop, 1 column mobile). Min width ~18rem for readability.

---

## 5. CTA styles

### Primary CTA (Apply / Enquire)
- **Background:** Primary text color (charcoal) or accent. Not bright or neon.
- **Text:** White or light. Font weight 600, letter-spacing ~0.02em.
- **Padding:** ~0.75rem 1.5rem (default); ~1rem 2rem (large).
- **Border:** 1px solid same as background; no heavy stroke.
- **Radius:** 2px. Hover: slight background shift (e.g. to accent if default is charcoal). No bounce or scale.

### Secondary CTA
- **Background:** Transparent.
- **Border:** 1px solid border color.
- **Text:** Primary text color. On dark sections: light border, light text.
- **Hover:** Border and/or text darken (or lighten on dark). Same padding/radius as primary.

### Ghost / tertiary
- **No background, no border.** Text only, or text + arrow. For “Explore the pathway” type links.
- **Hover:** Opacity or underline; keep minimal.

### Rules
- One primary style site-wide. Same label for main conversion: “Apply / Enquire” or “Apply for training.”
- No “Buy now,” “Enrol today,” or countdown-style urgency.
- CTAs in bands: center or left-align; consistent gap between buttons (e.g. 1rem). Stack on small screens.

---

## 6. Iconography direction

- **Style:** Line or very light weight; 1–1.5px stroke. Not filled blobs or 3D.
- **Set:** Single consistent set (e.g. Heroicons, Phosphor, or custom). Prefer 24px default; 20px for inline.
- **Use:** Sparingly. For navigation, list bullets, or small visual cues — not decorative wallpaper.
- **Color:** Inherit text color or use muted grey; accent for key actions only.
- **No:** Medical clip-art, hand-drawn, or emoji-style. No colored icon blobs behind every heading.

---

## 7. Section treatment rules

- **Alternating background:** Light (default) → Alt (e.g. #f2f1ef) → Light. Use for long pages to separate sections without heavy dividers.
- **Dark sections:** Reserve for hero, key conversion (CTA band), or “pillar” content (e.g. training pillars). Not every other section.
- **Section heading:** Always H2; one per section. Optional small label above (e.g. “Training Pathways”).
- **Lead paragraph:** One per section under H2; max-width for readability. Then body or components.
- **Full-bleed:** Avoid unless for hero imagery or a single bold divider. Content stays in container.

---

## 8. Motion and animation guidance

- **Principle:** Restrained and purposeful. Motion supports clarity, not decoration.
- **Transitions:** 0.15s–0.25s, ease-out. Use for hover (border, shadow, opacity). No long or bouncy easing.
- **Scroll:** No parallax or scroll-triggered animations unless minimal (e.g. subtle fade). Prefer static content.
- **Reduced motion:** Respect `prefers-reduced-motion: reduce` (disable or shorten transitions).
- **No:** Loading spinners on content, countdown timers, or “slide-in from everywhere” on scroll.

---

## 9. Imagery direction

- **Photography:** Prefer real context — theatre, hands, instruments, teaching — when available. Calm, focused, professional. No staged “happy graduate” or obvious stock diversity tropes.
- **Tone:** Well-lit, slightly warm or neutral. Avoid cold fluorescent or over-saturated.
- **Placement:** Supporting, not dominant. Hero can be type-led with optional subtle background or one strong image. Do not rely on one stock hero across the site.
- **Illustration:** If used, minimal and purposeful (e.g. pathway diagram, simple icons). Line or flat; not cartoon or playful.
- **No:** Clip-art, floating badges, or “laptop + handshake” stock clichés.

---

## 10. Diagram style direction

- **Pathway / process:** Horizontal or vertical steps. Numbered circles or simple nodes; connecting line 1px, muted color. Labels short and clear.
- **Data / audit:** If showing “how auditing works,” use simple blocks or flow (e.g. Case → Review → Benchmark → Feedback). No 3D or infographic clutter.
- **Style:** Line-based; two colors max (e.g. text color + accent). Optional very light fill for “current step.” Same font as body/small for labels.
- **No:** Animated diagrams, gradient flows, or dashboard-style widgets unless product-specific.

---

## 11. Homepage visual direction notes

- **Hero:** Type-led. Headline (H1) and subhead do the work. Optional: very subtle gradient or texture behind type; or one restrained image (e.g. theatre, hands) with enough contrast for text. No full-screen video or busy graphic.
- **Sections:** Clear H2 + lead, then content (list, cards, or steps). Consistent section padding; alternate background for “problem” and “difference” type blocks.
- **Pathway (steps):** Visual steps (Learn → Observe → …) as chips or simple numbered nodes. One line of caption below. Not a giant timeline graphic.
- **Trust:** Short text lines or small badges (e.g. “Australian standards,” “Live-patient training”). Single row or wrapped; not a wall of logos.
- **CTA band:** Dark background, centered headline + lead + buttons. Enough padding to feel premium. No countdown or “only X spots.”

---

## 12. Component recommendations

### Hero (homepage)
- **Layout:** Centered or left-aligned block. Headline (H1) max-width ~14ch or two lines. Subhead max-width ~32em.
- **CTAs:** Primary + secondary, side by side (stack on mobile). Same style as rest of site.
- **Trust:** Bullets or short line below CTAs (e.g. 4 trust points). Small type, muted color.
- **Avoid:** Full-bleed photo with text overlay, slider, or auto-rotating copy.

### Cards (feature / pillar / audience)
- **Grid:** 2–3 columns desktop; 1 column mobile. Gap consistent with spacing scale.
- **Content:** Title (H3), 1–3 lines body. Optional icon or numeral; keep minimal.
- **Style:** Use primary card on light sections; dark card on dark sections. One style per section.

### Timeline / pathway steps
- **Visual:** Numbered steps (1–6) as horizontal chips or vertical list. Number in small circle or badge; label beside. Optional thin connector line.
- **Caption:** One line below explaining the sequence. No long paragraphs in the timeline itself.

### Trust sections
- **Content:** 4–6 short phrases (e.g. “Australian standards,” “Audit-backed development”). No logos unless official and necessary.
- **Layout:** Single row (wrap on narrow); or 2×2 grid. Small, weighted type; muted or default color.
- **Footer trust:** Same phrases; can sit above footer nav. Single line or wrapped row.

### CTA bands
- **Background:** Dark (charcoal). Optional very subtle gradient (e.g. 165deg, same hue).
- **Content:** H2 + one lead sentence + 1–3 buttons. Centered.
- **Buttons:** Primary (Apply) + secondary (e.g. “View pathway,” “Book a conversation”). Same styles as global CTAs.
- **Padding:** Generous (e.g. 4rem–6rem vertical). No urgency copy or countdown.

---

## Quick reference

| Element | Do | Don’t |
|--------|----|-------|
| **Type** | One serif headings, one sans body; clear hierarchy | Multiple display fonts; tiny or huge body |
| **Color** | Neutrals + one accent (teal/steel); dark for key sections | Bright course colors; full blue corporate |
| **Space** | Generous section padding; consistent scale | Cramped blocks; uneven gaps |
| **Cards** | Border + padding; subtle hover | Gradients; badges; clip-art |
| **CTAs** | One primary style; “Apply / Enquire” | “Buy now”; countdown; neon |
| **Motion** | Short, subtle hover transitions | Parallax; scroll animation; bounce |
| **Imagery** | Calm, real, supporting | Stock clichés; hero wallpaper |
| **Diagrams** | Line-based; simple steps | 3D; animated; dashboard clutter |

---

*Document: IIOHR Design System. Use for all IIOHR.com UI and future pages.*
