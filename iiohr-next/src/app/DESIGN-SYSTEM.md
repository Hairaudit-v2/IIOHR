# IIOHR Gradient & Glow Design System

Unified visual identity for depth and polish across IIOHR, HairAudit, HLI, and Follicle Intelligence. **IIOHR:** cream-forward continuity, human + premium; **ecosystem** (GHN) is the darkest, most system-linked plane; gold stays sparing (CTAs, key borders); blue stays a whisper (focus rings, ecosystem glow)—never dominant.

---

## Tokens (CSS variables)

Defined in `globals.css` under `:root`.

### Canonical palette (source of truth)

| Token | Role |
|-------|------|
| `--bg-primary` | Dominant page background `#F5F1E8` |
| `--bg-secondary` | Panels / ivory surfaces `#FAF7F1` |
| `--bg-soft` | Muted band / alt cream `#EEE8DC` |
| `--bg-dark` | Feature dark base `#0F141A` |
| `--bg-dark-soft` | Dark UI / cards on charcoal `#151B22` |
| `--text-primary` | Body & headings ink `#1A1917` |
| `--text-secondary` | Muted copy `#5B554A` |
| `--gold-primary` | Primary accent / CTAs `#C6A75E` |
| `--gold-soft` | Washes, selection, rails |
| `--accent-blue` | Intelligence / focus `#4C6FFF` |
| `--accent-blue-soft` | Light-section blue whisper |

Semantic aliases (`--background`, `--surface`, `--accent`, `--section-charcoal`, etc.) map to these so existing components keep working. Tailwind: `text-gold`, `bg-intel`, `ring-intel/45`, `bg-bg-dark` (via `--color-bg-dark`), etc.

**Strict colour rule:** Raw hex and `rgba()` appear **only** in the canonical `:root` block above (`--gold-soft` / `--accent-blue-soft` use the prescribed rgba forms). Everywhere else use variables, `color-mix` (in CSS), or theme utilities—**no inline hex/rgba in TSX**.

### Section surfaces (canonical)

| Class | Effect |
|-------|--------|
| **`section-light`** | Gold + blue radial wash over `--bg-primary` (default light band). Alias: `section-ivory-depth`. |
| **`section-light-muted`** | Same radials over soft→secondary vertical blend. Alias: `section-muted-depth`. |
| **`section-dark`** | Shared blue/gold radials over `--bg-dark` (hero, final CTA, GHN base). Alias: `section-dark-gradient`; `bg-gradient-dark` matches this stack. |
| **`section-ecosystem`** | **Adds** inset/ambient blue glow + gold/blue hairlines on top of a parent that already has **`section-dark`** (Global Hair Intelligence band only). |

### Accent overlay

| Token | Value | Use |
|-------|--------|-----|
| `--gradient-accent` | Radial gold glow fade (ellipse, top) | Hero overlay, accent washes (`bg-gradient-accent`) |

### Legacy gradient utilities (aliases)

| Class | Notes |
|-------|--------|
| **`bg-gradient-primary`** | Same visual stack as **`section-light`** (radials + `--bg-primary`). Prefer `section-light` on `<section>`. |
| **`bg-gradient-dark`** | Same as **`section-dark`**. Prefer `section-dark` on `<section>`. |

### Focus & system link (subtle blue)

| Token | Use |
|-------|-----|
| `--focus-ring` | From `--accent-blue` (muted); use `ring-intel/45` on buttons where applicable |
| `--focus-ring-dark` | Brighter mix for dark-section focus offsets |

### Glow

| Token | Value | Use |
|-------|--------|-----|
| `--glow-soft` | Subtle neutral shadow | Cards, elevated panels, default lift |
| `--glow-soft-accent` | Soft gold-tinted shadow + ring | Interactive cards, CTAs on light |
| `--glow-strong` | Gold ring + diffuse glow + depth | **Ecosystem section only** (network cards, hero panel) |

### Surfaces

| Token | Alias | Use |
|-------|--------|-----|
| `--surface-light` | `--section-ivory` | Light section backgrounds |
| `--surface-dark` | `--section-charcoal` | Dark section backgrounds |
| `--surface-elevated` | (existing) | Lifted panels, cards on light |

---

## Utility classes

### Background gradients

- **`section-light`** / **`section-light-muted`** — Preferred for full-width light sections.
- **`section-dark`** — Preferred for hero, GHN (with **`section-ecosystem`**), and final CTA.
- **`bg-gradient-primary`** / **`bg-gradient-dark`** — Same stacks as `section-light` / `section-dark` when you need a background utility on a non-section wrapper.
- **`bg-gradient-accent`** — Subtle radial gold from top. Overlay on panels or above dark base for accent.

