-- Clinic team placements & invites (clinic managers only via SECURITY DEFINER RPCs).
-- Additive; no broad grants on learner tables.

create type public.clinic_team_member_status as enum ('invited', 'active', 'paused', 'completed');

create table public.clinic_team_members (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null,
  user_id uuid references auth.users (id) on delete set null,
  invite_email text,
  member_status public.clinic_team_member_status not null default 'invited',
  target_stream_slug text not null check (target_stream_slug in ('doctors', 'consultants')),
  target_program_slug text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint clinic_team_members_invite_or_user check (
    user_id is not null
    or (invite_email is not null and length(trim(invite_email)) > 0)
  )
);

create unique index clinic_team_members_clinic_user_unique
  on public.clinic_team_members (clinic_id, user_id)
  where user_id is not null;

create unique index clinic_team_members_clinic_email_unique
  on public.clinic_team_members (clinic_id, invite_email)
  where invite_email is not null;

create index clinic_team_members_clinic_idx on public.clinic_team_members (clinic_id);

alter table public.clinic_team_members enable row level security;

comment on table public.clinic_team_members is
  'Clinic-scoped pathway intent, invites, and status. Mutations via clinic_* RPCs; not exposed for direct client reads.';

-- ---------------------------------------------------------------------------
-- Team snapshot: enrollments merged with clinic_team_members + pending invites
-- ---------------------------------------------------------------------------
create or replace function public.get_clinic_team_snapshot(p_clinic_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_enrollments jsonb;
  v_invites jsonb;
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
          'last_activity_at', q.last_activity_at,
          'member_record_id', q.member_record_id,
          'assignment_status', q.assignment_status,
          'assigned_pathway_stream', q.assigned_pathway_stream,
          'assigned_pathway_program', q.assigned_pathway_program
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
          ) as last_activity_at,
          ctm.id as member_record_id,
          case
            when ctm.id is not null then ctm.member_status::text
            when e.status::text = 'active' then 'active'
            when e.status::text = 'paused' then 'paused'
            when e.status::text = 'completed' then 'completed'
            else e.status::text
          end as assignment_status,
          coalesce(ctm.target_stream_slug::text, e.stream_slug::text) as assigned_pathway_stream,
          coalesce(ctm.target_program_slug, e.program_slug::text) as assigned_pathway_program
        from public.program_enrollments e
        left join public.profiles pr on pr.id = e.user_id
        left join public.clinic_team_members ctm
          on ctm.clinic_id = e.clinic_id
          and ctm.user_id = e.user_id
        where e.clinic_id = p_clinic_id
          and e.status in ('active', 'paused', 'completed')
      ) q
    ),
    '[]'::jsonb
  )
  into v_enrollments;

  select coalesce(
    (
      select jsonb_agg(
        jsonb_build_object(
          'member_id', ctm.id,
          'invite_email', ctm.invite_email,
          'target_stream_slug', ctm.target_stream_slug::text,
          'target_program_slug', ctm.target_program_slug,
          'member_status', ctm.member_status::text
        )
        order by ctm.created_at desc
      )
      from public.clinic_team_members ctm
      where ctm.clinic_id = p_clinic_id
        and ctm.user_id is null
        and ctm.member_status = 'invited'
        and ctm.invite_email is not null
    ),
    '[]'::jsonb
  )
  into v_invites;

  return jsonb_build_object(
    'enrollments', coalesce(v_enrollments, '[]'::jsonb),
    'pending_invites', coalesce(v_invites, '[]'::jsonb)
  );
end;
$$;

comment on function public.get_clinic_team_snapshot(uuid) is
  'JSON object: enrollments (merged with clinic_team_members) and pending_invites. SECURITY DEFINER.';

