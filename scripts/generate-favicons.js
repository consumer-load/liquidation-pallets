const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));

  console.log('Generating PNG favicons & app icons from SVG...');

  // 1. 32x32 PNG favicon
  await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  
  // 2. 48x48 PNG favicon (standard google search snippet icon)
  await sharp(svgBuffer).resize(48, 48).png().toFile(path.join(__dirname, '../public/favicon-48x48.png'));

  // 3. 180x180 Apple touch icon
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(__dirname, '../src/app/apple-icon.png'));

  // 4. 192x192 Android Chrome icon
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(__dirname, '../public/android-chrome-192x192.png'));

  // 5. 512x512 PWA splash / full icon
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(__dirname, '../public/android-chrome-512x512.png'));

  // 6. Overwrite src/app/favicon.ico and public/favicon.ico with 32x32 PNG (most modern browsers treat PNG at favicon.ico as valid)
  const ico32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), ico32);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), ico32);

  console.log('Generating PNG logos for social cards and previews...');
  const logoSvg = fs.readFileSync(path.join(__dirname, '../public/logo.svg'));
  await sharp(logoSvg).resize(840, 160).png().toFile(path.join(__dirname, '../public/logo.png'));

  const logoDarkSvg = fs.readFileSync(path.join(__dirname, '../public/logo-dark.svg'));
  await sharp(logoDarkSvg).resize(840, 160).png().toFile(path.join(__dirname, '../public/logo-dark.png'));

  console.log('✅ All favicon and logo assets successfully generated!');
}

generateFavicons().catch(console.error);
