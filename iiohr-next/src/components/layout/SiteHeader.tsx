"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/12 bg-[#0f172a]">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5 sm:px-5">
        <Link
          href="/"
          className="group flex items-center gap-3 leading-none text-[#f8fafc]"
          aria-label="IIOHR home"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[6px] border border-white/20 bg-white/5 text-[10px] font-semibold tracking-[0.15em] text-[#f8fafc]"
          >
            II
          </span>
          <span className="flex flex-col">
            <span className="text-lg font-semibold tracking-[0.05em] text-[#f8fafc]">IIOHR</span>
            <span className="mt-1 hidden text-[10px] tracking-[0.12em] text-slate-300 uppercase group-hover:text-white md:block">
              International Institute of Hair Restoration
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-4.5 xl:flex">
          {primaryNavigation.map((item) => (
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`px-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a] ${
                  pathname === item.href
                    ? "font-semibold text-[#f8fafc]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
          <Button href="/apply" variant="dark" className="ml-1.5">
            Apply for Training
          </Button>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
