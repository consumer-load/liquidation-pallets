import { defineType, defineField } from 'sanity';

export const seoSchema = defineType({
  name: 'seo',
  title: 'SEO & Social Sharing',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Optimal length: 50-60 characters. Search engines typically display the first 60 chars.',
      validation: (rule) => rule.max(70).warning('Titles longer than 70 characters may get truncated by Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Optimal length: 140-160 characters. Summarize the content to drive search clicks.',
      validation: (rule) => rule.max(170).warning('Descriptions longer than 160 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Focus Keywords / Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Key search terms relevant to this page/product.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (Open Graph / Twitter Card)',
      type: 'image',
      options: { hotspot: true },
      description: 'Recommended size: 1200x630px. Used when shared on Facebook, WhatsApp, LinkedIn, Twitter.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL Override',
      type: 'url',
      description: 'Leave empty to automatically use the page URL. Set only if this content is duplicated elsewhere.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines (Robots NoIndex)',
      type: 'boolean',
      initialValue: false,
      description: 'Turn on if you DO NOT want Google, Bing or Yahoo to index this page.',
    }),
  ],
});
