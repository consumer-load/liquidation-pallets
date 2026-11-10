'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useCustomerAuth } from '@/context/CustomerAuthContext';
import Link from 'next/link';
import { 
  Truck, 
  Building2, 
  Warehouse, 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  CreditCard, 
  Banknote 
} from 'lucide-react';
import { DeliveryType } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { login } = useCustomerAuth();
  const {
    cart,
    subtotal,
    deliveryType,
    setDeliveryType,
    freightCost,
    totalAmount,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    companyName: '',
    shippingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'wire_transfer' as 'wire_transfer' | 'credit_card' | 'ach',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError('Your pallet cart is empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderPayload = {
        orderNumber: `LP-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        companyName: formData.companyName,
        shippingAddress: formData.shippingAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        deliveryType,
        subtotal,
        freightCost,
        taxAmount: 0,
        totalAmount,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        items: cart.map((item) => ({
          palletId: item.pallet.id,
          title: item.pallet.title,
          condition: item.pallet.condition,
          fobLocation: item.pallet.fobLocation,
          price: item.pallet.price,
          quantity: item.quantity,
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process order.');
      }

      clearCart();
      // Automatically establish customer session so buyer portal is immediately accessible
      login(formData.customerEmail, formData.customerName, formData.companyName);
      
      const pinParam = data.customerPin ? `&pin=${encodeURIComponent(data.customerPin)}` : '';
      const emailParam = data.customerEmail ? `&email=${encodeURIComponent(data.customerEmail)}` : '';
      const trackingParam = data.trackingNumber ? `&tracking=${encodeURIComponent(data.trackingNumber)}` : '';
      
      router.push(`/order-success?orderNumber=${data.orderNumber}&storage=${data.storage}${emailParam}${pinParam}${trackingParam}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-16 flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-center shadow-lg">
          <Truck className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
            No Pallets in Cart
          </h2>
          <p className="text-xs text-neutral-500 mb-6">
            You must add at least one liquidation pallet before proceeding to checkout.
          </p>
          <Link
            href="/pallets"
            className="inline-block px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition"
          >
            Browse Available Lots
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/pallets" className="text-xs text-neutral-500 hover:text-blue-600 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
            Wholesale Freight Checkout
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Orders are logged and dispatched through our Cloudflare D1 distributed logistics system.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Buyer & Delivery details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Buyer Business Profile */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              <h2 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">1</span>
                Buyer & Business Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Contact Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Company / DBA (Optional)
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Reselling LLC"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Email Address (For Bill of Lading & Tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Phone Number (Carrier Delivery Dispatch) *
                  </label>
                  <input
                    type="tel"
                    required
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Delivery / Freight Address */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              <h2 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">2</span>
                Shipping Destination & Freight Handling
              </h2>

              {/* Delivery method chooser */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
                <button
                  type="button"
                  onClick={() => setDeliveryType('commercial_dock')}
                  className={`p-3 rounded-xl border text-left transition ${
                    deliveryType === 'commercial_dock'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold ring-2 ring-blue-600'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-blue-600 mb-1" />
                  <div className="font-bold">Commercial Dock</div>
                  <div className="text-[11px] text-neutral-500 mt-1">Forklift or loading dock ($220/plt)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('residential_liftgate')}
                  className={`p-3 rounded-xl border text-left transition ${
                    deliveryType === 'residential_liftgate'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold ring-2 ring-blue-600'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Truck className="w-5 h-5 text-purple-600 mb-1" />
                  <div className="font-bold">Liftgate Service</div>
                  <div className="text-[11px] text-neutral-500 mt-1">Ground curb lowering ($340/plt)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('warehouse_pickup')}
                  className={`p-3 rounded-xl border text-left transition ${
                    deliveryType === 'warehouse_pickup'
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-600'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Warehouse className="w-5 h-5 text-emerald-600 mb-1" />
                  <div className="font-bold">Hub Pickup</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">FREE ($0 shipping)</div>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    placeholder="1234 Industrial Parkway, Suite 100"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Dallas"
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="TX"
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      required
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="75201"
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Delivery Instructions / Notes for Freight Dispatcher
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Call 2 hours before arrival, dock height 48 inches..."
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              <h2 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">3</span>
                Wholesale Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <label className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  formData.paymentMethod === 'wire_transfer'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200 ring-2 ring-blue-600'
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wire_transfer"
                    checked={formData.paymentMethod === 'wire_transfer'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <Banknote className="w-5 h-5 text-blue-600 mb-2" />
                  <div>
                    <div className="font-bold">Bank Wire Transfer</div>
                    <div className="text-[10px] text-neutral-500 mt-1">Recommended for wholesale (0% fee)</div>
                  </div>
                </label>

                <label className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  formData.paymentMethod === 'credit_card'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200 ring-2 ring-blue-600'
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <CreditCard className="w-5 h-5 text-indigo-600 mb-2" />
                  <div>
                    <div className="font-bold">Credit / Debit Card</div>
                    <div className="text-[10px] text-neutral-500 mt-1">Instant processing</div>
                  </div>
                </label>

                <label className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  formData.paymentMethod === 'ach'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200 ring-2 ring-blue-600'
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ach"
                    checked={formData.paymentMethod === 'ach'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                  <div>
                    <div className="font-bold">ACH Corporate Transfer</div>
                    <div className="text-[10px] text-neutral-500 mt-1">Direct business check</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6 sticky top-28">
              <h2 className="font-bold text-base text-neutral-900 dark:text-white">
                Pallets In This Order ({cart.length})
              </h2>

              <div className="divide-y divide-neutral-100 dark:divide-neutral-800 max-h-72 overflow-y-auto pr-1">
                {cart.map(({ pallet, quantity }) => (
                  <div key={pallet.id} className="py-3 flex gap-3 text-xs">
                    <img
                      src={pallet.images[0]}
                      alt={pallet.title}
                      className="w-16 h-16 rounded-lg object-cover bg-neutral-100"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="font-bold text-neutral-900 dark:text-white line-clamp-1">
                          {pallet.title}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {pallet.sku} • {pallet.pieceCount} pcs • Qty: {quantity}
                        </div>
                      </div>
                      <div className="font-bold text-neutral-900 dark:text-white">
                        ${(pallet.price * quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary breakdown */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>Merchandise Subtotal</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Estimated LTL Freight</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">${freightCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Estimated Sales Tax</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">$0.00 (Exempt)</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 flex justify-between text-base font-black text-neutral-900 dark:text-white">
                  <span>Total Due</span>
                  <span className="text-blue-600 dark:text-blue-400">${totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition"
              >
                <Lock className="w-4 h-4" />
                {loading ? 'Submitting to Cloudflare D1...' : `Place Wholesale Order • $${totalAmount.toLocaleString()}`}
              </button>

              <div className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Encrypted & Stored in Cloudflare D1 Serverless Database
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
