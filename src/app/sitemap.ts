import type { MetadataRoute } from "next";
import { siteUrl, products, fragrances, categories } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    "",
    "/about",
    "/products",
    "/fragrances",
    "/applications",
    "/gallery",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    ...products.map((p) => `/products/${p.slug}`),
    ...categories.map((c) => `/products/${c.slug}`),
    ...fragrances.map((f) => `/fragrances/${f.slug}`),
  ].map((path) => ({
    url: siteUrl + path,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/products") ? 0.8 : 0.6,
  }));
}
