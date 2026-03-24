# Academy persistence — database, RLS, services, pilot

Implementation-ready design for `iiohr-next` aligned with `src/lib/academy` and migration `supabase/migrations/20250325120000_academy_persistence.sql`.

---

## A. Postgres / Supabase schema (summary)

| Table | Purpose |
|--------|---------|
| `profiles` | Certificate-facing names (`legal_name`, `name_on_certificate`) and locale; `id` = `auth.users.id`. |
| `user_roles` | App roles: `admin`, `faculty`, `clinic_manager`. |
| `faculty_stream_scopes` | Optional: restrict faculty to one or more streams; empty = no extra restriction (all streams for faculty). |
| `academy_stream_memberships` | User ↔ stream (`doctors` \| `consultants`); unique `(user_id, stream_slug)`. |
| `program_enrollments` | User ↔ program; FK `(user_id, stream_slug)` → memberships; `program_slug` matches content registry; optional `cohort_id`, `clinic_id`; `content_rules_version` for reproducibility. |
| `lesson_completions` | Unique `(program_enrollment_id, lesson_id)`; `completion_source` enum. |
| `module_progress` | Denormalized `%` per module for fast reads; updated by `ProgressTrackingService`. |
| `assessment_attempts` | Unique `(program_enrollment_id, assessment_id, retry_index)`; `responses` JSONB; `faculty_review_status`. |
| `competency_records` | Unique `(program_enrollment_id, competency_id)`. |
| `competency_evidence` | Links evidence to `competency_records`; `source_type` + `source_id` (UUID). |
| `faculty_reviews` | Pilot: `assessment_attempt_id` FK; `reviewer_user_id`, `status`, `notes`. |
| `certificate_awards` | Issued credentials; `certificate_number`, `template_key`, `distinction`, `storage_path`, `verification_token`. |
| `applications` | Applicant stream/program; `application_status`. |
| `application_answers` | `(application_id, question_key)` with `answer` JSONB. |
| `application_consents` | Consent key/version, `accepted_at`, optional `text_hash`. |
| `admin_audit_log` | Append-only audit; `actor_user_id`, `action`, `entity_type`, `entity_id`, `metadata`. |

**Not in this migration (future):** `clinics`, `clinic_members`, `cohorts` tables — `clinic_id` / `cohort_id` are nullable UUID columns ready for FKs later.

---

## B. Enums and status fields

| Postgres enum | Values |
|---------------|--------|
| `membership_status` | `invited`, `active`, `suspended` |
| `enrollment_status` | `active`, `paused`, `completed`, `withdrawn` |
| `completion_source` | `self_complete`, `assessment_pass`, `faculty_override` |
| `faculty_review_status` | `not_required`, `pending`, `in_review`, `approved`, `revision_required` |
| `competency_status` | `not_started`, `in_progress`, `evidence_submitted`, `faculty_review`, `achieved`, `needs_remediation` |
| `competency_evidence_source` | `assessment_attempt`, `practical_task`, `faculty_review`, `lesson_completion` |
| `application_status` | `draft`, `submitted`, `under_review`, `accepted`, `rejected`, `waitlisted`, `withdrawn` |
| `app_user_role` | `admin`, `faculty`, `clinic_manager` |

**Mapping to UI:** `@/lib/academy/constants` uses kebab-case strings (e.g. `not-started`). Map at the API boundary: DB `not_started` ↔ `not-started`.

---

## C. RLS policy plan

**Helpers (SECURITY DEFINER):**

- `is_academy_admin()` — row in `user_roles` with `role = admin`.
- `is_faculty_user()` — row with `role = faculty`.
- `faculty_can_access_stream(stream_slug)` — if `faculty_stream_scopes` has rows for `auth.uid()`, require matching `stream_slug`; else allow all streams.
- `user_clinic_ids()` — placeholder returning empty; replace when clinic tenancy ships.

**Learner access:** `user_id = auth.uid()` on `program_enrollments` and child rows; insert/update on learner data only when enrollment belongs to caller (except where admin-only).

