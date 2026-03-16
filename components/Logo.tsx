import React from "react";

const LOGO_BASE = "/public/logo";

const LOGO_SRC: Record<"full" | "mark" | "monogram", Record<"light" | "dark", string>> = {
  full: { light: `${LOGO_BASE}/iiohr-logo.svg`, dark: `${LOGO_BASE}/iiohr-logo-dark.svg` },
  mark: { light: `${LOGO_BASE}/iiohr-mark.svg`, dark: `${LOGO_BASE}/iiohr-mark-dark.svg` },
  monogram: { light: `${LOGO_BASE}/iiohr-monogram.svg`, dark: `${LOGO_BASE}/iiohr-monogram-dark.svg` },
};

const DEFAULT_SIZE: Record<"full" | "mark" | "monogram", { width: number; height: number }> = {
  full: { width: 220, height: 56 },
  mark: { width: 64, height: 64 },
  monogram: { width: 180, height: 48 },
};

export interface LogoProps {
  variant?: "full" | "mark" | "monogram";
  theme?: "light" | "dark";
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export function Logo({
  variant = "full",
  theme = "light",
  className = "",
  width,
  height,
  alt = "IIOHR Logo",
}: LogoProps) {
  const src = LOGO_SRC[variant][theme];
  const defaultSize = DEFAULT_SIZE[variant];
  const w = width ?? defaultSize.width;
  const h = height ?? defaultSize.height;

  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}

export default Logo;
