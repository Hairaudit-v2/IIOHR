# Homepage and section images

All paths are centralized in `src/lib/homeImages.ts` (**HOME_IMAGES**). Hero images use `src/lib/heroImages.ts` and `getHeroImage()`.

## Required folder structure (under `public/images/`)

```
public/images/
  hero/     → hero-hair-texture.jpg, hero-hair-progression.jpg
  science/  → science-follicle-cross-section.png, science-follicle-render.png,
               science-hair-cycle.jpg, science-dna-lab.jpg, science-genetics.jpg,
               science-hormones-dht.jpg
  human/    → human-mirror-check.jpg
  trust/    → trust-doctor-portrait.jpg
  ecosystem/ → ecosystem-dna-lab.jpg
```

## Path format

- All public image paths must start with `/images/...` (no `/public/`, no Windows paths).
- Example: `/images/hero/hero-hair-progression.jpg`
- Next.js serves files from `public/`, so `public/images/hero/hero-hair-progression.jpg` is requested as `/images/hero/hero-hair-progression.jpg`.

## Currently present (after setup)

- `hero/hero-hair-progression.jpg`
- `hero/hero-hair-texture.jpg` (copy of progression; replace with dedicated texture asset if desired)
- `science/science-dna-lab.jpg`
- `science/science-follicle-cross-section.png`
- `science/science-follicle-render.png`
- `science/science-hair-cycle.jpg`
- `science/science-genetics.jpg`
- `science/science-hormones-dht.jpg`
- `human/human-mirror-check.jpg`
- `trust/trust-doctor-portrait.jpg`
- `ecosystem/ecosystem-dna-lab.jpg`

## Optional / future

- Dedicated **hero-hair-texture.jpg** (different from progression) for hero background.
- Do not hardcode image paths in components; import from `@/lib/homeImages` or use `getHeroImage()` for heroes.
