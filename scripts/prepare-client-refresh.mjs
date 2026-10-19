// Preserve supplied originals; prepare web assets and a traceable source manifest.
import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

await mkdir("output/refresh", { recursive: true });
await mkdir("public/images", { recursive: true });
const groups = [
  ["public/product images", "new-", 1400],
  ["public/latest images/Frangrance images", "fragrance-", 1200],
  ["public/latest images/gallery images", "gallery-", 1600],
  ["public/latest images/Client logos", "client-", 600],
];
const manifest = [];
for (const [folder, prefix, width] of groups) {
  const files = (await readdir(folder)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const tiles = [];
  for (const [i, file] of files.entries()) {
    const name = (prefix === "client-" ? "" : prefix) + path.parse(file).name.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const source = path.join(folder, file);
    let asset = sharp(source).rotate();
    if (prefix === "client-") asset = asset.trim({ background: "#ffffff", threshold: 18 });
    await asset.resize({ width, withoutEnlargement: true }).webp({ quality: 88 }).toFile(`public/images/${name}.webp`);
    manifest.push({ source: source.replaceAll("\\", "/"), asset: `/images/${name}.webp` });
    tiles.push({ input: await sharp(source).rotate().resize(240, 210, { fit: "contain", background: "#f8f3eb" }).png().toBuffer(), left: (i % 5) * 260, top: Math.floor(i / 5) * 250 });
    tiles.push({ input: Buffer.from(`<svg width="250" height="30"><text x="4" y="20" font-size="12">${file}</text></svg>`), left: (i % 5) * 260, top: Math.floor(i / 5) * 250 + 212 });
  }
  await sharp({ create: { width: 1300, height: Math.ceil(files.length / 5) * 250, channels: 3, background: "#f8f3eb" } }).composite(tiles).jpeg().toFile(`output/refresh/${prefix}contact-sheet.jpg`);
}
await writeFile("output/refresh/asset-manifest.json", JSON.stringify(manifest, null, 2));
console.log(`Prepared ${manifest.length} supplied assets.`);
