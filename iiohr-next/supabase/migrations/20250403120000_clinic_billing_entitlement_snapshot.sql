-- Clinic billing / seat entitlement snapshot (additive; no Stripe).
-- seat_limit is manual until Stripe sync; NULL = unlimited for limit math.

create table if not exists public.clinic_billing_entitlements (
  clinic_id uuid primary key,
  seat_limit integer null check (seat_limit is null or seat_limit >= 0),
  updated_at timestamptz not null default now()
);

comment on table public.clinic_billing_entitlements is
  'Manual or future Stripe-synced seat cap per clinic. Read via get_clinic_billing_entitlement_snapshot only.';

alter table public.clinic_billing_entitlements enable row level security;

-- No direct client access; managers use SECURITY DEFINER RPC.

-- ---------------------------------------------------------------------------
-- Seat accounting (authoritative for dashboard + future enforcement):
-- - pending email invite: reserves 1 seat
-- - linked placement (user_id set) with no program_enrollment at this clinic: 1 seat
-- - enrollments at this clinic (distinct learner / user_id):
--   - any active enrollment -> consumes 1 seat
--   - else any paused enrollment -> consumes 1 seat
--   - else completed-only: does NOT consume a paid seat (seat freed; still counted)
--   - withdrawn-only: does NOT consume a seat
-- seats_used = pending + linked_no_enrollment + active_users + paused_only_users
--              [+ completed_only_users when policy flips to include them]
-- ---------------------------------------------------------------------------
create or replace function public.get_clinic_billing_entitlement_snapshot(p_clinic_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_limit int;
  v_pending int := 0;
  v_linked int := 0;
  v_enr_active int := 0;
  v_enr_paused_only int := 0;
  v_enr_completed_only int := 0;
  v_enr_withdrawn_only int := 0;
  v_include_completed boolean := false;
  v_used int := 0;
  v_available int;
  v_over boolean := false;
begin
  if not public.is_clinic_manager_for_clinic(p_clinic_id) then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  select cbe.seat_limit into v_limit
  from public.clinic_billing_entitlements cbe
  where cbe.clinic_id = p_clinic_id;

  select count(*)::int into v_pending
  from public.clinic_team_members ctm
  where ctm.clinic_id = p_clinic_id
    and ctm.user_id is null
    and ctm.member_status = 'invited'
    and ctm.invite_email is not null;

  select count(*)::int into v_linked
  from public.clinic_team_members ctm
  where ctm.clinic_id = p_clinic_id
    and ctm.user_id is not null
    and not exists (
      select 1
      from public.program_enrollments pe
      where pe.clinic_id = p_clinic_id
        and pe.user_id = ctm.user_id
    );

  with u as (
    select
      pe.user_id,
      bool_or(pe.status = 'active') as has_active,
      bool_or(pe.status = 'paused') as has_paused,
      bool_or(pe.status = 'completed') as has_completed,
      bool_or(pe.status = 'withdrawn') as has_withdrawn
    from public.program_enrollments pe
    where pe.clinic_id = p_clinic_id
    group by pe.user_id
  )
  select
    count(*) filter (where has_active)::int,
    count(*) filter (where has_paused and not has_active)::int,
    count(*) filter (where has_completed and not has_active and not has_paused)::int,
    count(*) filter (where has_withdrawn and not has_active and not has_paused and not has_completed)::int
  into v_enr_active, v_enr_paused_only, v_enr_completed_only, v_enr_withdrawn_only
  from u;

  v_used := v_pending + v_linked + v_enr_active + v_enr_paused_only;
  if v_include_completed then
    v_used := v_used + v_enr_completed_only;
  end if;

  if v_limit is null then
    v_available := null;
    v_over := false;
  else
    v_available := greatest(0, v_limit - v_used);
    v_over := v_used > v_limit;
  end if;

  return jsonb_build_object(
    'seat_limit', v_limit,
    'seats_used', v_used,
    'seats_available', v_available,
    'over_limit', v_over,
    'policy', jsonb_build_object(
      'completed_enrollment_consumes_seat', v_include_completed
    ),
    'counts', jsonb_build_object(
      'pending_invites', v_pending,
      'linked_placement_no_enrollment', v_linked,
      'enrolled_users_active', v_enr_active,
      'enrolled_users_paused_only', v_enr_paused_only,
      'enrolled_users_completed_only', v_enr_completed_only,
      'enrolled_users_withdrawn_only', v_enr_withdrawn_only
    )
  );
end;
$$;

comment on function public.get_clinic_billing_entitlement_snapshot(uuid) is
  'Seat entitlement snapshot for billing; see migration header for seat rules. SECURITY DEFINER.';

grant execute on function public.get_clinic_billing_entitlement_snapshot(uuid) to authenticated;
