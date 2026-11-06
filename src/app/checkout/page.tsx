import React from 'react';
import type { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Secure Wholesale Checkout | Liquidation Pallets USA',
  description: 'Complete your wholesale pallet purchase. 256-bit encrypted checkout with wire transfer, ACH, and card options.',
  alternates: {
    canonical: 'https://liquidation-pallets.pages.dev/checkout/',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
