import Link from "next/link";
import type { FacultyNote } from "@/lib/academy/content-types";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface ModuleFacultyNotesTeaserProps {
  notes: FacultyNote[];
  facultyWorkspaceHref?: string;
}

/**
 * Surfaces faculty notes appropriately: full text only when learner-visible;
 * faculty-only notes show titles with a pointer to the faculty workspace.
 */
export function ModuleFacultyNotesTeaser({
  notes,
  facultyWorkspaceHref = "/doctors/faculty-review-pilot",
}: ModuleFacultyNotesTeaserProps) {
  if (notes.length === 0) {
    return null;
  }

  const learnerVisible = notes.filter((n) => n.visibility === "learner-visible");
  const facultyOnly = notes.filter((n) => n.visibility === "faculty-only");

  if (learnerVisible.length === 0 && facultyOnly.length === 0) {
    return null;
  }

  return (
    <AcademyPanel title="Faculty alignment">
      {learnerVisible.length > 0 ? (
        <ul className="space-y-4">
          {learnerVisible.map((n) => (
            <li key={n.id}>
              <p className="font-medium text-foreground">{n.title}</p>
              <p className="mt-1 text-sm text-readable-muted">{n.note}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {facultyOnly.length > 0 ? (
        <div className={learnerVisible.length > 0 ? "mt-6 border-t border-border/80 pt-6" : ""}>
          <p className="text-sm text-readable-muted">
            This module includes {facultyOnly.length} faculty delivery note
            {facultyOnly.length > 1 ? "s" : ""} for moderation and live teaching (
            {facultyOnly.map((n) => n.title).join("; ")}). Full guidance is available to faculty reviewers
            in the{" "}
            <Link href={facultyWorkspaceHref} className="link-premium font-medium">
              faculty workspace
            </Link>
            .
          </p>
        </div>
      ) : null}
    </AcademyPanel>
  );
}
