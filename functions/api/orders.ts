interface Env {
  DB: any;
  RESEND_API_KEY?: string;
  SANITY_API_TOKEN?: string;
  SANITY_PROJECT_ID?: string;
  SANITY_DATASET?: string;
}

// Automatically sync orders to Sanity Studio CMS
async function syncOrderToSanity(orderData: any, env: Env) {
  const sanityToken = env?.SANITY_API_TOKEN || 'sknUOOdux4dHClMYHo2Nzcs3jZ1NJUbtX5W5lqMAyJ6STfLzmHoAqQrqqjjEKB6Fr1PsU1oBCrqbriKWkG3nrDUwAxDf575HjBgtOHzEzrtraU371zPXchSQkEcKr6wnvS0BFRk5Hohye3LSDKZpT3YkVYQwq5I6XuEaLszG9yR8UI8hE9kp';
  const sanityProjectId = env?.SANITY_PROJECT_ID || 'yeyvps37';
  const sanityDataset = env?.SANITY_DATASET || 'production';

  try {
    const mutation = {
      mutations: [
        {
          createOrReplace: {
            _id: `order-${orderData.orderNumber.toLowerCase()}`,
            _type: 'order',
            orderNumber: orderData.orderNumber,
            status: 'processing',
            customerName: orderData.customerName,
            customerEmail: orderData.customerEmail,
            customerPhone: orderData.customerPhone || '',
            companyName: orderData.companyName || '',
            totalAmount: Number(orderData.totalAmount),
            paymentMethod: orderData.paymentMethod || 'wire_transfer',
            shippingAddress: `${orderData.shippingAddress}, ${orderData.city || ''}, ${orderData.state || ''} ${orderData.zipCode || ''}`.trim(),
            hasLoadingDock: orderData.deliveryType === 'commercial_dock',
            trackingNumber: orderData.trackingNumber,
            carrier: orderData.carrier,
            bolNumber: orderData.bolNumber,
            customerPin: orderData.customerPin,
            items: (orderData.items || []).map((item: any, idx: number) => ({
              _key: `item_${idx}_${Date.now()}`,
              palletTitle: item.title,
              palletSku: item.palletId || item.sku || 'SKU-LOT',
              quantity: item.quantity || 1,
              price: item.price || 0,
            })),
            notes: orderData.notes || 'Order placed via storefront',
            createdAt: new Date().toISOString(),
          },
        },
      ],
    };

    await fetch(`https://${sanityProjectId}.api.sanity.io/v2024-01-01/data/mutate/${sanityDataset}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sanityToken}`,
      },
      body: JSON.stringify(mutation),
    });
  } catch (err) {
    console.error('Failed to sync order to Sanity Studio:', err);
  }
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
    const customerPin = `AMZ-${Math.floor(1000 + Math.random() * 9000)}`;

    // Estimated delivery: 5 business days from now
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 5);
    const estimatedDelivery = estDate.toISOString().split('T')[0];

    // Build Email Body HTML
    const loginLink = `https://liquidation-pallets.pages.dev/account/login?email=${encodeURIComponent(body.customerEmail)}&pin=${customerPin}`;
    const trackLink = `https://liquidation-pallets.pages.dev/track?order=${orderNumber}`;

    const emailSubject = `Order Confirmed: ${orderNumber} - Your amzpalletsliquidation.com Buyer Login Credentials`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #0f172a;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px;">
            <h1 style="color: #0f172a; margin: 0; font-size: 24px;">AMAZON <span style="color: #f59e0b;">PALLETS</span></h1>
            <p style="color: #64748b; font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">amzpalletsliquidation.com • Wholesale B2B Logistics</p>
          </div>

          <div style="padding: 24px 0;">
            <h2 style="color: #0f172a; font-size: 18px; margin-top: 0;">Thank you for your order, ${body.customerName}!</h2>
            <p style="color: #475569; font-size: 14px; line-height: 1.6;">
              Your wholesale liquidation order <strong>#${orderNumber}</strong> has been received and booked into our Dallas-Fort Worth logistics staging facility.
            </p>

            <!-- LOGIN CREDENTIALS BOX -->
            <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <h3 style="color: #b45309; margin-top: 0; font-size: 15px;">🔐 Your Wholesale Buyer Portal Login Credentials</h3>
              <p style="font-size: 13px; color: #78350f; margin-bottom: 12px;">
                Use these details anytime to access your order history, download official Bill of Lading (BOL), and view item manifests:
              </p>
              <table style="width: 100%; font-size: 13px; color: #0f172a;">
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; width: 140px;">Portal Login URL:</td>
                  <td style="padding: 4px 0;"><a href="https://liquidation-pallets.pages.dev/account/login" style="color: #2563eb;">amzpalletsliquidation.com/account/login</a></td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold;">Account Email:</td>
                  <td style="padding: 4px 0; font-family: monospace; font-size: 14px;"><strong>${body.customerEmail}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold;">Access PIN / Pass:</td>
                  <td style="padding: 4px 0; font-family: monospace; font-size: 15px; color: #b45309;"><strong>${customerPin}</strong></td>
                </tr>
              </table>

              <div style="margin-top: 16px;">
                <a href="${loginLink}" style="display: inline-block; background-color: #f59e0b; color: #000000; font-weight: bold; font-size: 13px; text-decoration: none; padding: 10px 20px; border-radius: 8px;">
                  1-Click Auto Login To My Account →
                </a>
              </div>
            </div>

            <!-- FREIGHT & TRACKING BOX -->
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <h3 style="color: #166534; margin-top: 0; font-size: 15px;">🚚 Live LTL Freight Dispatch Information</h3>
              <p style="font-size: 13px; color: #14532d; margin: 4px 0 12px 0;">
                Carrier: <strong>${carrier}</strong> • Bill of Lading: <strong>${bolNumber}</strong> • PRO: <strong>${trackingNumber}</strong>
              </p>
              <a href="${trackLink}" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-weight: bold; font-size: 13px; text-decoration: none; padding: 10px 20px; border-radius: 8px;">
                Track Live Freight Status →
              </a>
            </div>

            <!-- ORDER SUMMARY -->
            <h3 style="color: #0f172a; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Order Summary</h3>
            <p style="font-size: 13px; color: #475569; margin: 6px 0;"><strong>Shipping Dock:</strong> ${body.shippingAddress}, ${body.city}, ${body.state} ${body.zipCode}</p>
            <p style="font-size: 13px; color: #475569; margin: 6px 0;"><strong>Freight Method:</strong> ${String(body.deliveryType).toUpperCase()}</p>
            <p style="font-size: 13px; color: #475569; margin: 6px 0;"><strong>Total Invoice Amount:</strong> $${Number(body.totalAmount).toLocaleString()} USD</p>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #94a3b8; text-align: center;">
            <p style="margin: 0;">AMZ Pallets Liquidation • amzpalletsliquidation.com</p>
            <p style="margin: 4px 0 0 0;">WhatsApp Logistics Desk: +1 (817) 330-9020 • support@amzpalletsliquidation.com</p>
          </div>
        </div>
      </div>
    `;

    // Attempt to send email via Resend if API key is present in Cloudflare Pages environment
    let emailStatus = 'prepared';
    if (context.env?.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'AMZ Pallets Orders <orders@amzpalletsliquidation.com>',
            to: [body.customerEmail],
            subject: emailSubject,
            html: emailHtml,
          }),
        });
        if (resendResponse.ok) {
          emailStatus = 'sent_via_resend';
        } else {
          emailStatus = 'resend_attempted';
        }
      } catch (err: any) {
        console.error('Email send exception:', err);
        emailStatus = 'error_sending';
      }
    }

    // Prepare complete order payload for Sanity CMS
    const fullOrderPayload = {
      ...body,
      orderNumber,
      trackingNumber,
      carrier,
      bolNumber,
      customerPin,
      estimatedDelivery,
    };

    // Auto-sync order directly into Sanity Studio CMS
    await syncOrderToSanity(fullOrderPayload, context.env);

    if (context.env && context.env.DB) {
      const orderStmt = context.env.DB.prepare(`
        INSERT INTO orders (
          id, order_number, customer_name, customer_email, customer_phone,
          company_name, shipping_address, city, state, zip_code, delivery_type,
          subtotal, freight_cost, tax_amount, total_amount, payment_method,
          notes, tracking_number, carrier, bol_number, estimated_delivery, customer_pin
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        estimatedDelivery,
        customerPin
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
          customerEmail: body.customerEmail,
          customerPin,
          trackingNumber,
          bolNumber,
          storage: 'cloudflare_d1_and_sanity',
          emailStatus,
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId,
        orderNumber,
        customerEmail: body.customerEmail,
        customerPin,
        trackingNumber,
        bolNumber,
        storage: 'sanity_cms',
        emailStatus,
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
