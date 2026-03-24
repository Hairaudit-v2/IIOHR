import Link from "next/link";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface ResourceEntry {
  id: string;
  title: string;
  fileUrl: string;
  description: string;
}

interface DownloadableResourceListProps {
  resources: ResourceEntry[];
  /** Listed for learners but file not yet in `/public` — no download link */
  pendingResources?: ResourceEntry[];
  title?: string;
}

export function DownloadableResourceList({
  resources,
  pendingResources = [],
  title = "Downloadable resources",
}: DownloadableResourceListProps) {
  const hasAny = resources.length > 0 || pendingResources.length > 0;
  if (!hasAny) {
    return null;
  }

  return (
    <AcademyPanel title={title}>
      <div className="space-y-6">
        {resources.length > 0 ? (
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id}>
                <h3 className="font-medium text-foreground">{resource.title}</h3>
                <p className="mt-1 text-sm text-readable-muted">{resource.description}</p>
                <Link href={resource.fileUrl} className="link-premium mt-2 inline-block text-sm font-medium">
                  Download
                </Link>
              </div>
            ))}
          </div>
        ) : null}
        {pendingResources.length > 0 ? (
          <div className="rounded-lg border border-border/80 bg-[var(--bg-secondary)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-readable-muted">
              Listed materials (files coming soon)
            </p>
            <ul className="mt-3 space-y-3">
              {pendingResources.map((resource) => (
                <li key={resource.id}>
                  <p className="font-medium text-foreground">{resource.title}</p>
                  <p className="text-sm text-readable-muted">{resource.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </AcademyPanel>
  );
}
