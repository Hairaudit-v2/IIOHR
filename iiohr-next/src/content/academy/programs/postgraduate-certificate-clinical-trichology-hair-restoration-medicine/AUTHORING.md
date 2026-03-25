# Doctor postgraduate program — authoring paths

This folder contains **two different roles** of JSON. Keeping them separate avoids blueprint/runtime confusion.

## Live runtime content (what the app loads)

- **`volume-1/`** — Doctor Volume 1: `modules`, `lessons`, `quizzes`, `case-prompts`, `references`, `resources`, and `volume-1/index.json`.
- **`volume-2/`** — Doctor Volume 2: same layout as `volume-1/`, plus `volume-2/index.json`.
- **`volume-3/`** — Doctor Volume 3: same layout as `volume-1/`, plus `volume-3/index.json`.
- **`competencies/index.json`**, **`faculty-notes/index.json`**, **`compliance-notices/index.json`**, **`levels/index.json`**, **`index.json`** (program) — merged doctor program metadata used with the volumes.

The doctor **Postgraduate Certificate** runtime bundle is assembled in code from these paths (`createDoctorBundle` in `src/lib/academy/content-registry.ts`). **Edit volumes and the merged program files to change what learners see.**

## Blueprint / planning only (not ingested by the doctor bundle)

- **`modules/index.json`** at this program root — long-range module catalogue (all volumes).
- **`sections/index.json`** — section planning metadata keyed to that catalogue.

These files support curriculum design and alignment; they are **not** imported into `createDoctorBundle`. When adding further volumes, mirror the proven pattern: add `volume-N/` runtime JSON and extend the registry merge — do not assume the root `modules/index.json` will auto-load.

## Source manuals (reference)

Authoritative teaching text for Volume 2 is tracked alongside public assets, e.g.  
`public/IIIOHR doctor education platform/Volume2_Diagnostic_Trichology_and_Pattern_Hair_Loss_Medicine.docx`.  
Runtime JSON in `volume-2/` should stay aligned to that manual as content is refined.

Authoritative teaching text for Volume 3:  
`public/IIIOHR doctor education platform/Volume3_Diffuse_Shedding_Cicatricial_Alopecia_and_Scalp_Disease.docx`.  
Runtime JSON in `volume-3/` should stay aligned to that manual as content is refined. Optional regeneration helper: `scripts/generate-doctor-volume3-runtime.mjs` (lessons, quizzes, cases, references, resources scaffolding).

## Consultant program

The **consultant** certificate lives under `certificate-hair-loss-consultation-clinical-patient-coordination/` — do not mix consultant edits with doctor volume folders.
