import { defineType, defineField } from 'sanity';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Store Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Store Name',
      type: 'string',
      initialValue: 'Liquidation Pallets USA',
    }),
    defineField({
      name: 'tagline',
      title: 'Store Tagline',
      type: 'string',
      initialValue: 'Wholesale Truckloads, Customer Returns & Overstock Pallets',
    }),
    defineField({
      name: 'supportPhone',
      title: 'Customer Service Phone',
      type: 'string',
      initialValue: '+1 (817) 330-9020',
    }),
    defineField({
      name: 'supportWhatsapp',
      title: 'WhatsApp Contact Number',
      type: 'string',
      initialValue: '+1 817-330-9020',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string',
      initialValue: 'support@suncitypalletsliquidation.com',
    }),
    defineField({
      name: 'warehouseAddress',
      title: 'Warehouse & Dock Address',
      type: 'string',
      initialValue: '328 Thomas Pl, Everman, TX 76140',
    }),
    defineField({
      name: 'announcementBar',
      title: 'Top Announcement Bar Text',
      type: 'string',
      initialValue: '🔥 Nationwide LTL Freight Available • Verified Manifests on High-Value Lots • Call +1 (817) 330-9020',
    }),
  ],
});
