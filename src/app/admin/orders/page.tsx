'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Database, RefreshCw, ShoppingCart, Truck, Calendar, MapPin, ArrowLeft } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Database className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Cloudflare D1 Database
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              Orders & Freight Dispatch Log
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Real-time records from Cloudflare D1 SQLite database (binding: DB).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold flex items-center gap-2 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh D1 Records
            </button>
            <Link
              href="/pallets"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
            >
              Storefront
            </Link>
          </div>
        </div>

        {/* Database Orders Table */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/40 text-xs text-neutral-500">
            <span>Total Orders: <strong className="text-neutral-900 dark:text-white">{orders.length}</strong></span>
            <span>Cloudflare D1 Binding: <code className="bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-[11px]">env.DB</code></span>
          </div>

          {loading ? (
            <div className="p-16 text-center text-xs text-neutral-500">
              Querying Cloudflare D1 database...
            </div>
          ) : orders.length === 0 ? (
            <div className="p-16 text-center text-neutral-500">
              <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="font-bold text-sm text-neutral-900 dark:text-white">No orders recorded yet</p>
              <p className="text-xs text-neutral-500 mt-1 mb-4">
                Test placing an order on checkout to see it appear here in the Cloudflare D1 database.
              </p>
              <Link
                href="/pallets"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Place Test Order
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider font-semibold bg-neutral-50 dark:bg-neutral-800/20">
                    <th className="p-3.5">Order #</th>
                    <th className="p-3.5">Customer & Company</th>
                    <th className="p-3.5">Destination</th>
                    <th className="p-3.5">Freight Delivery</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5 text-right">Total Amount</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {orders.map((o) => (
                    <tr key={o.id || o.order_number} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                      <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {o.order_number}
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-neutral-900 dark:text-white">{o.customer_name}</div>
                        <div className="text-[11px] text-neutral-400">{o.customer_email}</div>
                        {o.company_name && <div className="text-[10px] text-neutral-500">{o.company_name}</div>}
                      </td>
                      <td className="p-3.5 text-neutral-600 dark:text-neutral-400">
                        <div>{o.city}, {o.state} {o.zip_code}</div>
                        <div className="text-[11px] text-neutral-500 truncate max-w-xs">{o.shipping_address}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                          <Truck className="w-3 h-3" />
                          {String(o.delivery_type || '').replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="capitalize font-medium text-neutral-700 dark:text-neutral-300">
                          {String(o.payment_method || '').replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-black text-neutral-900 dark:text-white">
                        ${Number(o.total_amount).toLocaleString()}
                      </td>
                      <td className="p-3.5 text-neutral-500 text-[11px]">
                        {new Date(o.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
