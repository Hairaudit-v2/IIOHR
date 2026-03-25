# Publication readiness checklist — Consultant Stream academic edition

Use this before the **first official** (or any major) export once **communications/design** assets are in place. This is **additive** process documentation only; it does not change curriculum or LMS content.

* * *

## A. Repository layout (expected paths)

| Path | Purpose | Status before export |
|------|---------|----------------------|
| `publication/templates/reference.docx` | Pandoc `--reference-doc` (house styles) | **Required** for branded Word output — supplied by comms/design |
| `publication/assets/cover/` | Cover artwork or print-ready PDF | **Required** for branded print/PDF if cover is not created only in Word |
| `publication/assets/imprint/` | Imprint / legal / copyright block (Word snippet, PDF, or approved text) | **Required** if governance mandates a formal imprint page |
| `publication/output/` | Generated `.docx` / `.pdf` (contents gitignored) | Empty except README; script creates files here |

See also: [`DIRECTORY_LAYOUT.md`](./DIRECTORY_LAYOUT.md).

* * *

## B. Tooling

- [ ] **Pandoc** installed and on `PATH` (`pandoc --version`).
- [ ] **Microsoft Word** (or equivalent policy-approved editor) for TOC, title page, cover insertion, and **Save as PDF** if not using direct Pandoc→PDF.
- [ ] Optional: **XeLaTeX** only if you intentionally use Pandoc→PDF without Word — not required for the recommended path.

* * *

## C. Assets from communications / design

- [ ] `reference.docx` saved as **`publication/templates/reference.docx`** (see [`internal/README.md`](./internal/README.md)).
- [ ] Cover asset(s) placed under **`publication/assets/cover/`** (filename agreed with design).
- [ ] Imprint / legal copy placed under **`publication/assets/imprint/`** or pasted from approved source after export.
- [ ] Legal/comms sign-off recorded (email, ticket, or DMS reference) for imprint and cover.

* * *

## D. Version alignment

- [ ] **Edition line** in [`../README.md`](../README.md) (and YAML `version` if used) matches the release you are cutting.
- [ ] **`EXPORT_VERSION`** (see [`VERSIONING.md`](./VERSIONING.md)) matches that edition for output filenames.

* * *

## E. Export run

- [ ] Run scripted export from [`scripts/`](./scripts/) **or** manual Pandoc (§F below).
- [ ] Confirm **`publication/output/`** contains expected **FULL** and per-volume DOCX names.
- [ ] Open **FULL** DOCX in Word with **`reference.docx`** applied (via Pandoc); verify headings map to **Heading 1 / 2**.

* * *

## F. Example commands — full DOCX export

Working directory: **`teaching-manual-academic-edition/`** (parent of `publication/`).

**Bash / Git Bash** (replace `1.1` with your aligned version):

```bash
export EXPORT_VERSION=1.1
cd publication/scripts && ./export-consultant-academic-manual.sh
```

**PowerShell:**

```powershell
$env:EXPORT_VERSION = "1.1"
Set-Location iiohr-next\docs\academy\consultant-certificate\teaching-manual-academic-edition\publication\scripts
.\export-consultant-academic-manual.ps1
```

**Manual Pandoc (full compiled DOCX only):**

```bash
cd teaching-manual-academic-edition
pandoc README.md volume-1-foundation.md volume-2-advanced.md volume-3-diploma.md appendix-asset-pack.md \
  --reference-doc=publication/templates/reference.docx \
  -o publication/output/IIOHR-Consultant-Academic-Manual-FULL-v1.1.docx
```

If `reference.docx` is **not** yet present, omit `--reference-doc=...` for a **draft** export only.

* * *

## G. Example path — full PDF via DOCX / Word (no direct Pandoc PDF)

Use this when **branded PDF** depends on Word layout, fonts, and cover from **`reference.docx`** and **`assets/cover/`**.

1. Complete §F and open **`publication/output/IIOHR-Consultant-Academic-Manual-FULL-v{VERSION}.docx`** in Word.  
2. Insert **title page** and **cover** (from `assets/cover/` if supplied as image/PDF per design guidance).  
3. Insert **imprint** page after cover if required (`assets/imprint/`).  
4. **References → Table of Contents** (heading styles must be correct).  
5. Set **section breaks** and **page numbering** (e.g. Roman front matter, Arabic body).  
6. **File → Save As → PDF** (or **Export → Create PDF/XPS**).  
7. Save PDF alongside DOCX in `publication/output/` or copy to your DMS with the same **v{VERSION}** stem.

* * *

## H. Post-export QA (minimum)

- [ ] Spot-check **Module** numbers and **Volume** titles against LMS.
- [ ] Confirm PDF bookmark/outline (if enabled) matches major headings.
- [ ] Archive the **exact** `reference.docx` and asset versions used with the release record.

* * *

## Related documents

- [`VERSIONING.md`](./VERSIONING.md) — `EXPORT_VERSION` vs edition line  
- [`internal/README.md`](./internal/README.md) — what comms/design must provide  
- [`EXPORT_WORKFLOW.md`](./EXPORT_WORKFLOW.md) — detailed workflow and troubleshooting  
- [`PUBLICATION_PLAN.md`](./PUBLICATION_PLAN.md) — source of truth and package naming  
