import Link from "next/link";
import {
  applyTrainingHref,
  ecosystemNavigation,
  footerNavigation,
  legalNavigation,
  standardsSupportItems,
} from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { LinkArrow } from "@/components/ui/LinkArrow";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/12 bg-[#0f172a] text-[#f8fafc]">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-5 md:py-16">
        <div className="rounded-[8px] border border-white/12 bg-white/5 px-4 py-4 sm:px-5">
          <p className="text-[11px] tracking-[0.16em] text-slate-300 uppercase">
            Part of the Hair Intelligence Ecosystem
          </p>
          <div className="mt-3 grid gap-2.5 md:grid-cols-2 xl:grid-cols-4">
            {ecosystemNavigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[6px] border border-white/18 bg-white/5 px-3 py-2 text-xs text-slate-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <span>{item.label}</span>
                <span aria-hidden className="text-[10px] opacity-70">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="xl:col-span-2">
            <p className="text-lg font-semibold tracking-[0.04em] text-[#f8fafc]">IIOHR</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
              {siteConfig.legalName} is a specialist medical training institute focused on
              practical education, scientific rigor, and long-term surgeon development in hair
              restoration.
            </p>
            <div className="mt-6">
              <LinkArrow href={applyTrainingHref} className="text-slate-100 hover:text-white">
                Apply for Training
              </LinkArrow>
            </div>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.14em] text-slate-300 uppercase">
              Footer Navigation
            </h3>
            <ul className="mt-3 space-y-2">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-200 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.14em] text-slate-300 uppercase">Standards and Support</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {standardsSupportItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>
                Contact:{" "}
                <a href={`mailto:${siteConfig.emails.info}`} className="link-premium text-slate-100 hover:text-white">
                  {siteConfig.emails.info}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/12 pt-7 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`}</p>
          <div className="flex flex-wrap items-center gap-4">
            {legalNavigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="link-premium text-xs text-slate-100 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
