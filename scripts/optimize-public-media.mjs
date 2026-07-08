/**
 * Compress PNGs and convert heavy GIF/video assets under public/.
 * Run: node scripts/optimize-public-media.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, "..", "public");
const ffmpeg = ffmpegInstaller.path;

const PNG_MAX_WIDTH = {
  "assets/hero": 1920,
  "assets/services": 1400,
  "assets/blog": 1400,
  "assets/industries": 1200,
  "assets/about": 1600,
  "assets/contact": 1600,
  "assets/locations": 1600,
  brand: 512,
  clients: 400,
  partners: 400,
  "assets/credentials": 800,
};

function maxWidthFor(relPath) {
  const normalized = relPath.replace(/\\/g, "/");
  for (const [prefix, width] of Object.entries(PNG_MAX_WIDTH)) {
    if (normalized.startsWith(prefix)) return width;
  }
  return 1600;
}

function runFfmpeg(args) {
  execFileSync(ffmpeg, args, { stdio: "inherit" });
}

function bytes(filePath) {
  return fs.statSync(filePath).size;
}

function formatMb(size) {
  return `${(size / 1024 / 1024).toFixed(2)}MB`;
}

async function optimizePng(absPath, relPath) {
  const before = bytes(absPath);
  const maxWidth = maxWidthFor(relPath);
  const tmp = `${absPath}.opt.tmp`;

  const pipeline = sharp(absPath).rotate();
  const meta = await pipeline.metadata();
  if ((meta.width ?? 0) > maxWidth) {
    pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  await pipeline
    .png({ compressionLevel: 9, quality: 82, effort: 10, palette: false })
    .toFile(tmp);

  const after = bytes(tmp);
  if (after < before) {
    fs.renameSync(tmp, absPath);
    console.log(`PNG  ${formatMb(before)} -> ${formatMb(after)}  ${relPath}`);
  } else {
    fs.unlinkSync(tmp);
    console.log(`PNG  kept ${formatMb(before)}  ${relPath}`);
  }
}

function walkPngs(dir, rel = "", out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const nextRel = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) walkPngs(abs, nextRel, out);
    else if (entry.name.toLowerCase().endsWith(".png")) out.push({ abs, rel: nextRel });
  }
  return out;
}

function convertGifToMp4(gifPath, mp4Path) {
  if (!fs.existsSync(gifPath)) {
    console.log("Skip GIF convert — source missing:", gifPath);
    return;
  }
  const before = bytes(gifPath);
  runFfmpeg([
    "-y",
    "-i",
    gifPath,
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    "-vf",
    "scale=trunc(iw/2)*2:trunc(ih/2)*2",
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "slow",
    "-an",
    mp4Path,
  ]);
  console.log(`GIF  ${formatMb(before)} -> ${formatMb(bytes(mp4Path))}  about-hero.mp4`);
}

function compressVideo(inputPath, outputPath, crf = "28") {
  if (!fs.existsSync(inputPath)) return;
  const before = bytes(inputPath);
  runFfmpeg([
    "-y",
    "-i",
    inputPath,
    "-c:v",
    "libx264",
    "-crf",
    crf,
    "-preset",
    "slow",
    "-movflags",
    "+faststart",
    "-an",
    outputPath,
  ]);
  console.log(`MP4  ${formatMb(before)} -> ${formatMb(bytes(outputPath))}  ${path.basename(outputPath)}`);
}

async function main() {
  console.log("Optimizing public media...\n");

  const aboutDir = path.join(publicDir, "assets", "about");
  const gifPath = path.join(aboutDir, "gif.gif");
  const heroMp4 = path.join(aboutDir, "about-hero.mp4");
  convertGifToMp4(gifPath, heroMp4);

  const introIn = path.join(publicDir, "intro", "loader-intro.mp4");
  const introOut = path.join(publicDir, "intro", "loader-intro.opt.mp4");
  compressVideo(introIn, introOut);
  if (fs.existsSync(introOut)) {
    fs.renameSync(introOut, introIn);
  }

  const pngs = walkPngs(publicDir);
  for (const { abs, rel } of pngs) {
    await optimizePng(abs, rel);
  }

  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
