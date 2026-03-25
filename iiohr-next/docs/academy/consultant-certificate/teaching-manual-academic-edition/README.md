---
# Pandoc / static-site front matter (optional)
document_type: academic_master_source
edition: IIOHR Consultant Stream — Master Academic Edition
version: "1.1"
status: committee_and_faculty_review
language: en-GB
aligned_programme_slug: certificate-hair-loss-consultation-clinical-patient-coordination
note: "Legacy Word manuals remain separate; this tree is the repo-native academic master."
---

# IIOHR Consultant Stream  
## Teaching Manual — Master Academic Edition

**Programme:** IIOHR Certificate in Hair Loss Consultation and Clinical Patient Coordination  
**Subtitle:** Academic master source · Aligned to the live Consultant Stream learning environment  
**Edition:** 1.1 (publication-readiness pass)  
**Date:** March 2025  

* * *

### Document status

| Field | Value |
|--------|--------|
| **Role** | Authoritative **academic master** for curriculum committees, faculty briefing, and versioned review — not a statutory scope-of-practice instrument |
| **Alignment** | Synchronised to Consultant Stream **Modules 1–15**, competency statements, assessment design, compliance notices, practical tasks, and Appendix A (supplementary HTML tools) |
| **Distinct from** | Legacy **Word** teaching manuals held outside this Markdown tree (historical authoring originals; reconcile periodically if both are maintained) |
| **Export** | Source format: **Markdown**; suitable for **DOCX** and **PDF** generation via the paths below |

* * *

## 1. Purpose

This folder holds the **Master Academic Edition** of the Consultant Stream teaching corpus: **three Volumes** plus **Appendix A**. It distils the curriculum into publication-grade prose for governance and faculty use, while remaining faithful to the **learning management system (LMS)** implementation.

Local law, professional registration, employment contracts, and clinic governance **supersede** any training document.

* * *

## 2. Scope and professional boundaries (read across all Volumes)

Learners develop competency in **consultation support, patient education, documentation, coordination, and escalation** within **doctor-led** (treating-clinician-led) hair restoration services.

The **programme does not** confer:

- independent diagnostic authority  
- independent prescribing authority  
- surgical planning authority, graft adjudication, or anaesthetic advice  
- substitution for **informed consent** obtained by the treating clinician  
- equivalence to regulated surgical or medical training  

Pedagogical emphasis: **capture, structure, document, support, coordinate, reassure within bounds, and escalate** when clinical judgement, consent validity, or risk exceeds the support role.

* * *

## 3. Volume map (Consultant Stream levels)

| Volume | Consultant Stream level | Modules (sequence) | Primary lineage (historical manual weeks) |
|--------|-------------------------|--------------------|----------------------------------------|
| **Volume 1** | Level 1 — Foundation Certificate | **Modules 1–5** | Historical Volume 1 (Weeks 1, 3, 4) plus Volume 2 Weeks 5–6 at foundation depth |
| **Volume 2** | Level 2 — Advanced Certificate | **Modules 6–10** | Historical Volume 1 Week 2 (ethics; placed in Level 2 in the LMS), Volume 2 Weeks 7–8, surgical-pathway bridge (**Module 9**), Volume 3 Week 9 (documentation) |
| **Volume 3** | Level 3 — Diploma | **Modules 11–15** | Historical Volume 3 (Weeks 10–12) including capstone integration |

**Sequencing note:** Ethics and statutory scope (historical Week 2) appear as **Module 6** after **Modules 1–5**, by LMS design: foundational role pressures first, then concentrated governance.

* * *

## 4. Files in this edition

| File | Contents |
|------|----------|
| [volume-1-foundation.md](./volume-1-foundation.md) | **Volume 1:** role, science literacy, presentations, consultation structure, screening |
| [volume-2-advanced.md](./volume-2-advanced.md) | **Volume 2:** ethics, communication, non-surgical education, **Module 9** bridge, documentation and handover |
| [volume-3-diploma.md](./volume-3-diploma.md) | **Volume 3:** pre-operative coordination, post-operative follow-up, difficult encounters, quality assurance, capstone |
| [appendix-asset-pack.md](./appendix-asset-pack.md) | **Appendix A:** supplementary HTML tools, identifiers, deployment notes |

