// Prepares the redesign imagery as optimised WebP files in public/images.
// 1. Crops/upscales the client's own product photography.
// 2. Fetches supporting Unsplash photography (Unsplash License) for scent and mood imagery.
// 3. If AI images exist in output/generated (scripts/generate-images.mjs), they replace
//    the matching stock/catalogue files automatically, keeping the same public filenames.
// Usage: node scripts/prepare-redesign-assets.mjs
import sharp from "sharp";
import { access, mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("public/images");
const GENERATED = path.resolve("output/generated");
await mkdir(OUT, { recursive: true });

const exists = (file) =>
  access(file).then(
    () => true,
    () => false,
  );

/** Unsplash photo id -> output name, width and aspect crop. */
const stock = {
  "scent-lavender": ["1595494931131-56021a1bdac0", 900, 4 / 5],
  "scent-citrus": ["1611178240324-ce6859180a5e", 900, 4 / 5],
  "scent-white-blossom": ["1702445924097-9e4b46fbfe0b", 900, 4 / 5],
  "scent-sandalwood": ["1583182363039-59eac8609ab2", 900, 4 / 5],
  "scent-ocean": ["1542228556-0125288e633d", 900, 4 / 5],
  "scent-tea-rose": ["1709143467501-187f3839c090", 900, 4 / 5],
  "scent-flora": ["1567776287475-0b18a4e1dcab", 900, 4 / 5],
  "scent-lemongrass": ["1524641619328-f3b7444f7afa", 900, 4 / 5],
  "scent-modern-oud": ["1627769916425-74c2344a3439", 900, 4 / 5],
  "scent-oud-arabia": ["1684039568465-24c31d0cc80f", 900, 4 / 5],
  "scent-shangria": ["1757948652333-794e561a140d", 900, 4 / 5],
  "scent-trishya": ["1780829849265-ba45977ddd0b", 900, 4 / 5],
  "hero-lobby": ["1782854356665-000b01a48016", 1920, 16 / 9],
  "hero-lobby-mobile": ["1782834294703-5b73c59466e3", 900, 9 / 16],
  "mist-band": ["1613750255797-7d4f877615df", 1600, 16 / 9],
  "leaves": ["1585328000852-779be6a6582b", 900, 3 / 4],
};

async function fromStock(name, [id, width, ratio]) {
  const file = path.join(OUT, `${name}.webp`);
  const generated = path.join(GENERATED, `${name}.png`);
  if (await exists(generated)) {
    await sharp(generated).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(file);
    return console.log(`${name}: AI generated`);
  }
  if (await exists(file)) return console.log(`${name}: cached`);
  const response = await fetch(`https://images.unsplash.com/photo-${id}?w=${width * 2}&q=85&fm=jpg`);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await sharp(buffer)
    .resize({ width, height: Math.round(width / ratio), fit: "cover", position: "attention" })
    .webp({ quality: 80 })
    .toFile(file);
  console.log(`${name}: stock prepared`);
}

async function crop(source, name, region, width, options = {}) {
  let pipeline = sharp(path.resolve("public", source));
  if (region) pipeline = pipeline.extract(region);
  pipeline = pipeline.resize({ width, kernel: "lanczos3", withoutEnlargement: !options.upscale });
  if (options.upscale) pipeline = pipeline.sharpen({ sigma: 0.8 });
  await pipeline.webp({ quality: 84 }).toFile(path.join(OUT, `${name}.webp`));
  console.log(`${name}: catalogue crop prepared`);
}

await Promise.all(Object.entries(stock).map(([name, spec]) => fromStock(name, spec)));

// Client product photography.
await crop("image-6.jpeg", "compact", { left: 40, top: 120, width: 600, height: 840 }, 600);
await crop(
  "product image-3.jpeg",
  "compact-white",
  { left: 222, top: 803, width: 186, height: 218 },
  520,
  { upscale: true },
);
await crop("product image-3.jpeg", "hero-trio", { left: 392, top: 180, width: 663, height: 548 }, 1100, {
  upscale: true,
});

// AI-generated hero art (Nano Banana 2 Lite, 1K).
for (const [name, width] of [
  ["hero-desktop", 1376],
  ["hero-mobile", 768],
]) {
  const raw = path.join(GENERATED, `${name}.png`);
  if (!(await exists(raw))) continue;
  await sharp(raw).resize({ width }).webp({ quality: 78 }).toFile(path.join(OUT, `${name}.webp`));
  console.log(`${name}: AI generated`);
}

// The 2x2 scent grid is split into four card images (thin gutters trimmed away).
const grid = path.join(GENERATED, "scent-grid.png");
if (await exists(grid)) {
  const { width: size } = await sharp(grid).metadata();
  const half = Math.floor(size / 2);
  const inset = Math.round(size * 0.012);
  const tiles = ["scent-tea-rose", "scent-lemongrass", "scent-modern-oud", "scent-oud-arabia"];
  for (const [i, name] of tiles.entries()) {
    await sharp(grid)
      .extract({
        left: (i % 2) * half + inset,
        top: Math.floor(i / 2) * half + inset,
        width: half - inset * 2,
        height: half - inset * 2,
      })
      .resize({ width: 600, height: 750, fit: "cover" })
      .webp({ quality: 80 })
      .toFile(path.join(OUT, `${name}.webp`));
    console.log(`${name}: AI generated (grid tile)`);
  }
}
console.log("Redesign assets ready.");
