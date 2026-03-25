# Export scripts

| File | Use |
|------|-----|
| `export-consultant-academic-manual.ps1` | Windows PowerShell; requires `pandoc` on PATH. |
| `export-consultant-academic-manual.sh` | Git Bash / macOS / Linux; requires `pandoc` on PATH. |

**Environment (optional):** `EXPORT_VERSION=1.2` (shell) or `$env:EXPORT_VERSION = "1.2"` (PowerShell) overrides the default `1.1` in output filenames. Align with the manual edition: [`../VERSIONING.md`](../VERSIONING.md).

**PDF:** If `xelatex` is on PATH, the scripts attempt a compiled PDF for the full manual only; on failure or if absent, use **Word → PDF** per `../EXPORT_WORKFLOW.md`.
