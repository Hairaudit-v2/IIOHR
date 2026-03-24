import Link from "next/link";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface DownloadableResourceListProps {
  resources: Array<{ id: string; title: string; fileUrl: string; description: string }>;
}

export function DownloadableResourceList({ resources }: DownloadableResourceListProps) {
  return (
    <AcademyPanel title="Downloadable Resources">
      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id}>
            <h3 className="font-medium text-foreground">{resource.title}</h3>
            <p className="mt-1">{resource.description}</p>
            <Link href={resource.fileUrl} className="link-premium mt-2 inline-block text-sm">
              Open resource
            </Link>
          </div>
        ))}
      </div>
    </AcademyPanel>
  );
}
