import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import TrackClient from './TrackClient';

export const metadata: Metadata = {
  title: 'Live Pallet & Truckload Freight Tracking | amzpalletsliquidation.com',
  description: 'Track your LTL freight pallets, Bill of Lading (BOL), and linehaul transit status in real time. R+L Carriers, Estes, SAIA freight updates.',
  alternates: {
    canonical: 'https://liquidation-pallets.pages.dev/track/',
  },
};

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xs text-neutral-500">
          Loading Freight Tracking System...
        </div>
      }
    >
      <TrackClient />
    </Suspense>
  );
}
