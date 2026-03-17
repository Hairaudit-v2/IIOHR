"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/90 bg-background/92 backdrop-blur-md">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-5">
        <Link
          href="/"
          className="group flex items-center gap-3 leading-none text-primary"
          aria-label="IIOHR home"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-[10px] font-semibold tracking-[0.16em]"
          >
            II
          </span>
          <span className="flex flex-col">
            <span className="text-lg font-semibold tracking-[0.06em]">IIOHR</span>
            <span className="mt-1 hidden text-[10px] tracking-[0.14em] text-muted-foreground uppercase group-hover:text-foreground md:block">
              International Institute of Hair Restoration
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex">
          {primaryNavigation.map((item) => (
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  pathname === item.href
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
          <Button href="/apply" variant="secondary" className="ml-1">
            Apply for Training
          </Button>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
