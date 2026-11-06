import { defineType, defineField } from 'sanity';

export const tagSchema = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'title',
      title: 'Tag Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 50 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Badge Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Blue (Standard)', value: 'blue' },
          { title: 'Green (High Profit/Hot)', value: 'green' },
          { title: 'Orange (Fast Moving)', value: 'orange' },
          { title: 'Red (Clearance/Flash)', value: 'red' },
          { title: 'Purple (Premium)', value: 'purple' },
        ],
      },
      initialValue: 'blue',
    }),
  ],
});
