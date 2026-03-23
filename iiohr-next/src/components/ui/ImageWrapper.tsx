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
  "group relative overflow-hidden rounded-[14px] border border-border/75 bg-surface-elevated transition-[transform,border-color] duration-300 ease-out";
const hoverWrapper = "hover:-translate-y-0.5 hover:border-foreground/30";
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
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
          aria-hidden
        />
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015] [filter:saturate(.9)_contrast(1.03)_brightness(.95)]"
          priority={priority}
          sizes={sizes}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-bg-dark/10 via-transparent to-white/4"
          aria-hidden
        />
        {children}
      </div>
    </div>
  );
}
