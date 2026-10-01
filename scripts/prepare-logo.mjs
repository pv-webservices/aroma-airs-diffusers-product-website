// Builds web-sized logo variants from the supplied "Aromaairs Fragrance Diffuser Logo.png".
// logo-dark.webp: original colours for light backgrounds.
// logo-light.webp: the dark-grey "FRAGRANCE DIFFUSER" line recoloured white for dark backgrounds.
import sharp from "sharp";
const source = "public/Aromaairs Fragrance Diffuser Logo.png";
const trimmed = await sharp(source).trim().toBuffer();
const base = sharp(trimmed).resize({ width: 640 });
await base.clone().webp({ quality: 90, alphaQuality: 100 }).toFile("public/logo-dark.webp");
const { data, info } = await base.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (a > 0 && max < 140 && max - min < 40) {
    data[i] = data[i + 1] = data[i + 2] = 245;
  }
}
await sharp(data, { raw: info }).webp({ quality: 90, alphaQuality: 100 }).toFile("public/logo-light.webp");
const meta = await sharp("public/logo-dark.webp").metadata();
console.log("logo", meta.width, meta.height);
