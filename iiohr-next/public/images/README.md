# Homepage and site images

All paths are centralized in `src/lib/homeImages.ts` under **HOME_IMAGES**. Use the following folder structure and filenames so components resolve correctly.

## Folder structure

```
public/images/
  hero/     → hero-hair-texture.jpg, hero-hair-progression.jpg
  science/  → science-follicle-cross-section.jpg, science-follicle-render.png,
               science-hair-cycle.jpg, science-dna-lab.jpg, science-genetics.jpg,
               science-hormones-dht.jpg
  human/    → human-mirror-check.jpg
  trust/    → trust-doctor-portrait.jpg
  ecosystem/ → ecosystem-dna-lab.jpg
```

## Path reference (HOME_IMAGES)

| Key | Path |
|-----|------|
| hero.texture | `/images/hero/hero-hair-texture.jpg` |
| hero.progression | `/images/hero/hero-hair-progression.jpg` |
| science.follicle | `/images/science/science-follicle-cross-section.jpg` |
| science.follicleRender | `/images/science/science-follicle-render.png` |
| science.hairCycle | `/images/science/science-hair-cycle.jpg` |
| science.dna | `/images/science/science-dna-lab.jpg` |
| science.genetics | `/images/science/science-genetics.jpg` |
| science.hormones | `/images/science/science-hormones-dht.jpg` |
| human.mirror | `/images/human/human-mirror-check.jpg` |
| trust.doctor | `/images/trust/trust-doctor-portrait.jpg` |
| ecosystem.dnaLab | `/images/ecosystem/ecosystem-dna-lab.jpg` |

Components import from `@/lib/homeImages` only; do not hardcode image paths elsewhere.
