import { defineType, defineField } from 'sanity';
import { Star } from 'lucide-react';

export const reviewSchema = defineType({
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  icon: Star,
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Business / Company Name',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1-5)',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Review Comment',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pallet',
      title: 'Associated Pallet',
      type: 'reference',
      to: [{ type: 'pallet' }],
    }),
    defineField({
      name: 'verifiedBuyer',
      title: 'Verified Wholesale Buyer',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'date',
      title: 'Review Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
  ],
});
