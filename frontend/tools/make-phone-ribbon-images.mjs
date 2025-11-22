// frontend/tools/make-phone-ribbon-images.mjs
// Make "ribbon-optimized" versions of your phone images
// - keeps full phone silhouette
// - optional resize to reasonable max size
// - optional sharpen for a slightly crisper look

import fs from "fs";
import path from "path";
import sharp from "sharp";

const srcDir = path.resolve("./src/assets/images_cropped");
const outDir = path.resolve("./src/assets/images_ribbon");

// Match your phone filenames
const FILE_REGEX = /\.(png|jpe?g)$/i;
const NAME_FILTER = /^(Iphone|UserCaseIphone)\d+\.(png|jpe?g)$/i;

// Max height for ribbon images (adjust if you want)
const MAX_HEIGHT = 1400; // px, just to keep files reasonable

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const files = fs
    .readdirSync(srcDir)
    .filter((f) => FILE_REGEX.test(f) && NAME_FILTER.test(f));

if (!files.length) {
    console.log("No matching images found in", srcDir);
    process.exit(0);
}

console.log(`Found ${files.length} images. Creating ribbon variants...\n`);

for (const file of files) {
    const inputPath = path.join(srcDir, file);
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const outputPath = path.join(outDir, `${baseName}_ribbon${ext}`);

    try {
        const img = sharp(inputPath);
        const meta = await img.metadata();

        const height = meta.height;

        let pipeline = img;

        // If image is very tall, downscale to a more sensible max height.
        if (height && height > MAX_HEIGHT) {
            pipeline = pipeline.resize({
                height: MAX_HEIGHT,
                fit: "inside",
            });
        }

        // Light sharpen – subtle; tweak values if needed
        pipeline = pipeline.sharpen(1.0, 1.0, 0.5);

        await pipeline.toFile(outputPath);

        console.log(`✓ ${file} → ${path.basename(outputPath)}`);
    } catch (err) {
        console.error(`✗ ${file}:`, err.message);
    }
}

console.log(`\nDone. Ribbon images saved to: ${outDir}`);
