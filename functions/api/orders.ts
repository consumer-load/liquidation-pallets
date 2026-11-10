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
    const trackingNumber = `PRO-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const bolNumber = `BOL-${Math.floor(100000 + Math.random() * 900000)}`;
    const carrier = 'R+L Carriers LTL Freight';

    // Calculate estimated delivery date: 5 business days from now
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 5);
    const estimatedDelivery = estDate.toISOString().split('T')[0];

    if (context.env && context.env.DB) {
      const orderStmt = context.env.DB.prepare(`
        INSERT INTO orders (
          id, order_number, customer_name, customer_email, customer_phone,
          company_name, shipping_address, city, state, zip_code, delivery_type,
          subtotal, freight_cost, tax_amount, total_amount, payment_method,
          notes, tracking_number, carrier, bol_number, estimated_delivery
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        body.notes || null,
        trackingNumber,
        carrier,
        bolNumber,
        estimatedDelivery
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
          trackingNumber,
          bolNumber,
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
        trackingNumber,
        bolNumber,
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

export const onRequestGet = async (context: { request: Request; env: Env }) => {
  try {
    const url = new URL(context.request.url);
    const email = url.searchParams.get('email');
    const orderNumber = url.searchParams.get('orderNumber');

    if (context.env && context.env.DB) {
      if (orderNumber) {
        const orderResult = await context.env.DB.prepare(`
          SELECT * FROM orders WHERE order_number = ? LIMIT 1
        `).bind(orderNumber).first();

        if (orderResult) {
          const { results: items } = await context.env.DB.prepare(`
            SELECT * FROM order_items WHERE order_id = ?
          `).bind(orderResult.id).all();

          return new Response(
            JSON.stringify({ order: orderResult, items: items || [] }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }

      if (email) {
        const { results: userOrders } = await context.env.DB.prepare(`
          SELECT * FROM orders WHERE LOWER(customer_email) = LOWER(?) ORDER BY created_at DESC
        `).bind(email).all();

        return new Response(
          JSON.stringify({ orders: userOrders || [] }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const { results: allOrders } = await context.env.DB.prepare(`
        SELECT * FROM orders ORDER BY created_at DESC LIMIT 50
      `).all();

      return new Response(
        JSON.stringify({ orders: allOrders || [] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ orders: [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch orders', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
