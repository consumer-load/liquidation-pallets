import { NextResponse } from 'next/server';
import { createOrder, getOrders } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.customerEmail || !body.shippingAddress || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required customer or pallet item information' },
        { status: 400 }
      );
    }

    const result = await createOrder(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Error handling order:', error);
    return NextResponse.json(
      { error: 'Failed to process order', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch orders', details: error.message },
      { status: 500 }
    );
  }
}
