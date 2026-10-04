// Optimise client-supplied assets. Source sheets are retained unchanged.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("public/images", { recursive: true });
const folder = "public/latest images/";
const records = [];
async function crop(file, name, region) {
  let image = sharp(folder + file);
  if (region) image = image.extract(region);
  await image
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(`public/images/${name}.webp`);
  records.push({
    source: folder + file,
    asset: `/images/${name}.webp`,
    region,
  });
}
await crop("aroma product image-1.jpeg", "square-tower", {
  left: 155,
  top: 280,
  width: 315,
  height: 290,
});
await crop("aroma product image-2.jpeg", "hvac-power", {
  left: 405,
  top: 125,
  width: 459,
  height: 360,
});
await crop("aroma product image-4.jpeg", "cloudy", {
  left: 40,
  top: 290,
  width: 634,
  height: 680,
});
await crop("aroma product image-5.jpeg", "automatic-dispenser", {
  left: 450,
  top: 380,
  width: 310,
  height: 795,
});
for (let i = 1; i <= 7; i++)
  await crop(`aroma product image-${i}.jpeg`, `latest-catalogue-${i}`);
await crop("aroma product image-6.jpeg", "latest-oils", {
  left: 65,
  top: 580,
  width: 725,
  height: 510,
});
await crop("aroma product image-7.jpeg", "essential-oils", {
  left: 0,
  top: 410,
  width: 1280,
  height: 380,
});
await crop("aroma product image-6.jpeg", "oil-jasmine", {
  left: 330,
  top: 595,
  width: 166,
  height: 475,
});
await crop("aroma product image-6.jpeg", "oil-rose", {
  left: 160,
  top: 615,
  width: 165,
  height: 405,
});
await crop("aroma product image-6.jpeg", "oil-oud", {
  left: 242,
  top: 600,
  width: 120,
  height: 410,
});
await crop("aroma product image-6.jpeg", "oil-misty-m", {
  left: 480,
  top: 600,
  width: 165,
  height: 415,
});
await crop("aroma product image-7.jpeg", "oil-buneez", {
  left: 300,
  top: 415,
  width: 165,
  height: 355,
});
await crop("aroma product image-7.jpeg", "oil-misfit", {
  left: 655,
  top: 415,
  width: 175,
  height: 355,
});
await crop("aroma product image-7.jpeg", "oil-aqua", {
  left: 833,
  top: 415,
  width: 180,
  height: 355,
});
// Horizontal lockup using the supplied mark and wordmark at their natural proportions.
const logo = folder + "aroma new logo.jpeg";
const mark = await sharp(logo)
  .extract({ left: 490, top: 275, width: 275, height: 355 })
  .resize({ height: 108 })
  .png()
  .toBuffer();
const text = await sharp(logo)
  .extract({ left: 120, top: 640, width: 1020, height: 205 })
  .resize({ width: 350 })
  .png()
  .toBuffer();
await sharp({
  create: { width: 454, height: 112, channels: 3, background: "#f3edde" },
})
  .composite([
    { input: mark, left: 3, top: 2 },
    { input: text, left: 98, top: 22 },
  ])
  .webp({ quality: 94 })
  .toFile("public/logo-current.webp");
await sharp(logo)
  .extract({ left: 490, top: 275, width: 275, height: 355 })
  .resize({ height: 64 })
  .png()
  .toFile("public/icon-current.png");
await writeFile(
  "output/latest-asset-manifest.json",
  JSON.stringify(records, null, 2),
);
console.log(
  `Prepared ${records.length} images and current logo. Originals preserved.`,
);
