import Link from "next/link";
import {
  ecosystemNavigation,
  footerNavigation,
  legalNavigation,
  standardsSupportItems,
} from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { LinkArrow } from "@/components/ui/LinkArrow";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-5 md:py-14">
        <div className="rounded-lg border border-border bg-background px-4 py-4 sm:px-5">
          <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            Part of the Hair Intelligence Ecosystem
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
            {ecosystemNavigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-border/80 px-3 py-2 text-xs text-muted-foreground hover:border-accent hover:text-foreground"
              >
                <span>{item.label}</span>
                <span aria-hidden className="text-[10px] opacity-70">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="xl:col-span-2">
            <p className="text-lg font-semibold tracking-[0.04em] text-primary">IIOHR</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {siteConfig.legalName} is a specialist medical training institute focused on
              practical education, scientific rigor, and long-term surgeon development in hair
              restoration.
            </p>
            <div className="mt-5">
              <LinkArrow href="/apply">Apply for Training</LinkArrow>
            </div>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Footer Navigation
            </h3>
            <ul className="mt-3 space-y-2.5">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.14em] text-muted-foreground uppercase">Standards and Support</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              {standardsSupportItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>
                Contact:{" "}
                <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`}</p>
          <div className="flex flex-wrap items-center gap-4">
            {legalNavigation.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
