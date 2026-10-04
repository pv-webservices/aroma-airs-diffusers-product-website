// Regenerates sharp product thumbnails and the hero scenes with Google Nano Banana 2 Lite
// (gemini-3.1-flash-lite-image, 1K). Each prompt passes a crop of the client's own
// catalogue photography so the real product design is preserved.
// Usage: node --env-file=.env scripts/generate-product-images.mjs [name ...]
// Raw PNGs land in output/generated; optimised WebP files in public/images.
import sharp from "sharp";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const MODEL = "gemini-3.1-flash-lite-image";
const API = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const RAW_DIR = path.resolve("output/generated");
const OUT_DIR = path.resolve("public/images");
const LATEST = "public/latest images/";
const KEY = process.env.GEMINI_API_KEY;
if (!KEY) throw new Error("GEMINI_API_KEY is not set (run with --env-file=.env)");

const STUDIO =
  "Premium e-commerce product photograph. The product stands centred on a seamless pure white studio background with a soft natural contact shadow beneath it, gentle soft-box lighting, crisp sharp detail, true-to-life materials, the whole product fully visible with generous empty margin around it. No props, no extra text, no watermark.";
const KEEP = "Reproduce the product from the reference image exactly: same shape, proportions, colours, materials and details. Do not redesign it.";

async function ref(file, region) {
  let image = sharp(file);
  if (region) image = image.extract(region);
  return image.jpeg({ quality: 94 }).toBuffer();
}

async function references() {
  return {
    squareTower: await ref(`${LATEST}aroma product image-1.jpeg`, { left: 180, top: 240, width: 300, height: 330 }),
    hvac: await ref(`${LATEST}aroma product image-2.jpeg`, { left: 420, top: 60, width: 330, height: 440 }),
    cloudy: await ref(`${LATEST}aroma product image-4.jpeg`, { left: 150, top: 370, width: 420, height: 550 }),
    dispenser: await ref(`${LATEST}aroma product image-5.jpeg`, { left: 440, top: 380, width: 330, height: 800 }),
    tallOils: await ref(`${LATEST}aroma product image-6.jpeg`, { left: 80, top: 590, width: 700, height: 480 }),
    amberOils: await ref(`${LATEST}aroma product image-7.jpeg`, { left: 290, top: 415, width: 700, height: 340 }),
    tower: await ref("public/image-14.jpeg"),
  };
}

const tallOil = (name) =>
  `${KEEP} Show a single tall clear PET bottle of golden fragrance oil with a black flip cap and a black wrap label framed in thin gold geometric lines, exactly like the bottles in the reference. The yellow name band on the label reads "${name}" in clear black capital letters; above it the pink-and-white "Aroma airs" wordmark. Keep label text minimal and legible. ${STUDIO}`;
const amberOil = (name, band) =>
  `${KEEP} Show a single small amber glass dropper bottle with a black ribbed cap and a cream label with the Aroma Airs logo, exactly like the bottles in the reference. The handwritten script name on the label reads "${name}" and the thin colour band at the bottom of the label is ${band}. Keep label text minimal and legible. ${STUDIO}`;

