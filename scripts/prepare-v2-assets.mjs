// Optimises the regenerated imagery and the stacked logo (kept in its original
// stacked layout, never converted to a landscape lockup).
// Usage: node scripts/prepare-v2-assets.mjs
import sharp from "sharp";

const RAW = "output/generated/";
const OUT = "public/images/";
const LOGO_SRC = "public/latest images/aroma new logo.jpeg";

const products = [
  "p-square-tower", "p-hvac-power", "p-automatic-dispenser", "p-cloudy",
  "p-oil-jasmine", "p-oil-rose", "p-oil-oud", "p-oil-misty-m",
  "p-oil-buneez", "p-oil-misfit", "p-oil-aqua",
];
// Lift the near-white studio backdrop to pure white so it disappears under mix-blend-mode: multiply.
// Only the backdrop connected to the image border is lifted (flood fill), so white products keep their shading.
const LIGHT = 196;
const STEP = 6;
async function whiten(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const lum = (p) => (data[p * 3] + data[p * 3 + 1] + data[p * 3 + 2]) / 3;
  const seen = new Uint8Array(width * height);
  const queue = [];
  for (let x = 0; x < width; x++) queue.push(x, (height - 1) * width + x);
  for (let y = 0; y < height; y++) queue.push(y * width, y * width + width - 1);
  while (queue.length) {
    const p = queue.pop();
    if (seen[p] || lum(p) < LIGHT) continue;
    seen[p] = 1;
    const x = p % width;
    const neighbours = [x > 0 ? p - 1 : -1, x < width - 1 ? p + 1 : -1, p - width, p + width];
    for (const n of neighbours)
      if (n >= 0 && n < seen.length && !seen[n] && Math.abs(lum(n) - lum(p)) <= STEP) queue.push(n);
  }
  for (let p = 0; p < seen.length; p++) {
    if (!seen[p]) continue;
    // Keep soft contact shadows: lift towards white in proportion to brightness.
    const t = Math.min((lum(p) - LIGHT) / (250 - LIGHT), 1) ** 0.6;
    for (let c = 0; c < 3; c++) data[p * 3 + c] = Math.round(data[p * 3 + c] + (255 - data[p * 3 + c]) * t);
  }
  return sharp(data, { raw: info });
}
for (const name of products)
  await (await whiten(`${RAW}${name}.png`))
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(`${OUT}${name}.webp`);

// Earlier catalogue cut-outs: same backdrop clean-up, saved as s-* so the originals stay untouched.
const cutouts = ["compact", "compact-white", "wall-pro-black", "wall-pro-white-product", "tower-product"];
for (const name of cutouts)
  await (await whiten(`${OUT}${name}.webp`)).webp({ quality: 88 }).toFile(`${OUT}s-${name}.webp`);

await sharp(`${RAW}hero-stage-v2.png`).webp({ quality: 82 }).toFile(`${OUT}hero-stage.webp`);
await sharp(`${RAW}hero-stage-mobile.png`).webp({ quality: 80 }).toFile(`${OUT}hero-stage-mobile.webp`);

// Logo: remove the cream backdrop, trim to the artwork, keep the stacked layout.
const BG = [242, 235, 222];
const { data, info } = await sharp(LOGO_SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const light = Buffer.from(data);
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  const distance = Math.max(Math.abs(r - BG[0]), Math.abs(g - BG[1]), Math.abs(b - BG[2]));
  const alpha = Math.max(0, Math.min(255, (distance - 18) * 4));
  data[i + 3] = alpha;
  light[i + 3] = alpha;
  // Light variant for dark backgrounds: charcoal artwork becomes ivory, orange stays.
  const isOrange = r > 180 && g < 170 && b < 120;
  if (!isOrange) {
    light[i] = 246;
    light[i + 1] = 239;
    light[i + 2] = 228;
  }
}
const raw = { raw: { width: info.width, height: info.height, channels: 4 } };
for (const [buffer, file] of [[data, "logo"], [light, "logo-light"]]) {
  const trimmed = await sharp(buffer, raw).trim({ threshold: 1 }).png().toBuffer();
  await sharp(trimmed).resize({ height: 360 }).webp({ quality: 92, alphaQuality: 100 }).toFile(`public/${file}.webp`);
}
// Square favicon from the emblem (top part of the stacked mark).
const region = await sharp(data, raw).extract({ left: 470, top: 270, width: 320, height: 350 }).png().toBuffer();
const mark = await sharp(region).trim({ threshold: 1 }).png().toBuffer();
await sharp(mark).resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile("src/app/icon.png");
console.log("v2 assets ready");
