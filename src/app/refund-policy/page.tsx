import React from 'react';
import PolicyLayout from '@/components/PolicyLayout';
import { Check, X, ShieldAlert, FileSpreadsheet } from 'lucide-react';

export const metadata = {
  title: 'Refund & Return Policy | SUNCITY PALLETS LIQUIDATION STORE LLC',
  description: 'Complete 30-day return, refund, and exchange guidelines for wholesale liquidation merchandise.',
};

export default function RefundPolicyPage() {
  return (
    <PolicyLayout
      title="Refund & Return Policy"
      subtitle="Complete return, refund, and exchange guidelines for all orders shipped within the United States."
    >
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        {/* Policy Summary Table */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden text-xs">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-3 font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            Return & Refund Policy Summary
          </div>
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <div className="p-3 grid grid-cols-2 bg-white dark:bg-neutral-900">
              <span className="text-neutral-500 font-medium">Applicable Country</span>
              <span className="font-bold text-neutral-900 dark:text-white">United States</span>
            </div>
            <div className="p-3 grid grid-cols-2 bg-neutral-50/50 dark:bg-neutral-850">
              <span className="text-neutral-500 font-medium">Return Window</span>
              <span className="font-bold text-neutral-900 dark:text-white">30 Days from Delivery</span>
            </div>
            <div className="p-3 grid grid-cols-2 bg-white dark:bg-neutral-900">
              <span className="text-neutral-500 font-medium">Product Condition</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">New Only (Unopened)</span>
            </div>
            <div className="p-3 grid grid-cols-2 bg-neutral-50/50 dark:bg-neutral-850">
              <span className="text-neutral-500 font-medium">Returns Accepted</span>
              <span className="font-bold text-neutral-900 dark:text-white">Defective & Non-Defective</span>
            </div>
            <div className="p-3 grid grid-cols-2 bg-white dark:bg-neutral-900">
              <span className="text-neutral-500 font-medium">Exchanges Accepted</span>
              <span className="font-bold text-neutral-900 dark:text-white">Yes (Within 30 Days)</span>
            </div>
            <div className="p-3 grid grid-cols-2 bg-neutral-50/50 dark:bg-neutral-850">
              <span className="text-neutral-500 font-medium">Return Method</span>
              <span className="font-bold text-neutral-900 dark:text-white">By Mail / Freight Carrier</span>
            </div>
            <div className="p-3 grid grid-cols-2 bg-white dark:bg-neutral-900">
              <span className="text-neutral-500 font-medium">Return Shipping Label</span>
              <span className="font-bold text-neutral-900 dark:text-white">Customer Responsibility</span>
            </div>
            <div className="p-3 grid grid-cols-2 bg-neutral-50/50 dark:bg-neutral-850">
              <span className="text-neutral-500 font-medium">Restocking Fee</span>
              <span className="font-bold text-neutral-900 dark:text-white">20% of Product Price</span>
            </div>
            <div className="p-3 grid grid-cols-2 bg-white dark:bg-neutral-900">
              <span className="text-neutral-500 font-medium">Refund Processing Time</span>
              <span className="font-bold text-neutral-900 dark:text-white">7 Business Days</span>
            </div>
          </div>
        </div>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          1. Countries & Policy Scope
        </h3>
        <p>
          Thank you for shopping at <strong>SUNCITY PALLETS LIQUIDATION STORE LLC</strong>. We are committed to providing transparent policies for all orders shipped within the United States.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
          <li><strong>Defective Products:</strong> Items that arrived damaged during carrier transit, have manufacturing flaws, or were sent incorrectly.</li>
          <li><strong>Non-Defective Products:</strong> Customer remorse, buyer change of mind, or unwanted merchandise, provided the product meets our “New Only” condition requirements.</li>
          <li><strong>Exchanges:</strong> We accept exchanges within 30 days. If you wish to exchange an item for another model, pallet lot, or product of equal value, notify our customer support team.</li>
        </ul>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          2. Product Condition & 30-Day Window
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-xs mb-1">
              <Check className="w-4 h-4 text-emerald-600" />
              Accepted: New Only
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Merchandise that is unopened in original factory packaging, fully banded, and has never been used.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20">
            <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300 text-xs mb-1">
              <X className="w-4 h-4 text-rose-600" />
              Not Accepted: Opened / Used
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              We do not accept returns for unbanded, unpacked, or sorted lots after delivery acceptance.
            </p>
          </div>
        </div>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          3. Return Method, Restocking Fee & Refund Timeline
        </h3>
        <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 dark:text-neutral-400">
          <li><strong>Return Address:</strong> SUNCITY PALLETS LIQUIDATION STORE LLC, 328 Thomas Pl, Everman, TX 76140, USA.</li>
          <li><strong>Return Shipping:</strong> Customers are solely responsible for obtaining and paying for return freight transit. Original freight fees are non-refundable.</li>
          <li><strong>Restocking Fee:</strong> A standard 20% restocking fee is deducted from the refunded product amount.</li>
          <li><strong>Processing Time:</strong> Once returned cargo arrives at our Everman facility and passes intake inspection, refunds are credited within <strong>7 business days</strong>.</li>
        </ul>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          4. Transit Damage & Manifest Discrepancies
        </h3>
        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-xs space-y-2">
          <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Important Freight Rules
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">
            <strong>Transit Damage:</strong> Notify us within 7 days of delivery with clear photographs before unloading and note damage on the carrier&apos;s Delivery Receipt (POD / Bill of Lading).<br />
            <strong>Manifest Variance:</strong> Due to wholesale liquidation nature, a standard 15% variance in item count/value is customary in unpicked department lots. For discrepancies exceeding 15%, submit a detailed claim spreadsheet within 7 days.
          </p>
        </div>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          5. How to Initiate a Return or Exchange
        </h3>
        <p>
          Contact our Everman logistics office with your Order / Invoice Number:
        </p>
        <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-mono space-y-1">
          <div>Email: info@suncitypalletsliquidation.com</div>
          <div>WhatsApp / Phone: +1 (817) 330-9020</div>
          <div>Hours: Mon-Fri 8:00 AM – 5:00 PM CST</div>
        </div>
      </div>
    </PolicyLayout>
  );
}
