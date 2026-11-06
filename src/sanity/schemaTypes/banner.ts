import { defineType, defineField } from 'sanity';
import { Megaphone } from 'lucide-react';

export const bannerSchema = defineType({
  name: 'banner',
  title: 'Promotional Banner',
  type: 'document',
  icon: Megaphone,
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge Tag (e.g. FLASH SALE, NEW ARRIVAL)',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Description',
      type: 'string',
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Browse Inventory',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button Link',
      type: 'string',
      initialValue: '/pallets',
    }),
    defineField({
      name: 'image',
      title: 'Banner Background / Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
