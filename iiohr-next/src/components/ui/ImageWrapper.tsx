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
  "relative overflow-hidden rounded-2xl shadow-token-img transition-[transform,box-shadow,border-color] duration-300 ease-out";
const hoverWrapper = "hover:scale-[1.03] hover:shadow-[var(--shadow-img-hover)]";
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
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          priority={priority}
          sizes={sizes}
        />
        {children}
      </div>
    </div>
  );
}
