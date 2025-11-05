import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd());
const SRC_DIR = path.join(ROOT, "src", "assets", "images");
const OUT_DIR = path.join(ROOT, "src", "assets", "images_cropped");

// Tuning
const TRIM_THRESHOLD = 16;   // 0..100 (higher = more aggressive)
const PAD = 0;               // transparent pixels after trim

async function ensureOutDir() {
    await fs.mkdir(OUT_DIR, { recursive: true });
}
const isTarget = (n) => n.toLowerCase().endsWith(".png") || n.toLowerCase().endsWith(".webp");

function rgbaToHex(r, g, b) {
    const to2 = (v) => v.toString(16).padStart(2, "0");
    return `#${to2(r)}${to2(g)}${to2(b)}`;
}

async function detectBorderHex(filePath) {
    const meta = await sharp(filePath).metadata();
    const { width, height } = meta;
    if (!width || !height) return null;

    // sample the 4 corners (1x1)
    const coords = [
        { left: 0, top: 0 },
        { left: Math.max(0, width - 1), top: 0 },
        { left: 0, top: Math.max(0, height - 1) },
        { left: Math.max(0, width - 1), top: Math.max(0, height - 1) },
    ];

    const samples = [];
    for (const c of coords) {
        const raw = await sharp(filePath)
            .extract({ left: c.left, top: c.top, width: 1, height: 1 })
            .removeAlpha()
            .raw()
            .toBuffer();
        samples.push({ r: raw[0], g: raw[1], b: raw[2] });
    }

    // average the corners
    const avg = samples.reduce(
        (acc, p) => ({ r: acc.r + p.r, g: acc.g + p.g, b: acc.b + p.b }),
        { r: 0, g: 0, b: 0 }
    );
    avg.r = Math.round(avg.r / samples.length);
    avg.g = Math.round(avg.g / samples.length);
    avg.b = Math.round(avg.b / samples.length);

    return rgbaToHex(avg.r, avg.g, avg.b);
}

async function trimOne(filePath, outPath) {
    // step 1: trim near-transparent first (if any)
    let img = sharp(filePath, { failOn: "none" }).ensureAlpha().trim({ threshold: TRIM_THRESHOLD });

    // step 2: detect solid border color and trim again
    const bgHex = await detectBorderHex(filePath);
    if (bgHex) {
        img = img.trim({ threshold: TRIM_THRESHOLD, background: bgHex });
    }

    if (PAD > 0) {
        img = img.extend({
            top: PAD, bottom: PAD, left: PAD, right: PAD,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        });
    }

    await img.png().toFile(outPath);
}

async function run() {
    await ensureOutDir();
    const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });
    const images = entries.filter(e => e.isFile() && isTarget(e.name));
    if (images.length === 0) {
        console.warn(`No images found in ${SRC_DIR}`);
        return;
    }

    console.log(`Found ${images.length} images. Trimming…`);
    let ok = 0;
    for (const e of images) {
        const inPath = path.join(SRC_DIR, e.name);
        const outPath = path.join(OUT_DIR, e.name);
        try {
            await trimOne(inPath, outPath);
            console.log(`✓ ${e.name}`);
            ok++;
        } catch (err) {
            console.error(`✗ ${e.name}: ${err?.message || err}`);
        }
    }
    console.log(`Done. ${ok}/${images.length} saved → ${OUT_DIR}`);
}

run().catch(err => { console.error(err); process.exit(1); });
