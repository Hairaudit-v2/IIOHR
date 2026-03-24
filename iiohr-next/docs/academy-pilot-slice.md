# Academy operational pilot — plan and rollout

## A. Implementation plan (vertical slice)

1. **Supabase client (server-only)** — `createSupabaseServerClient()` using `@supabase/ssr` + Next cookies so RLS runs as the signed-in learner.
2. **Session middleware** — refresh auth cookies on navigations so server actions see a valid session.
3. **Progress** — `markLessonComplete` (upsert `lesson_completions`), `refreshModuleProgress` (compute % from content manifest + completions, upsert `module_progress`), `getLearnerModuleProgressSummary` (read model for one module).
4. **Assessment** — resolve next `retry_index`, score auto-gradable items, set `faculty_review_status` to `pending` when `facultyReviewRequired`, persist `responses` JSONB, set `passed` via `isAssessmentPassed`.
5. **Eligibility** — load enrollment + completions + attempts + content; compute module-scoped lesson/assessment %; detect faculty queue; run `getCertificateEligibilitySummary` for full rules; expose `AcademyEligibilityReadModel`.
6. **Pilot route** — `/doctors/pilot-academy` with server actions only (no client state libraries); dynamic render; clear errors when env or enrollment missing.

## B. Files to add/change

| Path | Purpose |
|------|---------|
| `src/lib/supabase/server.ts` | Server Supabase client |
| `middleware.ts` | Auth cookie refresh |
| `src/lib/academy/db/supabase-mappers.ts` | DB ↔ operational types |
| `src/lib/academy/services/score-assessment-responses.ts` | Pure scoring |
| `src/lib/academy/services/progress-tracking-service.ts` | Progress tracking impl |
| `src/lib/academy/services/assessment-submission-service.ts` | Assessment impl |
| `src/lib/academy/services/certificate-eligibility-service.ts` | Eligibility read model |
| `src/lib/academy/pilot/constants.ts` | Pilot program/module IDs |
| `src/lib/academy/certificate-types.ts` | `AcademyEligibilityReadModel` |
| `src/lib/academy/services/academy-service-contracts.ts` | Extended contracts |
| `src/app/doctors/pilot-academy/page.tsx` | Pilot UI (minimal) |
| `src/app/doctors/pilot-academy/actions.ts` | Server actions |
| `docs/academy-faculty-review-architecture.md` | Faculty write strategy |
| `.env.example` | Supabase vars |

## C. Schema refinements

None required for this slice. Existing unique constraints support `upsert` on `lesson_completions` and `module_progress`.

Optional follow-up: add a **narrow RPC** `finalize_faculty_review(attempt_id, ...)` if review workflows need more than service-role updates (see faculty doc).

## D. Rollout

1. Apply existing SQL migration to Supabase project.
2. Seed one learner: `auth.users` + `profiles` + `academy_stream_memberships` + `program_enrollments` (admin SQL or dashboard).
3. Grant `user_roles` admin only for bootstrap; pilot learner uses anon key + RLS.
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` locally (see `.env.example`).
5. Open `/doctors/pilot-academy` signed in as the seeded learner; use the two server actions to mark a lesson and submit an assessment.

## Implementation status

Delivered: Supabase server client, middleware session refresh, `ProgressTrackingService`, `AssessmentSubmissionService`, `CertificateEligibilityService` (read model), pilot route under `/doctors/pilot-academy`, faculty review guidance in `docs/academy-faculty-review-architecture.md`.

Build fixes (unrelated to pilot behaviour): `fullProgram.ts` JSON exports no longer reference missing `types` aliases; program pages use `getProgramComplianceNotices(programSlug)` for compliance panels.
