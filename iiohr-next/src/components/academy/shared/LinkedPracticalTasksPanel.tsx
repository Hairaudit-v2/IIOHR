import type { PracticalTask } from "@/lib/academy/compliance-types";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface LinkedPracticalTasksPanelProps {
  tasks: PracticalTask[];
}

export function LinkedPracticalTasksPanel({ tasks }: LinkedPracticalTasksPanelProps) {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <AcademyPanel title="Linked practical tasks">
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <p className="font-medium text-foreground">{task.title}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.08em] text-readable-muted">{task.taskType}</p>
            <p className="mt-2 text-sm text-readable-muted">{task.instructions}</p>
            {task.facultyReviewRequired ? (
              <p className="mt-2 text-xs text-readable-muted">Faculty review required on submission.</p>
            ) : null}
          </li>
        ))}
      </ul>
    </AcademyPanel>
  );
}
