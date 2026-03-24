-- Applicant-safe admissions timeline (no internal notes or reviewer-only fields exposed).
-- Requires application_admissions_events from 20250328120000_admissions_workflow.sql.

CREATE OR REPLACE FUNCTION public.academy_applicant_admissions_timeline(p_application_id uuid)
RETURNS TABLE (
  event_id uuid,
  occurred_at timestamptz,
  from_status public.application_status,
  to_status public.application_status,
  title text,
  detail text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.applications a
    WHERE a.id = p_application_id
      AND a.user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  RETURN QUERY
  SELECT
    e.id AS event_id,
    e.created_at AS occurred_at,
    e.from_status,
    e.to_status,
    (
      CASE
        WHEN e.to_status = 'submitted'::public.application_status
          AND e.from_status IS NOT DISTINCT FROM 'draft'::public.application_status
          THEN 'Application submitted'
        WHEN e.to_status = 'submitted'::public.application_status
          AND e.from_status IS NOT DISTINCT FROM 'needs_more_information'::public.application_status
          THEN 'Updated information submitted'
        WHEN e.to_status = 'under_review'::public.application_status
          THEN 'Under review'
        WHEN e.to_status = 'needs_more_information'::public.application_status
          THEN 'More information requested'
        WHEN e.to_status = 'accepted'::public.application_status
          THEN 'Application accepted'
        WHEN e.to_status = 'declined'::public.application_status
          THEN 'Application not approved'
        WHEN e.to_status = 'rejected'::public.application_status
          THEN 'Application not approved'
        WHEN e.to_status = 'waitlisted'::public.application_status
          THEN 'Waitlisted'
        WHEN e.to_status = 'withdrawn'::public.application_status
          THEN 'Application withdrawn'
        ELSE 'Status update'
      END
    )::text AS title,
    (
      CASE
        WHEN e.to_status = 'needs_more_information'::public.application_status
          AND e.applicant_message IS NOT NULL
          AND length(trim(e.applicant_message)) > 0
          THEN e.applicant_message
        WHEN e.to_status = 'submitted'::public.application_status
          AND e.from_status IS NOT DISTINCT FROM 'needs_more_information'::public.application_status
          AND e.applicant_message IS NOT NULL
          AND length(trim(e.applicant_message)) > 0
          THEN e.applicant_message
        ELSE NULL
      END
    )::text AS detail
  FROM public.application_admissions_events e
  WHERE e.application_id = p_application_id
  ORDER BY e.created_at ASC;
END;
$$;

REVOKE ALL ON FUNCTION public.academy_applicant_admissions_timeline(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.academy_applicant_admissions_timeline(uuid) TO authenticated;

COMMENT ON FUNCTION public.academy_applicant_admissions_timeline(uuid) IS
  'Returns sanitized admissions milestones for the authenticated applicant (own application only).';
