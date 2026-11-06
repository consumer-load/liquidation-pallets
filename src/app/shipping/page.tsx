import React from 'react';
import Link from 'next/link';
import { Truck, Building2, Warehouse, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ShippingGuidePage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Logistics & Freight Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white mt-1">
            Pallet Freight & Delivery Guidelines
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Everything you need to know about receiving wholesale pallets, LTL semi-trucks, liftgate requirements, and warehouse pickups.
          </p>
        </div>

        <div className="space-y-8">
          {/* Section 1: Delivery Types */}
          <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-6">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              1. Understanding Freight Delivery Options
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 space-y-2">
                <span className="font-bold text-sm text-neutral-900 dark:text-white block">
                  Commercial Loading Dock
                </span>
                <p className="text-neutral-500 leading-relaxed">
                  For zoned commercial warehouses with a 48-52&quot; semi-truck dock or onsite forklift with licensed operator. The fastest and most economical freight option ($220/pallet base).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 space-y-2">
                <span className="font-bold text-sm text-neutral-900 dark:text-white block">
                  Residential Liftgate Delivery
                </span>
                <p className="text-neutral-500 leading-relaxed">
                  Required if delivering to a residence, farm, or storage unit without a forklift. Carrier uses a hydraulic liftgate to lower pallets to ground level at curbside ($340/pallet base).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 space-y-2">
                <span className="font-bold text-sm text-neutral-900 dark:text-white block">
                  Warehouse Self Pickup
                </span>
                <p className="text-neutral-500 leading-relaxed">
                  100% FREE ($0 shipping cost). Drive to our designated FOB hub (Dallas, Atlanta, Indianapolis, Las Vegas, Philadelphia) with a truck or trailer to load pallets.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Carrier Arrival & Inspection */}
          <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-4 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              2. Inspecting Your Pallet Upon Arrival (Bill of Lading)
            </h2>
            <p>
              When the freight carrier arrives, inspect the shrink-wrap, banding, and pallet structure before signing the Bill of Lading (BOL):
            </p>
            <ul className="space-y-2 pl-4 list-disc text-neutral-700 dark:text-neutral-300">
              <li><strong>Check the shrink wrap:</strong> Ensure the black/clear tamper-evident stretch wrap is intact and hasn&apos;t been cut open during transit.</li>
              <li><strong>Note any damage on BOL:</strong> If any boxes are crushed or bands are severed, write &quot;DAMAGED UPON ARRIVAL&quot; on the driver&apos;s delivery slip before signing.</li>
              <li><strong>Take photos:</strong> Photograph the pallet while it is still on the truck or tail lift before unbanding.</li>
            </ul>
          </div>

          {/* Section 3: Self-Pickup Rules */}
          <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-4 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Warehouse className="w-5 h-5 text-emerald-500" />
              3. Self-Pickup Equipment Requirements
            </h2>
            <p>
              If choosing FOB Warehouse Self Pickup:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-800 dark:text-neutral-200">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Pickup Truck (Standard 6.5ft bed fits 1 pallet)
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Utility Flatbed Trailer or Box Truck
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Heavy-Duty Ratchet Straps (Required by DOT)
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Valid Photo ID matching Order Customer Name
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/pallets"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg transition"
            >
              Browse Ready-To-Ship Pallets
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
