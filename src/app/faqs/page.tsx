'use client';

import React, { useState } from 'react';
import PolicyLayout from '@/components/PolicyLayout';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      category: 'Sourcing & Wholesale',
      question: 'Where does SUNCITY PALLETS LIQUIDATION STORE LLC source their products?',
      answer: 'SUNCITY PALLETS LIQUIDATION STORE LLC partners with top tier-one retailers from all over the United States (including Amazon, Target, The Home Depot, Walmart, and Costco). Our sourcing team procures merchandise directly under contract so we can pass on industry-leading liquidation discounts of 75% to 90% below retail MSRP.',
    },
    {
      category: 'Purchasing & Licensing',
      question: 'Is a resale certificate required for purchase?',
      answer: 'No! SUNCITY PALLETS LIQUIDATION STORE LLC does not require a state reseller certificate or wholesale license to buy individual pallets or truckloads. Anyone looking to source high-margin inventory for eBay, Amazon, Mercari, flea markets, or discount stores can purchase.',
    },
    {
      category: 'Payments & Checkout',
      question: 'What payment methods does SUNCITY PALLETS LIQUIDATION STORE LLC accept?',
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

  const filteredFaqs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PolicyLayout
      title="Frequently Asked Questions (FAQs)"
      subtitle="Find answers to common questions about product sourcing, buying guidelines, freight delivery, and payments."
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. payment, dock, returns, certificate)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-500">
              No answers matching &quot;{searchTerm}&quot;. Please contact our support team.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20"
                open={idx < 3}
              >
                <summary className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white cursor-pointer list-none flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))
          )}
        </div>
      </div>
    </PolicyLayout>
  );
}
