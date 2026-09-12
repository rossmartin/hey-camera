/**
 * Regenerates the static icons in public/ from src/assets/icon.png.
 * Run with: npm run icons
 */
import sharp from 'sharp';

const SOURCE = 'src/assets/icon.png';

// iOS rounds app icons at roughly 22.37% of the icon's width.
const RADIUS_RATIO = 0.2237;

/** Resize the source to `size` and knock the corners out to transparent. */
async function rounded(size) {
  const r = Math.round(size * RADIUS_RATIO);
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}">` +
      `<rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="#fff"/>` +
      `</svg>`,
  );
  return sharp(SOURCE)
    .resize(size, size)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

// Browser tabs do not mask the favicon, so round it ourselves to match the
// treatment the icon gets everywhere else on the site.
await sharp(await rounded(64)).toFile('public/favicon.png');

// Deliberately NOT rounded: iOS applies its own squircle mask to the touch
// icon. Pre-rounding it would be masked a second time, cutting notches out of
// the corners. Apple asks for a full-bleed square with no transparency.
await sharp(SOURCE).resize(180, 180).flatten({ background: '#7699d0' }).png()
  .toFile('public/apple-touch-icon.png');

// Open Graph card, shown when the link is pasted into Messages, Slack or a
// social post. Nothing masks a link preview, so the icon is rounded here too.
const OG_ICON = 220;
const OG_GAP = 56;
const OG_LEFT = 216;
const TEXT_X = OG_LEFT + OG_ICON + OG_GAP;

const ogText = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <style>
      .title { font: 700 84px 'SF Pro Display','Helvetica Neue',Helvetica,Arial,sans-serif; fill: #e9ecf1; }
      .tag { font: 400 44px 'SF Pro Text','Helvetica Neue',Helvetica,Arial,sans-serif; fill: #939cad; }
    </style>
    <text x="${TEXT_X}" y="308" class="title">Hey Camera</text>
    <text x="${TEXT_X}" y="382" class="tag">The hands-free camera</text>
  </svg>`,
);

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 8, g: 9, b: 12, alpha: 1 },
  },
})
  .composite([
    { input: await rounded(OG_ICON), left: OG_LEFT, top: (630 - OG_ICON) / 2 },
    { input: ogText, left: 0, top: 0 },
  ])
  .png()
  .toFile('public/og.png');

console.log('Generated favicon.png, apple-touch-icon.png and og.png');
