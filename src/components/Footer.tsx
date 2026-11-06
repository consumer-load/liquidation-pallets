'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Mail, MapPin, Phone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      {/* Newsletter Bar */}
      <div className="border-b border-neutral-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <span className="text-xs uppercase font-bold text-blue-500 tracking-wider">
              Wholesale Deal Alerts
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Get Notified When New Truckloads & Pallets Drop
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Top-tier Amazon & Big Box liquidation lots sell out in hours. Subscribe for instant notifications.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md flex gap-2">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold bg-emerald-950/60 border border-emerald-800 px-4 py-2.5 rounded-xl w-full">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                Subscribed! You will receive new manifest drops.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your business email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 transition shrink-0"
                >
                  {loading ? 'Subscribing...' : 'Get Deals'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Links Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Package className="w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                LIQUIDATION<span className="text-blue-500">PALLETS</span>
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Your direct wholesale source for surplus inventory, customer returns, overstock, and closeout truckloads from America&apos;s leading e-commerce retailers and department stores.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Manifest Guaranteed • LTL Freight Arranged
            </div>
          </div>

          {/* Catalog Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/pallets?category=Consumer Electronics" className="hover:text-white transition">Consumer Electronics</Link></li>
              <li><Link href="/pallets?category=Power Tools & Hardware" className="hover:text-white transition">Power Tools & Hardware</Link></li>
              <li><Link href="/pallets?category=Home & Kitchen" className="hover:text-white transition">Home & Kitchen</Link></li>
              <li><Link href="/pallets?category=Apparel & Footwear" className="hover:text-white transition">Apparel & Footwear</Link></li>
              <li><Link href="/pallets?category=Toys & Hobbies" className="hover:text-white transition">Toys & Hobbies</Link></li>
              <li><Link href="/pallets?category=General Merchandise" className="hover:text-white transition">General Merchandise</Link></li>
            </ul>
          </div>

          {/* Warehouse FOB Locations */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              FOB Warehouses
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-400" /> Dallas, TX (Central Hub)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-400" /> Atlanta, GA (East Hub)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-400" /> Indianapolis, IN (Midwest)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-400" /> Las Vegas, NV (West Hub)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-400" /> Philadelphia, PA (Northeast)</li>
            </ul>
          </div>

          {/* Quick Support & Platform */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Buyer Resources
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/shipping" className="hover:text-white transition">Freight & LTL Guide</Link></li>
              <li><Link href="/quote" className="hover:text-white transition">Request Custom Quote</Link></li>
              <li><Link href="/admin/orders" className="hover:text-white transition text-blue-400 font-medium">Cloudflare D1 Orders</Link></li>
              <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#faq" className="hover:text-white transition">Wholesale FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Liquidation Pallets Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Powered by Next.js & Sanity CMS</span>
            <span>•</span>
            <span>Hosted on Cloudflare Pages (pages.dev)</span>
            <span>•</span>
            <span>Cloudflare D1 SQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
