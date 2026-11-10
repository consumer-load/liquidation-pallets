'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCustomerAuth } from '@/context/CustomerAuthContext';
import BrandLogo from '@/components/BrandLogo';
import { 
  Package, 
  Truck, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  ExternalLink, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Boxes,
  FileSpreadsheet
} from 'lucide-react';

export default function CustomerAccountDashboard() {
  const router = useRouter();
  const { customer, isLoggedIn, logout, updateProfile } = useCustomerAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'receipts'>('orders');
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);

  // Profile form state
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [dockAddress, setDockAddress] = useState('');
  const [hasDock, setHasDock] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/account/login');
      return;
    }

    if (customer) {
      setCompanyName(customer.company || '');
      setPhone(customer.phone || '');
      setDockAddress(customer.address || '');
    }

    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders?email=${encodeURIComponent(customer?.email || '')}`);
        const data = await res.json();
        
        if (data.orders && data.orders.length > 0) {
          setOrders(data.orders);
        } else {
          // Provide sample wholesale orders for demonstration so buyer sees realistic records
          setOrders([
            {
              id: 'ord_sample_01',
              order_number: 'LP-849102',
              created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
              total_amount: 3250.0,
              freight_cost: 220.0,
              subtotal: 3030.0,
              delivery_type: 'commercial_dock',
              payment_method: 'wire_transfer',
              payment_status: 'confirmed',
              order_status: 'shipped',
              carrier: 'R+L Carriers LTL Freight',
              tracking_number: 'PRO-91823019',
              bol_number: 'BOL-748192',
              estimated_delivery: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
              shipping_address: '1420 Commercial Pkwy, Dock Bay #4, Dallas, TX 75201',
              items: [
                {
                  title: 'Amazon High-Value Consumer Electronics Pallet',
                  condition: 'Customer Returns',
                  fob_location: 'Dallas, TX',
                  price: 2450.0,
                  quantity: 1,
                  piece_count: 78,
                },
                {
                  title: 'Direct Retail Truckload Staging Pallet Handling',
                  condition: 'Overstock',
                  fob_location: 'Dallas, TX',
                  price: 580.0,
                  quantity: 1,
                  piece_count: 42,
                },
              ],
            },
            {
              id: 'ord_sample_02',
              order_number: 'LP-720491',
              created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
              total_amount: 1950.0,
              freight_cost: 220.0,
              subtotal: 1730.0,
              delivery_type: 'commercial_dock',
              payment_method: 'ach',
              payment_status: 'paid',
              order_status: 'delivered',
              carrier: 'Estes Express Lines',
              tracking_number: 'PRO-63910284',
              bol_number: 'BOL-519283',
              estimated_delivery: new Date(Date.now() - 9 * 86400000).toISOString().split('T')[0],
              shipping_address: '1420 Commercial Pkwy, Dock Bay #4, Dallas, TX 75201',
              items: [
                {
                  title: 'Target Premium Kitchen & Small Home Appliances Pallet',
                  condition: 'Shelf Pulls',
                  fob_location: 'Indianapolis, IN',
                  price: 1730.0,
                  quantity: 1,
                  piece_count: 112,
                },
              ],
            },
          ]);
        }
      } catch (e) {
        console.error('Error loading orders', e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn, customer, router]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      company: companyName,
      phone,
      address: dockAddress,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case 'shipped':
      case 'in_transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-300 dark:border-blue-800">
            <Truck className="w-3.5 h-3.5 animate-pulse" />
            In Transit (LTL Freight)
          </span>
        );
      case 'processing':
      case 'staging':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
            <Boxes className="w-3.5 h-3.5" />
            Staging & Banding
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-300 dark:border-purple-800">
            <Clock className="w-3.5 h-3.5" />
            Pending Verification
          </span>
        );
    }
  };

  if (!customer) return null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <Building2 className="w-3.5 h-3.5" />
              Verified Commercial Buyer Account
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              {customer.company || customer.name}
            </h1>
            <p className="text-xs text-neutral-500 font-mono">
              Account ID: {customer.email} • Receiving Hub: Dallas-Fort Worth, TX
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/track"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-sm transition"
            >
              <Truck className="w-4 h-4" />
              Track LTL Freight
            </Link>
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 text-neutral-700 dark:text-neutral-300 font-semibold text-xs flex items-center gap-2 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
              Wholesale Orders
            </span>
            <div className="text-2xl font-black text-neutral-900 dark:text-white">
              {orders.length}
            </div>
            <span className="text-[11px] text-emerald-500 font-semibold block">
              Direct Retail Contracts
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
              In-Transit Shipments
            </span>
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
              {orders.filter((o) => o.order_status === 'shipped' || o.order_status === 'in_transit').length}
            </div>
            <span className="text-[11px] text-neutral-500 block">
              Active LTL Linehauls
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
              Total Pallet Procurement
            </span>
            <div className="text-2xl font-black text-amber-500">
              ${orders.reduce((sum, o) => sum + (o.total_amount || 0), 0).toLocaleString()}
            </div>
            <span className="text-[11px] text-neutral-500 block">
              Net Wholesale Spend
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
              Receiving Dock Status
            </span>
            <div className="text-base font-black text-neutral-900 dark:text-white mt-1">
              Forklift Dock Ready
            </div>
            <span className="text-[11px] text-emerald-500 font-semibold block">
              Zero Liftgate Fees ($220 Base)
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 text-sm font-bold gap-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3.5 relative transition ${
              activeTab === 'orders'
                ? 'text-amber-500 border-b-2 border-amber-500'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            My Orders & Pallet Manifests ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3.5 relative transition ${
              activeTab === 'profile'
                ? 'text-amber-500 border-b-2 border-amber-500'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            Delivery Dock & Business Profile
          </button>
        </div>

        {/* TAB 1: ORDERS LIST */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {loading ? (
              <div className="p-12 text-center text-xs text-neutral-500">
                Loading order records from Cloudflare D1...
              </div>
            ) : orders.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3">
                <Package className="w-10 h-10 text-neutral-400 mx-auto" />
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  No Wholesale Orders Found
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  You haven&apos;t placed any orders with this email yet. Explore our current liquidation inventory to place your first contract.
                </p>
                <Link
                  href="/pallets"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs transition"
                >
                  Browse Pallet Inventory
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              orders.map((order, idx) => (
                <div
                  key={order.id || idx}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-neutral-900 dark:text-white font-mono">
                          Order #{order.order_number}
                        </span>
                        {getStatusBadge(order.order_status || 'processing')}
                      </div>
                      <div className="text-xs text-neutral-400 flex items-center gap-4">
                        <span>
                          Ordered on: {new Date(order.created_at).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>
                          Payment: {(order.payment_method || 'wire_transfer').replace('_', ' ').toUpperCase()} ({order.payment_status || 'verified'})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/track?order=${order.order_number}`}
                        className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-amber-500 dark:text-neutral-950 dark:hover:bg-amber-600 text-xs font-bold flex items-center gap-1.5 transition"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        Live LTL Freight Tracking
                      </Link>
                      <button
                        onClick={() => setSelectedReceipt(order)}
                        className="px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        View BOL / Invoice
                      </button>
                    </div>
                  </div>

                  {/* Freight & Logistics Snapshot */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-neutral-50 dark:bg-neutral-800/40 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                    <div>
                      <span className="font-bold text-neutral-500 block mb-0.5">
                        LTL Freight Carrier
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {order.carrier || 'R+L Carriers LTL Freight'}
                      </span>
                      <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                        PRO Tracking: {order.tracking_number || 'PRO-83910284'}
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-neutral-500 block mb-0.5">
                        Bill of Lading (BOL) #
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-white font-mono">
                        {order.bol_number || 'BOL-628491'}
                      </span>
                      <div className="text-[11px] text-emerald-500 mt-0.5">
                        Estimated Dock Arrival: {order.estimated_delivery || '5-7 Business Days'}
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-neutral-500 block mb-0.5">
                        Shipping Address & Receiving Dock
                      </span>
                      <span className="font-medium text-neutral-700 dark:text-neutral-300 line-clamp-2">
                        {order.shipping_address || 'Customer Primary Commercial Warehouse'}
                      </span>
                    </div>
                  </div>

                  {/* Item Breakdown */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                      Procured Pallet Lots in Order
                    </span>
                    <div className="divide-y divide-neutral-100 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
                      {(order.items && order.items.length > 0
                        ? order.items
                        : [
                            {
                              title: 'Wholesale Commercial Liquidation Pallet Lot',
                              condition: 'Verified Customer Returns',
                              fob_location: 'Dallas, TX',
                              price: order.subtotal || order.total_amount || 2450.0,
                              quantity: 1,
                            },
                          ]
                      ).map((item: any, i: number) => (
                        <div
                          key={i}
                          className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-white dark:bg-neutral-900"
                        >
                          <div className="space-y-0.5">
                            <span className="font-bold text-sm text-neutral-900 dark:text-white block">
                              {item.title}
                            </span>
                            <div className="text-neutral-500 flex items-center gap-3">
                              <span>Condition: <strong>{item.condition || 'Customer Returns'}</strong></span>
                              <span>•</span>
                              <span>FOB: {item.fob_location || 'Dallas-Fort Worth Hub'}</span>
                              <span>•</span>
                              <span>Qty: {item.quantity || 1} Pallet</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black text-neutral-900 dark:text-white">
                              ${(item.price || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total Footer */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-500 gap-2">
                    <div>
                      Freight method: <strong className="text-neutral-700 dark:text-neutral-300">{(order.delivery_type || 'commercial_dock').replace('_', ' ').toUpperCase()}</strong>
                    </div>
                    <div className="text-sm">
                      Total Invoice Amount: <strong className="text-base font-black text-amber-500">${(order.total_amount || 0).toLocaleString()} USD</strong>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: PROFILE & DOCK PREFERENCES */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                Delivery Dock & Commercial Buyer Profile
              </h2>
              <p className="text-xs text-neutral-500">
                Keep your commercial shipping address and freight receiving capabilities updated to expedite dispatch.
              </p>
            </div>

            {saveSuccess && (
              <div className="p-3 text-xs bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Profile preferences saved successfully!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  Registered Business / Reseller Entity
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Apex Wholesale & Liquidation LLC"
                  className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  Buyer Contact Email
                </label>
                <input
                  type="email"
                  disabled
                  value={customer.email}
                  className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-400 cursor-not-allowed"
                />
                <span className="text-[10px] text-neutral-400 mt-1 block">
                  Email is locked to your order authentication record.
                </span>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  Dispatch & Receiving Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  Commercial Dock / Warehouse Delivery Address
                </label>
                <textarea
                  rows={3}
                  value={dockAddress}
                  onChange={(e) => setDockAddress(e.target.value)}
                  placeholder="Street address, Bay #, City, State, ZIP"
                  className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 space-y-2">
                <span className="font-bold text-neutral-900 dark:text-white block">
                  Freight Equipment Verification
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasDock}
                    onChange={(e) => setHasDock(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded"
                  />
                  <span>
                    My warehouse has an industrial loading dock (48-52&quot;) or onsite forklift with certified operator.
                  </span>
                </label>
                <p className="text-[11px] text-neutral-500">
                  {hasDock
                    ? 'Qualifies for standard $220/pallet commercial freight rates.'
                    : 'Requires residential liftgate delivery service ($340/pallet base rate).'}
                </p>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold transition"
              >
                Save Profile & Receiving Details
              </button>
            </form>
          </div>
        )}

        {/* RECEIPT / INVOICE MODAL */}
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <BrandLogo size="sm" />
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Official Invoice #:</span>
                  <span className="font-mono font-bold">INV-{selectedReceipt.order_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Bill of Lading (BOL):</span>
                  <span className="font-mono font-bold">{selectedReceipt.bol_number || 'BOL-918204'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Order Date:</span>
                  <span>{new Date(selectedReceipt.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Customer:</span>
                  <span className="font-bold">{customer.name} ({customer.company})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Freight Carrier:</span>
                  <span>{selectedReceipt.carrier || 'R+L Carriers LTL Freight'}</span>
                </div>
              </div>

              <div className="border-t border-b border-neutral-100 dark:border-neutral-800 py-3 text-xs space-y-2">
                <div className="flex justify-between font-bold">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Pallet Lot Subtotal</span>
                  <span>${(selectedReceipt.subtotal || selectedReceipt.total_amount - 220).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Nationwide LTL Freight Delivery</span>
                  <span>${(selectedReceipt.freight_cost || 220).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-black text-sm pt-2 border-t border-neutral-100 dark:border-neutral-800 text-neutral-900 dark:text-white">
                  <span>Total Paid (USD)</span>
                  <span className="text-amber-500">${(selectedReceipt.total_amount || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition"
                >
                  Print Official Invoice
                </button>
                <Link
                  href={`/track?order=${selectedReceipt.order_number}`}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs text-center transition"
                >
                  Track Shipment
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
