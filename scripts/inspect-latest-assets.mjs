import sharp from "sharp";
import { readdir } from "node:fs/promises";
const files = (await readdir("public/latest images")).sort();
const tiles = [];
for (const [i, file] of files.entries()) {
  tiles.push({
    input: await sharp(`public/latest images/${file}`)
      .resize(360, 440, { fit: "contain", background: "#eee9df" })
      .png()
      .toBuffer(),
    left: (i % 4) * 380,
    top: Math.floor(i / 4) * 480,
  });
  tiles.push({
    input: Buffer.from(
      `<svg width="360" height="30"><text x="8" y="22" font-size="16">${file}</text></svg>`,
    ),
    left: (i % 4) * 380,
    top: Math.floor(i / 4) * 480 + 440,
  });
}
await sharp({
  create: { width: 1520, height: 960, channels: 3, background: "#eee9df" },
})
  .composite(tiles)
  .jpeg()
  .toFile("output/latest-contact-sheet.jpg");
