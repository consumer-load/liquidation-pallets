'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useCustomerAuth } from '@/context/CustomerAuthContext';
import BrandLogo from '@/components/BrandLogo';
import { 
  Package, 
  ShoppingCart, 
  Search, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  Truck, 
  ShieldCheck, 
  ClipboardList,
  User
} from 'lucide-react';

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { customer, isLoggedIn } = useCustomerAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/pallets?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      {/* Top Wholesale Trust Bar */}
      <div className="bg-neutral-950 text-neutral-300 text-xs py-1.5 px-4 hidden md:block border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <Truck className="w-3.5 h-3.5" /> Everman, TX Distribution Yard & Nationwide LTL
            </span>
            <span className="text-neutral-500">|</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> USPTO Reg. No. 0,806,021,894 (Class 35)
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <a href="https://wa.me/18173309020" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-400 hover:underline">
              <Phone className="w-3 h-3" /> WhatsApp: (817) 330-9020
            </a>
            <span className="text-neutral-500">|</span>
            <Link href="/admin/orders" className="hover:text-white flex items-center gap-1 transition text-blue-400">
              <ClipboardList className="w-3.5 h-3.5" /> D1 Database Orders
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <BrandLogo size="md" />
          </Link>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-md mx-6 relative"
          >
            <input
              type="text"
              placeholder="Search pallets by retailer, category, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          </form>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            <Link href="/pallets" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Browse Pallets
            </Link>
            <Link href="/quote" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Truckloads
            </Link>
            <Link href="/about-us" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              About Us
            </Link>
            <Link href="/faqs" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Contact
            </Link>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Track Shipment Link */}
            <Link
              href="/track"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-amber-500 transition"
            >
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Track Freight</span>
            </Link>

            {/* Buyer Account / Login Link */}
            {isLoggedIn && customer ? (
              <Link
                href="/account"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 font-bold text-xs hover:bg-amber-100 transition"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline truncate max-w-[100px]">{customer.name}</span>
                <span className="sm:hidden">Orders</span>
              </Link>
            ) : (
              <Link
                href="/account/login"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 text-white font-bold text-xs transition"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>Buyer Login</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-white transition flex items-center gap-2"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5 text-amber-500" />
              <span className="hidden sm:inline font-bold text-xs">Pallet Cart</span>
              {totalItems > 0 && (
                <span className="px-2 py-0.5 text-xs font-black bg-amber-500 text-neutral-950 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-600 dark:text-neutral-300 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 lg:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search pallets by category, retailer, SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-2 text-xs">
          {/* Quick Account Buttons in Mobile */}
          <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-neutral-100 dark:border-neutral-800">
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Truck className="w-4 h-4" />
              Track Freight
            </Link>
            <Link
              href={isLoggedIn ? "/account" : "/account/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-neutral-900 dark:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <User className="w-4 h-4 text-amber-400" />
              {isLoggedIn ? 'My Orders' : 'Buyer Login'}
            </Link>
          </div>

          <Link
            href="/pallets"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-neutral-900 dark:text-white"
          >
            Browse All Pallets
          </Link>
          <Link
            href="/quote"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-neutral-900 dark:text-white"
          >
            Truckload & Bulk Quotes
          </Link>
          <Link
            href="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-neutral-900 dark:text-white"
          >
            About Us
          </Link>
          <Link
            href="/faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-neutral-900 dark:text-white"
          >
            FAQs
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-neutral-900 dark:text-white"
          >
            Contact
          </Link>
          <Link
            href="/shipping-policy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-neutral-900 dark:text-white"
          >
            Shipping Policy
          </Link>
          <Link
            href="/refund-policy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-neutral-900 dark:text-white"
          >
            Refund Policy
          </Link>
          <Link
            href="/privacy-policy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-neutral-900 dark:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-use"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-neutral-900 dark:text-white"
          >
            Terms of Use
          </Link>
          <Link
            href="/admin/orders"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-blue-600 dark:text-blue-400"
          >
            Cloudflare D1 Orders Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
