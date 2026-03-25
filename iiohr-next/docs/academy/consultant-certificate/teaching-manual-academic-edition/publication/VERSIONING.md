# Versioning — export filenames vs manual edition

Consultant academic edition uses **two linked signals** for releases. Keep them **in sync** for traceable official exports.

* * *

## 1. Edition in the manual (source content)

The **authoritative curriculum/edition** for readers is declared in the Markdown master:

- [`../README.md`](../README.md) — YAML block `version:` (e.g. `"1.1"`) and visible lines such as **Edition:** / **Date:**  
- Per-volume files may repeat **Edition:** in their front matter for printed extracts.

When you change **curriculum text**, compliance wording, or issue a formal new edition of the **manual**, update these fields in Git **before** or **with** the export you distribute.

* * *

## 2. `EXPORT_VERSION` (build label for files)

The export scripts read **`EXPORT_VERSION`** for output **filenames only**:

| Environment | Example |
|-------------|---------|
| Bash / Git Bash | `export EXPORT_VERSION=1.1` then run `export-consultant-academic-manual.sh` |
| PowerShell | `$env:EXPORT_VERSION = "1.1"` then run `export-consultant-academic-manual.ps1` |

If unset, scripts default to **`1.1`** (see `scripts/README.md`).

**Rule:** For an **official** release, set `EXPORT_VERSION` to the **same** semantic label as the manual’s **Edition** / YAML `version` (e.g. both `1.1` or both `1.2`). That way `IIOHR-Consultant-Academic-Manual-FULL-v1.1.docx` unambiguously matches the edition stated inside `README.md`.

* * *

## 3. When they may differ (short-lived only)

- **Draft exports:** you may run the script with a temporary `EXPORT_VERSION` (e.g. `1.2-draft`) while the manual still says `1.1` — do **not** ship those as final.  
- **Asset-only refresh:** if you re-export with a **new** `reference.docx` but **no** Markdown change, governance may keep the same manual edition; filename suffix policy is your org’s choice (some teams add a **build** suffix outside this repo).

* * *

## 4. Manual Pandoc commands

When invoking Pandoc by hand, **embed the same version** in the `-o` path as in [`../README.md`](../README.md), e.g. `-o publication/output/...-v1.1.docx`.

* * *

See also: [`PUBLICATION_READINESS_CHECKLIST.md`](./PUBLICATION_READINESS_CHECKLIST.md) §D.
