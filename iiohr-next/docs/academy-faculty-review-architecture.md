# Faculty review writes and assessment sync

## Chosen approach: **narrow `SECURITY DEFINER` RPCs**

RLS intentionally avoids broad `UPDATE` on `assessment_attempts` for faculty. Instead:

1. **`academy_faculty_claim_attempt(p_attempt_id uuid)`**  
   - `pending` → `in_review`  
   - Caller must be **faculty** (or **admin**) and pass **stream scope** (`faculty_stream_scopes` when populated).

2. **`academy_faculty_finalize_attempt(p_attempt_id, p_outcome, p_notes, p_rubric_summary)`**  
   - `p_outcome`: `approved` | `revision_required` | `rejected`  
   - Inserts **`faculty_reviews`** (reviewer = `auth.uid()`, `reviewed_at` = now)  
   - Updates **`assessment_attempts`**: `faculty_review_status`, **`passed`** (on approve: score ≥ `assessment_pass_mark_snapshot`), `grader_user_id`  
   - Appends **`admin_audit_log`**

Migrations: `20250326120000_faculty_review_rpc.sql` (after base persistence migration).

## Application layer

- `createFacultyReviewService(supabase)` in `src/lib/academy/services/faculty-review-persistence.ts` calls `.rpc(...)` with the **signed-in** faculty user (JWT).  
- Minimal UI: `/doctors/faculty-review-pilot` (faculty/admin only).

## Snapshot column

`assessment_attempts.assessment_pass_mark_snapshot` is set at **learner submit** so the RPC can compute `passed` without reading CMS content inside Postgres.

## Alternative

A single **Edge Function** with **service role** could mirror the same checks; RPC keeps logic in the database and one round trip.
