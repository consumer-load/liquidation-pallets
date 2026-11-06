import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import QuoteClient from './QuoteClient';

export const metadata: Metadata = {
  title: 'Request Freight Quote & Multi-Pallet Pricing | Liquidation Pallets USA',
  description: 'Get an instant freight quote or full truckload volume discount from our Everman, TX logistics desk.',
  alternates: {
    canonical: 'https://liquidation-pallets.pages.dev/quote/',
  },
};

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-neutral-500">Loading Quote Form...</div>}>
      <QuoteClient />
    </Suspense>
  );
}