* * *

## 5. Assessment and competency framework (edition note)

- **Automated knowledge checks** (e.g. multiple-choice, structured triage items) secure **scope-safe** responses; selected modules use **several items** per assessment to reduce chance success.  
- **Faculty-moderated** work demonstrates applied judgement: structured notes, handovers, ethics scenarios, communication tasks, high-risk dialogue, and the capstone.  
- **Mandatory safety domains** in the LMS (e.g. ethics and scope, red-flag judgement, escalation, documentation) identify **non-negotiable** failures that must not be averaged away across other items.  
- **Directed practice tasks** are worded to match the Volume learning outcomes and published rubrics.

* * *

## 6. Compliance notices (LMS)

The Consultant Stream surfaces four standing notices: **competency and scope of practice**, **no independent diagnostic authority**, **surgical training boundary**, and **mandatory escalation duty**. Module- and lesson-level attachment is **harmonised** with thematic risk (e.g. pre-operative and post-operative Modules stress non-clearance and non-diagnostic follow-up alongside escalation).

* * *

## 7. Relationship to legacy Word manuals

| Source | Use |
|--------|-----|
| **This Markdown edition** | Academic master; LMS-aligned; Git-versioned; primary input for **committee review** and **export** to house-style DOCX/PDF |
| **Legacy `.docx` manuals** | Historical or parallel authoring; may retain richer narrative or local examples — reconcile periodically or treat as adjunct readings |

* * *

## 8. How to publish

**Canonical pipeline:** [`publication/PUBLICATION_PLAN.md`](./publication/PUBLICATION_PLAN.md) (plan, package layout, source of truth) and [`publication/EXPORT_WORKFLOW.md`](./publication/EXPORT_WORKFLOW.md) (Pandoc commands, TOC/title pages, PDF options). **First official export:** [`publication/PUBLICATION_READINESS_CHECKLIST.md`](./publication/PUBLICATION_READINESS_CHECKLIST.md). **Versioning:** [`publication/VERSIONING.md`](./publication/VERSIONING.md). **Comms/design:** [`publication/internal/README.md`](./publication/internal/README.md). Scripts: [`publication/scripts/`](./publication/scripts/) (`export-consultant-academic-manual.ps1` / `.sh`). Outputs go to `publication/output/` (gitignored).

**Summary:** Generate **DOCX** with Pandoc (optional `publication/templates/reference.docx`). Add **TOC**, **title page**, and **page numbers** in Word. Prefer **Word → Save as PDF** for the first official PDF unless a LaTeX toolchain is already standardised.

### 8.3 When to use Markdown master vs legacy Word manuals

| Situation | Preferred source |
|-----------|------------------|
| Approving curriculum **as implemented** in the LMS | **Markdown Master Academic Edition** |
| Auditing **alignment** between classroom faculty pack and online learning | **Markdown** + LMS; diff against Word if needed |
| Preserving **original prose** or country-specific legal annexes not yet in LMS | **Legacy Word** until migrated |
| **Branded** prospectus or accredited submission | Export **from Markdown** (or merged Word) **after** editorial and legal sign-off |

* * *

## 9. Revision log

| Version | Date | Summary |
|---------|------|---------|
| 1.0 | — | Initial Master Academic Edition: Module 9 bridge, multi-item assessments, compliance harmonisation, HTML supplementary tools, section and programme overviews in LMS |
| 1.1 | March 2025 | Publication-readiness pass: terminology, front matter, assessment wording, “How to publish,” distinction from legacy Word |

**Maintenance:** Update this table when LMS **Modules**, lessons, assessments, **resources**, or compliance metadata change materially; bump **Edition** / **version** for traceable exports.

* * *

## 10. Terminology (this edition)

- **Programme** — the Certificate (British English in this document set).  
- **Consultant Stream** — the non-physician academy stream in the LMS.  
- **Consultant and nurse** — learner roles addressed together unless a Module specifies one cohort.  
- **Module** / **Volume** — capitalised when denoting curriculum units.  
- **LMS** — the deployed learning environment (identifiers in code remain American English, e.g. `programSlug`, per repository convention).
