interface Env {
  DB: any;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const body: any = await context.request.json();

    if (!body.customerName || !body.customerEmail || !body.shippingAddress || !body.items || body.items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required customer or pallet item information' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const orderNumber = body.orderNumber || `LP-${Math.floor(100000 + Math.random() * 900000)}`;

    if (context.env && context.env.DB) {
      const orderStmt = context.env.DB.prepare(`
        INSERT INTO orders (
          id, order_number, customer_name, customer_email, customer_phone,
          company_name, shipping_address, city, state, zip_code, delivery_type,
          subtotal, freight_cost, tax_amount, total_amount, payment_method,
          notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        orderId,
        orderNumber,
        body.customerName,
        body.customerEmail,
        body.customerPhone || null,
        body.companyName || null,
        body.shippingAddress,
        body.city,
        body.state,
        body.zipCode,
        body.deliveryType,
        body.subtotal,
        body.freightCost,
        body.taxAmount || 0,
        body.totalAmount,
        body.paymentMethod,
        body.notes || null
      );

      const itemStmts = body.items.map((item: any, index: number) => {
        const itemId = `item_${orderId}_${index}`;
        return context.env.DB.prepare(`
          INSERT INTO order_items (id, order_id, pallet_id, title, condition, fob_location, price, quantity)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          itemId,
          orderId,
          item.palletId,
          item.title,
          item.condition,
          item.fobLocation,
          item.price,
          item.quantity
        );
      });

      await context.env.DB.batch([orderStmt, ...itemStmts]);

      return new Response(
        JSON.stringify({
          success: true,
          orderId,
          orderNumber,
          storage: 'cloudflare_d1',
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId,
        orderNumber,
        storage: 'mock_preview',
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to process order', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const onRequestGet = async (context: { env: Env }) => {
  try {
    if (context.env && context.env.DB) {
      const { results } = await context.env.DB.prepare(`
        SELECT * FROM orders ORDER BY created_at DESC LIMIT 50
      `).all();
      return new Response(JSON.stringify({ orders: results || [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ orders: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch orders', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
