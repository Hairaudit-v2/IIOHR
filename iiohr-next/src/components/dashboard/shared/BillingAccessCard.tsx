import { Card } from "@/components/ui/Card";
import type { ClinicSeatEntitlementVm } from "@/lib/dashboard/types";

function CountRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-readable-muted">{label}</span>
      <span className="tabular-nums font-medium text-foreground">{value}</span>
    </div>
  );
}

type BillingAccessCardProps = {
  entitlement?: ClinicSeatEntitlementVm;
  /** Clinic dashboard uses manager-specific empty copy; other roles keep the neutral placeholder. */
  variant?: "neutral" | "clinic";
};

/** Seat / entitlement summary; Stripe checkout and portal are future work. */
export function BillingAccessCard({ entitlement, variant = "neutral" }: BillingAccessCardProps) {
  if (!entitlement) {
    if (variant === "clinic") {
      return (
        <Card quiet className="h-full border-dashed border-border">
          <h3 className="text-base font-semibold text-heading">Billing / seats</h3>
          <p className="mt-2 text-sm leading-relaxed text-readable-muted">
            Seat entitlement appears when you manage a clinic scope. This section does not process payments.
          </p>
        </Card>
      );
    }
    return (
      <Card quiet className="h-full border-dashed border-border">
        <h3 className="text-base font-semibold text-heading">Billing / access</h3>
        <p className="mt-2 text-sm leading-relaxed text-readable-muted">
          Subscription and seat management will appear here when billing is enabled. No charges are processed through this
          dashboard today.
        </p>
        <p className="mt-3 text-xs text-readable-subtle">Placeholder — wire Stripe Customer Portal / Checkout when ready.</p>
      </Card>
    );
  }

  if (entitlement.loadError) {
    return (
      <Card quiet className="h-full border-dashed border-border">
        <h3 className="text-base font-semibold text-heading">Billing / seats</h3>
        <p className="mt-2 text-sm text-readable-muted">Could not load seat entitlement: {entitlement.loadError}</p>
      </Card>
    );
  }

  const c = entitlement.counts;
  const capLine =
    entitlement.seatLimit == null
      ? "No seat cap configured (manual table or Stripe later)."
      : `${entitlement.seatsUsed} / ${entitlement.seatLimit} seats used`;
  const availLine =
    entitlement.seatLimit == null ? null : `${entitlement.seatsAvailable ?? 0} available`;

  return (
    <Card quiet className="h-full border-dashed border-border">
      <h3 className="text-base font-semibold text-heading">Billing / seats</h3>
      <p className="mt-1 text-xs text-readable-subtle">
        Subscription billing is not live here. Counts follow internal entitlement rules for future Stripe.
      </p>
      <p className={`mt-3 text-sm font-medium ${entitlement.overLimit ? "text-amber-900" : "text-foreground"}`}>
        {capLine}
        {entitlement.overLimit ? " — over configured cap" : ""}
      </p>
      {availLine ? <p className="mt-1 text-xs text-readable-muted">{availLine}</p> : null}
      <div className="mt-4 space-y-2 border-t border-border/60 pt-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-readable-muted">Counts by status</div>
        <CountRow label="Pending email invites" value={c.pendingInvites} />
        <CountRow label="Linked placement, no enrollment" value={c.linkedPlacementNoEnrollment} />
        <CountRow label="Learners (active enrollment)" value={c.enrolledUsersActive} />
        <CountRow label="Learners (paused only)" value={c.enrolledUsersPausedOnly} />
        <CountRow label="Learners (completed only, not counted toward cap)" value={c.enrolledUsersCompletedOnly} />
        <CountRow label="Learners (withdrawn only)" value={c.enrolledUsersWithdrawnOnly} />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-readable-subtle">
        Stripe Customer Checkout and the billing portal are not wired yet. When they are, caps and seat limits will sync
        from subscription items.
      </p>
    </Card>
  );
}
