import { mockPallets } from '../src/data/mockPallets.js';

const projectId = 'yeyvps37';
const dataset = 'production';
const token = 'sknUOOdux4dHClMYHo2Nzcs3jZ1NJUbtX5W5lqMAyJ6STfLzmHoAqQrqqjjEKB6Fr1PsU1oBCrqbriKWkG3nrDUwAxDf575HjBgtOHzEzrtraU371zPXchSQkEcKr6wnvS0BFRk5Hohye3LSDKZpT3YkVYQwq5I6XuEaLszG9yR8UI8hE9kp';

const mutations = mockPallets.map((p) => ({
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
    manifestSummary: p.manifestSummary,
    manifestItems: p.manifestItems,
    isFeatured: p.isFeatured || false,
    isHotDeal: p.isHotDeal || false,
    stockAvailable: p.stockAvailable || 1,
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
