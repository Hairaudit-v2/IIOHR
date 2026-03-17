import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getOrganizationJsonLd, getWebSiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Default OG image for social sharing. Drop final asset at public/og/iiohr-og.jpg (1200×630) when ready. */
const OG_IMAGE_PATH = "/og/iiohr-og.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://iiohr.com"),
  title: {
    default: "IIOHR — International Institute of Hair Restoration",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://iiohr.com",
    siteName: siteConfig.legalName,
    title: "IIOHR — International Institute of Hair Restoration",
    description: siteConfig.description,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "IIOHR — International Institute of Hair Restoration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IIOHR — International Institute of Hair Restoration",
    description: siteConfig.description,
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = getOrganizationJsonLd({
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description:
      "The International Institute of Hair Restoration (IIOHR) is a global education and training institute for hair restoration surgery, offering structured pathways in practical FUE, hair loss science, and surgeon development within the Hair Intelligence ecosystem.",
  });
  const webSiteJsonLd = getWebSiteJsonLd({ name: siteConfig.legalName });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLdScript data={[organizationJsonLd, webSiteJsonLd]} />
        <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:ring-2 focus:ring-accent"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
