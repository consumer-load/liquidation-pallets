import { OrderData } from '@/types';

// In-memory local fallback store for local development outside Cloudflare runtime
const localMemoryStore = {
  orders: [] as any[],
  quotes: [] as any[],
  subscribers: [] as any[],
};

/**
 * Helper to get the Cloudflare D1 database binding if running on Cloudflare Pages / Workers
 */
export function getD1Database(): any {
  if (typeof (globalThis as any).DB !== 'undefined') {
    return (globalThis as any).DB;
  }
  if (typeof (process.env as any).DB !== 'undefined') {
    return (process.env as any).DB;
  }
  return null;
}

/**
 * Insert new order into Cloudflare D1 or fallback
 */
export async function createOrder(data: OrderData) {
  const d1 = getD1Database();
  const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const orderNumber = data.orderNumber || `LP-${Math.floor(100000 + Math.random() * 900000)}`;

  if (d1) {
    try {
      // Execute transaction batch on Cloudflare D1
      const orderStmt = d1.prepare(`
        INSERT INTO orders (
          id, order_number, customer_name, customer_email, customer_phone,
          company_name, shipping_address, city, state, zip_code, delivery_type,
          subtotal, freight_cost, tax_amount, total_amount, payment_method,
          notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        orderId,
        orderNumber,
        data.customerName,
        data.customerEmail,
        data.customerPhone || null,
        data.companyName || null,
        data.shippingAddress,
        data.city,
        data.state,
        data.zipCode,
        data.deliveryType,
        data.subtotal,
        data.freightCost,
        data.taxAmount,
        data.totalAmount,
        data.paymentMethod,
        data.notes || null
      );

      const itemStmts = data.items.map((item, index) => {
        const itemId = `item_${orderId}_${index}`;
        return d1.prepare(`
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

      await d1.batch([orderStmt, ...itemStmts]);

      return {
        success: true,
        orderId,
        orderNumber,
        storage: 'cloudflare_d1',
      };
    } catch (err: any) {
      console.error('Failed to execute D1 order batch:', err);
      // Fallback
    }
  }

  // Local fallback save
  const newOrder = {
    id: orderId,
    order_number: orderNumber,
    customer_name: data.customerName,
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone,
    company_name: data.companyName,
    shipping_address: data.shippingAddress,
    city: data.city,
    state: data.state,
    zip_code: data.zipCode,
    delivery_type: data.deliveryType,
    subtotal: data.subtotal,
    freight_cost: data.freightCost,
    tax_amount: data.taxAmount,
    total_amount: data.totalAmount,
    payment_method: data.paymentMethod,
    payment_status: 'pending',
    order_status: 'processing',
    notes: data.notes,
    created_at: new Date().toISOString(),
    items: data.items,
  };

  localMemoryStore.orders.unshift(newOrder);

  return {
    success: true,
    orderId,
    orderNumber,
    storage: 'local_memory_fallback',
  };
}

/**
 * Fetch all orders (for admin review)
 */
export async function getOrders() {
  const d1 = getD1Database();
  if (d1) {
    try {
      const { results } = await d1.prepare(`
        SELECT * FROM orders ORDER BY created_at DESC LIMIT 50
      `).all();
      return results || [];
    } catch (err) {
      console.error('Error querying D1 orders:', err);
    }
  }
  return localMemoryStore.orders;
}

/**
 * Save Freight Quote Request
 */
export async function createFreightQuote(quote: {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  destinationZip: string;
  deliveryType: string;
  palletId?: string;
  palletTitle?: string;
  estimatedFreight?: number;
  notes?: string;
}) {
  const d1 = getD1Database();
  const id = `quot_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

  if (d1) {
    try {
      await d1.prepare(`
        INSERT INTO freight_quotes (
          id, full_name, email, phone, company_name,
          destination_zip, delivery_type, pallet_id, pallet_title,
          estimated_freight, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        id,
        quote.fullName,
        quote.email,
        quote.phone || null,
        quote.companyName || null,
        quote.destinationZip,
        quote.deliveryType,
        quote.palletId || null,
        quote.palletTitle || null,
        quote.estimatedFreight || null,
        quote.notes || null
      ).run();

      return { success: true, id, storage: 'cloudflare_d1' };
    } catch (err) {
      console.error('Error saving quote to D1:', err);
    }
  }

  const newQuote = { id, ...quote, created_at: new Date().toISOString(), status: 'open' };
  localMemoryStore.quotes.unshift(newQuote);
  return { success: true, id, storage: 'local_memory_fallback' };
}

/**
 * Subscribe newsletter email
 */
export async function subscribeNewsletter(email: string) {
  const d1 = getD1Database();
  const id = `sub_${Date.now()}`;

  if (d1) {
    try {
      await d1.prepare(`
        INSERT OR IGNORE INTO newsletter_subscribers (id, email) VALUES (?, ?)
      `).bind(id, email).run();
      return { success: true };
    } catch (err) {
      console.error('Error inserting newsletter into D1:', err);
    }
  }

  localMemoryStore.subscribers.push({ id, email, subscribed_at: new Date().toISOString() });
  return { success: true };
}
