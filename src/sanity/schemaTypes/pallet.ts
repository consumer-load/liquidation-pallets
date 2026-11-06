export const palletSchema = {
  name: 'pallet',
  title: 'Liquidation Pallet',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Pallet Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sku',
      title: 'SKU / Pallet ID',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Consumer Electronics',
          'Power Tools & Hardware',
          'Home & Kitchen',
          'Apparel & Footwear',
          'Toys & Hobbies',
          'Health & Beauty',
          'General Merchandise',
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'condition',
      title: 'Condition Grade',
      type: 'string',
      options: {
        list: [
          'Brand New',
          'Overstock',
          'Customer Returns',
          'Shelf Pulls',
          'Tested Working',
          'Salvage / As-Is',
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sourceRetailer',
      title: 'Source Retailer',
      type: 'string',
      options: {
        list: ['Amazon', 'Target', 'The Home Depot', 'Walmart', 'Wayfair', 'Costco', 'Major Wholesale'],
      },
    },
    {
      name: 'price',
      title: 'Wholesale Price ($)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'msrp',
      title: 'Estimated Retail MSRP ($)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'pieceCount',
      title: 'Total Piece Count',
      type: 'number',
    },
    {
      name: 'weightLbs',
      title: 'Estimated Weight (Lbs)',
      type: 'number',
    },
    {
      name: 'dimensions',
      title: 'Dimensions (e.g., 48x40x54 in)',
      type: 'string',
    },
    {
      name: 'fobLocation',
      title: 'FOB Shipping Warehouse',
      type: 'string',
      options: {
        list: ['Dallas, TX', 'Atlanta, GA', 'Indianapolis, IN', 'Las Vegas, NV', 'Philadelphia, PA'],
      },
    },
    {
      name: 'images',
      title: 'Pallet Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'features',
      title: 'Highlights / Key Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'isFeatured',
      title: 'Featured On Homepage',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isHotDeal',
      title: 'Hot Deal / Flash Clearance',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'stockAvailable',
      title: 'Pallets Available in Stock',
      type: 'number',
      initialValue: 1,
    },
  ],
};