const jobs = (r) => [
  {
    name: "p-square-tower",
    aspect: "4:5",
    refs: [r.squareTower],
    prompt: `${KEEP} A tall floor-standing square-section fragrance diffuser tower in matte charcoal black with a single vertical brushed-silver stripe running down the front and a small black sensor window on the stripe. ${STUDIO}`,
  },
  {
    name: "p-hvac-power",
    aspect: "4:5",
    refs: [r.hvac],
    prompt: `${KEEP} Only the black HVAC fragrance diffuser cube: matte black box on four small feet, a small green-yellow LCD control panel with four buttons on the front upper left, and a short brass nozzle fitting on the top. Show no glowing tube and not the white unit. ${STUDIO}`,
  },
  {
    name: "p-cloudy",
    aspect: "4:5",
    refs: [r.cloudy],
    prompt: `${KEEP} A white rounded-rectangle fragrance diffuser with a soft matte finish, a small toggle on the top right, a 3D diamond-studded texture panel on the lower front, and the Aroma Airs logo printed on the front exactly as in the reference. ${STUDIO}`,
  },
  {
    name: "p-automatic-dispenser",
    aspect: "4:5",
    refs: [r.dispenser],
    prompt: `${KEEP} A slim white automatic aerosol fragrance dispenser with a tall smoked bronze-tinted window framed in chrome on the upper front, a black spray nozzle in the window, and a small blank chrome plate near the base with no writing on it. ${STUDIO}`,
  },
  { name: "p-oil-jasmine", aspect: "4:5", refs: [r.tallOils], prompt: tallOil("JASMINE") },
  { name: "p-oil-rose", aspect: "4:5", refs: [r.tallOils], prompt: tallOil("ROSE") },
  { name: "p-oil-oud", aspect: "4:5", refs: [r.tallOils], prompt: tallOil("OUD") },
  { name: "p-oil-misty-m", aspect: "4:5", refs: [r.tallOils], prompt: tallOil("MISTY M.") },
  { name: "p-oil-buneez", aspect: "4:5", refs: [r.amberOils], prompt: amberOil("Buneez", "purple") },
  { name: "p-oil-misfit", aspect: "4:5", refs: [r.amberOils], prompt: amberOil("Misfit", "green") },
  { name: "p-oil-aqua", aspect: "4:5", refs: [r.amberOils], prompt: amberOil("Aqua", "blue") },
  {
    name: "hero-stage",
    aspect: "16:9",
    refs: [r.tower, r.squareTower, r.cloudy],
    prompt: `${KEEP} Cinematic luxury interior photograph. Three fragrance diffusers from the references stand together on the right half of the frame on a low travertine plinth: the tall round black Tower diffuser, the black square tower with a silver vertical stripe, and the white rounded Cloudy diffuser in front. A soft plume of cold-air fragrance mist rises from the tower. Warm ivory limestone walls, golden late-afternoon sunlight with soft palm-leaf shadows, a sprig of white jasmine. The left 45% of the frame is calm, softly lit and empty for headline text. Photorealistic, shallow depth of field, no text, no logos, no watermark.`,
  },
  {
    name: "hero-stage-mobile",
    aspect: "9:16",
    refs: [r.tower, r.squareTower, r.cloudy],
    prompt: `${KEEP} Vertical cinematic luxury interior photograph for a phone screen. Three fragrance diffusers from the references stand together in the lower-middle of the frame on a low travertine plinth: the tall round black Tower diffuser, the black square tower with a silver vertical stripe, and the white rounded Cloudy diffuser in front. A soft plume of cold-air fragrance mist rises. Warm ivory limestone walls, golden sunlight with soft palm-leaf shadows. The top 40% of the frame is calm, softly lit plain wall, empty for headline text. Photorealistic, no text, no logos, no watermark.`,
  },
];

async function generate(job) {
  const parts = [{ text: job.prompt }];
  for (const buffer of job.refs || [])
    parts.push({ inlineData: { mimeType: "image/jpeg", data: buffer.toString("base64") } });
  const body = {
    contents: [{ role: "user", parts }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: job.aspect, imageSize: "1K" },
    },
  };
  for (let attempt = 1; attempt <= 3; attempt++) {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    const image = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData;
    if (response.ok && image) return Buffer.from(image.data, "base64");
    console.warn(`${job.name}: attempt ${attempt} failed`, response.status, JSON.stringify(data).slice(0, 300));
  }
  throw new Error(`${job.name}: generation failed`);
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

await mkdir(RAW_DIR, { recursive: true });
await mkdir(OUT_DIR, { recursive: true });
const only = process.argv.slice(2);
const list = jobs(await references()).filter((j) => !only.length || only.includes(j.name));
const results = await Promise.allSettled(
  list.map(async (job) => {
    const raw = path.join(RAW_DIR, `${job.name}.png`);
    if (!only.length && (await exists(raw))) return console.log(`${job.name}: cached`);
    const buffer = await generate(job);
    await writeFile(raw, buffer);
    const meta = await sharp(buffer).metadata();
    await sharp(buffer).webp({ quality: 84 }).toFile(path.join(OUT_DIR, `${job.name}.webp`));
    console.log(`${job.name}: ${meta.width}x${meta.height}`);
  }),
);
const failed = results.filter((r) => r.status === "rejected");
if (failed.length) {
  failed.forEach((f) => console.error(f.reason?.message));
  process.exitCode = 1;
}
