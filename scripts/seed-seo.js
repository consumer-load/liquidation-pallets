const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'yeyvps37',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: 'sknUOOdux4dHClMYHo2Nzcs3jZ1NJUbtX5W5lqMAyJ6STfLzmHoAqQrqqjjEKB6Fr1PsU1oBCrqbriKWkG3nrDUwAxDf575HjBgtOHzEzrtraU371zPXchSQkEcKr6wnvS0BFRk5Hohye3LSDKZpT3YkVYQwq5I6XuEaLszG9yR8UI8hE9kp',
  useCdn: false,
});

async function updatePalletsSeo() {
  const patches = [
    {
      id: 'pal-amz-001',
      seo: {
        metaTitle: 'Amazon High-Value Consumer Electronics Pallet | Wholesale Lot',
        metaDescription: 'Shop verified Amazon customer return electronics pallet. Includes MacBooks, iPads, Sony headphones. 85% below retail MSRP with fast LTL freight delivery.',
        metaKeywords: ['amazon electronics pallet', 'wholesale apple macbooks', 'liquidation returns', 'electronics wholesale lot'],
        noIndex: false,
      },
      structuredData: {
        schemaType: 'Product',
        brandName: 'Amazon / Mixed Tier 1 Brands',
        gtin: '0190198000001',
        mpn: 'AMZ-ELEC-409',
        itemCondition: 'https://schema.org/UsedCondition',
        availability: 'https://schema.org/InStock',
        ratingValue: 4.9,
        reviewCount: 22,
      },
    },
    {
      id: 'pal-tgt-003',
      seo: {
        metaTitle: 'Target Kitchen & Small Home Appliances Pallet | Wholesale Overstock',
        metaDescription: 'Target wholesale returns and shelf pulls. Ninja air fryers, Keurig coffee makers, Instant Pots. Guaranteed high resale margins for bin and discount stores.',
        metaKeywords: ['target liquidation pallet', 'kitchen appliance pallets', 'ninja air fryer wholesale', 'small appliances lot'],
        noIndex: false,
      },
      structuredData: {
        schemaType: 'Product',
        brandName: 'Target / Ninja / Keurig',
        gtin: '0190198000002',
        mpn: 'TGT-APPL-1209',
        itemCondition: 'https://schema.org/UsedCondition',
        availability: 'https://schema.org/InStock',
        ratingValue: 4.8,
        reviewCount: 19,
      },
    },
  ];

  for (const p of patches) {
    try {
      await client
        .patch(p.id)
        .set({
          seo: p.seo,
          structuredData: p.structuredData,
        })
        .commit();
      console.log(`✓ SEO & Schema patched for ${p.id}`);
    } catch (err) {
      console.log(`Could not patch ${p.id}:`, err.message);
    }
  }
}

updatePalletsSeo();
