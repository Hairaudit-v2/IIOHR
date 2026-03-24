-- Admissions workflow: lifecycle states, audit events, answer snapshots, applicant-facing messages.
-- Requires 20250325120000_academy_persistence.sql.

-- ---------------------------------------------------------------------------
-- Enum: needs_more_information, declined
-- ---------------------------------------------------------------------------
ALTER TYPE public.application_status ADD VALUE IF NOT EXISTS 'needs_more_information';
ALTER TYPE public.application_status ADD VALUE IF NOT EXISTS 'declined';

-- ---------------------------------------------------------------------------
-- Applications: internal notes + latest applicant-facing message
-- ---------------------------------------------------------------------------
ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS internal_notes text null;

ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS applicant_message text null;

COMMENT ON COLUMN public.applications.internal_notes IS
  'Rolling internal context for admissions reviewers (not shown to applicants).';

COMMENT ON COLUMN public.applications.applicant_message IS
  'Latest message visible to the applicant (e.g. request for more information).';

-- ---------------------------------------------------------------------------
-- Auditable status transitions (+ optional answer snapshot at request-info)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.application_admissions_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  from_status public.application_status null,
  to_status public.application_status not null,
  actor_user_id uuid null references auth.users (id) on delete set null,
  internal_note text null,
  applicant_message text null,
  answers_snapshot jsonb null,
  created_at timestamptz not null default now()
);

CREATE INDEX IF NOT EXISTS application_admissions_events_app_idx
  ON public.application_admissions_events (application_id, created_at desc);

COMMENT ON TABLE public.application_admissions_events IS
  'Admissions audit trail; internal_note is admin-only via RLS. applicant_message duplicates what was shown to the applicant for that transition.';

COMMENT ON COLUMN public.application_admissions_events.answers_snapshot IS
  'JSON map question_key -> answer captured when moving to needs_more_information (baseline before applicant edits).';

ALTER TABLE public.application_admissions_events ENABLE ROW LEVEL SECURITY;

-- Admin-only: full event log (applicants must not read internal_note)
CREATE POLICY application_admissions_events_admin_all
  ON public.application_admissions_events
  FOR ALL
  USING (public.is_academy_admin())
  WITH CHECK (public.is_academy_admin());

-- ---------------------------------------------------------------------------
-- Applicants cannot change application status directly (only via guarded flows)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.applications_prevent_applicant_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  applicant_ok_status boolean;
BEGIN
  IF public.is_academy_admin() THEN
    RETURN NEW;
  END IF;
  IF NEW.user_id IS DISTINCT FROM auth.uid() THEN
    RETURN NEW;
  END IF;

  applicant_ok_status :=
    (OLD.status = 'draft'::public.application_status
      AND NEW.status = 'submitted'::public.application_status)
    OR (OLD.status = 'needs_more_information'::public.application_status
      AND NEW.status = 'submitted'::public.application_status)
    OR (
      NEW.status = 'withdrawn'::public.application_status
      AND OLD.status IN (
        'draft'::public.application_status,
        'submitted'::public.application_status,
        'under_review'::public.application_status,
        'needs_more_information'::public.application_status
      )
    );

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF NOT applicant_ok_status THEN
      RAISE EXCEPTION 'Applicants cannot change application status directly';
    END IF;
  END IF;

  IF NEW.internal_notes IS DISTINCT FROM OLD.internal_notes THEN
    RAISE EXCEPTION 'Applicants cannot change internal admissions notes';
  END IF;

  IF applicant_ok_status THEN
    RETURN NEW;
  END IF;

  IF NEW.applicant_message IS DISTINCT FROM OLD.applicant_message
     OR NEW.submitted_at IS DISTINCT FROM OLD.submitted_at
  THEN
    RAISE EXCEPTION 'Applicants cannot change admissions messaging or submission timestamps directly';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS applications_guard_status_change ON public.applications;
CREATE TRIGGER applications_guard_status_change
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE PROCEDURE public.applications_prevent_applicant_status_change();

