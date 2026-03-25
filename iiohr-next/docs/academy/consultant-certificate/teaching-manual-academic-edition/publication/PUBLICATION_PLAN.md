# Consultant Stream — Academic edition publication plan

**Scope:** Export and packaging only. This document does not change curriculum, LMS content, or application code.

* * *

## 1. Source of truth

| Layer | Location | Role |
|--------|----------|------|
| **Academic master (authoritative)** | `teaching-manual-academic-edition/*.md` | Git-versioned Markdown aligned to the Consultant Stream LMS (`aligned_programme_slug` in front matter). |
| **Operational LMS content** | `src/content/academy/programs/certificate-hair-loss-consultation-clinical-patient-coordination/` | Runtime lessons, assessments, and metadata — not replaced by this manual. |
| **Legacy Word manuals** | Typically under `public/` or external storage (e.g. historical doctor or consultant `.docx` packs) | Parallel or superseded authoring; **not** the export input for the academic edition unless explicitly chosen for merge/reconciliation. |

**Rule:** Branded DOCX/PDF for the **Consultant Stream Master Academic Edition** should be regenerated from the **Markdown master** after each approved curriculum change, unless governance explicitly adopts a Word-only fork.

* * *

## 2. Export inputs

| Input | Path (relative to `teaching-manual-academic-edition/`) | Use |
|--------|----------------------------------------------------------|-----|
| Edition README | `README.md` | Front matter, scope, volume map, assessment note, compliance summary, terminology. |
| Volume 1 | `volume-1-foundation.md` | Foundation Certificate (**Modules 1–5**). |
| Volume 2 | `volume-2-advanced.md` | Advanced Certificate (**Modules 6–10**). |
| Volume 3 | `volume-3-diploma.md` | Diploma (**Modules 11–15**). |
| Appendix A | `appendix-asset-pack.md` | HTML supplementary tools inventory and deployment notes. |
| Optional reference DOCX | `publication/templates/reference.docx` | Pandoc `--reference-doc` for house styles (add when available). |
| Optional cover/imprint | `publication/assets/cover/`, `publication/assets/imprint/` | Insert in Word or PDF toolchain **after** export when assets exist. |

Pandoc reads YAML front matter at the top of each Markdown file as document metadata (not repeated as body text in typical DOCX/PDF flows).

* * *

## 3. DOCX generation path

**Tool:** [Pandoc](https://pandoc.org/) (`pandoc` on PATH).

**Pattern:**

```text
pandoc <inputs...> -o <output.docx> [--reference-doc=templates/reference.docx]
```

- **Per-volume DOCX:** one Markdown file → one DOCX (simplest review and track-changes workflow).
- **Compiled manual DOCX:** concatenate inputs in order (see §5) → single DOCX for committee binders.
- **Reference document:** optional. If `reference.docx` is missing, Pandoc still emits a usable default-styled DOCX.

**Post-export in Word:** TOC, title page, page numbers, headers/footers, and cover are usually applied in Word (or via a future template) — see `EXPORT_WORKFLOW.md`.

* * *

## 4. PDF generation path

**Options (pick one stack per organisation):**

| Route | Command / flow | Notes |
|--------|------------------|--------|
| **A. Pandoc + PDF engine** | `pandoc ... -o manual.pdf --pdf-engine=xelatex` (or `pdflatex`) | Requires LaTeX distribution (e.g. MiKTeX, TeX Live). Good for automated builds. |
| **B. DOCX → PDF** | Export DOCX from Pandoc, open in Word, **Save as PDF** or print to PDF | No LaTeX; uses Word layout and embeds reference styles. |
| **C. HTML/CSS** | Intermediate HTML + print CSS, then browser print to PDF | Useful for web-first styling; separate from Pandoc DOCX path. |

**Recommendation for first official PDF:** **Route B** until a LaTeX or branded HTML pipeline is approved — lowest friction and matches corporate fonts if the reference DOCX is correct.

* * *

## 5. Compiled manual vs per-volume outputs

### 5.1 Recommended input order (compiled full manual)

1. `README.md`  
2. `volume-1-foundation.md`  
3. `volume-2-advanced.md`  
4. `volume-3-diploma.md`  
5. `appendix-asset-pack.md`  

This preserves edition context before the three Volumes and Appendix A.

### 5.2 Recommended output artefacts (package structure)

Place generated files under `publication/output/` (ignored by Git by default). Suggested **distribution filenames** (replace `X.Y` with edition):

| Package member | Suggested filename | Source inputs |
|----------------|-------------------|---------------|
| Full compiled manual | `IIOHR-Consultant-Academic-Manual-FULL-vX.Y.docx` | All five Markdown files in order |
| Volume 1 only | `IIOHR-Consultant-Academic-Vol1-Foundation-vX.Y.docx` | `volume-1-foundation.md` |
| Volume 2 only | `IIOHR-Consultant-Academic-Vol2-Advanced-vX.Y.docx` | `volume-2-advanced.md` |
| Volume 3 only | `IIOHR-Consultant-Academic-Vol3-Diploma-vX.Y.docx` | `volume-3-diploma.md` |
| Appendix A summary | `IIOHR-Consultant-Academic-AppendixA-AssetPack-vX.Y.docx` | `appendix-asset-pack.md` |
| PDF counterparts | Same stem, `.pdf` | Per chosen PDF route |

Optional: also ship `README` alone as `IIOHR-Consultant-Academic-Edition-README-vX.Y.docx` for governance-only circulation.

* * *

## 6. Repository layout (publication assets)

All paths relative to `teaching-manual-academic-edition/publication/`:

```text
publication/
  PUBLICATION_PLAN.md      ← this file
  EXPORT_WORKFLOW.md       ← step-by-step export and Word/PDF finishing
  README.md                ← index
  assets/
    cover/                 ← optional: cover art/PDF when branding exists
    imprint/               ← optional: legal imprint, ISBN block, etc.
  templates/
    README.md              ← how to add reference.docx (not committed until provided)
  output/
    .gitignore             ← ignore generated *.docx, *.pdf, tmp
    README.md              ← where drops land
  scripts/
    export-consultant-academic-manual.sh
    export-consultant-academic-manual.ps1
```

**No placeholder branding files** are committed. Add `reference.docx`, cover, and imprint only when assets exist.

* * *

## 7. Revision control for exports

- Bump **edition / version** in Markdown front matter and `README.md` when curriculum or manual text changes materially.  
- Regenerate DOCX/PDF after bump; archive distribution files outside Git or in a release artefact store if required.  
- Do not commit large binaries to the app repo unless policy requires it; `publication/output/` is ignored by default.

* * *

## 8. Related documents

- Parent edition overview: [`../README.md`](../README.md)  
- Operator workflow: [`EXPORT_WORKFLOW.md`](./EXPORT_WORKFLOW.md)  
- First official export: [`PUBLICATION_READINESS_CHECKLIST.md`](./PUBLICATION_READINESS_CHECKLIST.md)  
- Version alignment: [`VERSIONING.md`](./VERSIONING.md)  
- Comms/design deliverables: [`internal/README.md`](./internal/README.md)  
- Directory tree: [`DIRECTORY_LAYOUT.md`](./DIRECTORY_LAYOUT.md)
