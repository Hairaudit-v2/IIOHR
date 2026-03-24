import Link from "next/link";
import type { AcademyModule } from "@/lib/academy/content-types";

interface ConsultantModuleFooterNavProps {
  programSlug: string;
  prevModule: AcademyModule | null;
  nextModule: AcademyModule | null;
}

export function ConsultantModuleFooterNav({ programSlug, prevModule, nextModule }: ConsultantModuleFooterNavProps) {
  const base = `/consultants/programs/${programSlug}`;

  if (!prevModule && !nextModule) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-[var(--bg-secondary)] px-5 py-4 sm:flex-row sm:justify-between">
      {prevModule ? (
        <Link
          href={`${base}/modules/${prevModule.slug}`}
          className="text-sm font-medium text-foreground hover:underline"
        >
          ← Previous module: {prevModule.shortTitle || prevModule.title}
        </Link>
      ) : (
        <span />
      )}
      {nextModule ? (
        <Link
          href={`${base}/modules/${nextModule.slug}`}
          className="text-sm font-medium text-foreground hover:underline sm:text-right"
        >
          Next module: {nextModule.shortTitle || nextModule.title} →
        </Link>
      ) : null}
    </div>
  );
}
