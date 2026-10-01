// Generates the AI-assisted website imagery with Google Nano Banana 2 Lite
// (gemini-3.1-flash-lite-image) at 1K, then saves optimised WebP files.
// Usage: node --env-file=.env scripts/generate-images.mjs [name ...]
import sharp from "sharp";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const MODEL = "gemini-3.1-flash-lite-image";
const API = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const RAW_DIR = path.resolve("output/generated");
const OUT_DIR = path.resolve("public/images");
const KEY = process.env.GEMINI_API_KEY;
if (!KEY) throw new Error("GEMINI_API_KEY is not set (run with --env-file=.env)");

const STYLE =
  "Photorealistic luxury fragrance-brand campaign photography, soft directional light, rich shadows, shallow depth of field, crisp detail. Absolutely no text, letters, logos, labels or watermarks.";
const SCENT =
  "Editorial still life for a premium home-fragrance brand on a dark, softly lit stone surface with a deep charcoal background, gentle warm rim light, a faint wisp of mist. " +
  STYLE;

/** Reference crops taken from the client's own catalogue photography. */
async function references() {
  const src = path.resolve("public/product image-3.jpeg");
  const trio = await sharp(src)
    .extract({ left: 397, top: 204, width: 658, height: 519 })
    .jpeg({ quality: 92 })
    .toBuffer();
  return { trio };
}

const PRODUCTS_TRIO =
  "Keep the three diffusers from the reference image exactly as designed: a black compact diffuser with a small round emblem and a dotted grille, a white compact diffuser with a glossy black wavy-line front panel, and a larger black wall-mount diffuser with a dotted grille and a small top nozzle. Do not redesign them.";

const jobs = (ref) => [
  {
    name: "hero-desktop",
    aspect: "16:9",
    refs: [ref.trio],
    prompt: `${PRODUCTS_TRIO} Create a cinematic hero photograph: the three diffusers stand together on the right half of the frame on a polished black marble counter inside a dim, luxurious five-star hotel lounge with warm golden bokeh chandeliers, soft fragrance mist rising from the nozzles, two white frangipani flowers at their base. The left half of the frame is dark, calm and uncluttered for headline text. ${STYLE}`,
  },
  {
    name: "hero-mobile",
    aspect: "9:16",
    refs: [ref.trio],
    prompt: `${PRODUCTS_TRIO} Create a vertical cinematic hero photograph for a phone screen: the three diffusers grouped in the upper-middle of the frame on a polished black marble counter in a dim luxurious hotel lounge with warm golden bokeh lights, soft mist rising, one white frangipani flower at their base. The lower 45% of the frame fades into very dark, plain shadow for text. ${STYLE}`,
  },
  {
    name: "mist-band",
    aspect: "16:9",
    refs: [ref.trio],
    prompt: `Use only the black compact diffuser (with round emblem and dotted grille) from the reference image, exactly as designed. Wide dark studio photograph: the diffuser sits on the left third of the frame on a dark surface, releasing a soft plume of white cold-air mist that drifts up and to the right. Background is a deep midnight navy-black gradient, the right two thirds are empty and dark for text. ${STYLE}`,
  },
  {
    name: "scent-lavender",
    aspect: "4:5",
    prompt: `Fresh purple lavender sprigs and a few loose lavender buds. ${SCENT}`,
  },
  {
    name: "scent-citrus",
    aspect: "4:5",
    prompt: `Fresh oranges, a halved orange and a lemon slice with glistening juice, a sprig of green leaves. ${SCENT}`,
  },
  {
    name: "scent-white-blossom",
    aspect: "4:5",
    prompt: `Delicate white frangipani and jasmine blossoms with soft yellow centres and green leaves. ${SCENT}`,
  },
  {
    name: "scent-sandalwood",
    aspect: "4:5",
    prompt: `Bundled sandalwood sticks, sandalwood chips and a curl of incense smoke, warm amber tones. ${SCENT}`,
  },
  {
    name: "scent-ocean",
    aspect: "4:5",
    prompt: `A splash of clear aqua sea water over smooth white pebbles and a seashell with fresh water droplets, cool blue light. ${SCENT}`,
  },
  {
    name: "scent-grid",
    aspect: "1:1",
    prompt: `A perfectly even 2 by 2 grid of four separate square photographs with thin black gutters. Top-left: velvety pink tea roses. Top-right: fresh green lemongrass stalks tied with twine. Bottom-left: dark agarwood oud chips with a curl of smoke. Bottom-right: a brass Arabic incense burner with glowing amber resin. Each panel: ${SCENT}`,
  },
];

async function generate(job) {
  const parts = [{ text: job.prompt }];
  for (const buffer of job.refs || [])
    parts.push({ inlineData: { mimeType: "image/jpeg", data: buffer.toString("base64") } });
  const body = (withSize) => ({
    contents: [{ role: "user", parts }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: job.aspect, ...(withSize ? { imageSize: "1K" } : {}) },
    },
  });
  for (let attempt = 1; attempt <= 3; attempt++) {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
      body: JSON.stringify(body(attempt === 1)),
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
const only = process.argv.slice(2);
const list = jobs(await references()).filter((j) => !only.length || only.includes(j.name));
await Promise.all(
  list.map(async (job) => {
    const raw = path.join(RAW_DIR, `${job.name}.png`);
    if (!only.length && (await exists(raw))) return console.log(`${job.name}: cached`);
    const buffer = await generate(job);
    await writeFile(raw, buffer);
    const meta = await sharp(buffer).metadata();
    console.log(`${job.name}: ${meta.width}x${meta.height}`);
  }),
);
await mkdir(OUT_DIR, { recursive: true });
console.log("Raw images saved to output/generated. Run scripts/prepare-redesign-assets.mjs next.");
