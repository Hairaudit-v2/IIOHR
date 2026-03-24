-- Atomic admissions acceptance: stream membership + program enrollment + application status.
-- Caller must be academy admin (matches RLS on enrollment insert).
--
-- PREREQUISITE: Apply 20250325120000_academy_persistence.sql first. It creates public.applications
-- (and related tables). Running this file alone in the SQL editor will error with
-- relation "public.applications" does not exist until that migration has been applied.

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
  SET status = 'accepted', updated_at = now()
  WHERE id = p_application_id;

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

REVOKE ALL ON FUNCTION public.academy_admissions_accept_application(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.academy_admissions_accept_application(uuid) TO authenticated;
