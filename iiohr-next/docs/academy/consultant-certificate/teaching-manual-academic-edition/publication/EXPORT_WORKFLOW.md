# Export workflow — Consultant Stream academic edition

Concise steps for **DOCX** and **PDF** from the Markdown master. For package layout and source-of-truth rules, see [`PUBLICATION_PLAN.md`](./PUBLICATION_PLAN.md).

**Before a first official export:** [`PUBLICATION_READINESS_CHECKLIST.md`](./PUBLICATION_READINESS_CHECKLIST.md) · **Version alignment:** [`VERSIONING.md`](./VERSIONING.md) · **Comms/design inputs:** [`internal/README.md`](./internal/README.md).

* * *

## Prerequisites

- **Pandoc** installed and on `PATH` ([install](https://pandoc.org/installing.html)).  
- Optional: **reference.docx** at `publication/templates/reference.docx` (create from your house Word template when available).  
- For **direct PDF via Pandoc:** a PDF engine (e.g. **XeLaTeX** / **MiKTeX** / **TeX Live**). Not required if you use **Word → PDF**.

* * *

## 1. Export DOCX from Markdown

### 1.1 Scripted (recommended)

From repository root or any directory:

**Windows (PowerShell):**

```powershell
cd iiohr-next/docs/academy/consultant-certificate/teaching-manual-academic-edition/publication/scripts
.\export-consultant-academic-manual.ps1
```

**Git Bash / macOS / Linux:**

```bash
cd iiohr-next/docs/academy/consultant-certificate/teaching-manual-academic-edition/publication/scripts
./export-consultant-academic-manual.sh
```

Outputs land in `publication/output/`. If `templates/reference.docx` is absent, Pandoc uses its default Word styling.

### 1.2 Manual Pandoc examples

Paths below assume current working directory is `teaching-manual-academic-edition/`.

**Full compiled DOCX:**

```bash
pandoc README.md volume-1-foundation.md volume-2-advanced.md volume-3-diploma.md appendix-asset-pack.md \
  -o publication/output/IIOHR-Consultant-Academic-Manual-FULL-v1.1.docx
```

With optional house styles:

```bash
pandoc README.md volume-1-foundation.md volume-2-advanced.md volume-3-diploma.md appendix-asset-pack.md \
  --reference-doc=publication/templates/reference.docx \
  -o publication/output/IIOHR-Consultant-Academic-Manual-FULL-v1.1.docx
```

**Single volume:**

```bash
pandoc volume-1-foundation.md \
  --reference-doc=publication/templates/reference.docx \
  -o publication/output/IIOHR-Consultant-Academic-Vol1-Foundation-v1.1.docx
```

* * *

## 2. Export PDF

### 2.1 Via Word (no LaTeX)

1. Generate DOCX as above.  
2. Open in Microsoft Word.  
3. Apply finishing (TOC, title page, page numbers — see §3).  
4. **File → Save As → PDF** (or **Export → Create PDF/XPS**).

This is the **lowest-risk** path for a first official PDF.

### 2.2 Via Pandoc + PDF engine

Only if LaTeX is installed and you accept default Pandoc LaTeX typography (or a custom LaTeX template, not included here):

```bash
pandoc README.md volume-1-foundation.md volume-2-advanced.md volume-3-diploma.md appendix-asset-pack.md \
  -o publication/output/IIOHR-Consultant-Academic-Manual-FULL-v1.1.pdf \
  --pdf-engine=xelatex
```

Expect to tune templates for branding later; out-of-the-box output is functional, not necessarily on-brand.

* * *

## 3. TOC, page numbering, and title pages

Pandoc’s default DOCX does **not** insert a Word **automatic TOC** or custom **title page**. Handle these **after** export:

| Element | Suggested approach |
|---------|---------------------|
| **Title page** | Insert section break at start of Word document; add cover text and edition line; optional image from `publication/assets/cover/` when it exists. |
| **Imprint / legal** | Page after cover from `publication/assets/imprint/` notes or boilerplate approved by legal/comms. |
| **Page numbering** | Roman numerals for front matter (if any), Arabic from Volume 1 start — set in Word section layout. |
| **TOC** | **References → Table of Contents → Automatic**; use **Heading 1/2** styles in the reference DOCX so Pandoc headings map correctly. |
| **Headers/footers** | Define in `reference.docx` so regenerated exports inherit them where possible. |

**Tip:** Build a **single reference.docx** that includes your styles, heading levels, and header/footer placeholders; Pandoc maps `#` → Heading 1, `##` → Heading 2, etc., when using `--reference-doc`.

* * *

## 4. Master Markdown vs legacy Word files

| Question | Answer |
|----------|--------|
| **Which is source of truth for the Consultant academic edition?** | The Markdown files in `teaching-manual-academic-edition/`, aligned to the LMS programme slug in front matter. |
| **What are legacy Word files?** | Older or parallel `.docx` manuals (e.g. under `public/` or external shares). They may differ in wording, week numbering, or scope. |
| **When to open legacy Word?** | Historical reference, local legal annexes, or narrative not yet migrated — **not** for regenerating the academic edition unless governance merges content back into Markdown first. |
| **How to avoid mix-ups?** | Use consistent **distribution filenames** (see publication plan §5.2), version suffixes (`v1.1`), and store exports under `publication/output/` only from scripted builds. |

* * *

## 5. Troubleshooting

- **`pandoc` not found:** Add Pandoc to PATH or use full path to `pandoc.exe`.  
- **Reference doc ignored:** Ensure path is correct and file is a valid `.docx`.  
- **YAML shows in output:** Rare with current Pandoc; upgrade Pandoc if metadata appears as literal text.  
- **PDF engine fails:** Use Word → PDF instead until LaTeX is configured.
