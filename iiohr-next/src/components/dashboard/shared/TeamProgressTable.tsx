import type { ClinicTeamMemberVm } from "@/lib/dashboard/types";

interface TeamProgressTableProps {
  heading: string;
  caption?: string;
  members: ClinicTeamMemberVm[];
}

export function TeamProgressTable({ heading, caption, members }: TeamProgressTableProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-foreground">{heading}</h3>
        {caption ? <p className="mt-1 text-xs text-readable-muted">{caption}</p> : null}
      </div>
      <div className="overflow-x-auto rounded-[10px] border border-border/90">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border/80 bg-surface-elevated/55">
              <th className="px-4 py-3 font-semibold text-foreground">Name</th>
              <th className="px-4 py-3 font-semibold text-foreground">Role</th>
              <th className="px-4 py-3 font-semibold text-foreground">Pathway</th>
              <th className="px-4 py-3 font-semibold text-foreground">Progress</th>
              <th className="px-4 py-3 font-semibold text-foreground">Activity</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b border-border/50 last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{m.name}</td>
                <td className="px-4 py-3 text-readable-muted">{m.role}</td>
                <td className="px-4 py-3 text-readable-muted">{m.pathwayLabel}</td>
                <td className="px-4 py-3">
                  <span className="tabular-nums font-medium text-foreground">{Math.round(m.progressPercent)}%</span>
                </td>
                <td className="px-4 py-3 text-xs text-readable-subtle">{m.lastActivityHint ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