**Faculty access:** SELECT on enrollments, lesson/module/attempt/competency rows in streams allowed by `faculty_can_access_stream`. **Mutations** on learner progress tables are **owner or admin only** (split policies; faculty cannot DELETE/UPDATE learner rows). `faculty_reviews`: INSERT/UPDATE where `reviewer_user_id = auth.uid()`. To sync `assessment_attempts` after a review (score, `passed`, `faculty_review_status`), use an **admin client**, **SECURITY DEFINER RPC**, or a follow-up migration that adds a narrow faculty UPDATE policy on attempts in `pending`/`in_review` state.

**Admin access:** Full read/write via `is_academy_admin()` on all tables.

**Stream-specific:** Enforced via `program_enrollments.stream_slug` + `faculty_can_access_stream`.

**Clinic-scoped (later):** Add `clinic_members` + extend policies: `clinic_manager` may SELECT enrollments where `program_enrollments.clinic_id` matches their clinic; `user_clinic_ids()` returns allowed clinic UUIDs.

**Bootstrap:** First admin user must be inserted into `user_roles` via Supabase SQL editor or service role (RLS blocks non-admin).

**Admissions accept:** `program_enrollments` insert is admin-only. Use **admin client** in Edge Function or **SECURITY DEFINER RPC** `accept_application(application_id)` that inserts membership + enrollment + audit row.

---

## D. TypeScript domain types

- **DB row types:** `src/lib/academy/db/types.ts` — snake_case column names matching Postgres enums.
- **Domain / UI types:** Existing `operational-types.ts` and `constants.ts` remain for content engine; add **mappers** (e.g. `dbFacultyReviewStatusToUi`) when wiring Supabase.

---

## E. Service-layer responsibilities

| Service | Responsibility |
|---------|----------------|
| **Enrollment** | Resolve active enrollment; admin-only create (membership + enrollment); validate `(user_id, stream_slug)` alignment. |
| **Progress tracking** | Idempotent `lesson_completions` upsert; `refreshModuleProgress` loads curriculum from `content-loader` / registry, counts completed lessons vs module manifest, upserts `module_progress`. |
| **Assessment submission** | Allocate `retry_index`; compute `score`/`passed` from content + `responses`; set `faculty_review_status` if items require review; optional `grader_user_id`. |
| **Faculty review** | Queue pending attempts; insert/update `faculty_reviews`; sync attempt `faculty_review_status` + `passed` when approved. |
| **Certificate eligibility** | Load attempts, completions, competencies from DB; call existing pure functions (`getCertificateEligibilitySummary` in `certificate-service.ts`) with content from registry. |
| **Admissions** | Draft/submit `applications` + answers + consents; accept path creates membership + enrollment (elevated). |

---

## F. Minimal pilot implementation path

1. **Apply migration** in Supabase (dev project).
2. **Seed** one admin `user_roles` row; seed test learner + `academy_stream_memberships` + `program_enrollments` (admin SQL or dashboard).
3. **Server-only module** (e.g. route handler or server action) that:
   - Inserts `lesson_completions` for one `lesson_id` (enrollment id from session).
   - Calls `refreshModuleProgress` for that lesson’s `module_id` (from content).
   - Inserts `assessment_attempts` with `responses` JSONB and computed score (reuse `assessment-service` scoring).
   - Reads aggregates and calls `getCertificateEligibilitySummary` → expect **not eligible** (missing lessons/competencies/weighted score).
4. **No production UI** — return JSON in a dev-only API route or log in integration test.

**Safe rollout:** Feature flag `ACADEMY_PERSISTENCE_ENABLED`; dual-read from content-only first; then write-through to DB; keep RLS on in staging from day one.

---

## Related files

- Migration: `supabase/migrations/20250325120000_academy_persistence.sql`
- Row types: `src/lib/academy/db/types.ts`
- Service contracts: `src/lib/academy/services/academy-service-contracts.ts`
