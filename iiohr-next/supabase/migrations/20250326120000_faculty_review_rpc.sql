-- Faculty review: narrow SECURITY DEFINER RPCs (no broad RLS on assessment_attempts updates).
-- Requires prior migration 20250325120000_academy_persistence.sql.

-- ---------------------------------------------------------------------------
-- Enum: rejected outcome (idempotent)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'public'
      AND t.typname = 'faculty_review_status'
      AND e.enumlabel = 'rejected'
  ) THEN
    ALTER TYPE public.faculty_review_status ADD VALUE 'rejected';
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- Snapshot pass mark at attempt submit so RPC can set passed without content DB
-- ---------------------------------------------------------------------------
ALTER TABLE public.assessment_attempts
  ADD COLUMN IF NOT EXISTS assessment_pass_mark_snapshot smallint NULL;

COMMENT ON COLUMN public.assessment_attempts.assessment_pass_mark_snapshot IS
  'Program pass mark at submission time; used by faculty finalize RPC to compute passed.';

-- ---------------------------------------------------------------------------
-- Claim: pending -> in_review (optional workflow step)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.academy_faculty_claim_attempt(p_attempt_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_stream text;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  IF NOT (public.is_academy_admin() OR public.is_faculty_user()) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  SELECT pe.stream_slug
  INTO v_stream
  FROM public.assessment_attempts a
  JOIN public.program_enrollments pe ON pe.id = a.program_enrollment_id
  WHERE a.id = p_attempt_id;

  IF v_stream IS NULL THEN
    RAISE EXCEPTION 'attempt not found';
  END IF;

  IF NOT public.is_academy_admin() AND NOT public.faculty_can_access_stream(v_stream) THEN
    RAISE EXCEPTION 'stream not in faculty scope';
  END IF;

  UPDATE public.assessment_attempts a
  SET faculty_review_status = 'in_review'
  WHERE a.id = p_attempt_id
    AND a.faculty_review_status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'claim failed: attempt not in pending state';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.academy_faculty_claim_attempt(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.academy_faculty_claim_attempt(uuid) TO authenticated;

-- ---------------------------------------------------------------------------
-- Finalize: insert faculty_reviews + sync assessment_attempts
-- p_outcome: approved | revision_required | rejected
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.academy_faculty_finalize_attempt(
  p_attempt_id uuid,
  p_outcome text,
  p_notes text,
  p_rubric_summary text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_stream text;
  v_uid uuid := auth.uid();
  v_score numeric;
  v_pass_mark integer;
  v_prev public.faculty_review_status;
  v_status public.faculty_review_status;
  v_new_passed boolean;
  v_review_id uuid;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  IF NOT (public.is_academy_admin() OR public.is_faculty_user()) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  IF p_outcome IS NULL OR p_outcome NOT IN ('approved', 'revision_required', 'rejected') THEN
    RAISE EXCEPTION 'invalid outcome';
  END IF;

  SELECT pe.stream_slug, a.score, a.assessment_pass_mark_snapshot, a.faculty_review_status
  INTO v_stream, v_score, v_pass_mark, v_prev
  FROM public.assessment_attempts a
  JOIN public.program_enrollments pe ON pe.id = a.program_enrollment_id
  WHERE a.id = p_attempt_id
  FOR UPDATE OF a;

  IF v_stream IS NULL THEN
    RAISE EXCEPTION 'attempt not found';
  END IF;

  IF NOT public.is_academy_admin() AND NOT public.faculty_can_access_stream(v_stream) THEN
    RAISE EXCEPTION 'stream not in faculty scope';
  END IF;

  IF v_prev NOT IN ('pending', 'in_review') THEN
    RAISE EXCEPTION 'finalize failed: attempt not awaiting faculty action';
  END IF;

  IF p_outcome = 'approved' THEN
    v_status := 'approved';
    IF v_pass_mark IS NULL THEN
      RAISE EXCEPTION 'missing assessment_pass_mark_snapshot; cannot finalize approval';
    END IF;
    v_new_passed := coalesce(v_score, 0) >= v_pass_mark;
  ELSIF p_outcome = 'revision_required' THEN
    v_status := 'revision_required';
    v_new_passed := false;
  ELSE
    v_status := 'rejected';
    v_new_passed := false;
  END IF;

  INSERT INTO public.faculty_reviews (
    assessment_attempt_id,
    reviewer_user_id,
    status,
    rubric_summary,
    notes,
    reviewed_at
  )
  VALUES (
    p_attempt_id,
    v_uid,
    v_status,
    nullif(trim(p_rubric_summary), ''),
    nullif(trim(p_notes), ''),
    now()
  )
  RETURNING id INTO v_review_id;

  UPDATE public.assessment_attempts a
  SET
    faculty_review_status = v_status,
    passed = v_new_passed,
    grader_user_id = v_uid
  WHERE a.id = p_attempt_id;

  INSERT INTO public.admin_audit_log (actor_user_id, action, entity_type, entity_id, metadata)
  VALUES (
    v_uid,
    'academy_faculty_finalize_attempt',
    'assessment_attempt',
    p_attempt_id,
    jsonb_build_object(
      'outcome', p_outcome,
      'faculty_review_id', v_review_id,
      'new_passed', v_new_passed
    )
  );

  RETURN v_review_id;
END;
$$;

REVOKE ALL ON FUNCTION public.academy_faculty_finalize_attempt(uuid, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.academy_faculty_finalize_attempt(uuid, text, text, text) TO authenticated;
