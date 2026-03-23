import Image from "next/image";
import type { ReactNode } from "react";

export interface ImageWrapperProps {
  src: string;
  alt: string;
  priority?: boolean;
  /** e.g. "aspect-[4/3] w-full" — required for fill layout */
  className?: string;
  /** Optional glow border on hover */
  glowOnHover?: boolean;
  /** Next/Image sizes for responsive loading */
  sizes?: string;
  /** Optional overlay (e.g. gradient) rendered above the image */
  children?: ReactNode;
}

const baseWrapper =
  "group relative overflow-hidden rounded-[10px] border border-border bg-surface-elevated transition-[transform,border-color] duration-200 ease-out";
const hoverWrapper = "hover:-translate-y-px hover:border-foreground/28";
const glowHover = "hover:shadow-[var(--shadow-img-hover-accent)]";

/**
 * Reusable image wrapper for consistent homepage visuals.
 * Rounded corners, subtle shadow, hover scale + shadow; optional glow border.
 */
export function ImageWrapper({
  src,
  alt,
  priority = false,
  className = "",
  glowOnHover = false,
  sizes = "100vw",
  children,
}: ImageWrapperProps) {
  return (
    <div
      className={`${baseWrapper} ${hoverWrapper} ${glowOnHover ? glowHover : ""} ${className}`}
    >
      <div className="relative size-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-border/75" aria-hidden />
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.01] [filter:saturate(.94)_contrast(1.03)_brightness(.96)]"
          priority={priority}
          sizes={sizes}
        />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/0" aria-hidden />
        {children}
      </div>
    </div>
  );
}
