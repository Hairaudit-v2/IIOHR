import Image from "next/image";
import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";
import { publicFileExists } from "@/lib/academy/public-asset-exists";

export interface AssessmentRenderItem {
  id: string;
  prompt: string;
  type: string;
  imageAssetUrl?: string | null;
}

export function AssessmentRenderer({ items }: { items: AssessmentRenderItem[] }) {
  return (
    <AcademyPanel title="Assessment items">
      <div className="space-y-8">
        {items.map((item, index) => {
          const showImage =
            item.type === "image-interpretation" &&
            item.imageAssetUrl &&
            publicFileExists(item.imageAssetUrl);
          const missingImage =
            item.type === "image-interpretation" &&
            item.imageAssetUrl &&
            !publicFileExists(item.imageAssetUrl);

          return (
            <div key={item.id} className="border-b border-border pb-8 last:border-0 last:pb-0">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Item {index + 1} · {item.type.replace(/-/g, " ")}
              </p>
              <p className="mt-3 text-base leading-relaxed text-foreground">{item.prompt}</p>
              {showImage ? (
                <div className="relative mt-4 aspect-[4/3] max-h-72 w-full max-w-lg overflow-hidden rounded-lg border border-border bg-[var(--bg-secondary)]">
                  <Image
                    src={item.imageAssetUrl!}
                    alt="Assessment reference image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 512px"
                  />
                </div>
              ) : null}
              {missingImage ? (
                <p className="mt-3 text-sm text-readable-muted">
                  Reference image is not available in this preview build. Answer using escalation and scope-safe
                  reasoning as described in the prompt.
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </AcademyPanel>
  );
}
