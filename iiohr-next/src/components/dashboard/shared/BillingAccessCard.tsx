import { Card } from "@/components/ui/Card";

/** Reserved for future Stripe / seat billing — neutral copy only. */
export function BillingAccessCard() {
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
