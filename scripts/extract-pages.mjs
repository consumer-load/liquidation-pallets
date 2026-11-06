import fs from 'fs';

const pages = [
  { slug: 'privacy-policy', url: 'https://www.suncitypalletsliquidation.com/privacy-policy' },
  { slug: 'refund-policy', url: 'https://www.suncitypalletsliquidation.com/refund-policy' },
  { slug: 'terms-of-use', url: 'https://www.suncitypalletsliquidation.com/terms-of-use' },
  { slug: 'shipping-policy', url: 'https://www.suncitypalletsliquidation.com/shipping-policy' },
  { slug: 'faq', url: 'https://www.suncitypalletsliquidation.com/faq' },
  { slug: 'contact', url: 'https://www.suncitypalletsliquidation.com/contact' },
  { slug: 'about-us', url: 'https://www.suncitypalletsliquidation.com/about-us' },
];

async function run() {
  const output = {};
  for (const p of pages) {
    try {
      console.log(`Fetching ${p.slug}...`);
      const res = await fetch(p.url);
      const html = await res.text();
      output[p.slug] = html;
    } catch (e) {
      console.error(`Failed ${p.slug}:`, e.message);
    }
  }
  fs.writeFileSync('scripts/scraped_pages.json', JSON.stringify(output, null, 2));
  console.log('Saved all pages!');
}

run();
