-- Academy persistence core (Postgres / Supabase)
-- Apply after auth.users exists. Run with Supabase CLI or SQL editor.
-- If `public.profiles` already exists in your project, merge these columns/policies manually instead of running this file verbatim.

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums (status fields — prefer enums for constrained lifecycles)
-- ---------------------------------------------------------------------------
create type public.membership_status as enum ('invited', 'active', 'suspended');

create type public.enrollment_status as enum ('active', 'paused', 'completed', 'withdrawn');

create type public.completion_source as enum (
  'self_complete',
  'assessment_pass',
  'faculty_override'
);

create type public.faculty_review_status as enum (
  'not_required',
  'pending',
  'in_review',
  'approved',
  'revision_required'
);

create type public.competency_status as enum (
  'not_started',
  'in_progress',
  'evidence_submitted',
  'faculty_review',
  'achieved',
  'needs_remediation'
);

create type public.competency_evidence_source as enum (
  'assessment_attempt',
  'practical_task',
  'faculty_review',
  'lesson_completion'
);

create type public.application_status as enum (
  'draft',
  'submitted',
  'under_review',
  'accepted',
  'rejected',
  'waitlisted',
  'withdrawn'
);

create type public.app_user_role as enum ('admin', 'faculty', 'clinic_manager');

-- ---------------------------------------------------------------------------
-- Profiles (certificate-facing fields; extends auth identity)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  full_name text,
  legal_name text,
  name_on_certificate text,
  locale text,
  timezone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.profiles.legal_name is 'Legal name for certificates and formal records.';
comment on column public.profiles.name_on_certificate is 'Optional override when different from legal_name.';

-- ---------------------------------------------------------------------------
-- Role grants (app-level; not Supabase auth.roles)
-- ---------------------------------------------------------------------------
create table public.user_roles (
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.app_user_role not null,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create index user_roles_role_idx on public.user_roles (role);

-- Optional: limit faculty reviewers to streams (null = unrestricted for pilot)
create table public.faculty_stream_scopes (
  user_id uuid not null references auth.users (id) on delete cascade,
  stream_slug text not null check (stream_slug in ('doctors', 'consultants')),
  created_at timestamptz not null default now(),
  primary key (user_id, stream_slug)
);

-- ---------------------------------------------------------------------------
-- Stream membership & program enrollment
-- ---------------------------------------------------------------------------
create table public.academy_stream_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  stream_slug text not null check (stream_slug in ('doctors', 'consultants')),
  status public.membership_status not null default 'active',
  is_primary boolean not null default true,
  created_at timestamptz not null default now(),
  unique (user_id, stream_slug)
);

create index academy_stream_memberships_user_idx on public.academy_stream_memberships (user_id);

create table public.program_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  stream_slug text not null check (stream_slug in ('doctors', 'consultants')),
  program_slug text not null,
  academy_stream_membership_id uuid not null references public.academy_stream_memberships (id) on delete restrict,
  status public.enrollment_status not null default 'active',
  cohort_id uuid null,
  clinic_id uuid null,
  content_rules_version text null,
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz null,
  unique (user_id, program_slug),
  constraint program_enrollments_stream_alignment foreign key (user_id, stream_slug) references public.academy_stream_memberships (user_id, stream_slug)
);

create index program_enrollments_user_idx on public.program_enrollments (user_id);
create index program_enrollments_stream_program_idx on public.program_enrollments (stream_slug, program_slug);

-- ---------------------------------------------------------------------------
-- Progress & completions
-- ---------------------------------------------------------------------------
create table public.lesson_completions (
  id uuid primary key default gen_random_uuid(),
  program_enrollment_id uuid not null references public.program_enrollments (id) on delete cascade,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  duration_minutes integer null check (duration_minutes is null or duration_minutes >= 0),
  completion_source public.completion_source not null default 'self_complete',
  unique (program_enrollment_id, lesson_id)
);

create index lesson_completions_enrollment_idx on public.lesson_completions (program_enrollment_id);

-- Denormalized module progress (updated by app/service after lesson/assessment events)
create table public.module_progress (
  id uuid primary key default gen_random_uuid(),
  program_enrollment_id uuid not null references public.program_enrollments (id) on delete cascade,
  module_id text not null,
  percent_complete smallint not null default 0 check (percent_complete >= 0 and percent_complete <= 100),
  completed_at timestamptz null,
  updated_at timestamptz not null default now(),
  unique (program_enrollment_id, module_id)
);

create index module_progress_enrollment_idx on public.module_progress (program_enrollment_id);

