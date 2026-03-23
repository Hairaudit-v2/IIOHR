import type { ReactNode } from "react";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
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
 * Section with optional image/text split for rhythm. Uses ImageWrapper for consistency.
 */
export function SplitSection({
  children,
  image,
  imagePosition = "right",
  muted = false,
  className = "",
}: SplitSectionProps) {
  const imageEl =
    image && (
      <ImageWrapper
        src={image.src}
        alt={image.alt}
        className="aspect-[4/3] min-h-[220px] w-full"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    );
  const content = (
    <div className={image ? "grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center" : ""}>
      {image && imagePosition === "left" && imageEl}
      <div className="min-w-0">{children}</div>
      {image && imagePosition === "right" && imageEl}
    </div>
  );

  return (
    <SectionShell muted={muted} className={className}>
      {content}
    </SectionShell>
  );
}