### Surfaces

- **`bg-surface-light`** — Warm ivory (same as section-ivory).
- **`bg-surface-dark`** — Deep charcoal.
- **`bg-surface-elevated`** — Slightly lifted neutral panel.

### Glow

- **`glow-soft`** — Default card/panel shadow. Use on `Card`, image panels, or any elevated surface.
- **`glow-soft-accent`** — Gold-tinted soft glow. Use on primary CTAs or key interactive cards on light sections.
- **`glow-strong`** — Reserved for ecosystem (Global Hair Intelligence) cards and hero panel.

### Composed

- **`surface-elevated-panel`** — `surface-elevated` + `glow-soft`. One class for “lifted panel” on light.
- **`surface-dark-panel-glow`** — Dark translucent panel + `glow-strong`. Ecosystem-only dark cards/panels.

### Shadows (token-derived, use in components)

- **`shadow-token-card`**, **`shadow-token-card-dark`** — `Card` default / dark variant.
- **`shadow-token-card-hover-light`**, **`shadow-token-card-hover-dark`** — Card hover (with `hover:` in TSX).
- **`shadow-token-btn-light`**, **`shadow-token-btn-dark`** — Primary / dark buttons.
- **`shadow-token-img`**, **`shadow-token-img-hover`**, **`shadow-token-img-accent-hover`** — `ImageWrapper`.
- **`shadow-token-ghn-diagram`**, **`shadow-token-mobile-panel`** — GHN diagram frame, mobile flyout.
- **`mobile-nav-backdrop`** — Scrim using `color-mix` from `--bg-dark` (no arbitrary hex).

---

## Usage examples

### 1. Light section (canonical)

```tsx
<section className="section-light section-flow">
  <div className="mx-auto max-w-6xl px-5 py-24 ...">
    <PageHero ... />
  </div>
</section>
```

### 2. Dark section with shared surface

```tsx
<section className="section-dark text-section-charcoal-foreground section-flow" data-section-tone="dark">
  {/* content */}
</section>
```

### 2b. Global Hair Intelligence (dark + ecosystem enrichment)

```tsx
<section className="section-dark section-ecosystem section-flow" data-section-tone="dark">
  {/* GHN: same dark base as hero + inset glow & hairlines */}
</section>
```

### 3. Card with soft glow (light section)

```tsx
<article className="rounded-xl border border-border bg-surface p-6 glow-soft hover:glow-soft-accent transition-shadow">
  <h3>...</h3>
  <p>...</p>
</article>
```

### 4. CTA block with accent gradient overlay

```tsx
<div className="relative rounded-2xl border border-border bg-surface-elevated p-8 glow-soft-accent">
  <div className="absolute inset-0 rounded-2xl bg-gradient-accent pointer-events-none opacity-60" aria-hidden />
  <div className="relative">
    <h2>...</h2>
    <SectionCTA ... />
  </div>
</div>
```

### 5. Ecosystem-only strong glow (GHN cards)

```tsx
<div className="ghn-node-card--active ... surface-dark-panel-glow rounded-xl border border-section-charcoal-border ...">
  {/* Global Hair Intelligence node content */}
</div>
```

### 6. Image panel with design-system glow

```tsx
<div className="img-panel rounded-2xl overflow-hidden glow-soft">
  <Image ... />
</div>
```

---

## Constraints

- **No neon** — Keep gold and blue accents muted (low saturation, opacity).
- **No heavy saturation** — Gradients and glows should feel ambient, not loud.
- **glow-strong** — Use only in the ecosystem section (GHN, lab hero) to keep hierarchy clear.
- **Surfaces** — Prefer `surface-light` / `surface-dark` / `surface-elevated` in new work so HairAudit/HLI/FI can share the same tokens.

---

## Where tokens live

- **Variables:** `iiohr-next/src/app/globals.css` (`:root`).
- **Utilities:** Same file, under “Gradient & glow utilities”.
- **Dark anchors (IIOHR):** **Hero**, **final CTA**, and **GHN** share **`section-dark`** (same radial stack over `--bg-dark`). GHN adds **`section-ecosystem`** for inset glow and hairlines. Elsewhere use **`section-light`** / **`section-light-muted`** and `section-flow` (no hard bottom border). Legacy class names `section-ivory-depth`, `section-muted-depth`, and `section-dark-gradient` remain as aliases in CSS.
- **Light flow:** `section-breathe` on `SectionSpacer` adds soft vertical rhythm without a dividing line. Gold: CTAs and sparse borders. Blue: focus rings (`ring-intel/45`, `--focus-ring`) and ecosystem glow only—never dominant on cream pages.
