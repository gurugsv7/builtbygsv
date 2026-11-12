import { mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import sharp from 'sharp';

const captures = process.argv[2];
if (!captures) throw new Error('Pass the directory containing the inspected SkillUp browser captures.');
const output = resolve('src/assets/s4skillup');
await mkdir(output, { recursive: true });
await mkdir(resolve('public/og/projects'), { recursive: true });
const source = name => join(captures, name + '.png');
const background = { r: 232, g: 237, b: 255, alpha: 1 };
const desktop = await sharp(source('landing-desktop')).resize(1260, 875, { fit: 'contain', background: '#ffffff' }).png().toBuffer();
const mobile = await sharp(source('landing-mobile')).resize(328, 710, { fit: 'contain', background: '#ffffff' }).png().toBuffer();
const frame = Buffer.from(`<svg width="1600" height="1120"><defs><filter id="shadow"><feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#14287f" flood-opacity=".15"/></filter></defs><rect width="1600" height="1120" rx="42" fill="#e8edff"/><circle cx="1480" cy="120" r="250" fill="#dbe3ff"/><rect x="52" y="94" width="1284" height="950" rx="24" fill="white" filter="url(#shadow)"/><rect x="52" y="94" width="1284" height="43" rx="24" fill="#f3f5ff"/><circle cx="77" cy="115" r="5" fill="#ff836e"/><circle cx="96" cy="115" r="5" fill="#f5c748"/><circle cx="115" cy="115" r="5" fill="#6dd6ba"/><text x="158" y="120" font-family="Arial,sans-serif" font-size="13" fill="#526080">s4skillup.com</text><rect x="1204" y="275" width="352" height="758" rx="30" fill="#121c3c" filter="url(#shadow)"/></svg>`);
const hero = await sharp({ create: { width: 1600, height: 1120, channels: 4, background } })
  .composite([{ input: frame }, { input: desktop, left: 64, top: 151 }, { input: mobile, left: 1216, top: 299 }])
  .png().toBuffer();
await sharp(hero).webp({ quality: 87 }).toFile(join(output, 'hero.webp'));
await sharp(hero).resize(640, 448).webp({ quality: 82 }).toFile(join(output, 'thumb.webp'));
await sharp(source('companies')).resize(1440, 1000, { fit: 'contain', background: '#f7f9fc' }).webp({ quality: 86 }).toFile(join(output, 'story.webp'));
for (const [index, name] of ['roles', 'jobs', 'resume', 'interview'].entries()) {
  await sharp(source(name)).resize(1200, 900, { fit: 'contain', background: '#f7f9fc' }).webp({ quality: 88 }).toFile(join(output, `glimpse${index + 1}.webp`));
}
const cover = Buffer.from(`<svg width="1200" height="630"><rect width="1200" height="630" fill="#e8edff"/><text x="62" y="83" font-family="Arial,sans-serif" font-size="19" font-weight="700" fill="#2946e9">BUILTBYGSV / PRODUCT CASE STUDY</text><text x="60" y="161" font-family="Arial,sans-serif" font-size="62" font-weight="700" fill="#111b37">S4SkillUp</text><text x="62" y="204" font-family="Arial,sans-serif" font-size="22" fill="#42516d">A connected career-planning workspace.</text><text x="62" y="571" font-family="Arial,sans-serif" font-size="18" fill="#42516d">Roles. Resumes. Job discovery. Interview practice.</text><text x="62" y="604" font-family="Arial,sans-serif" font-size="16" fill="#2946e9">builtbygsv.in/projects/s4skillup</text></svg>`);
const socialShot = await sharp(source('landing-desktop')).resize(590, 410, { fit: 'contain', background: '#ffffff' }).png().toBuffer();
await sharp(cover).composite([{ input: socialShot, left: 570, top: 200 }]).jpeg({ quality: 90 }).toFile(resolve('public/og/projects/s4skillup.jpg'));
console.log('Prepared desktop/mobile hero, story, four workspace captures, thumbnail and social preview.');
