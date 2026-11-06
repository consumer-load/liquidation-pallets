import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import PalletsClient from './PalletsClient';

export const metadata: Metadata = {
  title: 'Wholesale Liquidation Pallets & Truckloads Inventory | Liquidation Pallets USA',
  description: 'Browse live inventory of customer returns, overstock, and shelf pull liquidation pallets from Amazon, Target, Home Depot, and Costco. Nationwide LTL shipping.',
  alternates: {
    canonical: 'https://liquidation-pallets.pages.dev/pallets/',
  },
};

export default function PalletsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-neutral-500">Loading Pallets Catalog...</div>}>
      <PalletsClient />
    </Suspense>
  );
}
