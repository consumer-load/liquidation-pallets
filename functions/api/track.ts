interface Env {
  DB: any;
}

export const onRequestGet = async (context: { request: Request; env: Env }) => {
  try {
    const url = new URL(context.request.url);
    const query = url.searchParams.get('query') || url.searchParams.get('order') || '';
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return new Response(
        JSON.stringify({ error: 'Please provide an Order #, PRO Tracking #, or BOL #' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (context.env && context.env.DB) {
      const order = await context.env.DB.prepare(`
        SELECT * FROM orders 
        WHERE LOWER(order_number) = LOWER(?) 
           OR LOWER(tracking_number) = LOWER(?) 
           OR LOWER(bol_number) = LOWER(?)
        LIMIT 1
      `).bind(cleanQuery, cleanQuery, cleanQuery).first();

      if (order) {
        const { results: items } = await context.env.DB.prepare(`
          SELECT * FROM order_items WHERE order_id = ?
        `).bind(order.id).all();

        return new Response(
          JSON.stringify({
            found: true,
            order,
            items: items || [],
            source: 'd1_database',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Default mock response for demonstration if database has no record yet
    const isMock = true;
    const mockOrder = {
      order_number: cleanQuery.toUpperCase().startsWith('LP-') ? cleanQuery.toUpperCase() : `LP-${Math.floor(100000 + Math.random() * 900000)}`,
      customer_name: 'Verified Wholesale Commercial Buyer',
      company_name: 'Apex Wholesale Distribution LLC',
      customer_email: 'buyer@apexdistributors.com',
      shipping_address: '1420 Commercial Pkwy, Industrial Zone',
      city: 'Dallas',
      state: 'TX',
      zip_code: '75201',
      delivery_type: 'commercial_dock',
      total_amount: 3250.0,
      freight_cost: 220.0,
      payment_method: 'wire_transfer',
      payment_status: 'paid',
      order_status: 'in_transit',
      tracking_number: 'PRO-84910284',
      bol_number: 'BOL-918230',
      carrier: 'R+L Carriers LTL Freight',
      estimated_delivery: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    };

    const mockItems = [
      {
        title: 'Amazon High-Value Consumer Electronics Pallet',
        condition: 'Customer Returns',
        fob_location: 'Dallas, TX',
        price: 2450.0,
        quantity: 1,
      },
    ];

    return new Response(
      JSON.stringify({
        found: true,
        order: mockOrder,
        items: mockItems,
        source: 'preview_simulator',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Tracking service error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
