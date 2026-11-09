// Makes a 480px-wide WebP thumbnail for each blog header image, for the /blog list.
// public/images/blog/<name>.png  ->  public/images/blog/thumbs/<name>.webp
// Skips thumbnails that are newer than their source. Runs before every build.
// To use a different picture in the list, set `thumb:` in the post's frontmatter.
/* global console, process */
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC = 'public/images/blog';
const OUT = join(SRC, 'thumbs');
const WIDTH = 480;

mkdirSync(OUT, { recursive: true });

let made = 0;
for (const file of readdirSync(SRC)) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
  const src = join(SRC, file);
  const out = join(OUT, file.replace(/\.[^.]+$/, '.webp'));
  try {
    if (statSync(out).mtimeMs >= statSync(src).mtimeMs) continue;
  } catch {
    // No thumbnail yet: make it.
  }
  // Header images are 1200x630 diagrams with text in them. A square crop cut titles mid-word,
  // so keep the whole image at its own shape (480x252); the list shows it about 150px wide.
  await sharp(src)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  made += 1;
}
console.log(`[thumbs] ${made} made in ${OUT}`);
process.exit(0);