create or replace function public.clinic_invite_team_member(
  p_clinic_id uuid,
  p_invite_email text,
  p_target_stream_slug text,
  p_target_program_slug text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_email text;
begin
  if not public.is_clinic_manager_for_clinic(p_clinic_id) then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  v_email := lower(trim(p_invite_email));
  if v_email is null or length(v_email) < 3 or position('@' in v_email) = 0 then
    raise exception 'invalid email' using errcode = '22023';
  end if;

  if p_target_stream_slug not in ('doctors', 'consultants') then
    raise exception 'invalid stream' using errcode = '22023';
  end if;

  select ctm.id into v_id
  from public.clinic_team_members ctm
  where ctm.clinic_id = p_clinic_id
    and ctm.invite_email = v_email
    and ctm.user_id is null;

  if v_id is not null then
    update public.clinic_team_members
    set
      target_stream_slug = p_target_stream_slug,
      target_program_slug = nullif(trim(p_target_program_slug), ''),
      updated_at = now()
    where id = v_id;
    return v_id;
  end if;

  insert into public.clinic_team_members (
    clinic_id,
    invite_email,
    member_status,
    target_stream_slug,
    target_program_slug
  )
  values (
    p_clinic_id,
    v_email,
    'invited',
    p_target_stream_slug,
    nullif(trim(p_target_program_slug), '')
  )
  returning id into v_id;

  return v_id;
end;
$$;

create or replace function public.clinic_upsert_member_pathway(
  p_clinic_id uuid,
  p_user_id uuid,
  p_target_stream_slug text,
  p_target_program_slug text default null,
  p_member_status text default 'active'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_status public.clinic_team_member_status;
begin
  if not public.is_clinic_manager_for_clinic(p_clinic_id) then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  if p_target_stream_slug not in ('doctors', 'consultants') then
    raise exception 'invalid stream' using errcode = '22023';
  end if;

  if not exists (
    select 1 from public.program_enrollments pe
    where pe.clinic_id = p_clinic_id
      and pe.user_id = p_user_id
  ) then
    raise exception 'user has no enrollment under this clinic' using errcode = '23503';
  end if;

  begin
    v_status := p_member_status::public.clinic_team_member_status;
  exception when others then
    v_status := 'active';
  end;

  select ctm.id into v_id
  from public.clinic_team_members ctm
  where ctm.clinic_id = p_clinic_id
    and ctm.user_id = p_user_id;

  if v_id is not null then
    update public.clinic_team_members
    set
      target_stream_slug = p_target_stream_slug,
      target_program_slug = nullif(trim(p_target_program_slug), ''),
      member_status = v_status,
      updated_at = now()
    where id = v_id;
    return v_id;
  end if;

  insert into public.clinic_team_members (
    clinic_id,
    user_id,
    invite_email,
    member_status,
    target_stream_slug,
    target_program_slug
  )
  values (
    p_clinic_id,
    p_user_id,
    null,
    v_status,
    p_target_stream_slug,
    nullif(trim(p_target_program_slug), '')
  )
  returning id into v_id;

  return v_id;
end;
$$;

create or replace function public.clinic_update_member_status(
  p_member_id uuid,
  p_target_status text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_clinic uuid;
  v_status public.clinic_team_member_status;
begin
  select ctm.clinic_id into v_clinic
  from public.clinic_team_members ctm
  where ctm.id = p_member_id;

  if v_clinic is null then
    raise exception 'not found' using errcode = 'P0002';
  end if;

  if not public.is_clinic_manager_for_clinic(v_clinic) then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  v_status := p_target_status::public.clinic_team_member_status;

  update public.clinic_team_members
  set member_status = v_status, updated_at = now()
  where id = p_member_id;
end;
$$;

create or replace function public.clinic_cancel_team_invite(p_member_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_clinic uuid;
begin
  select ctm.clinic_id into v_clinic
  from public.clinic_team_members ctm
  where ctm.id = p_member_id
    and ctm.user_id is null
    and ctm.member_status = 'invited';

  if v_clinic is null then
    raise exception 'not found' using errcode = 'P0002';
  end if;

  if not public.is_clinic_manager_for_clinic(v_clinic) then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  delete from public.clinic_team_members where id = p_member_id;
end;
$$;

grant execute on function public.clinic_invite_team_member(uuid, text, text, text) to authenticated;
grant execute on function public.clinic_upsert_member_pathway(uuid, uuid, text, text, text) to authenticated;
grant execute on function public.clinic_update_member_status(uuid, text) to authenticated;
grant execute on function public.clinic_cancel_team_invite(uuid) to authenticated;
