# Publication directory layout (placeholder paths)

All paths are relative to:

`iiohr-next/docs/academy/consultant-certificate/teaching-manual-academic-edition/`

```text
publication/
  README.md                          ← index of publication docs
  PUBLICATION_PLAN.md
  EXPORT_WORKFLOW.md
  PUBLICATION_READINESS_CHECKLIST.md ← pre-flight before official export
  VERSIONING.md                      ← EXPORT_VERSION vs manual edition
  DIRECTORY_LAYOUT.md                ← this file
  internal/
    README.md                        ← what comms/design must provide
  templates/
    .gitkeep                         ← keeps folder visible; optional
    README.md                        ← how to build reference.docx
    reference.docx                   ← YOU ADD: real file from comms/design (not committed until provided)
  assets/
    cover/
      .gitkeep
      README.md                      ← YOU ADD cover files here when design supplies them
    imprint/
      .gitkeep
      README.md                      ← YOU ADD imprint/legal files here when legal approves
  output/
    README.md                        ← describes export drop zone
    .gitignore                       ← ignores generated *.docx, *.pdf, etc. (no fake binaries committed)
    (generated files appear here after export only)
  scripts/
    export-consultant-academic-manual.ps1
    export-consultant-academic-manual.sh
    README.md
```

**Academic master Markdown** (export **inputs**) lives in the **parent** folder: `README.md`, `volume-*.md`, `appendix-asset-pack.md`.

* * *

## Git behaviour

- **`templates/`**, **`assets/cover/`**, **`assets/imprint/`** are tracked via `README.md` (and `.gitkeep` where present).  
- **`reference.docx`** and real cover/imprint binaries are **only** committed when your policy allows **real** assets in-repo.  
- **`output/`** contents are **not** tracked (see `output/.gitignore`).
