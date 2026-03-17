import Image from "next/image";
import type { ReactNode } from "react";
import { SectionShell } from "@/components/sections/shared/SectionShell";

export interface SplitSectionImage {
  src: string;
  alt: string;
}

interface SplitSectionProps {
  children: ReactNode;
  /** Optional image for split layout. When set, content and image are laid out side by side. */
  image?: SplitSectionImage;
  /** Position of the image. Default: right */
  imagePosition?: "left" | "right";
  muted?: boolean;
  className?: string;
}

/**
 * Section with optional image/text split for rhythm. Uses existing SectionShell.
 */
export function SplitSection({
  children,
  image,
  imagePosition = "right",
  muted = false,
  className = "",
}: SplitSectionProps) {
  const content = (
    <div className={image ? "grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center" : ""}>
      {image && imagePosition === "left" && (
        <div className="img-panel relative aspect-[4/3] min-h-[200px] overflow-hidden rounded">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="min-w-0">{children}</div>
      {image && imagePosition === "right" && (
        <div className="img-panel relative aspect-[4/3] min-h-[200px] overflow-hidden rounded">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      )}
    </div>
  );

  return (
    <SectionShell muted={muted} className={className}>
      {content}
    </SectionShell>
  );
}
