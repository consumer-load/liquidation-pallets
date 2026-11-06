import { defineType, defineField } from 'sanity';

export const orderSchema = defineType({
  name: 'order',
  title: 'Order Record',
  type: 'document',
  icon: () => '📦',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order #',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Payment Confirmed', value: 'confirmed' },
          { title: 'Staging / Freight Dispatch', value: 'processing' },
          { title: 'Shipped (In Transit)', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
    }),
    defineField({
      name: 'companyName',
      title: 'Company / Resale Business Name',
      type: 'string',
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total Order Amount ($)',
      type: 'number',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping / Dock Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'hasLoadingDock',
      title: 'Has Loading Dock / Forklift',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'items',
      title: 'Ordered Pallets / Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'palletTitle', type: 'string', title: 'Pallet Title' },
            { name: 'palletSku', type: 'string', title: 'Pallet SKU' },
            { name: 'quantity', type: 'number', title: 'Qty' },
            { name: 'price', type: 'number', title: 'Price per Unit ($)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Internal Admin Notes',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'createdAt',
      title: 'Order Timestamp',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'customerName',
      status: 'status',
      amount: 'totalAmount',
    },
    prepare({ title, subtitle, status, amount }) {
      return {
        title: `Order #${title || 'N/A'} - $${amount || 0}`,
        subtitle: `${subtitle || 'Unknown'} [${(status || 'pending').toUpperCase()}]`,
      };
    },
  },
});
