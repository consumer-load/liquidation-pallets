'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCustomerAuth } from '@/context/CustomerAuthContext';
import BrandLogo from '@/components/BrandLogo';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Truck, 
  UserCheck, 
  FileText 
} from 'lucide-react';

export default function CustomerLoginPage() {
  const router = useRouter();
  const { login, isLoggedIn, customer } = useCustomerAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, show quick redirect
  if (isLoggedIn && customer) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mx-auto flex items-center justify-center">
            <UserCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
            You Are Logged In
          </h2>
          <p className="text-xs text-neutral-500">
            Active session for <strong>{customer.email}</strong> ({customer.company || 'Commercial Account'}).
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => router.push('/account')}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              Go to Orders Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/track"
              className="w-full py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
            >
              Track LTL Freight Shipments
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your customer or business email.');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      login(email, email.split('@')[0], companyName || 'Commercial Reseller');
      setLoading(false);
      router.push('/account');
    }, 600);
  };

  const handleDemoLogin = () => {
    login('buyer@apexwholesale.com', 'Marcus Vance', 'Apex Liquidation & Bin Store LLC');
    router.push('/account');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-neutral-50/50 dark:bg-neutral-950">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block group">
            <BrandLogo size="lg" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white pt-2">
            Wholesale Buyer Portal
          </h1>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Log in to view your pallet manifests, Bill of Lading (BOL), invoices, and live LTL carrier freight tracking.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-neutral-900/5 space-y-6">
          {error && (
            <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                Business / Account Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                Company / Reseller Name (Optional)
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="e.g. Apex Resellers LLC"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Password / PIN
                </label>
                <span className="text-[10px] text-neutral-400">
                  (Or enter Order #)
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="password"
                  placeholder="•••••••• or order PIN"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition disabled:opacity-50"
            >
              {loading ? 'Accessing Account...' : 'Sign In To Buyer Portal'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="relative border-t border-neutral-100 dark:border-neutral-800 pt-5">
            <div className="text-center text-[10px] uppercase font-bold text-neutral-400 mb-3 tracking-widest">
              Instant Demonstration Access
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-2 transition border border-neutral-200 dark:border-neutral-700"
            >
              <UserCheck className="w-4 h-4 text-emerald-500" />
              1-Click Demo Buyer Login (Sample Orders & BOL)
            </button>
          </div>

          {/* Direct Tracking Shortcut */}
          <div className="text-center pt-2">
            <Link
              href="/track"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center justify-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              Have a PRO Tracking #? Track Freight Directly
            </Link>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>256-Bit Encrypted Wholesale B2B Procurement Portal</span>
        </div>
      </div>
    </div>
  );
}
