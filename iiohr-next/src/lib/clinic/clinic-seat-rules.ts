/**
 * Canonical clinic seat / entitlement rules (mirrors
 * `get_clinic_billing_entitlement_snapshot` in migrations).
 *
 * One billable seat = one reserved learner slot at the clinic for subscription
 * purposes. Placement (clinic_team_members) is separate from program
 * enrollment; both can reserve capacity as below.
 */
export const CLINIC_SEAT_RULES_DOC = {
  /** Each pending email invite reserves one seat until cancelled or linked. */
  pendingInviteConsumesSeat: true,
  /** Placement row with user_id but no program_enrollment at this clinic reserves one seat. */
  linkedPlacementWithoutEnrollmentConsumesSeat: true,
  /** Distinct learners with ≥1 active enrollment at this clinic — each counts once. */
  activeEnrollmentConsumesSeat: true,
  /** Distinct learners with paused enrollment(s) only (no active) — each counts once. */
  pausedOnlyEnrollmentConsumesSeat: true,
  /**
   * Learners with only completed enrollments (no active/paused) do not consume a paid
   * seat — capacity is freed for reassignment (policy flag in RPC may change later).
   */
  completedOnlyEnrollmentConsumesSeat: false,
  /** Withdrawn-only learners do not consume seats. */
  withdrawnOnlyEnrollmentConsumesSeat: false,
} as const;
