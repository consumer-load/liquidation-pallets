const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'yeyvps37',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: 'sknUOOdux4dHClMYHo2Nzcs3jZ1NJUbtX5W5lqMAyJ6STfLzmHoAqQrqqjjEKB6Fr1PsU1oBCrqbriKWkG3nrDUwAxDf575HjBgtOHzEzrtraU371zPXchSQkEcKr6wnvS0BFRk5Hohye3LSDKZpT3YkVYQwq5I6XuEaLszG9yR8UI8hE9kp',
  useCdn: false,
});

async function seed() {
  console.log('Seeding store metadata, categories, tags, retailers, reviews, banners, faqs...');

  // 1. Categories
  const categories = [
    {
      _id: 'cat-electronics',
      _type: 'category',
      title: 'Consumer Electronics',
      slug: { _type: 'slug', current: 'consumer-electronics' },
      description: 'Laptops, smartphones, audio systems, smart TVs, tablets, gaming consoles & wearables.',
      featured: true,
      order: 1,
    },
    {
      _id: 'cat-tools',
      _type: 'category',
      title: 'Power Tools & Hardware',
      slug: { _type: 'slug', current: 'power-tools-hardware' },
      description: 'Contractor grade cordless drills, brushless saws, nailers, air compressors, and hand tools.',
      featured: true,
      order: 2,
    },
    {
      _id: 'cat-home',
      _type: 'category',
      title: 'Home & Kitchen',
      slug: { _type: 'slug', current: 'home-kitchen' },
      description: 'Air fryers, espresso machines, cookware sets, robot vacuums, and kitchen countertop appliances.',
      featured: true,
      order: 3,
    },
    {
      _id: 'cat-apparel',
      _type: 'category',
      title: 'Apparel & Footwear',
      slug: { _type: 'slug', current: 'apparel-footwear' },
      description: 'Department store overstock clothing, athletic footwear, outerwear, and designer apparel lots.',
      featured: false,
      order: 4,
    },
    {
      _id: 'cat-general',
      _type: 'category',
      title: 'General Merchandise',
      slug: { _type: 'slug', current: 'general-merchandise' },
      description: 'Assorted truckload mixtures of household goods, seasonal items, toys, and pantry goods.',
      featured: true,
      order: 5,
    },
  ];

  for (const cat of categories) {
    await client.createOrReplace(cat);
    console.log(`✓ Category: ${cat.title}`);
  }

  // 2. Tags
  const tags = [
    { _id: 'tag-hot-deal', _type: 'tag', title: 'Hot Deal', slug: { _type: 'slug', current: 'hot-deal' }, color: 'green' },
    { _id: 'tag-flash-sale', _type: 'tag', title: 'Flash Clearance', slug: { _type: 'slug', current: 'flash-clearance' }, color: 'red' },
    { _id: 'tag-manifested', _type: 'tag', title: '100% Manifested', slug: { _type: 'slug', current: '100-percent-manifested' }, color: 'blue' },
    { _id: 'tag-high-profit', _type: 'tag', title: 'High Margin', slug: { _type: 'slug', current: 'high-margin' }, color: 'orange' },
    { _id: 'tag-brand-new', _type: 'tag', title: 'Factory Sealed', slug: { _type: 'slug', current: 'factory-sealed' }, color: 'purple' },
  ];

  for (const tag of tags) {
    await client.createOrReplace(tag);
    console.log(`✓ Tag: ${tag.title}`);
  }

  // 3. Retailers / Brands
  const retailers = [
    { _id: 'ret-amazon', _type: 'retailer', name: 'Amazon Liquidation', slug: { _type: 'slug', current: 'amazon' }, description: 'High-velocity customer returns & shelf-pull lots directly from Amazon fulfillment centers.' },
    { _id: 'ret-target', _type: 'retailer', name: 'Target Stores', slug: { _type: 'slug', current: 'target' }, description: 'Clean box retail returns and seasonal overstock from Target national distribution.' },
    { _id: 'ret-homedepot', _type: 'retailer', name: 'The Home Depot', slug: { _type: 'slug', current: 'home-depot' }, description: 'Hardware, brushless power tools, contractor supplies, and outdoor equipment.' },
    { _id: 'ret-costco', _type: 'retailer', name: 'Costco Wholesale', slug: { _type: 'slug', current: 'costco' }, description: 'Premium member return truckloads and high-value mixed general merchandise.' },
    { _id: 'ret-walmart', _type: 'retailer', name: 'Walmart Wholesale', slug: { _type: 'slug', current: 'walmart' }, description: 'Everyday low price bulk pallets, electronics, and small home goods.' },
  ];

  for (const ret of retailers) {
    await client.createOrReplace(ret);
    console.log(`✓ Retailer: ${ret.name}`);
  }

  // 4. Promo Banners
  const banners = [
    {
      _id: 'banner-hero-1',
      _type: 'banner',
      title: 'Direct Retail Truckload & Pallet Liquidation',
      badge: 'DIRECT CONTRACTOR SOURCING',
      subtitle: 'Verified manifests, 70-90% off retail MSRP. Nationwide LTL dock-to-dock shipping.',
      ctaText: 'Shop All Pallets',
      ctaLink: '/pallets',
      isActive: true,
    },
    {
      _id: 'banner-clearance-1',
      _type: 'banner',
      title: 'Power Tools & Hardware Clearance Lots',
      badge: 'LIMITED ALLOTMENT',
      subtitle: 'Milwaukee, DeWalt, Makita & Ryobi contractor pallets ready for immediate dispatch.',
      ctaText: 'Claim Tool Lots',
      ctaLink: '/pallets',
      isActive: true,
    },
  ];

  for (const b of banners) {
    await client.createOrReplace(b);
    console.log(`✓ Banner: ${b.title}`);
  }

  // 5. Customer Reviews
  const reviews = [
    {
      _id: 'rev-001',
      _type: 'review',
      customerName: 'Marcus Vance',
      company: 'Apex Resale LLC (Dallas, TX)',
      rating: 5,
      comment: 'Received the Costco mixed merchandise pallet in 3 business days. Manifest was 94% accurate to piece count and our net eBay margins were over 48% after freight.',
      verifiedBuyer: true,
      featured: true,
      date: '2026-10-24',
    },
    {
      _id: 'rev-002',
      _type: 'review',
      customerName: 'Sarah Jenkins',
      company: 'Discount Mart & Bin Store (Orlando, FL)',
      rating: 5,
      comment: 'The Home Depot contractor tools lot was pristine. Most drills and impact sets were in original retail boxes. Customer service on WhatsApp was super responsive.',
      verifiedBuyer: true,
      featured: true,
      date: '2026-11-01',
    },
    {
      _id: 'rev-003',
      _type: 'review',
      customerName: 'David Kowalski',
      company: 'Midwest Hardware Outlet (Chicago, IL)',
      rating: 5,
      comment: 'We buy 2 truckloads a month from AMZ Pallets / Vendovi. Consistent quality, fast freight quotes, and straightforward wire/card payment options.',
      verifiedBuyer: true,
      featured: true,
      date: '2026-11-04',
    },
  ];

  for (const r of reviews) {
    await client.createOrReplace(r);
    console.log(`✓ Review: ${r.customerName}`);
  }

  // 6. FAQs
  const faqs = [
    {
      _id: 'faq-001',
      _type: 'faqItem',
      question: 'How does pallet and truckload shipping work?',
      answer: 'We ship nationwide across the Continental US via licensed LTL freight carriers (RL Carriers, Estes, TForce). Commercial delivery with a loading dock/forklift is standard. Residential or liftgate delivery is available upon request.',
      category: 'Freight & Shipping',
      order: 1,
    },
    {
      _id: 'faq-002',
      _type: 'faqItem',
      question: 'Are manifests provided for each liquidation lot?',
      answer: 'Yes! High-value electronic and tool lots include downloadable piece-by-piece manifests with UPC codes, descriptions, and estimated retail MSRPs.',
      category: 'Manifests & Conditions',
      order: 2,
    },
    {
      _id: 'faq-003',
      _type: 'faqItem',
      question: 'What payment methods are accepted for wholesale orders?',
      answer: 'We accept Bank Wire Transfer, ACH, major Credit/Debit Cards, and Cash upon local pickup at our Everman, TX warehouse facility.',
      category: 'Ordering & Payment',
      order: 3,
    },
  ];

  for (const f of faqs) {
    await client.createOrReplace(f);
    console.log(`✓ FAQ: ${f.question}`);
  }

  // 7. Site Settings singleton
  const settings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Liquidation Pallets USA',
    tagline: 'Wholesale Truckloads, Customer Returns & Overstock Pallets',
    supportPhone: '+1 (817) 330-9020',
    supportWhatsapp: '+1 817-330-9020',
    supportEmail: 'support@amzpalletsliquidation.com',
    warehouseAddress: '328 Thomas Pl, Everman, TX 76140',
    announcementBar: '🔥 Nationwide LTL Freight Available • Verified Manifests on High-Value Lots • Call +1 (817) 330-9020',
  };

  await client.createOrReplace(settings);
  console.log(`✓ Site Settings initialized`);

  console.log('✅ Store data seeding complete!');
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
