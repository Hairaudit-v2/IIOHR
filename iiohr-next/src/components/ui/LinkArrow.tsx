import Link from "next/link";
import type { ReactNode } from "react";

interface LinkArrowProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

export function LinkArrow({
  href,
  children,
  className = "",
  external = href.startsWith("http"),
}: LinkArrowProps) {
  const classNames = `group inline-flex items-center gap-2 text-sm font-semibold tracking-[0.04em] text-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames}
      >
        <span>{children}</span>
        <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classNames}
    >
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
