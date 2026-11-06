'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PalletCard from '@/components/PalletCard';
import { mockPallets, categoriesList, warehouseLocations } from '@/data/mockPallets';
import { Pallet } from '@/types';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Boxes, 
  Check, 
  ChevronDown 
} from 'lucide-react';

function PalletCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState<'discount' | 'price-asc' | 'price-desc' | 'pieces'>('discount');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialSearch) setSearch(initialSearch);
  }, [initialCategory, initialSearch]);

  const conditions = ['Brand New', 'Overstock', 'Customer Returns', 'Shelf Pulls'];

  const filteredPallets = useMemo(() => {
    return mockPallets.filter((pallet) => {
      if (search) {
        const query = search.toLowerCase();
        const matchesTitle = pallet.title.toLowerCase().includes(query);
        const matchesSku = pallet.sku.toLowerCase().includes(query);
        const matchesRetailer = pallet.sourceRetailer.toLowerCase().includes(query);
        const matchesCategory = pallet.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSku && !matchesRetailer && !matchesCategory) {
          return false;
        }
      }

      if (selectedCategory && pallet.category !== selectedCategory) {
        return false;
      }

      if (selectedCondition && pallet.condition !== selectedCondition) {
        return false;
      }

      if (selectedLocation && pallet.fobLocation !== selectedLocation) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'discount') {
        const discA = (a.msrp - a.price) / a.msrp;
        const discB = (b.msrp - b.price) / b.msrp;
        return discB - discA;
      }
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'pieces') return b.pieceCount - a.pieceCount;
      return 0;
    });
  }, [search, selectedCategory, selectedCondition, selectedLocation, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedCondition('');
    setSelectedLocation('');
    setSortBy('discount');
  };

  const hasActiveFilters = Boolean(search || selectedCategory || selectedCondition || selectedLocation);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Wholesale Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white mt-1">
            Available Liquidation Pallets
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Showing {filteredPallets.length} active lots with verified manifests and wholesale pricing.
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by keywords, SKU, brand, retailer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-500 hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-semibold text-neutral-800 dark:text-neutral-200 text-xs focus:outline-hidden"
              >
                <option value="discount">Highest % Discount</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="pieces">Piece Count (Largest)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 h-fit`}>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <span className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                Refine Selection
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold uppercase text-neutral-400 block mb-3">
                Category
              </label>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    selectedCategory === ''
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  All Categories
                </button>
                {categoriesList.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center justify-between ${
                      selectedCategory === cat.name
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-neutral-400">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <label className="text-xs font-bold uppercase text-neutral-400 block mb-3">
                Condition Grade
              </label>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedCondition('')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    selectedCondition === ''
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  All Conditions
                </button>
                {conditions.map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setSelectedCondition(cond)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      selectedCondition === cond
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* FOB Warehouse Location */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <label className="text-xs font-bold uppercase text-neutral-400 block mb-3">
                FOB Warehouse Hub
              </label>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedLocation('')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    selectedLocation === ''
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  All Locations
                </button>
                {warehouseLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      selectedLocation === loc
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pallets Grid */}
          <div className="lg:col-span-3">
            {filteredPallets.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <Boxes className="w-12 h-12 text-neutral-400 mx-auto mb-3 opacity-40" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  No Pallets Match Your Filters
                </h3>
                <p className="text-xs text-neutral-500 mt-1 mb-6">
                  Try adjusting your search criteria or resetting filters to see available lots.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPallets.map((pallet) => (
                  <PalletCard key={pallet.id} pallet={pallet} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PalletCatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-10 text-center">Loading pallets...</div>}>
      <PalletCatalogContent />
    </Suspense>
  );
}
