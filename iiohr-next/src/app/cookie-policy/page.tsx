import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { siteConfig } from "@/lib/site";

const canonical = "https://iiohr.com/cookie-policy";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${siteConfig.legalName} uses cookies and similar technologies.`,
  alternates: { canonical },
  openGraph: { url: canonical },
};

const lastUpdated = "2025";

function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-border/60 pb-10 last:border-0 last:pb-0">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export default function CookiePolicyPage() {
  return (
    <SectionShell>
      <div className="mx-auto max-w-3xl">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-accent uppercase md:text-[11px]">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Cookie Policy</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          This policy explains how {siteConfig.legalName} (“IIOHR”) uses cookies and similar
          technologies on our website. By continuing to use the site, you consent to our use of
          cookies as described here.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Last updated: {lastUpdated}. Please review this page periodically for changes.
        </p>

        <div className="mt-12 space-y-10">
          <LegalSection id="what-are-cookies" title="1. What are cookies">
            <p>
              Cookies are small text files stored on your device when you visit a website. They
              help the site remember your preferences, improve performance, and understand how the
              site is used. We use only what is necessary for the operation and improvement of our
              site.
            </p>
          </LegalSection>

          <LegalSection id="how-we-use" title="2. How we use cookies">
            <p>
              We may use strictly necessary cookies (required for the site to function), performance
              cookies (to understand usage patterns and improve the site), and, if you consent,
              analytics or other optional cookies. We do not use cookies for advertising or to track
              you across third-party sites for marketing purposes.
            </p>
          </LegalSection>

          <LegalSection id="your-choices" title="3. Your choices">
            <p>
              You can control or delete cookies via your browser settings. Blocking or removing
              cookies may affect site functionality. Where we use optional cookies, we will seek
              your consent where required by law.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="4. Contact">
            <p>
              For questions about this cookie policy:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-foreground underline hover:text-accent"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </LegalSection>
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(108,132,168,0.45)] focus-visible:ring-offset-2"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
