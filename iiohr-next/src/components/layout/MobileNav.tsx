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
        className="inline-flex min-h-[42px] min-w-[42px] items-center justify-center rounded-[6px] border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
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
            className="mobile-nav-backdrop fixed inset-0 z-40"
            aria-label="Close navigation overlay"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-primary-nav"
            className="absolute right-0 top-full z-50 mt-3 w-[min(90vw,360px)] min-w-0 rounded-[8px] border border-white/12 bg-[#0f172a] px-4 py-5 shadow-none"
          >
            <p className="text-[11px] tracking-[0.14em] text-slate-300 uppercase">
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
                      className="flex min-h-[44px] items-center justify-between rounded-[6px] px-3 py-2.5 text-sm text-slate-300 hover:bg-white/8 hover:text-white"
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-[44px] items-center rounded-[6px] px-3 py-2.5 text-sm ${
                        pathname === item.href
                          ? "bg-white/10 font-semibold text-[#f8fafc]"
                          : "text-slate-300 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-white/12 pt-4">
              <p className="text-[11px] tracking-[0.14em] text-slate-300 uppercase">
                Admissions
              </p>
              <div className="mt-3 space-y-2">
                <a
                  href={`mailto:${siteConfig.emails.admissions}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center rounded-[6px] border border-white/18 bg-white/5 px-3 py-2.5 text-sm text-[#f8fafc] hover:border-white/30 hover:text-white"
                >
                  {siteConfig.emails.admissions}
                </a>
              </div>
            </div>
            <div className="pt-4">
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-[6px] border border-gold bg-gold px-3 py-2.5 text-sm font-semibold text-slate-950"
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
