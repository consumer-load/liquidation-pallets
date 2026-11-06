import { defineType, defineField } from 'sanity';

export const faqItemSchema = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  icon: () => '❓',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Group',
      type: 'string',
      options: {
        list: [
          'Ordering & Payment',
          'Freight & Shipping',
          'Manifests & Conditions',
          'Returns & Warranties',
          'General Liquidation',
        ],
      },
      initialValue: 'Ordering & Payment',
    }),
    defineField({
      name: 'order',
      title: 'Display Sequence',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
