import sharp from "sharp";
import { writeFile, access } from "node:fs/promises";
// Supporting interior photography from Unsplash; these are inspiration, not client installations.
const images = {
  office: "photo-1497366811353-6870744d04b2",
  retail: "photo-1441986300917-64674bd600d8",
  hospital: "photo-1516549655169-df83a0774514",
  cafe: "photo-1554118811-1e0d58224f24",
  spa: "photo-1540555700478-4be289fbecef",
};
await Promise.all(
  Object.entries(images).map(async ([name, id]) => {
    const file = `public/images/${name}.webp`;
    try {
      await access(file);
      return;
    } catch {}
    const response = await fetch(
      `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`,
    );
    if (!response.ok) throw new Error(`${name}: ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(
      file,
      await sharp(buffer)
        .resize({ width: 1000, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer(),
    );
    console.log(`${name}: prepared`);
  }),
);
