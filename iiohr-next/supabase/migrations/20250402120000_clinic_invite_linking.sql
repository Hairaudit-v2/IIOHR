-- Link pending clinic_team_members invite rows to the authenticated user by email match.
-- Idempotent; SECURITY DEFINER reads auth.users.email; does not create enrollments.

create or replace function public.link_pending_clinic_invites_for_user()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_deleted int := 0;
  v_linked int := 0;
begin
  if auth.uid() is null then
    return jsonb_build_object('linked', 0, 'deleted_superseded', 0);
  end if;

  select lower(trim(u.email)) into v_email
  from auth.users u
  where u.id = auth.uid();

  if v_email is null or length(v_email) < 3 then
    return jsonb_build_object('linked', 0, 'deleted_superseded', 0);
  end if;

  -- Drop invite rows that duplicate an existing placement for the same clinic + user
  delete from public.clinic_team_members ctm
  where ctm.user_id is null
    and ctm.member_status = 'invited'
    and lower(trim(ctm.invite_email)) = v_email
    and exists (
      select 1
      from public.clinic_team_members x
      where x.clinic_id = ctm.clinic_id
        and x.user_id = auth.uid()
        and x.id <> ctm.id
    );
  get diagnostics v_deleted = row_count;

  update public.clinic_team_members ctm
  set
    user_id = auth.uid(),
    invite_email = null,
    member_status = case
      when ctm.member_status = 'invited'::public.clinic_team_member_status then 'active'::public.clinic_team_member_status
      else ctm.member_status
    end,
    updated_at = now()
  where ctm.user_id is null
    and ctm.member_status = 'invited'
    and lower(trim(ctm.invite_email)) = v_email
    and not exists (
      select 1
      from public.clinic_team_members x
      where x.clinic_id = ctm.clinic_id
        and x.user_id = auth.uid()
    );
  get diagnostics v_linked = row_count;

  return jsonb_build_object(
    'linked', coalesce(v_linked, 0),
    'deleted_superseded', coalesce(v_deleted, 0)
  );
end;
$$;

comment on function public.link_pending_clinic_invites_for_user() is
  'Matches pending clinic_team_members invites to auth.users.email; sets user_id and clears invite_email. Does not create program_enrollments.';

grant execute on function public.link_pending_clinic_invites_for_user() to authenticated;