-- ---------------------------------------------------------------------------
-- Assessments
-- ---------------------------------------------------------------------------
create table public.assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  program_enrollment_id uuid not null references public.program_enrollments (id) on delete cascade,
  assessment_id text not null,
  retry_index integer not null default 0 check (retry_index >= 0),
  submitted_at timestamptz null,
  score numeric(5, 2) null check (score is null or (score >= 0 and score <= 100)),
  passed boolean not null default false,
  faculty_review_status public.faculty_review_status not null default 'not_required',
  responses jsonb not null default '{}'::jsonb,
  grader_user_id uuid null references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (program_enrollment_id, assessment_id, retry_index)
);

create index assessment_attempts_enrollment_assessment_idx on public.assessment_attempts (program_enrollment_id, assessment_id);
create index assessment_attempts_faculty_queue_idx on public.assessment_attempts (faculty_review_status)
  where faculty_review_status in ('pending', 'in_review');

-- ---------------------------------------------------------------------------
-- Competencies
-- ---------------------------------------------------------------------------
create table public.competency_records (
  id uuid primary key default gen_random_uuid(),
  program_enrollment_id uuid not null references public.program_enrollments (id) on delete cascade,
  competency_id text not null,
  status public.competency_status not null default 'not_started',
  achieved_at timestamptz null,
  updated_at timestamptz not null default now(),
  unique (program_enrollment_id, competency_id)
);

create table public.competency_evidence (
  id uuid primary key default gen_random_uuid(),
  competency_record_id uuid not null references public.competency_records (id) on delete cascade,
  source_type public.competency_evidence_source not null,
  source_id uuid not null,
  accepted boolean not null default false,
  verified_at timestamptz null,
  verified_by uuid null references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index competency_evidence_record_idx on public.competency_evidence (competency_record_id);

-- ---------------------------------------------------------------------------
-- Faculty reviews (pilot: targets assessment attempts; extend later)
-- ---------------------------------------------------------------------------
create table public.faculty_reviews (
  id uuid primary key default gen_random_uuid(),
  assessment_attempt_id uuid not null references public.assessment_attempts (id) on delete cascade,
  reviewer_user_id uuid not null references auth.users (id) on delete restrict,
  status public.faculty_review_status not null,
  rubric_summary text null,
  notes text null,
  reviewed_at timestamptz null,
  created_at timestamptz not null default now()
);

create index faculty_reviews_attempt_idx on public.faculty_reviews (assessment_attempt_id);
create index faculty_reviews_reviewer_idx on public.faculty_reviews (reviewer_user_id);

-- ---------------------------------------------------------------------------
-- Certificates
-- ---------------------------------------------------------------------------
create table public.certificate_awards (
  id uuid primary key default gen_random_uuid(),
  program_enrollment_id uuid not null references public.program_enrollments (id) on delete restrict,
  program_slug text not null,
  level_id text null,
  certificate_number text not null unique,
  template_key text not null,
  distinction boolean not null default false,
  issued_at timestamptz not null default now(),
  storage_path text null,
  verification_token text null unique,
  created_at timestamptz not null default now()
);

create index certificate_awards_enrollment_idx on public.certificate_awards (program_enrollment_id);

-- ---------------------------------------------------------------------------
-- Admissions
-- ---------------------------------------------------------------------------
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  target_stream_slug text not null check (target_stream_slug in ('doctors', 'consultants')),
  target_program_slug text null,
  status public.application_status not null default 'draft',
  submitted_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index applications_user_idx on public.applications (user_id);
create index applications_status_idx on public.applications (status);

create table public.application_answers (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  question_key text not null,
  answer jsonb not null,
  unique (application_id, question_key)
);

create table public.application_consents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  consent_key text not null,
  consent_version text not null,
  accepted_at timestamptz not null,
  text_hash text null,
  unique (application_id, consent_key)
);

-- ---------------------------------------------------------------------------
-- Audit
-- ---------------------------------------------------------------------------
create table public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid null references auth.users (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index admin_audit_log_entity_idx on public.admin_audit_log (entity_type, entity_id);
create index admin_audit_log_created_idx on public.admin_audit_log (created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.faculty_stream_scopes enable row level security;
alter table public.academy_stream_memberships enable row level security;
alter table public.program_enrollments enable row level security;
alter table public.lesson_completions enable row level security;
alter table public.module_progress enable row level security;
alter table public.assessment_attempts enable row level security;
alter table public.competency_records enable row level security;
alter table public.competency_evidence enable row level security;
alter table public.faculty_reviews enable row level security;
alter table public.certificate_awards enable row level security;
alter table public.applications enable row level security;
alter table public.application_answers enable row level security;
alter table public.application_consents enable row level security;
alter table public.admin_audit_log enable row level security;

-- Helper predicates (SECURITY DEFINER to avoid RLS recursion on role checks)
create or replace function public.is_academy_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid() and ur.role = 'admin'
  );
$$;

create or replace function public.is_faculty_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid() and ur.role = 'faculty'
  );
