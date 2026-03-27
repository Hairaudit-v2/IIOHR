-- Internal curriculum preview role: Next.js RBAC only (see src/lib/auth/iiohr-post-login.ts).
-- Does not grant is_academy_admin() or admissions/faculty tooling in Postgres RLS.
alter type public.app_user_role add value if not exists 'academy_preview';

comment on type public.app_user_role is 'App-level roles: admin (admissions + full platform), faculty (review + curriculum), clinic_manager, academy_preview (read-only curriculum navigation across streams).';
