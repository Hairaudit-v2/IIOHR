# Internal — communications & design deliverables

**Audience:** Communications, design, and legal (with curriculum owner).  
**Goal:** Unblock **branded** first official export for the Consultant Stream **Master Academic Edition** without inventing assets in the repo.

* * *

## What to provide (files)

### 1. Word reference document — **required for house-styled DOCX**

| Item | Detail |
|------|--------|
| **Deliverable** | One Word file saved exactly as **`reference.docx`** |
| **Drop location** | `iiohr-next/docs/academy/consultant-certificate/teaching-manual-academic-edition/publication/templates/reference.docx` |
| **Must include** | Paragraph and character styles Pandoc can map from Markdown: at minimum **Heading 1**, **Heading 2**, **Body Text**, **Normal**; optional **Header/Footer** with placement-only text |
| **Purpose** | Pandoc copies these styles into generated manuals (`--reference-doc`) |
| **Do not** | Commit placeholder covers inside `reference.docx` unless they are **final approved** artwork |

Technical note for design: Pandoc maps `#` → **Heading 1**, `##` → **Heading 2**, etc. See `publication/templates/README.md`.

### 2. Cover — **required if print/PDF needs a designed cover**

| Item | Detail |
|------|--------|
| **Deliverable** | Print-ready **PDF** and/or **high-resolution image** (PNG/TIFF per org standard), plus bleed/trim specs if applicable |
| **Drop location** | `.../publication/assets/cover/` (agree filename, e.g. `cover-print.pdf`) |
| **Purpose** | Inserted in Word or pre-press after export; not generated from Markdown |

### 3. Imprint / legal block — **required if governance mandates it**

| Item | Detail |
|------|--------|
| **Deliverable** | Approved **text** (Word snippet, PDF, or `.md`) for copyright, publisher, disclaimer, contact — **legal-approved** |
| **Drop location** | `.../publication/assets/imprint/` |
| **Purpose** | First official PDF/committee pack often needs a formal imprint page; the academic Markdown is **not** a substitute for legal copy |

* * *

## What **not** to expect from this repo

- No **fabricated** `reference.docx`, cover, or PDF is committed as a stand-in.  
- Curriculum owners maintain **Markdown** upstream; comms/design supplies **brand and legal** shells.

* * *

## After assets land

Curriculum/ops runs [`../PUBLICATION_READINESS_CHECKLIST.md`](../PUBLICATION_READINESS_CHECKLIST.md) and [`../EXPORT_WORKFLOW.md`](../EXPORT_WORKFLOW.md).
