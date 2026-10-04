import type { Metadata } from "next";
import { siteUrl } from "./data";
export function pageMeta(
  title: string,
  description: string,
  path: string,
  image = "/images/hero-stage.webp",
): Metadata {
  return {
    title,
    description,
    alternates: siteUrl ? { canonical: siteUrl + path } : undefined,
    openGraph: {
      title: `${title} | Aroma Airs`,
      description,
      type: "website",
      ...(siteUrl
        ? { url: siteUrl + path, images: [{ url: siteUrl + image }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Aroma Airs`,
      description,
      ...(siteUrl ? { images: [siteUrl + image] } : {}),
    },
  };
}
