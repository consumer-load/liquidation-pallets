'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pallet } from '@/types';
import { useCart } from '@/context/CartContext';
import { 
  FileSpreadsheet, 
  MapPin, 
  Boxes, 
  Tag, 
  Truck, 
  ShoppingCart, 
  ShieldCheck, 
  ArrowLeft, 
  Percent, 
  Download, 
  CheckCircle2, 
  Building2, 
  Warehouse, 
  Share2, 
  Search 
} from 'lucide-react';

export default function PalletDetailClient({ pallet }: { pallet: Pallet }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [manifestSearch, setManifestSearch] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [selectedFreightMethod, setSelectedFreightMethod] = useState<'commercial_dock' | 'residential_liftgate' | 'warehouse_pickup'>('commercial_dock');

  const discountPercent = Math.round(((pallet.msrp - pallet.price) / pallet.msrp) * 100);
  const costPerPiece = (pallet.price / (pallet.pieceCount || 1)).toFixed(2);

  const manifestItems = pallet.manifestItems || [];
  const filteredManifest = manifestItems.filter(
    (i) =>
      i.title.toLowerCase().includes(manifestSearch.toLowerCase()) ||
      (i.asin && i.asin.toLowerCase().includes(manifestSearch.toLowerCase())) ||
      (i.upc && i.upc.includes(manifestSearch))
  );

  const downloadCSV = () => {
    const headers = ['Title', 'Category', 'ASIN/UPC', 'Condition', 'Qty', 'Unit Retail ($)', 'Total Retail ($)'];
    const rows = manifestItems.map((i) => [
      `"${i.title.replace(/"/g, '""')}"`,
      i.category,
      i.asin || i.upc || 'N/A',
      i.condition,
      i.quantity,
      i.retailPrice,
      i.totalRetail,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${pallet.sku}_Manifest.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBuyNow = () => {
    addToCart(pallet, 1);
    setIsAdded(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
          <Link href="/pallets" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Pallets
          </Link>
          <span>/</span>
          <span>{pallet.category}</span>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-medium truncate max-w-xs">{pallet.sku}</span>
        </div>

        {/* Main Grid: Gallery & Purchase Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          {/* Left Column: Photos Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 shadow-md">
              <img
                src={pallet.images[selectedImage] || pallet.images[0]}
                alt={pallet.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-md">
                  {discountPercent}% OFF MSRP
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-950/80 backdrop-blur-md text-white border border-neutral-700">
                  {pallet.sourceRetailer}
                </span>
              </div>
            </div>

            {/* Thumbnail selectors */}
            {pallet.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {pallet.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                      selectedImage === idx
                        ? 'border-blue-600 ring-2 ring-blue-600/30'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Pallet Features */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Lot Overview & Description
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {pallet.description}
              </p>
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Highlights & Guarantees
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                  {pallet.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Freight Buy Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6 sticky top-28">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-neutral-500">
                    SKU: {pallet.sku}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    {pallet.condition}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white leading-snug">
                  {pallet.title}
                </h1>
              </div>

              {/* Wholesale Price vs Retail */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-neutral-500 block">Wholesale Pallet Price</span>
                    <span className="text-3xl font-black text-neutral-900 dark:text-white">
                      ${pallet.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-neutral-500 block">Estimated Retail (MSRP)</span>
                    <span className="text-base font-bold line-through text-neutral-400 dark:text-neutral-500">
                      ${pallet.msrp.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex justify-between text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                  <span>Gross Margin Potential:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    ${(pallet.msrp - pallet.price).toLocaleString()} ({discountPercent}% Discount)
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">Total Pieces</span>
                  <span className="font-bold text-sm text-neutral-900 dark:text-white">{pallet.pieceCount} Units</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">Wholesale / Piece</span>
                  <span className="font-bold text-sm text-blue-600 dark:text-blue-400">${costPerPiece} / unit</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">Pallet Weight</span>
                  <span className="font-bold text-sm text-neutral-900 dark:text-white">{pallet.weightLbs} lbs</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">FOB Warehouse</span>
                  <span className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    {pallet.fobLocation}
                  </span>
                </div>
              </div>

              {/* Shipping Delivery Option */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                  Select Delivery Preference
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedFreightMethod('commercial_dock')}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      selectedFreightMethod === 'commercial_dock'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold ring-1 ring-blue-600'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-blue-600 mb-1" />
                    <div className="text-[11px]">Comm. Dock</div>
                    <div className="text-[10px] text-neutral-500">+$220</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFreightMethod('residential_liftgate')}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      selectedFreightMethod === 'residential_liftgate'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold ring-1 ring-blue-600'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-purple-600 mb-1" />
                    <div className="text-[11px]">Home Liftgate</div>
                    <div className="text-[10px] text-neutral-500">+$340</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFreightMethod('warehouse_pickup')}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      selectedFreightMethod === 'warehouse_pickup'
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-600'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Warehouse className="w-4 h-4 text-emerald-600 mb-1" />
                    <div className="text-[11px]">Self Pickup</div>
                    <div className="text-[10px] text-emerald-600 font-bold">FREE ($0)</div>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isAdded ? 'Added To Freight Order!' : 'Add Pallet To Order'}
                </button>

                <button
                  type="button"
                  onClick={downloadCSV}
                  className="w-full py-3 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4 text-blue-500" />
                  Download Complete Item Manifest (.CSV)
                </button>
              </div>

              <div className="text-[11px] text-neutral-400 flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Manifest Guarantee • Recorded in Cloudflare D1
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Interactive Manifest Section */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-lg mb-12">
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-50 dark:bg-neutral-850">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                  Live Lot Manifest
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  {manifestItems.length} Verified Line Items
                </span>
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Detailed Piece Breakdown & MSRP Analysis
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Filter manifest items..."
                  value={manifestSearch}
                  onChange={(e) => setManifestSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden"
                />
              </div>
              <button
                onClick={downloadCSV}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 rounded-lg transition shrink-0"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 font-bold uppercase tracking-wider bg-neutral-100/60 dark:bg-neutral-800/40">
                  <th className="p-4">Item Name / Title</th>
                  <th className="p-4">ASIN / UPC</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Condition</th>
                  <th className="p-4 text-right">Qty</th>
                  <th className="p-4 text-right">Unit MSRP</th>
                  <th className="p-4 text-right">Extended Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filteredManifest.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                    <td className="p-4 font-semibold text-neutral-900 dark:text-white max-w-md">
                      {item.title}
                    </td>
                    <td className="p-4 font-mono text-neutral-500">
                      {item.asin || item.upc || 'N/A'}
                    </td>
                    <td className="p-4 text-neutral-600 dark:text-neutral-400">
                      {item.category}
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                        {item.condition}
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold text-neutral-900 dark:text-white">
                      {item.quantity}
                    </td>
                    <td className="p-4 text-right text-neutral-500">
                      ${item.retailPrice.toFixed(2)}
                    </td>
                    <td className="p-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      ${item.totalRetail.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
