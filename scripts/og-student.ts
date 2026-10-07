/**
 * Compose the /student social preview (1200x630) from the reel's 9:16 cover.
 *
 * Run with `npm run og:student` after changing the cover or the copy. The output is
 * committed rather than built on Vercel so the text renders with the same fonts it
 * was checked with.
 */
import { resolve } from 'node:path';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;
const NIGHT = '#0d1430';
const YELLOW = '#ffd84a';
const INK = '#05091c';

// The cover's tag, FREE headline, logos and student ID card, without the desk below.
const crop = { left: 0, top: 262, width: 1080, height: 1180 };
const coverHeight = HEIGHT;
const coverWidth = Math.round((crop.width / crop.height) * coverHeight);

const cover = await sharp(resolve('scripts', 'og-sources', 'student-reel-cover.webp'))
  .extract(crop)
  .resize(coverWidth, coverHeight)
  .toBuffer();

const panel = WIDTH - coverWidth;
const text = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${panel}" height="${HEIGHT}" fill="${NIGHT}"/>
  <rect x="${panel - 6}" width="6" height="${HEIGHT}" fill="${INK}"/>
  <text x="70" y="150" font-family="'Segoe UI', Arial, 'DejaVu Sans', sans-serif" font-weight="800" font-size="26" fill="#ffffff">Builtby<tspan fill="#19b39b">GSV</tspan></text>
  <g font-family="'Segoe UI', Arial, 'DejaVu Sans', sans-serif" font-weight="800" fill="#ffffff">
    <text x="70" y="250" font-size="56">Free tools for</text>
    <text x="70" y="318" font-size="56">college students</text>
    <rect x="62" y="342" width="222" height="66" rx="6" fill="${YELLOW}" transform="rotate(-1.5 180 375)"/>
    <text x="74" y="396" font-size="56" fill="${NIGHT}">in India</text>
    <text x="316" y="396" font-size="56">(2026)</text>
  </g>
  <text x="70" y="468" font-family="'Segoe UI', Arial, 'DejaVu Sans', sans-serif" font-weight="600" font-size="24" fill="#c9d3ff">The complete list, with official links</text>
  <text x="70" y="560" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-weight="700" font-size="22" fill="${YELLOW}">builtbygsv.in/student</text>
</svg>`);

const output = resolve('public', 'og', 'student-free-tools.jpg');
const info = await sharp({ create: { width: WIDTH, height: HEIGHT, channels: 3, background: NIGHT } })
  .composite([{ input: text, left: 0, top: 0 }, { input: cover, left: panel, top: 0 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(output);

console.log(`Generated ${output} (${(info.size / 1024).toFixed(1)} kB, ${WIDTH}x${HEIGHT}).`);
