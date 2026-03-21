# IIOHR Gradient & Glow Design System

Unified visual identity for depth and polish across IIOHR, HairAudit, HLI, and Follicle Intelligence. **IIOHR:** cream-forward continuity, human + premium; **ecosystem** (GHN) is the darkest, most system-linked plane; gold stays sparing (CTAs, key borders); blue stays a whisper (focus rings, ecosystem glow)—never dominant.

---

## Tokens (CSS variables)

Defined in `globals.css` under `:root`.

### Gradients

| Token | Value | Use |
|-------|--------|-----|
| `--gradient-primary` | Calm gold wash → ivory (165deg) | Most light sections (`section-ivory-depth`) |
| `--gradient-dark` | Cool charcoal stack (180deg) | **Hero + final CTA** (`section-dark-gradient`) — deep but slightly open |
| `--gradient-ecosystem` | Deeper cool charcoal (180deg) | **Global Hair Intelligence only** (`ghn-section-dark`) — most distinct dark |
| `--gradient-accent` | Radial gold glow fade (ellipse, top) | Hero text panels, accent overlays |

### Focus & system link (subtle blue)

| Token | Use |
|-------|-----|
| `--focus-ring` | Default `:focus-visible` outline; buttons/links use matching `ring-[rgba(108,132,168,…)]` |
| `--focus-ring-dark` | Reference for dark-section focus (slightly brighter blue-gray) |

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

- **`bg-gradient-primary`** — Soft gold → ivory. Use on hero side panels, feature strips, or full-section depth on light pages.
- **`bg-gradient-dark`** — Charcoal → near black. Use as base for dark sections or overlays.
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

---

## Usage examples

### 1. Hero with gradient depth (light page)

```tsx
<section className="bg-gradient-primary">
  <div className="mx-auto max-w-6xl px-5 py-24 ...">
    <PageHero ... />
  </div>
</section>
```

### 2. Dark section with gradient base

```tsx
<section className="bg-gradient-dark text-section-charcoal-foreground" data-section-tone="dark">
  {/* content */}
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
- **Dark anchors (IIOHR):** **Hero** (`bg-gradient-dark`) and **final CTA** use `section-dark-gradient` (`--gradient-dark`). **Ecosystem** uses **`ghn-section-dark`** only (`--gradient-ecosystem` + inset/ambient blue glow)—the deepest, most system-linked band. Elsewhere use `section-ivory-depth`, `section-muted-depth`, and `section-flow` (no hard bottom border).
- **Light flow:** `section-breathe` on `SectionSpacer` adds soft vertical rhythm without a dividing line. Gold: CTAs and sparse borders. Blue: focus rings (`--focus-ring`) and ecosystem glow only—never dominant on cream pages.
