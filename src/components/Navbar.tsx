'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useCustomerAuth } from '@/context/CustomerAuthContext';
import BrandLogo from '@/components/BrandLogo';
import SearchModal from '@/components/SearchModal';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Global Ctrl+K / Cmd+K search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full max-w-full overflow-x-clip bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        {/* Top Wholesale Trust Bar */}
        <div className="bg-neutral-950 text-neutral-300 text-xs py-1.5 px-4 hidden md:block border-b border-neutral-800 overflow-x-clip">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 truncate">
              <span className="flex items-center gap-1.5 text-blue-400 font-semibold truncate">
                <Truck className="w-3.5 h-3.5 shrink-0" /> Everman, TX Distribution Yard & Nationwide LTL
              </span>
              <span className="text-neutral-600 hidden xl:inline">|</span>
              <span className="hidden xl:flex items-center gap-1.5 text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> USPTO Reg. No. 0,806,021,894
              </span>
            </div>
            <div className="flex items-center gap-4 text-neutral-400 shrink-0">
              <a href="https://wa.me/18173309020" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-400 hover:underline">
                <Phone className="w-3 h-3 shrink-0" /> WhatsApp: (817) 330-9020
              </a>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <Link href="/admin/orders" className="hover:text-white hidden sm:flex items-center gap-1 transition text-blue-400">
                <ClipboardList className="w-3.5 h-3.5 shrink-0" /> D1 Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group">
              <BrandLogo size="md" />
            </Link>

            {/* Responsive Search Trigger Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-800 dark:hover:bg-neutral-700/90 border border-neutral-200/80 dark:border-neutral-700/80 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition shrink-0 cursor-pointer shadow-2xs group"
              aria-label="Search Pallets"
            >
              <Search className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs font-semibold whitespace-nowrap">Search Pallets...</span>
              <kbd className="hidden 2xl:inline-flex items-center text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-400">
                Ctrl K
              </kbd>
            </button>

            {/* Navigation Links (Visible on xl screens to prevent header crowding/overflow) */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-xs 2xl:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              <Link href="/pallets" className="hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap">
                Browse Pallets
              </Link>
              <Link href="/quote" className="hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap">
                Truckloads
              </Link>
              <Link href="/about-us" className="hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap">
                About Us
              </Link>
              <Link href="/faqs" className="hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap">
                FAQs
              </Link>
              <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap">
                Contact
              </Link>
            </nav>

            {/* Right Action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Track Shipment Link */}
              <Link
                href="/track"
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-amber-500 transition whitespace-nowrap"
              >
                <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Track Freight</span>
              </Link>

              {/* Buyer Account / Login Link */}
              {isLoggedIn && customer ? (
                <Link
                  href="/account"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 font-bold text-xs hover:bg-amber-100 transition whitespace-nowrap shrink-0"
                >
                  <User className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline truncate max-w-[85px] 2xl:max-w-[120px]">{customer.name}</span>
                  <span className="sm:hidden">Orders</span>
                </Link>
              ) : (
                <Link
                  href="/account/login"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 text-white font-bold text-xs transition whitespace-nowrap shrink-0"
                >
                  <User className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Buyer Login</span>
                </Link>
              )}

              {/* Pallet Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-white transition flex items-center gap-2 shrink-0 cursor-pointer"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="hidden lg:inline font-bold text-xs whitespace-nowrap">Pallet Cart</span>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 text-xs font-black bg-amber-500 text-neutral-950 rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Hamburger Button (Shown on screens < xl to access menu without overflow) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-neutral-600 dark:text-neutral-300 rounded-lg shrink-0"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Quick Search Bar */}
          <div className="pb-3 sm:hidden">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-400 text-left transition"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">Search pallets, retailers, SKU...</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded px-1.5 py-0.5 shrink-0">
                Search
              </span>
            </button>
          </div>
        </div>

        {/* Responsive Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-2 text-xs">
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
              className="block py-2 font-semibold text-neutral-600 dark:text-neutral-400"
            >
              About Our Direct Liquidations
            </Link>
            <Link
              href="/faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-semibold text-neutral-600 dark:text-neutral-400"
            >
              Buyer FAQs & Receiving Rules
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-semibold text-neutral-600 dark:text-neutral-400"
            >
              Contact Logistics Dispatch
            </Link>
          </div>
        )}
      </header>

      {/* Global Interactive Search Command Palette Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
