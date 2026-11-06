import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Wholesale Pallets Distribution Facility',
  description: 'Get in touch with SUNCITY PALLETS LIQUIDATION STORE LLC. Commercial facility located at 328 Thomas Pl, Everman, TX 76140. Phone & WhatsApp: +1 817-330-9020.',
  alternates: {
    canonical: 'https://liquidation-pallets.pages.dev/contact/',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
