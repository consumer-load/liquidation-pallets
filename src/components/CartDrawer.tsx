'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { 
  X, 
  Trash2, 
  Truck, 
  Building2, 
  Warehouse, 
  ArrowRight, 
  ShieldCheck, 
  PackageOpen 
} from 'lucide-react';
import { DeliveryType } from '@/types';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryType,
    setDeliveryType,
    freightCost,
    totalAmount,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/40">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <Truck className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-bold text-lg text-neutral-900 dark:text-white">Your Freight Order</h2>
                <p className="text-xs text-neutral-500">{totalItems} Pallet{totalItems === 1 ? '' : 's'} Selected</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3 text-neutral-400">
                  <PackageOpen className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-1">Your cart is empty</h3>
                <p className="text-xs text-neutral-500 mb-6 max-w-xs">
                  Explore our verified liquidation pallets and add high-margin merchandise to your order.
                </p>
                <Link
                  href="/pallets"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
                >
                  Browse Available Pallets
                </Link>
              </div>
            ) : (
              cart.map(({ pallet, quantity }) => (
                <div
                  key={pallet.id}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 flex gap-4"
                >
                  <img
                    src={pallet.images[0]}
                    alt={pallet.title}
                    className="w-20 h-20 rounded-lg object-cover bg-neutral-100"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-2">
                          {pallet.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(pallet.id)}
                          className="text-neutral-400 hover:text-rose-600 transition p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1">
                        FOB: {pallet.fobLocation} • {pallet.pieceCount} units
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-900">
                        <button
                          onClick={() => updateQuantity(pallet.id, quantity - 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-neutral-900 dark:text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(pallet.id, quantity + 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
                        ${(pallet.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout with Freight Options */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850 space-y-4">
              {/* Delivery method selector */}
              <div>
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider block mb-2">
                  Select Delivery / Freight Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('commercial_dock')}
                    className={`p-2 rounded-lg border text-left text-xs transition flex flex-col justify-between ${
                      deliveryType === 'commercial_dock'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold ring-1 ring-blue-600'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Building2 className="w-4 h-4 mb-1 text-blue-600" />
                    <div>Commercial Dock</div>
                    <div className="text-[10px] text-neutral-500">$220/plt</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('residential_liftgate')}
                    className={`p-2 rounded-lg border text-left text-xs transition flex flex-col justify-between ${
                      deliveryType === 'residential_liftgate'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold ring-1 ring-blue-600'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Truck className="w-4 h-4 mb-1 text-purple-600" />
                    <div>Liftgate Home</div>
                    <div className="text-[10px] text-neutral-500">$340/plt</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('warehouse_pickup')}
                    className={`p-2 rounded-lg border text-left text-xs transition flex flex-col justify-between ${
                      deliveryType === 'warehouse_pickup'
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-600'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Warehouse className="w-4 h-4 mb-1 text-emerald-600" />
                    <div>Self Pickup</div>
                    <div className="text-[10px] text-emerald-600 font-bold">FREE ($0)</div>
                  </button>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>Merchandise Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Est. Freight ({deliveryType.replace('_', ' ')})</span>
                  <span>${freightCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-700">
                  <span>Estimated Total</span>
                  <span className="text-blue-600 dark:text-blue-400">${totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition"
                >
                  Proceed to Secure Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Wholesale Wire, ACH & Card Protected
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
