import { defineType, defineField } from 'sanity';

export const productStructuredDataSchema = defineType({
  name: 'productStructuredData',
  title: 'Product Structured Data (Schema.org / JSON-LD)',
  type: 'object',
  fields: [
    defineField({
      name: 'schemaType',
      title: 'Schema @type',
      type: 'string',
      initialValue: 'Product',
      readOnly: true,
    }),
    defineField({
      name: 'brandName',
      title: 'Brand / Manufacturer Name',
      type: 'string',
      description: 'e.g. Amazon, Milwaukee, DeWalt, Apple, Target (for Schema.org brand)',
    }),
    defineField({
      name: 'gtin',
      title: 'GTIN / UPC / Barcode',
      type: 'string',
      description: 'Global Trade Item Number or UPC (improves Google Merchant / Shopping indexing)',
    }),
    defineField({
      name: 'mpn',
      title: 'MPN (Manufacturer Part Number)',
      type: 'string',
    }),
    defineField({
      name: 'itemCondition',
      title: 'Schema.org Item Condition',
      type: 'string',
      options: {
        list: [
          { title: 'NewCondition (Brand New / Factory Sealed)', value: 'https://schema.org/NewCondition' },
          { title: 'RefurbishedCondition (Tested / Restored)', value: 'https://schema.org/RefurbishedCondition' },
          { title: 'UsedCondition (Customer Returns / Shelf Pulls)', value: 'https://schema.org/UsedCondition' },
          { title: 'DamagedCondition (Salvage / Parts Only)', value: 'https://schema.org/DamagedCondition' },
        ],
      },
      initialValue: 'https://schema.org/UsedCondition',
    }),
    defineField({
      name: 'availability',
      title: 'Schema.org Item Availability',
      type: 'string',
      options: {
        list: [
          { title: 'InStock', value: 'https://schema.org/InStock' },
          { title: 'LimitedAvailability', value: 'https://schema.org/LimitedAvailability' },
          { title: 'PreOrder', value: 'https://schema.org/PreOrder' },
          { title: 'OutOfStock', value: 'https://schema.org/OutOfStock' },
        ],
      },
      initialValue: 'https://schema.org/InStock',
    }),
    defineField({
      name: 'priceValidUntil',
      title: 'Price Valid Until Date',
      type: 'date',
      description: 'Used by Google rich snippets to show price expiration.',
    }),
    defineField({
      name: 'ratingValue',
      title: 'Aggregate Rating Value (1.0 - 5.0)',
      type: 'number',
      initialValue: 4.9,
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'reviewCount',
      title: 'Aggregate Review Count',
      type: 'number',
      initialValue: 14,
    }),
  ],
});
