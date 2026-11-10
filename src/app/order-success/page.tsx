'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, 
  Truck, 
  FileText, 
  ArrowRight, 
  Database, 
  Key, 
  Mail, 
  UserCheck, 
  ExternalLink 
} from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'LP-948210';
  const storage = searchParams.get('storage') || 'cloudflare_d1';
  const email = searchParams.get('email') || '';
  const pin = searchParams.get('pin') || '';
  const tracking = searchParams.get('tracking') || '';

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 sm:p-12 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 mb-3">
              <Database className="w-3.5 h-3.5" />
              Recorded in Cloudflare D1 Database ({storage})
            </div>
            <h1 className="text-3xl font-black text-neutral-900 dark:text-white">
              Order Received Successfully!
            </h1>
            <p className="text-sm text-neutral-500 mt-2">
              Your wholesale liquidation order has been booked into our warehouse fulfillment system.
            </p>
          </div>

          {/* Credentials Sent Box */}
          {email && (
            <div className="p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-left space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-amber-950 dark:text-amber-200 flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-600" />
                  Wholesale Buyer Portal Access Created
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                  Credentials Sent to Email
                </span>
              </div>
              <p className="text-xs text-amber-900 dark:text-amber-300">
                Login instructions, manifest files, and tracking updates have been dispatched to <strong className="font-mono text-neutral-900 dark:text-white">{email}</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-amber-200 dark:border-amber-900/50">
                  <span className="text-neutral-500 block text-[11px]">Registered Email:</span>
                  <strong className="font-mono text-neutral-900 dark:text-white break-all">{email}</strong>
                </div>
                {pin && (
                  <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-amber-200 dark:border-amber-900/50">
                    <span className="text-neutral-500 block text-[11px]">Buyer Access PIN:</span>
                    <strong className="font-mono text-amber-600 dark:text-amber-400 text-sm tracking-wider">{pin}</strong>
                  </div>
                )}
              </div>
              <div className="pt-2 flex flex-wrap gap-2">
                <Link
                  href="/account"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs transition"
                >
                  <UserCheck className="w-4 h-4" />
                  Open Buyer Account & Manifests
                </Link>
                {tracking && (
                  <Link
                    href={`/track?order=${orderNumber}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-800 text-white font-bold text-xs hover:bg-neutral-800 dark:hover:bg-neutral-700 transition"
                  >
                    <Truck className="w-4 h-4 text-amber-400" />
                    Live Carrier Tracking ({tracking})
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Order Details Card */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 max-w-md mx-auto text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500">Order Reference #:</span>
              <span className="font-mono font-bold text-neutral-900 dark:text-white">{orderNumber}</span>
            </div>
            {tracking && (
              <div className="flex justify-between">
                <span className="text-neutral-500">Carrier PRO Tracking:</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{tracking}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-neutral-500">Logistics Status:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Pallet Staging & Banding</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">BOL & Manifest:</span>
              <span className="text-neutral-700 dark:text-neutral-300">Generated & available in portal</span>
            </div>
          </div>

          {/* Wire Transfer / Payment Info */}
          <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-left space-y-3">
            <h3 className="font-bold text-sm text-blue-950 dark:text-blue-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Wholesale Wire Transfer Payment Instructions
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              If you selected Bank Wire Transfer or ACH, please initiate the payment with your financial institution using reference: <strong className="font-mono text-neutral-900 dark:text-white">{orderNumber}</strong>. Our logistics team will release your pallet to the freight carrier as soon as funds clear.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link
              href="/account"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
            >
              <UserCheck className="w-4 h-4" />
              Go to Buyer Portal / Account
            </Link>
            <Link
              href={`/track?order=${orderNumber}`}
              className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Truck className="w-4 h-4" />
              Track Freight Shipment
            </Link>
            <Link
              href="/pallets"
              className="px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              Browse Pallets
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-10 text-center text-xs">Loading order confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
