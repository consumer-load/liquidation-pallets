import { defineType, defineField } from 'sanity';
import { Building2 } from 'lucide-react';

export const retailerSchema = defineType({
  name: 'retailer',
  title: 'Brand / Retailer Source',
  type: 'document',
  icon: Building2,
  fields: [
    defineField({
      name: 'name',
      title: 'Retailer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 50 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Retailer Logo / Image',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
});
