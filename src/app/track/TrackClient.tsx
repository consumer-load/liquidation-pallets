'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { 
  Search, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  FileText, 
  Boxes, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function TrackClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('order') || searchParams.get('query') || '';

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [error, setError] = useState('');

  const fetchTracking = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/track?query=${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();

      if (data.found && data.order) {
        setTrackingData(data);
      } else {
        setError(data.error || 'No shipment found for this reference. Please verify your Order # or PRO tracking number.');
      }
    } catch (e: any) {
      setError(e.message || 'Tracking system error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      fetchTracking(initialQuery);
    } else {
      // Load sample tracking by default so user sees live visual tracker right away
      fetchTracking('LP-849102');
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(query);
  };

  const stages = [
    {
      id: 1,
      title: 'Payment & Contract Cleared',
      desc: 'Wire transfer or corporate card verified. Allocation locked.',
      date: 'Day 1 • 09:30 AM',
      completed: true,
      current: false,
    },
    {
      id: 2,
      title: 'Warehouse Staging & Banding',
      desc: 'Stretch-wrapped & steel-banded to industrial Gaylords at Dallas Hub.',
      date: 'Day 2 • 02:15 PM',
      completed: true,
      current: false,
    },
    {
      id: 3,
      title: 'Carrier Dispatch & BOL Issued',
      desc: 'Transferred to LTL semi-trailer. Official Bill of Lading generated.',
      date: 'Day 3 • 11:45 AM',
      completed: true,
      current: false,
    },
    {
      id: 4,
      title: 'In Transit (Interstate Highway Linehaul)',
      desc: 'Moving via Class 8 linehaul tractor-trailer toward regional terminal.',
      date: 'In Transit • Active',
      completed: false,
      current: true,
    },
    {
      id: 5,
      title: 'Scheduled Dock Drop / Liftgate Arrival',
      desc: 'Dispatcher will place 24-hr call ahead to confirm dock or forklift.',
      date: 'Estimated in 2 Days',
      completed: false,
      current: false,
    },
    {
      id: 6,
      title: 'Delivered & Receiving Signed',
      desc: 'Receiver inspects shrink wrap seal & signs Bill of Lading.',
      date: 'Pending Delivery',
      completed: false,
      current: false,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Truck className="w-4 h-4" />
            Nationwide LTL Commercial Freight Logistics
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            Track Pallet & Truckload Freight
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Enter your Order # (e.g., <strong>LP-849102</strong>), Carrier PRO Tracking Number, or Bill of Lading (BOL) to inspect real-time linehaul status.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-2 bg-white dark:bg-neutral-900 p-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-md"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Enter Order # (e.g. LP-849102) or PRO-..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-transparent border-0 focus:outline-hidden text-neutral-900 dark:text-white font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50"
            >
              {loading ? 'Locating Freight...' : 'Track Shipment'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick preset links */}
          <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-neutral-400">
            <span>Quick Samples:</span>
            <button
              onClick={() => {
                setQuery('LP-849102');
                fetchTracking('LP-849102');
              }}
              className="text-amber-500 hover:underline font-mono"
            >
              LP-849102
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setQuery('LP-720491');
                fetchTracking('LP-720491');
              }}
              className="text-amber-500 hover:underline font-mono"
            >
              LP-720491
            </button>
          </div>
        </div>

        {error && (
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tracking Details Container */}
        {trackingData && trackingData.order && (
          <div className="space-y-8">
            {/* Top Status Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-mono">
                      {trackingData.order.order_number}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-300 dark:border-blue-800">
                      <Truck className="w-3.5 h-3.5 animate-pulse" />
                      In Transit • On Schedule
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Carrier: <strong>{trackingData.order.carrier || 'R+L Carriers LTL Freight'}</strong> • Linehaul Dispatch
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Estimated Dock Arrival
                  </span>
                  <div className="text-lg font-black text-amber-500">
                    {trackingData.order.estimated_delivery || '5-7 Business Days'}
                  </div>
                  <span className="text-[11px] text-emerald-500 font-semibold block">
                    Driver Call-Ahead: Active (24 Hr Prior)
                  </span>
                </div>
              </div>

              {/* Carrier Specification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                    PRO Tracking #
                  </span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white text-sm">
                    {trackingData.order.tracking_number || 'PRO-83910284'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                    Bill of Lading (BOL)
                  </span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white text-sm">
                    {trackingData.order.bol_number || 'BOL-918204'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                    Origin Terminal
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-white block">
                    Dallas-Fort Worth, TX
                  </span>
                  <span className="text-[10px] text-neutral-400 block">Hub Yard #4</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                    Delivery Protocol
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-white block">
                    {(trackingData.order.delivery_type || 'commercial_dock').replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-[10px] text-emerald-500 block">Forklift / Loading Dock</span>
                </div>
              </div>

              {/* Progress Milestones Stepper */}
              <div className="space-y-4 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                  Freight Transit Progress
                </span>

                <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 pl-6 space-y-8">
                  {stages.map((stage) => (
                    <div key={stage.id} className="relative">
                      {/* Node Bullet */}
                      <div
                        className={`absolute -left-[33px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          stage.completed
                            ? 'bg-emerald-500 text-white'
                            : stage.current
                            ? 'bg-amber-500 text-neutral-950 ring-4 ring-amber-500/20 animate-pulse'
                            : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {stage.completed ? '✓' : stage.id}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span
                            className={`text-sm font-bold ${
                              stage.current
                                ? 'text-amber-500'
                                : stage.completed
                                ? 'text-neutral-900 dark:text-white'
                                : 'text-neutral-400'
                            }`}
                          >
                            {stage.title}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400">
                            {stage.date}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 max-w-xl">
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Manifest Cargo Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Boxes className="w-5 h-5 text-amber-500" />
                  Cargo Pallet Manifest on This Shipment
                </h3>
                <span className="text-xs text-neutral-400 font-mono">
                  Destination: {trackingData.order.city}, {trackingData.order.state}
                </span>
              </div>

              <div className="divide-y divide-neutral-100 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden text-xs">
                {(trackingData.items && trackingData.items.length > 0
                  ? trackingData.items
                  : [
                      {
                        title: 'Amazon High-Value Consumer Electronics Pallet Lot',
                        condition: 'Customer Returns',
                        fob_location: 'Dallas, TX',
                        price: 2450.0,
                        quantity: 1,
                      },
                    ]
                ).map((item: any, i: number) => (
                  <div
                    key={i}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white dark:bg-neutral-900"
                  >
                    <div>
                      <span className="font-bold text-sm text-neutral-900 dark:text-white block">
                        {item.title}
                      </span>
                      <div className="text-neutral-500 flex items-center gap-2 text-[11px] mt-0.5">
                        <span>Condition: <strong>{item.condition}</strong></span>
                        <span>•</span>
                        <span>FOB: {item.fob_location}</span>
                        <span>•</span>
                        <span>Qty: {item.quantity || 1} Pallet</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-sm text-neutral-900 dark:text-white">
                        ${(item.price || 0).toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
                <p className="leading-relaxed">
                  <strong>Receiving Protocol Reminder:</strong> Please verify the number of pallets and inspect all industrial shrink-wrap banding before signing the carrier delivery receipt. In case of any visible freight handling damage, mark the Bill of Lading (BOL) as &quot;Received Damaged&quot; with the delivery driver.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Support & Dispatch Desk */}
        <div className="text-center space-y-2 pt-4">
          <p className="text-xs text-neutral-500">
            Need urgent assistance or have questions regarding trailer scheduling?
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-amber-600 dark:text-amber-400">
            <a href="https://wa.me/18173309020" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              WhatsApp Freight Dispatch: +1 (817) 330-9020
            </a>
            <span>•</span>
            <Link href="/contact" className="hover:underline">
              Contact Logistics Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
