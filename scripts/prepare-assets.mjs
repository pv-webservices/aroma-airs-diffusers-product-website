import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
const dir = path.resolve("public/images");
await mkdir(dir, { recursive: true });
async function asset(source, name, crop, width = 1200) {
  let pipeline = sharp(path.resolve("public", source));
  if (crop) pipeline = pipeline.extract(crop);
  await pipeline
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(path.join(dir, name + ".webp"));
}
await asset("product image-3.jpeg", "hero-collection", {
  left: 397,
  top: 204,
  width: 658,
  height: 519,
});
await sharp(path.join(dir, "hero-collection.webp"))
  .avif({ quality: 65, effort: 5 })
  .toFile(path.join(dir, "hero-collection.avif"));
await asset(
  "product image-3.jpeg",
  "compact",
  { left: 19, top: 805, width: 185, height: 214 },
  500,
);
await asset(
  "product image-3.jpeg",
  "compact-white",
  { left: 225, top: 805, width: 180, height: 214 },
  500,
);
await asset("image-7.jpeg", "wall-pro-black", null, 700);
await asset(
  "image-2.jpeg",
  "wall-pro-white-product",
  { left: 0, top: 280, width: 1057, height: 920 },
  700,
);
await asset(
  "image-5.jpeg",
  "tower-product",
  { left: 625, top: 95, width: 350, height: 830 },
  800,
);
await asset("image-3.jpeg", "tower-pair", null, 1000);
await asset("image-22.jpeg", "tower-controls", null, 1000);
await asset(
  "image-17.jpeg",
  "wall-interior-black",
  { left: 0, top: 497, width: 1014, height: 700 },
  900,
);
await asset(
  "image-16.jpeg",
  "wall-interior-white",
  { left: 0, top: 480, width: 1042, height: 736 },
  900,
);
await asset(
  "image-20.jpeg",
  "wall-back",
  { left: 0, top: 397, width: 1080, height: 858 },
  900,
);
await asset("image-1.jpeg", "wall-lifestyle", null);
await asset("image-10.jpeg", "table-lifestyle", null);
await asset("image-23.jpeg", "hotel-lifestyle", null);
await asset("image-25.jpeg", "home-lifestyle", null);
await asset("image-9.jpeg", "installation", null);
await asset(
  "product image-1.jpeg",
  "oil-lifestyle",
  { left: 468, top: 246, width: 386, height: 785 },
  700,
);
await asset(
  "product image-2.jpeg",
  "oil-bottle",
  { left: 695, top: 142, width: 298, height: 815 },
  500,
);
for (const [i, name] of [
  "lavender",
  "citrus-fresh",
  "white-blossom",
  "sandalwood",
  "ocean-breeze",
].entries()) {
  await asset(
    "product image-4.jpeg",
    name,
    { left: 52 + i * 144, top: 1230, width: 130, height: 108 },
    400,
  );
}
await asset(
  "product image-2.jpeg",
  "tea-rose",
  { left: 355, top: 1040, width: 135, height: 115 },
  400,
);
await asset(
  "product image-2.jpeg",
  "lemongrass",
  { left: 192, top: 1040, width: 135, height: 115 },
  400,
);
await asset(
  "product image-2.jpeg",
  "oud-arabia",
  { left: 697, top: 1040, width: 135, height: 115 },
  400,
);
await asset(
  "product image-2.jpeg",
  "modern-oud",
  { left: 867, top: 1040, width: 135, height: 115 },
  400,
);
console.log("Optimized supplied assets prepared. Original files preserved.");
