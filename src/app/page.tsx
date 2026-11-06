import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import PalletCard from '@/components/PalletCard';
import { getPallets } from '@/sanity/client';
import { categoriesList } from '@/data/mockPallets';
import { 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  FileSpreadsheet, 
  HelpCircle, 
  Sparkles, 
  Building2, 
  Check, 
  Zap, 
  Award 
} from 'lucide-react';

export default async function HomePage() {
  const pallets = await getPallets();
  const featuredPallets = pallets.filter((p) => p.isFeatured).slice(0, 6);
  const hotDeals = pallets.filter((p) => p.isHotDeal).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Hero Section */}
      <Hero />

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Department Lots
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
              Shop Pallets By Category
            </h2>
          </div>
          <Link
            href="/pallets"
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            View all categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesList.map((cat) => (
            <Link
              key={cat.name}
              href={`/pallets?category=${encodeURIComponent(cat.name)}`}
              className="group p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[11px] text-neutral-400 mt-1">
                {cat.count}+ lots available
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Pallets Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" /> High Demand Wholesale Lots
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              Featured Liquidation Pallets
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Ready for immediate LTL freight dispatch or local dock pickup.
            </p>
          </div>
          <Link
            href="/pallets"
            className="px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-xs flex items-center gap-2 transition"
          >
            Explore Catalog ({pallets.length})
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPallets.map((pallet) => (
            <PalletCard key={pallet.id} pallet={pallet} />
          ))}
        </div>
      </section>

      {/* Truckload Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-950 to-neutral-950 text-white p-8 sm:p-12 border border-blue-800/40 shadow-2xl">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Truck className="w-3.5 h-3.5" /> Full Truckload (FTL) Discount Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Buying 12 to 24 Pallets? Get Dedicated Truckload Rates
            </h2>
            <p className="text-sm sm:text-base text-neutral-300">
              Contract directly for steady truckload streams straight from Amazon, Target, Home Depot, and Walmart fulfillment hubs. Save an additional 15% to 25% on freight and volume.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="px-6 py-3.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 font-bold text-sm shadow-lg transition"
              >
                Inquire For Truckloads
              </Link>
              <Link
                href="/shipping"
                className="px-6 py-3.5 rounded-xl bg-blue-800/60 hover:bg-blue-800 border border-blue-600/40 text-white font-semibold text-sm transition"
              >
                Learn Freight Requirements
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Condition Grade Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Transparency First
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
            Understanding Pallet Condition Grades
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            Every pallet on our platform is tagged with clear, honest grading so you can forecast your profit margins accurately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3">
              Brand New
            </span>
            <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
              Factory Sealed
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Items are 100% brand new in original retail or master cartons with factory seals intact. Pristine condition ready for any resale platform.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-3">
              Overstock
            </span>
            <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
              Excess Inventory
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              New merchandise that never made it to retail store shelves. Warehoused in distribution centers and liquidated for inventory turnover.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-3">
              Shelf Pulls
            </span>
            <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
              Rotated Store Stock
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Items pulled from physical department store shelves to make room for new season items. May show light packaging wear or discount stickers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3">
              Customer Returns
            </span>
            <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
              High Margin Lots
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Merchandise returned by online or in-store buyers. Ranges from open-box pristine to lightly handled. Sold at the highest discounts (up to 90% off).
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-neutral-100 dark:bg-neutral-900/60 border-y border-neutral-200 dark:border-neutral-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
              How Liquidation Buying Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-base flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Inspect Manifest
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Review piece counts, retail MSRP, ASINs, condition grades, and top brands using our live manifest table.
              </p>
            </div>

            <div className="relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-base flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Choose Delivery Type
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Select free self-pickup at our regional FOB hub, or choose commercial loading dock or residential liftgate delivery.
              </p>
            </div>

            <div className="relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-base flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Instant Checkout
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Pay securely via Bank Wire, ACH, or Business Credit Card. Order is logged directly into our Cloudflare D1 system.
              </p>
            </div>

            <div className="relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-base flex items-center justify-center">
                4
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Freight Dispatch
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Pallet is secured, stretch-banded, and dispatched via certified LTL freight carrier with live tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <details className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 group">
            <summary className="font-bold text-base text-neutral-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
              Do I need a reseller certificate or wholesale business license?
              <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs sm:text-sm text-neutral-500 mt-3 leading-relaxed">
              No state resale permit is strictly required to purchase individual pallets; anyone looking to source inventory for eBay, Amazon, Mercari, or flea markets can buy. If you are tax-exempt, you can provide your resale certificate to waive sales tax.
            </p>
          </details>

          <details className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 group">
            <summary className="font-bold text-base text-neutral-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
              How does freight shipping work for heavy pallets?
              <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs sm:text-sm text-neutral-500 mt-3 leading-relaxed">
              We arrange LTL (Less-Than-Truckload) freight shipping with major national carriers. If your facility has a loading dock or forklift, select Commercial Dock. If delivering to a home or shop without a dock, select Liftgate Home Delivery so the driver can lower the pallet to the curb.
            </p>
          </details>

          <details className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 group">
            <summary className="font-bold text-base text-neutral-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
              Can I pick up the pallets in person?
              <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs sm:text-sm text-neutral-500 mt-3 leading-relaxed">
              Yes! You can pick up for free ($0 shipping cost) at the designated FOB warehouse (Dallas, Atlanta, Indianapolis, Las Vegas, Philadelphia). Bring an open trailer, box truck, or pickup truck with tie-down straps.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
