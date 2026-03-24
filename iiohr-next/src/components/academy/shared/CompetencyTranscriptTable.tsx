interface CompetencyTranscriptTableProps {
  rows: Array<{ id: string; title: string; status: string }>;
}

export function CompetencyTranscriptTable({ rows }: CompetencyTranscriptTableProps) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-border">
      <table className="min-w-full divide-y divide-border text-left text-sm">
        <thead className="bg-surface">
          <tr>
            <th className="px-4 py-3 font-medium text-foreground">Competency</th>
            <th className="px-4 py-3 font-medium text-foreground">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-background">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-4 py-3 text-readable-muted">{row.title}</td>
              <td className="px-4 py-3 text-foreground">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
