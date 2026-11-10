'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Mail, MapPin, Phone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

export default function Footer() {
  const pathname = usePathname();
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

  if (pathname?.startsWith('/admin')) {
    return null;
  }

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
              Top-tier Amazon, Target & Big Box liquidation lots sell out in hours. Subscribe for instant notifications.
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
            <Link href="/" className="inline-block group">
              <BrandLogo theme="dark" size="md" />
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              amzpalletsliquidation.com is America&apos;s trusted wholesale liquidator specializing in verified high-yield Amazon returns, contractor tool lots, overstock truckloads, and secondary retail store merchandise.
            </p>
            <div className="space-y-1.5 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Primary Logistics Hub: Dallas-Fort Worth, TX, USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Support & WhatsApp: +1 (817) 330-9020</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>support@amzpalletsliquidation.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links (Exact as requested) */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition">Refund Policy</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-white transition">Terms of Use</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link href="/faqs" className="hover:text-white transition">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/about-us" className="hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          {/* Catalog Categories */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
              Wholesale Lots
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/pallets?category=Consumer Electronics" className="hover:text-white transition">Consumer Electronics</Link></li>
              <li><Link href="/pallets?category=Power Tools & Hardware" className="hover:text-white transition">Power Tools & Hardware</Link></li>
              <li><Link href="/pallets?category=Home & Kitchen" className="hover:text-white transition">Home & Kitchen</Link></li>
              <li><Link href="/pallets?category=Apparel & Footwear" className="hover:text-white transition">Apparel & Footwear</Link></li>
              <li><Link href="/pallets?category=Toys & Hobbies" className="hover:text-white transition">Toys & Hobbies</Link></li>
              <li><Link href="/pallets?category=General Merchandise" className="hover:text-white transition">General Merchandise</Link></li>
            </ul>
          </div>

          {/* Logistics & D1 Database */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
              Buyer Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/quote" className="hover:text-white transition">Request Truckload Quote</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition">Freight & LTL Guidelines</Link></li>
              <li><Link href="/admin/orders" className="hover:text-white transition text-blue-400 font-bold">Cloudflare D1 Orders</Link></li>
              <li><a href="https://wa.me/18173309020" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Instant WhatsApp Chat</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} amzpalletsliquidation.com. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-neutral-400">Privacy</Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-neutral-400">Refunds</Link>
            <span>•</span>
            <Link href="/terms-of-use" className="hover:text-neutral-400">Terms</Link>
            <span>•</span>
            <Link href="/shipping-policy" className="hover:text-neutral-400">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
