'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { mockPallets } from '@/data/mockPallets';
import { Pallet } from '@/types';
import { 
  Search, 
  X, 
  ArrowRight, 
  Package, 
  Tag, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  Clock 
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter matching pallets
  const filteredPallets = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return mockPallets.filter((pallet) => {
      return (
        pallet.title.toLowerCase().includes(q) ||
        pallet.sku.toLowerCase().includes(q) ||
        pallet.sourceRetailer.toLowerCase().includes(q) ||
        pallet.category.toLowerCase().includes(q) ||
        pallet.condition.toLowerCase().includes(q)
      );
    }).slice(0, 5);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/pallets?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative border-b border-neutral-200 dark:border-neutral-800 p-4">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-amber-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pallets by retailer, category, or SKU..."
              className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-bold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
            >
              ESC
            </button>
          </div>
        </form>

        {/* Search Content Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Real-time matched results */}
          {query.trim() && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 px-1">
                <span>Matching Pallet Lots ({filteredPallets.length})</span>
                <span className="text-[10px] text-neutral-400">Press Enter for all</span>
              </div>

              {filteredPallets.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500 space-y-2">
                  <Package className="w-8 h-8 mx-auto text-neutral-300 dark:text-neutral-700" />
                  <p>No exact pallets found for &ldquo;{query}&rdquo;.</p>
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
                  >
                    Search catalog anyway &rarr;
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80 rounded-xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden">
                  {filteredPallets.map((pallet) => (
                    <Link
                      key={pallet.id}
                      href={`/pallets/${pallet.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {pallet.images?.[0] ? (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                            <Image
                              src={pallet.images[0]}
                              alt={pallet.title}
                              fill
                              sizes="48px"
                              className="object-cover group-hover:scale-105 transition"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                            <Package className="w-5 h-5 text-amber-500" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate group-hover:text-amber-500 transition">
                            {pallet.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                              {pallet.sourceRetailer}
                            </span>
                            <span>•</span>
                            <span className="px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px]">
                              {pallet.condition}
                            </span>
                            <span>•</span>
                            <span>FOB {pallet.fobLocation}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white">
                          ${pallet.price.toLocaleString()}
                        </div>
                        {pallet.msrp && (
                          <div className="text-[10px] text-neutral-400 line-through">
                            MSRP ${pallet.msrp.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Suggestions & Popular Categories */}
          <div className="space-y-3 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block px-1">
              Popular Liquidation Categories
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'Amazon Electronics',
                'Target Kitchen',
                'Home Depot Power Tools',
                'Costco General Merchandise',
                'Customer Returns',
                'Overstock New'
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3 text-amber-500" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-neutral-50 dark:bg-neutral-800/50 p-3 sm:px-5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-3">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 font-mono">↵ to search</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 font-mono">esc to close</kbd>
          </div>
          <button
            type="button"
            onClick={handleSearchSubmit}
            className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            Full Catalog View
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