$$;

create or replace function public.faculty_can_access_stream(p_stream_slug text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select case
    when not public.is_faculty_user() then false
    when exists (select 1 from public.faculty_stream_scopes f where f.user_id = auth.uid()) then exists (
      select 1 from public.faculty_stream_scopes f
      where f.user_id = auth.uid() and f.stream_slug = p_stream_slug
    )
    else true
  end;
$$;

-- Future: clinic managers see enrollments where clinic_id matches membership
create or replace function public.user_clinic_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select null::uuid where false;
$$;

-- Profiles: self read/update; admin read all
create policy profiles_select_own on public.profiles
  for select using (id = auth.uid() or public.is_academy_admin());

create policy profiles_update_own on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy profiles_insert_own on public.profiles
  for insert with check (id = auth.uid());

-- User roles: only admins manage; users can read own roles (optional — disable if prefer service-only)
create policy user_roles_select on public.user_roles
  for select using (user_id = auth.uid() or public.is_academy_admin());

create policy user_roles_admin_all on public.user_roles
  for all using (public.is_academy_admin()) with check (public.is_academy_admin());

create policy faculty_stream_scopes_admin on public.faculty_stream_scopes
  for all using (public.is_academy_admin()) with check (public.is_academy_admin());

create policy faculty_stream_scopes_self_read on public.faculty_stream_scopes
  for select using (user_id = auth.uid());

-- Learner-owned stream membership
create policy stream_memberships_own on public.academy_stream_memberships
  for select using (user_id = auth.uid() or public.is_academy_admin());

create policy stream_memberships_insert_admin on public.academy_stream_memberships
  for insert with check (public.is_academy_admin());

create policy stream_memberships_update_admin on public.academy_stream_memberships
  for update using (public.is_academy_admin());

-- Program enrollments: learner sees own; faculty sees stream-scoped; admin all
create policy program_enrollments_select on public.program_enrollments
  for select using (
    user_id = auth.uid()
    or public.is_academy_admin()
    or (public.is_faculty_user() and public.faculty_can_access_stream(stream_slug))
  );

-- Enrollments are created by admissions acceptance / admin / service role (not self-serve in MVP).
create policy program_enrollments_insert on public.program_enrollments
  for insert with check (public.is_academy_admin());

create policy program_enrollments_update_own_paused on public.program_enrollments
  for update using (user_id = auth.uid() or public.is_academy_admin())
  with check (user_id = auth.uid() or public.is_academy_admin());

-- Child tables: faculty can SELECT; mutations limited to enrollment owner or admin (not faculty DELETE).

create policy lesson_completions_select on public.lesson_completions
  for select using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id
        and (
          pe.user_id = auth.uid()
          or public.is_academy_admin()
          or (public.is_faculty_user() and public.faculty_can_access_stream(pe.stream_slug))
        )
    )
  );

create policy lesson_completions_insert on public.lesson_completions
  for insert with check (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy lesson_completions_update on public.lesson_completions
  for update using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  )
  with check (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy lesson_completions_delete on public.lesson_completions
  for delete using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy module_progress_select on public.module_progress
  for select using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id
        and (
          pe.user_id = auth.uid()
          or public.is_academy_admin()
          or (public.is_faculty_user() and public.faculty_can_access_stream(pe.stream_slug))
        )
    )
  );

create policy module_progress_insert on public.module_progress
  for insert with check (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy module_progress_update on public.module_progress
  for update using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  )
  with check (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy module_progress_delete on public.module_progress
  for delete using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy assessment_attempts_select on public.assessment_attempts
  for select using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id
        and (
          pe.user_id = auth.uid()
          or public.is_academy_admin()
          or (public.is_faculty_user() and public.faculty_can_access_stream(pe.stream_slug))
        )
    )
  );

create policy assessment_attempts_insert on public.assessment_attempts
  for insert with check (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy assessment_attempts_update on public.assessment_attempts
  for update using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  )
  with check (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy assessment_attempts_delete on public.assessment_attempts
  for delete using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy competency_records_select on public.competency_records
  for select using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id
        and (
          pe.user_id = auth.uid()
          or public.is_academy_admin()
          or (public.is_faculty_user() and public.faculty_can_access_stream(pe.stream_slug))
        )
    )
  );

