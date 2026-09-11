/**
 * Rasterise the Open Graph cover to PNG.
 *
 * og-cover.svg alone is not enough: Google, WhatsApp, Facebook, LinkedIn and X
 * all refuse to render SVG Open Graph images, so every share of this site was
 * previously showing no preview image at all. The SVG stays as the editable
 * source; this writes the PNG that the meta tags actually point at.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const source = resolve('public', 'og-cover.svg');
const targets = [resolve('public', 'og-cover.png'), resolve('dist', 'og-cover.png')];

const svg = await readFile(source);
const png = await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: 'contain', background: '#F1F4F2' })
  .png({ compressionLevel: 9 })
  .toBuffer();

for (const target of targets) {
  try {
    await writeFile(target, png);
  } catch (error) {
    // dist may not exist when this runs standalone before a build.
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
}

console.log(`Generated og-cover.png (${(png.byteLength / 1024).toFixed(1)} kB, 1200x630).`);
