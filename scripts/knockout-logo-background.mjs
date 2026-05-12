/**
 * Makes near-black pixels transparent so the logo sits cleanly on a light header.
 * Re-run after replacing public/brand/vcloudtech-logo.png with a new export.
 *
 *   npm run logo:knockout
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const inputPath = path.join(root, "public/brand/vcloudtech-logo.png");
const outPath = path.join(root, "public/brand/vcloudtech-logo-nobg.png");

if (!fs.existsSync(inputPath)) {
  console.error("Missing:", inputPath);
  process.exit(1);
}

const THRESH = 22; // max(R,G,B) below this → background (strict: keeps navy/red edges)

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
if (channels !== 4) {
  console.error("Expected RGBA after ensureAlpha, got channels=", channels);
  process.exit(1);
}

const buf = Buffer.from(data);
for (let i = 0; i < width * height; i++) {
  const o = i * 4;
  const r = buf[o];
  const g = buf[o + 1];
  const b = buf[o + 2];
  const m = Math.max(r, g, b);
  if (m < THRESH) buf[o + 3] = 0;
}

await sharp(buf, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log("Wrote", outPath);
