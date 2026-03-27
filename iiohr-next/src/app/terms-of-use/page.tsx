import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { siteConfig } from "@/lib/site";

const canonical = "https://iiohr.com/terms-of-use";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of the ${siteConfig.legalName} website and services.`,
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
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-readable-muted">{children}</div>
    </section>
  );
}

export default function TermsOfUsePage() {
  return (
    <SectionShell>
      <div className="mx-auto max-w-3xl">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-accent uppercase md:text-[11px]">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Terms of Use</h1>
        <p className="mt-4 text-base leading-relaxed text-readable-muted">
          These terms govern your use of the website and services of {siteConfig.legalName}
          (“IIOHR”, “we”, “us”). By using our site or submitting an application or enquiry, you agree
          to these terms. If you do not agree, please do not use our services.
        </p>
        <p className="mt-2 text-xs text-readable-subtle">
          Last updated: {lastUpdated}. Please review this page periodically for changes.
        </p>

        <div className="mt-12 space-y-10">
          <LegalSection id="services" title="1. Services">
            <p>
              IIOHR provides medical education and training in hair restoration, including
              practical FUE training, hair loss science education, pathway guidance, and
              clinic partnership programmes. Specific programmes, entry requirements, and
              terms of participation are described on the site and in separate communications
              to applicants.
            </p>
          </LegalSection>

          <LegalSection id="use" title="2. Acceptable use">
            <p>
              You agree to use our website and services only for lawful purposes. You must not
              submit false or misleading information in applications, misuse our systems, attempt
              to gain unauthorised access to our or others’ data, or use our content for commercial
              redistribution without permission. We reserve the right to refuse or terminate access
              where we reasonably believe these terms have been breached.
            </p>
          </LegalSection>

          <LegalSection id="intellectual-property" title="3. Intellectual property">
            <p>
              Content on this site (text, graphics, logos, layout) is owned by IIOHR or its
              licensors. You may view and print pages for personal, non-commercial use. You may
              not copy, modify, or distribute our content without prior written consent.
            </p>
          </LegalSection>

          <LegalSection id="limitation" title="4. Limitation of liability">
            <p>
              To the fullest extent permitted by law, IIOHR and its affiliates are not liable for
              any indirect, incidental, or consequential damages arising from your use of the site
              or services. Our total liability in connection with these terms or the site shall not
              exceed the amount (if any) you have paid to us in the twelve months preceding the
              claim. Nothing in these terms excludes or limits liability that cannot be excluded or
              limited under applicable law.
            </p>
          </LegalSection>

          <LegalSection id="governing-law" title="5. Governing law">
            <p>
              These terms are governed by the laws of Australia. Any disputes shall be subject to
              the exclusive jurisdiction of the courts of Australia, unless otherwise required by
              mandatory law in your country of residence.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="6. Contact">
            <p>
              For questions about these terms:{" "}
              <a href={`mailto:${siteConfig.emails.support}`} className="link-premium">
                {siteConfig.emails.support}
              </a>
              .
            </p>
          </LegalSection>
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <Link
            href="/"
            className="link-premium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
