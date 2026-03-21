import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { siteConfig } from "@/lib/site";

const canonical = "https://iiohr.com/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.legalName} collects, uses, and protects your personal information.`,
  alternates: { canonical },
  openGraph: { url: canonical },
};

const lastUpdated = "2025";

/** Section template for legal copy. Replace placeholder text with approved legal content. */
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

export default function PrivacyPolicyPage() {
  return (
    <SectionShell>
      <div className="mx-auto max-w-3xl">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-accent uppercase md:text-[11px]">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {siteConfig.legalName} (“IIOHR”, “we”, “us”) is committed to protecting your privacy. This
          policy explains how we collect, use, store, and disclose your information in connection
          with our training, admissions, and related services.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Last updated: {lastUpdated}. Please review this page periodically for changes.
        </p>

        <div className="mt-12 space-y-10">
          <LegalSection id="collection" title="1. Information we collect">
            <p>
              We collect information you provide when applying for training, enquiring about
              pathways, or contacting us. This may include: name, email address, phone number,
              country, medical background, experience level, interest areas, goals, and preferred
              timeframe. We may also collect technical data such as IP address and browser type
              when you use our website.
            </p>
          </LegalSection>

          <LegalSection id="use" title="2. How we use your information">
            <p>
              We use your information to process applications, match you to suitable pathways,
              communicate about admissions and training, improve our services, and comply with
              legal obligations. We do not use your information for marketing unless you have
              consented or we have a legitimate interest and you have not opted out.
            </p>
          </LegalSection>

          <LegalSection id="sharing" title="3. Sharing and disclosure">
            <p>
              We do not sell your personal information. We may share data with trusted service
              providers who assist with operations (e.g. email delivery, hosting) under strict
              confidentiality. We may disclose information where required by law or to protect our
              rights, safety, or the rights of others.
            </p>
          </LegalSection>

          <LegalSection id="security" title="4. Security">
            <p>
              We implement appropriate technical and organisational measures to protect your
              personal data against unauthorised access, loss, or misuse. No method of transmission
              over the internet is completely secure; we encourage you to use secure channels
              when sending sensitive information.
            </p>
          </LegalSection>

          <LegalSection id="rights" title="5. Your rights">
            <p>
              Depending on your location, you may have rights to access, correct, delete, or restrict
              processing of your data, or to object to processing and to data portability. To
              exercise these rights or ask questions about your data, contact us at the address
              below.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="6. Contact">
            <p>
              For privacy-related enquiries or to exercise your rights, contact:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-foreground underline hover:text-accent"
              >
                {siteConfig.email}
              </a>
              . We will respond within a reasonable time.
            </p>
          </LegalSection>
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
