import Link from "next/link";
import type { AcademyLesson } from "@/lib/academy/content-types";

interface ModuleProgressionHintProps {
  lessons: AcademyLesson[];
  programSlug: string;
  streamBasePath: string;
}

export function ModuleProgressionHint({ lessons, programSlug, streamBasePath }: ModuleProgressionHintProps) {
  const ordered = [...lessons].sort((a, b) => a.sequence - b.sequence);
  const first = ordered[0];
  if (!first) {
    return null;
  }

  return (
    <p className="text-sm text-readable-muted">
      <span className="font-medium text-foreground">Suggested start: </span>
      <Link
        href={`${streamBasePath}/programs/${programSlug}/lessons/${first.slug}`}
        className="link-premium font-medium"
      >
        {first.title}
      </Link>
    </p>
  );
}
