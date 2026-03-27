import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { NextActionVm } from "@/lib/dashboard/types";

export function NextActionsCard({ actions }: { actions: NextActionVm[] }) {
  return (
    <Card quiet className="h-full">
      <h3 className="text-base font-semibold text-heading">Next actions</h3>
      <ul className="mt-4 space-y-2.5">
        {actions.map((a) => (
          <li key={a.id}>
            {a.href ? (
              <Link
                href={a.href}
                className={`text-sm font-medium link-premium ${a.emphasis ? "font-semibold" : ""}`}
              >
                {a.label}
              </Link>
            ) : (
              <span className={`text-sm text-readable-muted ${a.emphasis ? "font-semibold text-foreground" : ""}`}>
                {a.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
