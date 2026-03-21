"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { primaryNavigation } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={open}
        aria-controls="mobile-primary-nav"
        aria-label="Toggle mobile navigation"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        <>
          <button
            type="button"
            className="mobile-nav-backdrop fixed inset-0 z-40 backdrop-blur-[1px]"
            aria-label="Close navigation overlay"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-primary-nav"
            className="absolute right-0 top-full z-50 mt-3 w-[min(90vw,360px)] min-w-0 rounded-lg border border-border bg-background px-4 py-5 shadow-token-mobile-panel"
          >
            <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              Primary Navigation
            </p>
            <ul className="mt-4 space-y-1.5">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex min-h-[44px] items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-[44px] items-center rounded-md px-3 py-2.5 text-sm ${
                        pathname === item.href
                          ? "bg-surface font-semibold text-foreground"
                          : "text-muted-foreground hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                Admissions
              </p>
              <div className="mt-3 space-y-2">
                <a
                  href={`mailto:${siteConfig.applicationEmail}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  {siteConfig.applicationEmail}
                </a>
              </div>
            </div>
            <div className="pt-4">
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-accent bg-surface-soft px-3 py-2.5 text-sm font-semibold text-foreground"
              >
                Apply for Training
              </Link>
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}
