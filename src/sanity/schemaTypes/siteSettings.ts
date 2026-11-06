import { defineType, defineField } from 'sanity';
import { Settings } from 'lucide-react';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Store Settings',
  type: 'document',
  icon: Settings,
  groups: [
    { name: 'general', title: '⚙️ General', default: true },
    { name: 'contact', title: '📞 Contact & Warehouse' },
    { name: 'seo', title: '🔍 Global SEO & Verification' },
    { name: 'schema', title: '🏢 Organization Schema.org' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Store Name',
      type: 'string',
      group: 'general',
      initialValue: 'Liquidation Pallets USA',
    }),
    defineField({
      name: 'tagline',
      title: 'Store Tagline',
      type: 'string',
      group: 'general',
      initialValue: 'Wholesale Truckloads, Customer Returns & Overstock Pallets',
    }),
    defineField({
      name: 'announcementBar',
      title: 'Top Announcement Bar Text',
      type: 'string',
      group: 'general',
      initialValue: '🔥 Nationwide LTL Freight Available • Verified Manifests on High-Value Lots • Call +1 (817) 330-9020',
    }),

    // Contact & Warehouse
    defineField({
      name: 'supportPhone',
      title: 'Customer Service Phone',
      type: 'string',
      group: 'contact',
      initialValue: '+1 (817) 330-9020',
    }),
    defineField({
      name: 'supportWhatsapp',
      title: 'WhatsApp Contact Number',
      type: 'string',
      group: 'contact',
      initialValue: '+1 817-330-9020',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string',
      group: 'contact',
      initialValue: 'support@suncitypalletsliquidation.com',
    }),
    defineField({
      name: 'warehouseAddress',
      title: 'Warehouse & Dock Street Address',
      type: 'string',
      group: 'contact',
      initialValue: '328 Thomas Pl',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'contact',
      initialValue: 'Everman',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      group: 'contact',
      initialValue: 'TX',
    }),
    defineField({
      name: 'zipCode',
      title: 'Postal / ZIP Code',
      type: 'string',
      group: 'contact',
      initialValue: '76140',
    }),

    // Global SEO
    defineField({
      name: 'seo',
      title: 'Default Site SEO & Meta',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Search Console Verification Token',
      type: 'string',
      group: 'seo',
      description: 'The content code from <meta name="google-site-verification" content="..." />',
    }),
    defineField({
      name: 'bingSiteVerification',
      title: 'Bing Webmaster Tools Verification Token',
      type: 'string',
      group: 'seo',
    }),

    // Schema.org Organization Structured Data
    defineField({
      name: 'legalBusinessName',
      title: 'Legal Business Name',
      type: 'string',
      group: 'schema',
      initialValue: 'SUNCITY PALLETS LIQUIDATION STORE LLC',
    }),
    defineField({
      name: 'usptoReg',
      title: 'USPTO / Trademark Reg. Number',
      type: 'string',
      group: 'schema',
      initialValue: 'Reg. No. 0,806,021,894 (Class 35)',
    }),
    defineField({
      name: 'openingHours',
      title: 'Warehouse Hours (Schema.org)',
      type: 'string',
      group: 'schema',
      initialValue: 'Mo-Fr 08:00-17:00, Sa 09:00-14:00',
    }),
    defineField({
      name: 'geoLatitude',
      title: 'Warehouse Latitude',
      type: 'number',
      group: 'schema',
      initialValue: 32.6285,
    }),
    defineField({
      name: 'geoLongitude',
      title: 'Warehouse Longitude',
      type: 'number',
      group: 'schema',
      initialValue: -97.2917,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Official Social Media Profiles (sameAs)',
      type: 'array',
      group: 'schema',
      of: [{ type: 'url' }],
      description: 'Links to Facebook, LinkedIn, Twitter/X, Instagram company profiles.',
    }),
  ],
});
