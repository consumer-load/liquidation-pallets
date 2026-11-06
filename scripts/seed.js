const projectId = 'yeyvps37';
const dataset = 'production';
const token = 'sknUOOdux4dHClMYHo2Nzcs3jZ1NJUbtX5W5lqMAyJ6STfLzmHoAqQrqqjjEKB6Fr1PsU1oBCrqbriKWkG3nrDUwAxDf575HjBgtOHzEzrtraU371zPXchSQkEcKr6wnvS0BFRk5Hohye3LSDKZpT3YkVYQwq5I6XuEaLszG9yR8UI8hE9kp';

const pallets = [
  {
    id: 'pal-amz-001',
    slug: 'amazon-high-value-consumer-electronics-pallet',
    title: 'Amazon Premium Electronics & Audio Pallet (Grade A/B Returns)',
    sku: 'LP-ELEC-8821',
    category: 'Consumer Electronics',
    condition: 'Customer Returns',
    sourceRetailer: 'Amazon',
    price: 1195,
    msrp: 6840,
    pieceCount: 54,
    weightLbs: 380,
    dimensions: '48 x 40 x 54 in',
    fobLocation: 'Dallas, TX',
    description: 'High-margin consumer electronics pallet direct from Amazon fulfillment centers. Contains noise-cancelling headphones, wireless earbuds, smart watches, Bluetooth soundbars, gaming accessories, and tablet accessories. Manifest verified with barcodes.',
    features: [
      '82% Off Original Retail MSRP ($6,840 value)',
      'Top brands included: Sony, JBL, Beats, Anker, Logitech',
      'Estimated 75%+ tested working / like-new condition',
      'High resale velocity for eBay, Amazon renewed, and local store',
      'Stretch-wrapped and banded on standard 4-way wood pallet'
    ],
    isFeatured: true,
    isHotDeal: true,
    stockAvailable: 3,
    createdAt: '2026-11-01',
  },
  {
    id: 'pal-hd-002',
    slug: 'home-depot-contractor-grade-power-tools-lot',
    title: 'The Home Depot Pro-Grade Power Tools & Hardware Pallet',
    sku: 'LP-TOOL-4491',
    category: 'Power Tools & Hardware',
    condition: 'Overstock',
    sourceRetailer: 'The Home Depot',
    price: 1850,
    msrp: 8420,
    pieceCount: 38,
    weightLbs: 640,
    dimensions: '48 x 40 x 58 in',
    fobLocation: 'Atlanta, GA',
    description: 'Priced to move! Clean un-manifested store overstock and excess warehouse inventory from The Home Depot. Mix of brushless cordless drill combos, circular saws, impact wrenches, rotary hammers, and lithium battery packs.',
    features: [
      '78% Off Retail Value ($8,420 MSRP)',
      'Leading brands: DeWalt, Milwaukee, Makita, Ryobi, Ridgid',
      'Contractor-grade high resale value'
    ],
    isFeatured: true,
    isHotDeal: false,
    stockAvailable: 2,
    createdAt: '2026-11-03',
  },
  {
    id: 'pal-tgt-003',
    slug: 'target-kitchen-small-appliances-home-goods-pallet',
    title: 'Target Premium Kitchen & Small Home Appliances Pallet',
    sku: 'LP-HOME-1209',
    category: 'Home & Kitchen',
    condition: 'Shelf Pulls',
    sourceRetailer: 'Target',
    price: 890,
    msrp: 4950,
    pieceCount: 42,
    weightLbs: 450,
    dimensions: '48 x 40 x 56 in',
    fobLocation: 'Indianapolis, IN',
    description: 'Clean retail shelf-pulls from nationwide Target retail locations. Includes air fryers, espresso machines, blenders, stand mixers, cookware sets, and smart countertop ovens.',
    features: [
      '82% Off Retail MSRP ($4,950 value)',
      'Ninja, Keurig, Nespresso, Cuisinart, Instant Pot'
    ],
    isFeatured: true,
    isHotDeal: true,
    stockAvailable: 4,
    createdAt: '2026-11-04',
  },
  {
    id: 'pal-cst-006',
    slug: 'costco-wholesale-general-merchandise-truckload-pallet',
    title: 'Costco Wholesale Premium Mixed General Merchandise Pallet',
    sku: 'LP-CST-3301',
    category: 'General Merchandise',
    condition: 'Overstock',
    sourceRetailer: 'Costco',
    price: 1420,
    msrp: 7600,
    pieceCount: 78,
    weightLbs: 520,
    dimensions: '48 x 40 x 60 in',
    fobLocation: 'Dallas, TX',
    description: 'High-ticket bulk goods from Costco Wholesale depot. Exceptional mix of patio heaters, Dyson air purifiers, camping equipment, Shark vacuum cleaners, and premium bedding sets.',
    features: [
      '81% Off Retail Value ($7,600 Total MSRP)',
      'Costco member return / overstock with exceptional product condition'
    ],
    isFeatured: true,
    isHotDeal: true,
    stockAvailable: 2,
    createdAt: '2026-11-05',
  }
];

const mutations = pallets.map((p) => ({
  createOrReplace: {
    _id: p.id,
    _type: 'pallet',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    sku: p.sku,
    category: p.category,
    condition: p.condition,
    sourceRetailer: p.sourceRetailer,
    price: p.price,
    msrp: p.msrp,
    pieceCount: p.pieceCount,
    weightLbs: p.weightLbs,
    dimensions: p.dimensions,
    fobLocation: p.fobLocation,
    description: p.description,
    features: p.features,
    isFeatured: p.isFeatured,
    isHotDeal: p.isHotDeal,
    stockAvailable: p.stockAvailable,
    createdAt: p.createdAt,
  },
}));

async function seed() {
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  const resData = await response.json();
  console.log('Sanity Seed Result:', JSON.stringify(resData, null, 2));
}

seed().catch(console.error);
