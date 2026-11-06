import { NextResponse } from 'next/server';
import { subscribeNewsletter } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const result = await subscribeNewsletter(email);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to subscribe', details: error.message },
      { status: 500 }
    );
  }
}
