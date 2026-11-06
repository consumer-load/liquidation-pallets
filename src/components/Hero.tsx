'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShieldCheck, 
  Percent, 
  Truck, 
  Boxes, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-neutral-950 text-white py-16 lg:py-24 border-b border-neutral-800">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-600/20 to-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Retailer Liquidation Contracts (Q4 Drops Live)
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Wholesale <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Liquidation Pallets</span> & Truckloads
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Purchase unpicked overstock, verified customer returns, and shelf pulls direct from major retail giants at <strong className="text-white font-bold">75% to 90% below retail MSRP</strong>. Fully itemized manifests with nationwide freight delivery.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/pallets"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition"
              >
                Explore Live Pallet Lots
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/quote"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold text-sm flex items-center justify-center gap-2 transition"
              >
                <Truck className="w-4 h-4 text-blue-400" />
                Request Truckload Quote
              </Link>
            </div>

            {/* Quick check points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Downloadable Manifests
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Zero Buyer Premiums
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Dock or Liftgate Freight
              </span>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-blue-500/30 via-neutral-800 to-neutral-900 shadow-2xl">
              <div className="rounded-[14px] bg-neutral-900 p-6 space-y-5 border border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                      Live Warehouse Lot #8821
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    82% OFF MSRP
                  </span>
                </div>

                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-neutral-800">
                  <img
                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80"
                    alt="Sample Pallet"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-mono text-white">
                    FOB: Dallas, TX Hub
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-white">
                    Amazon High-Margin Consumer Electronics & Audio
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    54 Manifested Pieces • Sony, JBL, Beats, Logitech
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                  <div>
                    <span className="text-neutral-500 block">Original MSRP</span>
                    <span className="font-bold text-neutral-400 line-through text-sm">$6,840</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 block">Pallet Wholesale</span>
                    <span className="font-black text-xl text-blue-400">$1,195</span>
                  </div>
                </div>

                <Link
                  href="/pallets/amazon-high-value-consumer-electronics-pallet"
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  Inspect Manifest & Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-14 pt-10 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-white">$14M+</div>
            <div className="text-xs text-neutral-400 mt-1 font-medium">MSRP Value Liquidated</div>
          </div>
          <div>
            <div className="text-3xl font-black text-blue-400">80% - 90%</div>
            <div className="text-xs text-neutral-400 mt-1 font-medium">Average Savings Below MSRP</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">6,200+</div>
            <div className="text-xs text-neutral-400 mt-1 font-medium">Pallets Dispatched</div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400">5 FOB Hubs</div>
            <div className="text-xs text-neutral-400 mt-1 font-medium">Nationwide Warehouses</div>
          </div>
        </div>
      </div>
    </div>
  );
}
