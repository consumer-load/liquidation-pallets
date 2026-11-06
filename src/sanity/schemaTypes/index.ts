import { palletSchema } from './pallet';
import { categorySchema } from './category';
import { tagSchema } from './tag';
import { retailerSchema } from './retailer';
import { orderSchema } from './order';
import { reviewSchema } from './review';
import { bannerSchema } from './banner';
import { faqItemSchema } from './faqItem';
import { siteSettingsSchema } from './siteSettings';
import { seoSchema } from './seo';
import { productStructuredDataSchema } from './productStructuredData';

export const schemaTypes = [
  palletSchema,
  categorySchema,
  tagSchema,
  retailerSchema,
  orderSchema,
  reviewSchema,
  bannerSchema,
  faqItemSchema,
  siteSettingsSchema,
  seoSchema,
  productStructuredDataSchema,
];
