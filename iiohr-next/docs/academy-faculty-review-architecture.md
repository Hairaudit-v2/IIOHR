# Faculty review writes and assessment sync

## Recommended approach: **narrow SECURITY DEFINER RPC** (or Edge Function with service role)

**Why not direct RLS updates for faculty?**

- Broad “faculty can UPDATE `assessment_attempts`” policies are easy to get wrong (column-level leakage, privilege escalation, or accidental overwrites).
- Current RLS intentionally restricts mutations on learner progress to **enrollment owner + admin** so faculty cannot delete or overwrite arbitrary rows.

**Why not service-role-only mediation everywhere?**

- Service role bypasses RLS; every call must be audited and validated in application code. Centralizing in **one RPC** or **one Edge Function** keeps validation and audit in a single place and avoids scattering `createClient(SERVICE_ROLE)` across the app.

**Recommended pattern**

1. **Narrow RPC** `finalize_faculty_review(attempt_id uuid, decision text, notes text)` marked `SECURITY DEFINER` that:
   - validates caller is faculty (via `user_roles` + optional `faculty_stream_scopes` against enrollment’s `stream_slug`);
   - updates `faculty_reviews` and the linked `assessment_attempts` (`faculty_review_status`, `passed`, `score` if needed) in one transaction;
   - writes `admin_audit_log`.

2. **Alternative:** Edge Function with service role + the same checks — equivalent security if the function is the only entry point.

**Pilot**

- Pilot does **not** implement review; submissions may set `faculty_review_status` to `pending`. Syncing outcomes stays deferred to the RPC/service-role path above.
