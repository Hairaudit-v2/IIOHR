# Publication package — Consultant Stream academic edition

This folder holds **export tooling and documentation only**. Curriculum content remains in the parent directory (`../`).

| Document | Purpose |
|----------|---------|
| [`PUBLICATION_READINESS_CHECKLIST.md`](./PUBLICATION_READINESS_CHECKLIST.md) | Pre-flight checklist before the first official export (assets, tooling, version alignment, example commands). |
| [`VERSIONING.md`](./VERSIONING.md) | How **`EXPORT_VERSION`** maps to the manual **Edition** / YAML `version` in [`../README.md`](../README.md). |
| [`DIRECTORY_LAYOUT.md`](./DIRECTORY_LAYOUT.md) | Expected **placeholder paths** for `templates/`, `assets/`, `output/`, `scripts/`. |
| [`internal/README.md`](./internal/README.md) | **Internal:** what communications/design/legal must provide (`reference.docx`, cover, imprint). |
| [`PUBLICATION_PLAN.md`](./PUBLICATION_PLAN.md) | Source of truth, inputs, DOCX/PDF paths, compiled vs per-volume package. |
| [`EXPORT_WORKFLOW.md`](./EXPORT_WORKFLOW.md) | Step-by-step Pandoc usage, TOC/title pages, master vs legacy Word. |
| [`scripts/`](./scripts/) | `export-consultant-academic-manual.ps1` / `.sh` (Pandoc). |

**Placeholder directories (add real files when supplied — no fabricated binaries)**

| Path | Add when available |
|------|--------------------|
| [`templates/`](./templates/) | `reference.docx` (house Word styles) |
| [`assets/cover/`](./assets/cover/) | Cover PDF/image per design spec |
| [`assets/imprint/`](./assets/imprint/) | Legal-approved imprint copy or PDF |
| [`output/`](./output/) | Generated exports only (contents gitignored) |

Parent edition overview: [`../README.md`](../README.md).