-- ---------------------------------------------------------------------------
-- RPC: applicant resubmit after needs_more_information (sets submitted, logs event)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.academy_applicant_resubmit_application(p_application_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  app public.applications%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  SELECT * INTO app FROM public.applications WHERE id = p_application_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'application not found';
  END IF;

  IF app.user_id IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  IF app.status IS DISTINCT FROM 'needs_more_information'::public.application_status THEN
    RAISE EXCEPTION 'application is not awaiting information';
  END IF;

  UPDATE public.applications
  SET
    status = 'submitted',
    applicant_message = null,
    submitted_at = now(),
    updated_at = now()
  WHERE id = p_application_id;

  INSERT INTO public.application_admissions_events (
    application_id, from_status, to_status, actor_user_id, internal_note, applicant_message
  ) VALUES (
    p_application_id,
    'needs_more_information',
    'submitted',
    auth.uid(),
    null,
    'Applicant submitted updated information.'
  );
END;
$$;

REVOKE ALL ON FUNCTION public.academy_applicant_resubmit_application(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.academy_applicant_resubmit_application(uuid) TO authenticated;

-- ---------------------------------------------------------------------------
-- RPC: applicant withdraw own application (draft or submitted pipeline)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.academy_applicant_withdraw_application(p_application_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  app public.applications%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  SELECT * INTO app FROM public.applications WHERE id = p_application_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'application not found';
  END IF;

  IF app.user_id IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  IF app.status NOT IN (
    'draft',
    'submitted',
    'under_review',
    'needs_more_information'
  ) THEN
    RAISE EXCEPTION 'application cannot be withdrawn in its current state';
  END IF;

  UPDATE public.applications
  SET
    status = 'withdrawn',
    applicant_message = null,
    updated_at = now()
  WHERE id = p_application_id;

  INSERT INTO public.application_admissions_events (
    application_id, from_status, to_status, actor_user_id, internal_note, applicant_message
  ) VALUES (
    p_application_id,
    app.status,
    'withdrawn',
    auth.uid(),
    null,
    null
  );
END;
$$;

REVOKE ALL ON FUNCTION public.academy_applicant_withdraw_application(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.academy_applicant_withdraw_application(uuid) TO authenticated;

-- ---------------------------------------------------------------------------
-- RPC: first submit draft -> submitted (logs event; applicants cannot INSERT events)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.academy_applicant_submit_from_draft(p_application_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  app public.applications%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  SELECT * INTO app FROM public.applications WHERE id = p_application_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'application not found';
  END IF;

  IF app.user_id IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  IF app.status IS DISTINCT FROM 'draft'::public.application_status THEN
    RAISE EXCEPTION 'application is not a draft';
  END IF;

  UPDATE public.applications
  SET
    status = 'submitted',
    submitted_at = now(),
    updated_at = now()
  WHERE id = p_application_id;

  INSERT INTO public.application_admissions_events (
    application_id, from_status, to_status, actor_user_id, internal_note, applicant_message
  ) VALUES (
    p_application_id,
    'draft',
    'submitted',
    auth.uid(),
    null,
    null
  );
END;
$$;

REVOKE ALL ON FUNCTION public.academy_applicant_submit_from_draft(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.academy_applicant_submit_from_draft(uuid) TO authenticated;

-- ---------------------------------------------------------------------------
-- RPC: admin status transition (not for acceptance — use academy_admissions_accept_application)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.academy_admissions_admin_transition(
  p_application_id uuid,
  p_to_status public.application_status,
  p_internal_note text,
  p_applicant_message text,
  p_answers_snapshot jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  app public.applications%ROWTYPE;
  v_from public.application_status;
  v_note text;
  v_msg text;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  IF NOT public.is_academy_admin() THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  IF p_to_status = 'accepted'::public.application_status THEN
    RAISE EXCEPTION 'use academy_admissions_accept_application to accept';
  END IF;

  SELECT * INTO app FROM public.applications WHERE id = p_application_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'application not found';
  END IF;

  v_from := app.status;
  v_note := nullif(trim(coalesce(p_internal_note, '')), '');
  v_msg := nullif(trim(coalesce(p_applicant_message, '')), '');

  INSERT INTO public.application_admissions_events (
    application_id,
    from_status,
    to_status,
    actor_user_id,
    internal_note,
    applicant_message,
    answers_snapshot
  ) VALUES (
    p_application_id,
    v_from,
    p_to_status,
    auth.uid(),
    v_note,
    v_msg,
    p_answers_snapshot
  );

  UPDATE public.applications
  SET
    status = p_to_status,
    applicant_message = CASE
      WHEN p_to_status = 'needs_more_information'::public.application_status THEN v_msg
      WHEN p_to_status IN (
        'declined'::public.application_status,
        'rejected'::public.application_status,
        'waitlisted'::public.application_status
      ) THEN null
      WHEN v_from = 'needs_more_information'::public.application_status
        AND p_to_status = 'under_review'::public.application_status THEN null
      ELSE app.applicant_message
    END,
    internal_notes = CASE
      WHEN v_note IS NOT NULL THEN
        trim(both E'\n' from concat_ws(E'\n\n', nullif(trim(app.internal_notes), ''), v_note))
      ELSE app.internal_notes
    END,
    updated_at = now()
  WHERE id = p_application_id;
END;
$$;

REVOKE ALL ON FUNCTION public.academy_admissions_admin_transition(uuid, public.application_status, text, text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.academy_admissions_admin_transition(uuid, public.application_status, text, text, jsonb) TO authenticated;

-- ---------------------------------------------------------------------------
-- Accept RPC: also log application_admissions_events (additive)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.academy_admissions_accept_application(p_application_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  app public.applications%ROWTYPE;
  mid uuid;
  eid uuid;
  v_from public.application_status;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  IF NOT public.is_academy_admin() THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  SELECT * INTO app FROM public.applications WHERE id = p_application_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'application not found';
  END IF;

  IF app.status NOT IN ('submitted', 'under_review') THEN
    RAISE EXCEPTION 'invalid application status for acceptance: %', app.status;
  END IF;

  IF app.target_program_slug IS NULL OR length(trim(app.target_program_slug)) = 0 THEN
    RAISE EXCEPTION 'target_program_slug is required on the application';
  END IF;

  v_from := app.status;

  INSERT INTO public.academy_stream_memberships (user_id, stream_slug, status, is_primary)
  VALUES (app.user_id, app.target_stream_slug, 'active', true)
  ON CONFLICT (user_id, stream_slug)
  DO UPDATE SET status = 'active'
  RETURNING id INTO mid;

  IF mid IS NULL THEN
    SELECT id INTO mid
    FROM public.academy_stream_memberships
    WHERE user_id = app.user_id AND stream_slug = app.target_stream_slug;
  END IF;

  INSERT INTO public.program_enrollments (
    user_id,
    stream_slug,
    program_slug,
    academy_stream_membership_id,
    status
  )
  VALUES (
    app.user_id,
    app.target_stream_slug,
    app.target_program_slug,
    mid,
    'active'
  )
  ON CONFLICT (user_id, program_slug)
  DO UPDATE SET
    status = 'active',
    stream_slug = excluded.stream_slug,
    academy_stream_membership_id = excluded.academy_stream_membership_id
  RETURNING id INTO eid;

  UPDATE public.applications
  SET
    status = 'accepted',
    applicant_message = null,
    updated_at = now()
  WHERE id = p_application_id;

  INSERT INTO public.application_admissions_events (
    application_id, from_status, to_status, actor_user_id, internal_note, applicant_message
  ) VALUES (
    p_application_id,
    v_from,
    'accepted',
    auth.uid(),
    null,
    null
  );

  INSERT INTO public.admin_audit_log (actor_user_id, action, entity_type, entity_id, metadata)
  VALUES (
    auth.uid(),
    'academy_admissions_accept_application',
    'application',
    p_application_id,
    jsonb_build_object(
      'enrollment_id', eid,
      'stream_slug', app.target_stream_slug,
      'program_slug', app.target_program_slug,
      'applicant_user_id', app.user_id
    )
  );

  RETURN eid;
END;
$$;