create policy competency_records_insert on public.competency_records
  for insert with check (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy competency_records_update on public.competency_records
  for update using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  )
  with check (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy competency_records_delete on public.competency_records
  for delete using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy competency_evidence_select on public.competency_evidence
  for select using (
    exists (
      select 1 from public.competency_records cr
      join public.program_enrollments pe on pe.id = cr.program_enrollment_id
      where cr.id = competency_record_id
        and (
          pe.user_id = auth.uid()
          or public.is_academy_admin()
          or (public.is_faculty_user() and public.faculty_can_access_stream(pe.stream_slug))
        )
    )
  );

create policy competency_evidence_insert on public.competency_evidence
  for insert with check (
    exists (
      select 1 from public.competency_records cr
      join public.program_enrollments pe on pe.id = cr.program_enrollment_id
      where cr.id = competency_record_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy competency_evidence_update on public.competency_evidence
  for update using (
    exists (
      select 1 from public.competency_records cr
      join public.program_enrollments pe on pe.id = cr.program_enrollment_id
      where cr.id = competency_record_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  )
  with check (
    exists (
      select 1 from public.competency_records cr
      join public.program_enrollments pe on pe.id = cr.program_enrollment_id
      where cr.id = competency_record_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy competency_evidence_delete on public.competency_evidence
  for delete using (
    exists (
      select 1 from public.competency_records cr
      join public.program_enrollments pe on pe.id = cr.program_enrollment_id
      where cr.id = competency_record_id and (pe.user_id = auth.uid() or public.is_academy_admin())
    )
  );

-- Faculty reviews: reviewers insert/update own rows; learners read reviews on own attempts
create policy faculty_reviews_select on public.faculty_reviews
  for select using (
    reviewer_user_id = auth.uid()
    or public.is_academy_admin()
    or exists (
      select 1 from public.assessment_attempts a
      join public.program_enrollments pe on pe.id = a.program_enrollment_id
      where a.id = assessment_attempt_id and pe.user_id = auth.uid()
    )
    or (public.is_faculty_user() and exists (
      select 1 from public.assessment_attempts a
      join public.program_enrollments pe on pe.id = a.program_enrollment_id
      where a.id = assessment_attempt_id and public.faculty_can_access_stream(pe.stream_slug)
    ))
  );

create policy faculty_reviews_write on public.faculty_reviews
  for insert with check (
    public.is_academy_admin()
    or (reviewer_user_id = auth.uid() and public.is_faculty_user())
  );

create policy faculty_reviews_update on public.faculty_reviews
  for update using (reviewer_user_id = auth.uid() or public.is_academy_admin());

-- Certificates: learners read own; admin all; faculty stream read (support)
create policy certificate_awards_select on public.certificate_awards
  for select using (
    exists (
      select 1 from public.program_enrollments pe
      where pe.id = program_enrollment_id
        and (
          pe.user_id = auth.uid()
          or public.is_academy_admin()
          or (public.is_faculty_user() and public.faculty_can_access_stream(pe.stream_slug))
        )
    )
  );

create policy certificate_awards_insert on public.certificate_awards
  for insert with check (public.is_academy_admin());

-- Applications: own rows + admin
create policy applications_own on public.applications
  for all using (user_id = auth.uid() or public.is_academy_admin())
  with check (user_id = auth.uid() or public.is_academy_admin());

create policy application_answers_own on public.application_answers
  for all using (
    exists (
      select 1 from public.applications a
      where a.id = application_id and (a.user_id = auth.uid() or public.is_academy_admin())
    )
  )
  with check (
    exists (
      select 1 from public.applications a
      where a.id = application_id and (a.user_id = auth.uid() or public.is_academy_admin())
    )
  );

create policy application_consents_own on public.application_consents
  for all using (
    exists (
      select 1 from public.applications a
      where a.id = application_id and (a.user_id = auth.uid() or public.is_academy_admin())
    )
  )
  with check (
    exists (
      select 1 from public.applications a
      where a.id = application_id and (a.user_id = auth.uid() or public.is_academy_admin())
    )
  );

-- Audit: admin read; insert via service with service role or admin only
create policy admin_audit_log_select on public.admin_audit_log
  for select using (public.is_academy_admin());

create policy admin_audit_log_insert on public.admin_audit_log
  for insert with check (public.is_academy_admin());

-- ---------------------------------------------------------------------------
-- Grants (authenticated users; RLS enforces row access)
-- ---------------------------------------------------------------------------
grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage on all sequences in schema public to authenticated;

revoke delete on table public.admin_audit_log from authenticated;
