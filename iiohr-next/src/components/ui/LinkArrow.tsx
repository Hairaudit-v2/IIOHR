import Link from "next/link";
import type { ReactNode } from "react";

interface LinkArrowProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  analyticsEvent?: string;
  analyticsPage?: string;
  analyticsCta?: string;
  analyticsSection?: string;
  analyticsRole?: string;
  analyticsJourney?: string;
}

export function LinkArrow({
  href,
  children,
  className = "",
  external = href.startsWith("http"),
  analyticsEvent,
  analyticsPage,
  analyticsCta,
  analyticsSection,
  analyticsRole,
  analyticsJourney,
}: LinkArrowProps) {
  const classNames = `link-premium group inline-flex items-center gap-1.5 text-sm font-semibold tracking-[0.03em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames}
        data-analytics-event={analyticsEvent}
        data-analytics-page={analyticsPage}
        data-analytics-cta={analyticsCta}
        data-analytics-section={analyticsSection}
        data-analytics-role={analyticsRole}
        data-analytics-journey={analyticsJourney}
        data-analytics-destination={href}
      >
        <span>{children}</span>
        <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-px">
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classNames}
      data-analytics-event={analyticsEvent}
      data-analytics-page={analyticsPage}
      data-analytics-cta={analyticsCta}
      data-analytics-section={analyticsSection}
      data-analytics-role={analyticsRole}
      data-analytics-journey={analyticsJourney}
      data-analytics-destination={href}
    >
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-px">
        →
      </span>
    </Link>
  );
}
