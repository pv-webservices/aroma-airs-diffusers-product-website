import { readFile, mkdir, writeFile } from "node:fs/promises";
const base = (process.env.VERIFY_SITE_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);
const manifest = JSON.parse(
  await readFile(".next/prerender-manifest.json", "utf8"),
);
const routes = [
  ...Object.keys(manifest.routes).filter((p) => !p.startsWith("/_")),
  "/does-not-exist",
  "/products/unknown",
  "/fragrances/unknown",
];
const results = [];
const links = new Set();
const failures = [];
for (const route of routes) {
  const response = await fetch(base + route);
  const html = await response.text();
  const missing = route === "/does-not-exist" || route.endsWith("/unknown");
  const document = !["/robots.txt", "/sitemap.xml", "/icon.png"].includes(route);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const h1s = (html.match(/<h1[ >]/g) || []).length;
  const phones = [...html.matchAll(/href="(tel:[^"]+)"/g)].map((m) => m[1]);
  const wa = [...html.matchAll(/href="(https:\/\/wa.me\/[^"?]+)/g)].map(
    (m) => m[1],
  );
  for (const match of html.matchAll(/href="(\/[^"?#]*)/g)) links.add(match[1]);
  const result = {
    route,
    status: response.status,
    title,
    h1s: document ? h1s : null,
    wrongPhone: phones.some((p) => p !== "tel:+919015759321"),
    wrongWhatsapp: wa.some((p) => p !== "https://wa.me/919015759321"),
  };
  results.push(result);
  if (
    response.status !== (missing ? 404 : 200) ||
    (!missing && document && (!title || h1s !== 1)) ||
    result.wrongPhone ||
    result.wrongWhatsapp
  )
    failures.push(result);
}
const brokenLinks = [];
for (const href of links) {
  if (href.startsWith("/_next/")) continue;
  const response = await fetch(base + href);
  if (!response.ok) brokenLinks.push({ href, status: response.status });
}
await mkdir("output/playwright", { recursive: true });
await writeFile(
  "output/playwright/route-audit.json",
  JSON.stringify(
    {
      base,
      timestamp: new Date().toISOString(),
      results,
      failures,
      brokenLinks,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    {
      routes: results.length,
      internalLinks: links.size,
      failures,
      brokenLinks,
    },
    null,
    2,
  ),
);
if (failures.length || brokenLinks.length) process.exitCode = 1;
