'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pallet } from '@/types';
import { useCart } from '@/context/CartContext';
import ManifestModal from './ManifestModal';
import { 
  FileSpreadsheet, 
  MapPin, 
  Boxes, 
  Tag, 
  Percent, 
  Truck, 
  ShoppingCart, 
  Eye, 
  Check, 
  Sparkles 
} from 'lucide-react';

interface PalletCardProps {
  pallet: Pallet;
}

export default function PalletCard({ pallet }: PalletCardProps) {
  const { addToCart } = useCart();
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = Math.round(((pallet.msrp - pallet.price) / pallet.msrp) * 100);
  const costPerPiece = (pallet.price / (pallet.pieceCount || 1)).toFixed(2);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(pallet, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getConditionStyle = (condition: string) => {
    switch (condition) {
      case 'Brand New':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Overstock':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Customer Returns':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Shelf Pulls':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      default:
        return 'bg-neutral-500/10 text-neutral-600 border-neutral-500/20';
    }
  };

  return (
    <>
      <div className="group relative bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 hover:shadow-xl dark:hover:shadow-blue-950/20 transition-all duration-300 flex flex-col overflow-hidden">
        {/* Top Badges */}
        <div className="relative aspect-4/3 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            src={pallet.images?.[0] || 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80'}
            alt={pallet.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Discount Pill */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-md uppercase tracking-wider">
              <Percent className="w-3 h-3" />
              {discountPercent}% OFF MSRP
            </span>
            {pallet.isHotDeal && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-neutral-950 shadow-sm uppercase">
                <Sparkles className="w-3 h-3" /> Flash Liquidation
              </span>
            )}
          </div>

          {/* Retailer & Condition Tags */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-950/80 backdrop-blur-md text-white border border-neutral-700 shadow-md">
              {pallet.sourceRetailer}
            </span>
          </div>

          {/* Quick Hover Bar */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="flex items-center gap-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              FOB: {pallet.fobLocation}
            </span>
            <span className="font-mono">Weight: {pallet.weightLbs} lbs</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${getConditionStyle(pallet.condition)}`}>
                {pallet.condition}
              </span>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                {pallet.sku}
              </span>
            </div>

            <Link href={`/pallets/${pallet.slug}`}>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-3">
                {pallet.title}
              </h3>
            </Link>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-neutral-400" />
                <div>
                  <div className="text-neutral-400 text-[10px] uppercase font-medium">Pieces</div>
                  <div className="font-bold text-neutral-800 dark:text-neutral-200">{pallet.pieceCount} units</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-neutral-400" />
                <div>
                  <div className="text-neutral-400 text-[10px] uppercase font-medium">Unit Cost</div>
                  <div className="font-bold text-blue-600 dark:text-blue-400">${costPerPiece} / ea</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div>
            <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <span className="text-neutral-400 text-xs block">Pallet Wholesale Price</span>
                <span className="text-2xl font-black text-neutral-900 dark:text-white">
                  ${pallet.price.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-neutral-400 text-xs block">Est. Retail (MSRP)</span>
                <span className="text-sm font-semibold line-through text-neutral-400 dark:text-neutral-500">
                  ${pallet.msrp.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsManifestOpen(true)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" />
                Manifest ({pallet.manifestItems?.length || 0})
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold rounded-xl text-white transition shadow-sm ${
                  isAdded
                    ? 'bg-emerald-600 hover:bg-emerald-600'
                    : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5" /> Buy Pallet
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ManifestModal
        pallet={pallet}
        isOpen={isManifestOpen}
        onClose={() => setIsManifestOpen(false)}
      />
    </>
  );
}
