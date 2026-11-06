import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('scripts/scraped_pages.json', 'utf8'));

function extractText(html) {
  // Strip head, scripts, styles
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  clean = clean.replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '');
  clean = clean.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '');
  // Match body or main
  const mainMatch = clean.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const target = mainMatch ? mainMatch[1] : clean;
  // Convert tags to newlines
  const text = target
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '\n\n### $1\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '\n* $1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
  return text;
}

const parsed = {};
for (const [slug, html] of Object.entries(raw)) {
  parsed[slug] = extractText(html);
}

fs.writeFileSync('scripts/parsed_pages.json', JSON.stringify(parsed, null, 2));
console.log('Parsed text saved!');
