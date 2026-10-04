import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Motion from "@/components/motion";
import { business, siteUrl } from "@/lib/data";
const cormorant = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
const dmSans = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "Aroma Airs | Fragrance for Every Space",
    template: "%s | Aroma Airs",
  },
  description:
    "Discover Aroma Airs fragrance diffusers and oils for homes, hotels, offices and commercial spaces. Contact our New Delhi team for a tailored scenting solution.",
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  robots: siteUrl
    ? { index: true, follow: true }
    : { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    legalName: business.legalName,
    telephone: business.internationalPhone,
    email: business.email,
    ...(siteUrl
      ? { url: siteUrl, image: siteUrl + "/images/hero-stage.webp" }
      : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Ground Floor, KH No. 867/2, K2 Block, Defence Enclave, Mahipalpur",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110037",
      addressCountry: "IN",
    },
  };
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Motion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
