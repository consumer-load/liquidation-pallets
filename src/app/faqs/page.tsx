import React from 'react';
import type { Metadata } from 'next';
import FaqsClient from './FaqsClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQs) | AMZ Pallets Liquidation (amzpalletsliquidation.com)',
  description: 'Find answers about purchasing liquidation pallets, freight delivery, manifests, resale certificates, and payments.',
  alternates: {
    canonical: 'https://liquidation-pallets.pages.dev/faqs/',
  },
};

const faqData = [
  {
    category: 'Sourcing & Wholesale',
    question: 'Where does AMZ Pallets Liquidation (amzpalletsliquidation.com) source their products?',
    answer: 'AMZ Pallets Liquidation (amzpalletsliquidation.com) partners with top tier-one retailers from all over the United States (including Amazon, Target, The Home Depot, Walmart, and Costco). Our sourcing team procures merchandise directly under contract so we can pass on industry-leading liquidation discounts of 75% to 90% below retail MSRP.',
  },
  {
    category: 'Purchasing & Licensing',
    question: 'Is a resale certificate required for purchase?',
    answer: 'No! AMZ Pallets Liquidation (amzpalletsliquidation.com) does not require a state reseller certificate or wholesale license to buy individual pallets or truckloads. Anyone looking to source high-margin inventory for eBay, Amazon, Mercari, flea markets, or discount stores can purchase.',
  },
  {
    category: 'Payments & Checkout',
    question: 'What payment methods does AMZ Pallets Liquidation (amzpalletsliquidation.com) accept?',
    answer: 'We accept Bank Wire Transfer, ACH Corporate Transfer, Credit/Debit Cards, CashApp, Zelle, Venmo, and PayPal. For large multi-pallet and full truckload orders, bank wire transfer or ACH is recommended for zero processing delays.',
  },
  {
    category: 'Returns & Policies',
    question: 'Do you accept returns?',
    answer: 'We accept returns on unopened, new-condition merchandise within 30 days of delivery. Due to the deep-discount wholesale nature of liquidation inventory, returned goods are subject to a 20% restocking fee and buyer return freight. Please review our full Refund & Return Policy page for details.',
  },
  {
    category: 'Security & Privacy',
    question: 'Is your checkout secure?',
    answer: 'Yes. We utilize industry-standard 256-bit SSL (Secure Socket Layer) encryption, Edge SSL on Cloudflare, and serverless Cloudflare D1 databases to keep your company details and transactions strictly protected.',
  },
  {
    category: 'Freight & Logistics',
    question: 'How does freight delivery work if I do not have a loading dock?',
    answer: 'If you are delivering to a residential address, garage, or commercial building without a loading dock or forklift, select "Residential Liftgate Delivery" at checkout. The freight carrier will dispatch a truck equipped with a hydraulic liftgate to lower the pallets to curbside level.',
  },
  {
    category: 'Warehouse Pickup',
    question: 'Can I pick up the pallets in person at your Everman facility?',
    answer: 'Yes! Self-pickup is 100% free ($0 freight cost). You can pick up directly from our Everman, TX distribution yard at 328 Thomas Pl, Everman, TX 76140. Please bring an open utility trailer, box truck, or pickup truck with DOT-approved ratchet straps.',
  },
  {
    category: 'Manifests',
    question: 'What is a manifest and how accurate is it?',
    answer: 'A manifest is an itemized breakdown listing every item, UPC/ASIN, piece count, and MSRP in a pallet. Manifested loads are generated via retailer barcode scan audits. In the liquidation industry, a standard 10-15% variance margin is customary due to retailer packing discrepancies.',
  },
];

export default function FAQsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqsClient faqData={faqData} />
    </>
  );
}
