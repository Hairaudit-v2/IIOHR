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
  "relative overflow-hidden rounded-2xl shadow-[0_2px_8px_rgba(44,42,38,0.08),0_1px_3px_rgba(44,42,38,0.06)] transition-[transform,box-shadow,border-color] duration-300 ease-out";
const hoverWrapper =
  "hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(44,42,38,0.12),0_4px_12px_rgba(44,42,38,0.08)]";
const glowHover =
  "hover:shadow-[0_12px_32px_rgba(44,42,38,0.12),0_0_0_1px_rgba(166,139,92,0.4),0_0_24px_rgba(166,139,92,0.12)]";

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
