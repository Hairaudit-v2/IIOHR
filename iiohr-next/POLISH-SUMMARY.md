# IIOHR — Final polish summary

Post–layout, CTA, card, spacing, and surface cleanup. Images are still treated as temporary placeholders.

---

## Final improvements (this pass)

### Section order and centerpiece
- **Homepage** section order is intentional: Hero → Science (bridge + modules) → Problem/Difference → Curriculum (Training pillars + Follicle Intelligence) → Pathway (Progression + Trust block) → Ecosystem platforms → Outcomes (Human impact + Mentorship) → **Global Hair Intelligence Network (centerpiece)** → Trust signals → Audience → CTA.
- In-code comments updated so the centerpiece (Global Hair Intelligence) and dark/light rhythm are explicit.

### Consistency and spacing
- **Section padding** aligned across custom wrappers: ScienceBridgeSection, FollicleFullWidthSection, and HeroSection now use `py-28 md:py-32 lg:py-36` (or Hero `py-24 md:py-28 lg:py-36`) to match SectionShell and other dark sections.
- **ScienceBridgeSection:** CTA block below heading uses `mt-16` (was `mt-8`) for consistent heading-to-content rhythm.
- **EcosystemAuthoritySection:** “Four connected platforms” label and grid use `mt-10` / `mt-12 lg:mt-16` and `gap-6` for clearer hierarchy and spacing.

### CTA and cards
- **CTASection** “I am…” segment links: `rounded-xl`, `py-3.5`, and `min-h-[44px]` on small screens for touch targets; `sm:min-h-0` on larger viewports so layout stays natural.
- Cards and boxed sections already use the shared Card component and FeatureGrid with consistent radius, padding, and dark/light variants.

### Image panels (placeholders)
- **PageHero** and **ImageWrapper**: Placeholder state uses `img-panel` (rounded-2xl, border, shadow). Dark hero panel fallback: `bg-section-charcoal-foreground/10`; light: `bg-parchment`. No change to image strategy; panels remain intentional when assets are missing.

### Dark/light alternation
- Dark: Hero, Science bridge, Science modules, Training pillars (FeatureGrid dark), Human impact, Mentorship, Global Hair Intelligence, CTA.
- Light default (ivory-depth): Difference, Progression pathway, Pathway trust, Ecosystem authority, Audience.
- Muted (ivory-alt): Problem, Follicle Intelligence support (SplitSection), Trust signals.
- SectionSpacer uses `border-border-soft bg-section-ivory` for a clear break between sections.

### Mobile
- CTA segment links have minimum touch height on mobile.
- Grids use responsive columns (e.g. `sm:grid-cols-2`, `lg:grid-cols-4`) and existing breakpoints; no overflow or wrapper issues identified.

---

## Remaining image-related tasks (for later)

- **Asset strategy:** Replace placeholder paths in `HOME_IMAGES` / `homeImages` and per-section image props with final photography or approved visuals.
- **Hero:** Final hero texture/imagery and optional LCP optimisation (priority, sizes).
- **Science / Follicle Intelligence:** Final DNA, module, and lab imagery; ensure alt text and aspect ratios match final assets.
- **Human impact / Mentorship:** Final “mirror” and “doctor” (or equivalent) imagery; keep aspect ratios and `ImageWrapper` usage.
- **PageHero panels:** Subpages that use PageHero with an image: supply final panel asset and ensure `image.src` is a valid public path (e.g. `/images/...`).
- **Accessibility:** Once final images are set, confirm all `alt` copy and decorative vs meaningful image handling.

No major new features were added; focus was refinement and launch-quality polish.
