import React from 'react';
import PolicyLayout from '@/components/PolicyLayout';
import { Truck, Clock, ShieldCheck, MapPin, PackageCheck } from 'lucide-react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | SUNCITY PALLETS LIQUIDATION STORE LLC',
  description: 'Freight, LTL shipping, and delivery timelines for wholesale liquidation pallets.',
  alternates: {
    canonical: 'https://liquidation-pallets.pages.dev/shipping-policy/',
  },
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout
      title="Shipping Policy"
      subtitle="Delivery timelines, freight carrier handling, and receiving guidelines for liquidation pallets."
    >
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <p>
          Shipping wholesale liquidation pallets is often not as straightforward as shipping regular small parcels. At <strong>SUNCITY PALLETS LIQUIDATION STORE LLC</strong>, we use a variety of commercial containment methods to package and dispatch our merchandise, including master cases, heavy-duty Gaylords, and industrial shrink-wrapped pallets.
        </p>

        <p>
          Our shipments typically move via Courier (UPS/FedEx Ground for carton lots), national Less-Than-Truckload (LTL) Freight Carriers, Dedicated Flatbeds, or 53-foot Full Dry Vans.
        </p>

        {/* Timelines Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white text-xs mb-1">
              <Truck className="w-4 h-4 text-blue-600" />
              Standard Freight Shipping
            </div>
            <p className="text-xs text-neutral-500">
              Orders shipped via Standard LTL Freight are typically delivered within <strong>5 to 7 business days</strong> from carrier dispatch.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white text-xs mb-1">
              <Clock className="w-4 h-4 text-purple-600" />
              Express / Expedited Freight
            </div>
            <p className="text-xs text-neutral-500">
              For time-sensitive commercial buyers, expedited team-driver freight delivers within <strong>1 to 3 business days</strong> from dispatch.
            </p>
          </div>
        </div>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          1. Order Processing & Staging Timeline
        </h3>
        <p>
          Once your payment is verified (via wire transfer, ACH, or credit card), our Everman staging yard processes, bands, and stretch-wraps your order within <strong>2 to 4 business days</strong>. Orders placed over weekends or national holidays begin staging on the following business day.
        </p>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          2. Tracking Numbers & Bill of Lading (BOL)
        </h3>
        <p>
          As soon as your pallets are loaded onto the carrier&apos;s truck at our docks, our logistics software generates an automated shipment confirmation email containing the <strong>Pro Tracking Number</strong>, the carrier name (e.g. R+L Carriers, Estes, SAIA, Old Dominion, TForce), and digital Bill of Lading.
        </p>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          3. Receiving Protocol: Dock vs. Liftgate
        </h3>
        <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 dark:text-neutral-400">
          <li><strong>Commercial Facility With Dock:</strong> The semi-trailer backs into your dock, and you unload using a pallet jack or forklift.</li>
          <li><strong>Residential / No Dock:</strong> The carrier brings a box truck or semi equipped with a hydraulic liftgate, lowering the pallet directly to the ground curbside. Drivers do not bring pallets inside homes or garages.</li>
        </ul>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          4. International Freight & Bulk Containers
        </h3>
        <p>
          While standard online checkout is configured for the 48 contiguous United States, we regularly ship 20ft and 40ft ocean export containers to international ports (Latin America, Caribbean, Africa, and Middle East). International buyers should contact our freight desk directly for customs export documentation and FOB port quotes.
        </p>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          5. Local Warehouse Self-Pickup (FREE)
        </h3>
        <p>
          Buyers can arrange free self-pickup at our primary distribution yard:
        </p>
        <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-mono">
          <strong>SUNCITY PALLETS LIQUIDATION STORE LLC</strong><br />
          328 Thomas Pl, Everman, TX 76140, USA<br />
          Loading Hours: Monday – Friday, 8:30 AM to 4:30 PM CST<br />
          Appointments required 24 hours in advance.
        </div>
      </div>
    </PolicyLayout>
  );
}
