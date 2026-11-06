import { defineType, defineField } from 'sanity';

export const categorySchema = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: () => '📁',
  groups: [
    { name: 'general', title: '📁 Category Info', default: true },
    { name: 'seo', title: '🔍 SEO & Meta' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'general',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'general',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Category Cover Image',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Category',
      type: 'boolean',
      group: 'general',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'general',
      initialValue: 0,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Meta Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
});
