import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yeyvps37';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/admin',
  name: 'default',
  title: 'Liquidation Pallets Store Manager',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Liquidation Pallets CMS')
          .items([
            S.documentTypeListItem('pallet').title('📦 Pallets & Inventory'),
            S.documentTypeListItem('category').title('📁 Product Categories'),
            S.documentTypeListItem('tag').title('🏷️ Product Tags'),
            S.documentTypeListItem('retailer').title('🏢 Brands & Retailers'),
            S.divider(),
            S.documentTypeListItem('order').title('🛒 Customer Orders'),
            S.documentTypeListItem('review').title('⭐ Customer Reviews'),
            S.divider(),
            S.documentTypeListItem('banner').title('📢 Hero & Promo Banners'),
            S.documentTypeListItem('faqItem').title('❓ Store FAQs'),
            S.divider(),
            S.listItem()
              .title('⚙️ Store Configuration')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
