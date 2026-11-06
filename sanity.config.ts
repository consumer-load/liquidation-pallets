import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { 
  Boxes, 
  FolderTree, 
  Tag, 
  Building2, 
  ShoppingCart, 
  Star, 
  Megaphone, 
  HelpCircle, 
  Settings 
} from 'lucide-react';
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
            S.documentTypeListItem('pallet')
              .title('Pallets & Inventory')
              .icon(Boxes),
            S.documentTypeListItem('category')
              .title('Product Categories')
              .icon(FolderTree),
            S.documentTypeListItem('tag')
              .title('Product Tags')
              .icon(Tag),
            S.documentTypeListItem('retailer')
              .title('Brands & Retailers')
              .icon(Building2),
            S.divider(),
            S.documentTypeListItem('order')
              .title('Customer Orders')
              .icon(ShoppingCart),
            S.documentTypeListItem('review')
              .title('Customer Reviews')
              .icon(Star),
            S.divider(),
            S.documentTypeListItem('banner')
              .title('Hero & Promo Banners')
              .icon(Megaphone),
            S.documentTypeListItem('faqItem')
              .title('Store FAQs')
              .icon(HelpCircle),
            S.divider(),
            S.listItem()
              .title('Store Configuration')
              .icon(Settings)
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
