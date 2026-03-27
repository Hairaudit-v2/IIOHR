-- Clinic manager visibility: explicit clinic membership + secure team snapshot RPC.
-- Additive; does not relax broad RLS on learner tables.

-- ---------------------------------------------------------------------------
-- Map clinic managers to clinics (admins insert; managers read own rows only)
-- ---------------------------------------------------------------------------
create table if not exists public.clinic_manager_clinics (
  user_id uuid not null references auth.users (id) on delete cascade,
  clinic_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (user_id, clinic_id)
);

create index if not exists clinic_manager_clinics_clinic_idx on public.clinic_manager_clinics (clinic_id);

alter table public.clinic_manager_clinics enable row level security;

create policy clinic_manager_clinics_select_own on public.clinic_manager_clinics
  for select using (user_id = auth.uid() or public.is_academy_admin());

create policy clinic_manager_clinics_insert_admin on public.clinic_manager_clinics
  for insert with check (public.is_academy_admin());

create policy clinic_manager_clinics_delete_admin on public.clinic_manager_clinics
  for delete using (public.is_academy_admin());

comment on table public.clinic_manager_clinics is
  'Links clinic_manager users to clinic_id scopes. Admins maintain; used by user_clinic_ids() and team snapshot authorization.';

grant select on public.clinic_manager_clinics to authenticated;

-- ---------------------------------------------------------------------------
-- Resolve clinic ids for the current user (membership table + enrollment-derived)
-- ---------------------------------------------------------------------------
create or replace function public.user_clinic_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select distinct cmc.clinic_id
  from public.clinic_manager_clinics cmc
  where cmc.user_id = auth.uid()
  union
  select distinct pe.clinic_id
  from public.program_enrollments pe
  where pe.user_id = auth.uid()
    and pe.clinic_id is not null;
$$;

-- ---------------------------------------------------------------------------
-- Whether the caller may load team data for a clinic (admins always)
-- ---------------------------------------------------------------------------
create or replace function public.is_clinic_manager_for_clinic(p_clinic_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_academy_admin()
    or (
      exists (
        select 1 from public.user_roles ur
        where ur.user_id = auth.uid() and ur.role = 'clinic_manager'
      )
      and (
        exists (
          select 1 from public.clinic_manager_clinics cmc
          where cmc.user_id = auth.uid() and cmc.clinic_id = p_clinic_id
        )
        or exists (
          select 1 from public.program_enrollments pe
          where pe.user_id = auth.uid()
            and pe.clinic_id = p_clinic_id
        )
      )
    );
$$;

-- ---------------------------------------------------------------------------
-- Aggregated team snapshot for clinic dashboard (no direct table reads needed)
-- ---------------------------------------------------------------------------
create or replace function public.get_clinic_team_snapshot(p_clinic_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_result jsonb;
begin
  if not public.is_clinic_manager_for_clinic(p_clinic_id) then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  select coalesce(
    (
      select jsonb_agg(
        jsonb_build_object(
          'enrollment_id', q.enrollment_id,
          'user_id', q.user_id,
          'display_name', q.display_name,
          'stream_slug', q.stream_slug,
          'program_slug', q.program_slug,
          'enrollment_status', q.enrollment_status,
          'progress_percent', q.progress_percent,
          'certificate_count', q.certificate_count,
          'last_activity_at', q.last_activity_at
        )
        order by q.enrolled_at desc
      )
      from (
        select
          e.id as enrollment_id,
          e.user_id,
          coalesce(nullif(trim(pr.display_name), ''), nullif(trim(pr.full_name), '')) as display_name,
          e.stream_slug::text as stream_slug,
          e.program_slug::text as program_slug,
          e.status::text as enrollment_status,
          e.enrolled_at,
          coalesce(
            (select round(avg(mp.percent_complete))::int from public.module_progress mp where mp.program_enrollment_id = e.id),
            0
          ) as progress_percent,
          coalesce(
            (select count(*)::int from public.certificate_awards ca where ca.program_enrollment_id = e.id),
            0
          ) as certificate_count,
          nullif(
            greatest(
              coalesce(
                (select max(mp2.updated_at) from public.module_progress mp2 where mp2.program_enrollment_id = e.id),
                '-infinity'::timestamptz
              ),
              coalesce(
                (select max(lc.completed_at) from public.lesson_completions lc where lc.program_enrollment_id = e.id),
                '-infinity'::timestamptz
              )
            ),
            '-infinity'::timestamptz
          ) as last_activity_at
        from public.program_enrollments e
        left join public.profiles pr on pr.id = e.user_id
        where e.clinic_id = p_clinic_id
          and e.status in ('active', 'paused', 'completed')
      ) q
    ),
    '[]'::jsonb
  )
  into v_result;

  return v_result;
end;
$$;

comment on function public.get_clinic_team_snapshot(uuid) is
  'Returns JSON array of team member training summaries for an authorized clinic manager. Uses SECURITY DEFINER; enforces is_clinic_manager_for_clinic.';

grant execute on function public.user_clinic_ids() to authenticated;
grant execute on function public.is_clinic_manager_for_clinic(uuid) to authenticated;
grant execute on function public.get_clinic_team_snapshot(uuid) to authenticated;
