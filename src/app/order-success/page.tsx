import React, { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle2, Truck, FileText, ArrowRight, Database, Download } from 'lucide-react';

interface Props {
  searchParams: Promise<{ orderNumber?: string; storage?: string }>;
}

async function OrderSuccessContent({ searchParams }: Props) {
  const params = await searchParams;
  const orderNumber = params.orderNumber || 'LP-948210';
  const storage = params.storage || 'cloudflare_d1';

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

          {/* Order Details Card */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 max-w-md mx-auto text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500">Order Reference #:</span>
              <span className="font-mono font-bold text-neutral-900 dark:text-white">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Logistics Status:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">Pallet Staging & Banding</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">BOL & Tracking:</span>
              <span className="text-neutral-700 dark:text-neutral-300">Sent via email upon carrier pickup</span>
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
              href="/admin/orders"
              className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Database className="w-4 h-4" />
              View Orders in D1 Database
            </Link>
            <Link
              href="/pallets"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              Browse More Pallet Lots
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen p-10 text-center">Loading confirmation...</div>}>
      <OrderSuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
