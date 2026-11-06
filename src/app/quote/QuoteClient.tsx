'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Truck, CheckCircle2, ShieldCheck, ArrowRight, Building2, Calculator } from 'lucide-react';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    destinationZip: '',
    deliveryType: 'commercial_dock',
    palletCount: '12 Pallets (Half Truckload)',
    category: 'Consumer Electronics',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          destinationZip: formData.destinationZip,
          deliveryType: formData.deliveryType,
          notes: `Quantity: ${formData.palletCount} | Preferred: ${formData.category} | Notes: ${formData.notes}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit quote request.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 mb-3">
            <Truck className="w-3.5 h-3.5" />
            Direct Freight & Volume Brokerage
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
            Request a Bulk Truckload Quote
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Are you purchasing 6+ pallets or full 53-foot dry van truckloads (24 to 26 pallets)? Lock in contracted carrier rates and additional volume discounts.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 sm:p-10 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Quote Request Saved to Cloudflare D1!
              </h2>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Our logistics coordinators have logged your destination ({formData.destinationZip}) and will contact you within 2 business hours with a freight breakdown.
              </p>
              <div className="pt-4">
                <Link
                  href="/pallets"
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs inline-block"
                >
                  Return to Storefront
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Contact Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Apex Wholesale LLC"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Direct Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Destination Zip Code *
                  </label>
                  <input
                    type="text"
                    required
                    name="destinationZip"
                    value={formData.destinationZip}
                    onChange={handleChange}
                    placeholder="e.g. 75201"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Receiving Capability *
                  </label>
                  <select
                    name="deliveryType"
                    value={formData.deliveryType}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden"
                  >
                    <option value="commercial_dock">Commercial Facility With Loading Dock</option>
                    <option value="commercial_forklift">Commercial Facility With Forklift</option>
                    <option value="residential_liftgate">Residential / Liftgate Needed</option>
                    <option value="freight_terminal_pickup">Will Pickup At Local Freight Terminal</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Volume Requested *
                  </label>
                  <select
                    name="palletCount"
                    value={formData.palletCount}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden"
                  >
                    <option value="4 to 8 Pallets (LTL Lot)">4 to 8 Pallets (LTL Volume Lot)</option>
                    <option value="12 Pallets (Half Truckload)">12 Pallets (Half Truckload)</option>
                    <option value="24 to 26 Pallets (Full Truckload FTL)">24 to 26 Pallets (Full 53ft Truckload)</option>
                    <option value="Recurring Monthly Contract">Recurring Multi-Truckload Monthly Contract</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Category of Interest *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden"
                  >
                    <option value="Consumer Electronics">Amazon / Target Consumer Electronics</option>
                    <option value="Power Tools & Hardware">Home Depot Power Tools & Hardware</option>
                    <option value="Home & Kitchen">Target Small Appliances & Kitchen</option>
                    <option value="Apparel & Footwear">Department Store Designer Apparel & Footwear</option>
                    <option value="Toys & Hobbies">Walmart Master Case Toys & Collectibles</option>
                    <option value="General Merchandise">Costco Mixed High-Ticket General Merchandise</option>
                  </select>
                </div>
              </div>

              <div className="text-xs">
                <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Specific Requirements or Target Budget
                </label>
                <textarea
                  rows={3}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us if you need liftgate appointment, specific retail manifests, or recurring shipments..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition"
              >
                <Calculator className="w-4 h-4" />
                {loading ? 'Submitting to D1 Database...' : 'Submit Truckload & Freight Request'}
              </button>

              <div className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                No broker fees • Saved directly in Cloudflare D1
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
