import { NextResponse } from 'next/server';
import { createFreightQuote } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.fullName || !body.email || !body.destinationZip) {
      return NextResponse.json(
        { error: 'Missing full name, email, or destination zip code' },
        { status: 400 }
      );
    }

    const result = await createFreightQuote(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to submit quote request', details: error.message },
      { status: 500 }
    );
  }
}
