import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  FileCheck2, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Boxes 
} from 'lucide-react';

export const metadata = {
  title: 'About Us | SUNCITY PALLETS LIQUIDATION STORE LLC',
  description: 'Premier wholesale liquidator specializing in high-yield liquidation pallets, surplus inventory, and secondary retail merchandise.',
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Award className="w-4 h-4" />
            Serving Wholesale Liquidations Since 2008
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
            About Suncity Pallets Liquidation
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <strong>SUNCITY PALLETS LIQUIDATION STORE LLC</strong> is Everman, TX&apos;s premier wholesale liquidator, specializing in high-yield liquidation pallets, freight-ready surplus merchandise, and secondary retail store services.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-4xl font-black text-neutral-900 dark:text-white">2008</div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Established</div>
            <p className="text-xs text-neutral-500">
              Serving the wholesale liquidation industry and commercial surplus trade for over a decade.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-4xl font-black text-neutral-900 dark:text-white">Class 35</div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Registered Service Mark</div>
            <p className="text-xs text-neutral-500">
              USPTO federal registry for freight liquidation and secondary retail store services.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-4xl font-black text-neutral-900 dark:text-white">100%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Corporate Transparency</div>
            <p className="text-xs text-neutral-500">
              Official federal registry, verified manifests, and comprehensive legal compliance assured.
            </p>
          </div>
        </div>

        {/* Corporate Profile Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Who We Are & Corporate Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              Authentic Sourcing For Independent Resellers Nationwide
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Operating under our parent company, <strong>Vendovi, Inc.</strong> (a Washington Corporation), we have been serving the wholesale liquidation industry since 2008. We pride ourselves on brand authenticity, legal transparency, and providing consistent sourcing opportunities for retailers, bin stores, export brokers, and online marketplace sellers nationwide.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We contract direct volume allocations from America&apos;s largest department stores and e-commerce leaders (including Amazon, Target, The Home Depot, and Walmart), bypass broker markups, and deliver straight to your loading dock or door.
            </p>
          </div>
        </div>

        {/* Physical Facility & Distribution Yard */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Our Physical Staging Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
              Everman Distribution Center & Liquidation Yard
            </h2>
            <p className="text-xs text-neutral-500 mt-2">
              Explore our fully operational wholesale facility designed for high-volume cargo staging, sorting, and daily freight dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Main Office & Customer Storefront
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Our primary commercial storefront in Everman, TX, featuring secure customer loading zones, commercial scale access, and our physical liquidation outlet store.
              </p>
              <div className="pt-2 text-xs font-mono text-neutral-500 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                328 Thomas Pl, Everman, TX 76140, USA
              </div>
            </div>

            <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Freight Staging & Dispatch Yard
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Our expansive holding yard configured for incoming 53-foot dry van truckloads, organizing bulk pallet lots, banding shrink-wrap, and dispatching LTL logistics shipments nationwide.
              </p>
              <div className="pt-2 text-xs font-mono text-neutral-500 flex items-center gap-1.5">
                <Boxes className="w-4 h-4 text-blue-500" />
                Capacity: 500+ Pallets Staged Simultaneously
              </div>
            </div>
          </div>
        </div>

        {/* USPTO Trademark Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-950/30 to-neutral-900 border border-blue-500/30 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4" />
            Federal Trademark Protection
          </div>
          <h3 className="text-2xl font-black text-white">
            USPTO Service Mark Registration: Reg. No. 0,806,021,894 / RN # 6717534
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <strong>SUNCITY PALLETS LIQUIDATION</strong> is a federally registered service mark issued on the Principal Register of the United States Patent and Trademark Office (USPTO). The mark covers <strong>Class 35</strong>: Freight liquidation of goods of others, and retail store services featuring secondary products (overstock, box damaged, returns, shelf pulls, and short-dated merchandise). First used in commerce on September 15, 2008.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-6 space-y-4">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Ready to Inspect Our Live Pallet Inventory?
          </h3>
          <div className="flex justify-center gap-4">
            <Link
              href="/pallets"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
            >
              Browse Active Pallets
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold transition"
            >
              Contact Our Facility
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
