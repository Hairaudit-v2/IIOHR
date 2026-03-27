import {
  cancelClinicInvite,
  inviteClinicTeamMember,
  updateClinicMemberStatus,
  upsertClinicMemberPathway,
} from "@/app/clinics/dashboard/actions";
import { Card } from "@/components/ui/Card";
import type { ClinicDashboardVm } from "@/lib/dashboard/types";

const inputClass =
  "mt-1 w-full rounded-md border border-border/80 bg-surface px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45";

const labelClass = "block text-xs font-semibold tracking-wide text-readable-muted uppercase";

export function ClinicTeamManagementPanel({ vm }: { vm: ClinicDashboardVm }) {
  const m = vm.management;
  if (!m?.enabled || !m.clinicId) {
    return null;
  }

  const membersWithPlacement = vm.teamMembers.filter((row) => row.memberRecordId);

  return (
    <Card quiet>
      <h3 className="text-base font-semibold text-heading">Team & pathway management</h3>
      <p className="mt-1 text-sm text-readable-muted">
        Invite colleagues by email, record intended doctor or consultant pathways, and update placement status. Seat limits
        and billing are not enforced in this pass — future Stripe linkage can use the same roster.
      </p>

      <div className="mt-8 space-y-8 border-t border-border/60 pt-8">
        <section>
          <h4 className="text-sm font-semibold text-foreground">Invite by email</h4>
          <p className="mt-1 text-xs text-readable-muted">
            Creates a pending invite with pathway intent. When the learner enrolls under this clinic, link their account in
            admin or admissions.
          </p>
          <form action={inviteClinicTeamMember} className="mt-4 grid gap-3 sm:grid-cols-2">
            <input type="hidden" name="clinicId" value={m.clinicId} />
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="invite-email">
                Email
              </label>
              <input id="invite-email" name="email" type="email" required className={inputClass} autoComplete="email" />
            </div>
            <div>
              <label className={labelClass} htmlFor="invite-stream">
                Pathway stream
              </label>
              <select id="invite-stream" name="target_stream_slug" required className={inputClass} defaultValue="doctors">
                <option value="doctors">Doctors</option>
                <option value="consultants">Consultants / nurses</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="invite-program">
                Program slug (optional)
              </label>
              <input
                id="invite-program"
                name="target_program_slug"
                type="text"
                className={inputClass}
                placeholder="e.g. postgraduate-certificate-…"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="btn inline-flex min-h-11 items-center justify-center rounded-md border border-slate-900 bg-slate-900 px-5 py-2.5 text-[13px] font-semibold tracking-[0.03em] text-white transition-[color,background-color] duration-150 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2"
              >
                Send invite record
              </button>
            </div>
          </form>
        </section>

        {m.pendingInvites.length > 0 ? (
          <section>
            <h4 className="text-sm font-semibold text-foreground">Pending email invites</h4>
            <ul className="mt-3 space-y-2">
              {m.pendingInvites.map((inv) => (
                <li
                  key={inv.memberId}
                  className="flex flex-col gap-2 rounded-md border border-border/70 bg-surface-elevated/40 px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="text-sm">
                    <span className="font-medium text-foreground">{inv.email}</span>
                    <span className="text-readable-muted">
                      {" "}
                      — {inv.targetStreamSlug}
                      {inv.targetProgramSlug ? ` · ${inv.targetProgramSlug}` : ""}
                    </span>
                  </div>
                  <form action={cancelClinicInvite}>
                    <input type="hidden" name="memberId" value={inv.memberId} />
                    <button
                      type="submit"
                      className="text-xs font-semibold text-readable-muted underline decoration-border hover:text-foreground"
                    >
                      Cancel invite
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section>
          <h4 className="text-sm font-semibold text-foreground">Assign or update pathway (enrolled learners)</h4>
          <p className="mt-1 text-xs text-readable-muted">
            Requires an existing program enrollment under this clinic. This updates the clinic placement record; it does
            not replace admissions provisioning of enrollments.
          </p>
          {m.pathwayAssignees.length === 0 ? (
            <p className="mt-3 text-sm text-readable-muted">No enrolled learners under this clinic yet.</p>
          ) : (
            <form action={upsertClinicMemberPathway} className="mt-4 grid gap-3 sm:grid-cols-2">
              <input type="hidden" name="clinicId" value={m.clinicId} />
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="path-user">
                  Learner
                </label>
                <select id="path-user" name="user_id" required className={inputClass}>
                  <option value="">Select learner</option>
                  {m.pathwayAssignees.map((p) => (
                    <option key={p.userId} value={p.userId}>
                      {p.displayLabel}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="path-stream">
                  Pathway stream
                </label>
                <select id="path-stream" name="target_stream_slug" required className={inputClass} defaultValue="doctors">
                  <option value="doctors">Doctors</option>
                  <option value="consultants">Consultants / nurses</option>
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="path-program">
                  Program slug (optional)
                </label>
                <input
                  id="path-program"
                  name="target_program_slug"
                  type="text"
                  className={inputClass}
                  placeholder="Program slug"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="path-status">
                  Placement status
                </label>
                <select id="path-status" name="member_status" className={inputClass} defaultValue="active">
                  <option value="invited">Invited</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="btn inline-flex min-h-11 items-center justify-center rounded-md border border-foreground/30 bg-surface px-5 py-2.5 text-[13px] font-semibold tracking-[0.03em] text-foreground hover:border-foreground/45 hover:bg-surface-elevated"
                >
                  Save pathway placement
                </button>
              </div>
            </form>
          )}
        </section>

        {membersWithPlacement.length > 0 ? (
          <section>
            <h4 className="text-sm font-semibold text-foreground">Update placement status</h4>
            <p className="mt-1 text-xs text-readable-muted">Applies to learners who already have a clinic placement row.</p>
            <form action={updateClinicMemberStatus} className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
              <div className="min-w-[200px] flex-1">
                <label className={labelClass} htmlFor="st-member">
                  Placement record
                </label>
                <select id="st-member" name="memberId" required className={inputClass}>
                  <option value="">Select</option>
                  {membersWithPlacement.map((row) => (
                    <option key={row.memberRecordId!} value={row.memberRecordId!}>
                      {row.name} ({row.assignmentStatus ?? "—"})
                    </option>
                  ))}
                </select>
              </div>
              <div className="min-w-[160px]">
                <label className={labelClass} htmlFor="st-status">
                  New status
                </label>
                <select id="st-status" name="member_status" required className={inputClass} defaultValue="active">
                  <option value="invited">Invited</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn inline-flex min-h-11 items-center justify-center rounded-md border border-foreground/30 bg-surface px-5 py-2.5 text-[13px] font-semibold text-foreground hover:bg-surface-elevated"
              >
                Update status
              </button>
            </form>
          </section>
        ) : null}
      </div>
    </Card>
  );
}
