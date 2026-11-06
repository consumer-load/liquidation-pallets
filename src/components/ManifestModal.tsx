'use client';

import React, { useState } from 'react';
import { Pallet } from '@/types';
import { X, Search, FileSpreadsheet, CheckCircle2, Download } from 'lucide-react';

interface ManifestModalProps {
  pallet: Pallet | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ManifestModal({ pallet, isOpen, onClose }: ManifestModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen || !pallet) return null;

  const items = pallet.manifestItems || [];
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.asin && item.asin.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.upc && item.upc.includes(searchTerm)) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ['Title', 'Category', 'ASIN/UPC', 'Condition', 'Qty', 'Unit Retail ($)', 'Total Retail ($)'];
    const rows = items.map((i) => [
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-start justify-between bg-neutral-50 dark:bg-neutral-800/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
                Verified Manifest
              </span>
              <span className="text-xs text-neutral-500 font-mono">SKU: {pallet.sku}</span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white line-clamp-1">
              {pallet.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Manifest Overview Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-blue-50/50 dark:bg-blue-950/20 border-b border-neutral-200 dark:border-neutral-800 text-sm">
          <div>
            <span className="text-neutral-500 text-xs block">Total Items / Pieces</span>
            <span className="font-bold text-lg text-neutral-900 dark:text-white">{pallet.pieceCount} Units</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs block">Estimated Retail (MSRP)</span>
            <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">${pallet.msrp.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs block">Pallet Wholesale Price</span>
            <span className="font-bold text-lg text-neutral-900 dark:text-white">${pallet.price.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs block">Avg. Cost Per Piece</span>
            <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
              ${(pallet.price / (pallet.pieceCount || 1)).toFixed(2)} / unit
            </span>
          </div>
        </div>

        {/* Search & Actions toolbar */}
        <div className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by title, ASIN, UPC, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={downloadCSV}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 rounded-lg transition"
          >
            <Download className="w-4 h-4" />
            Download Manifest CSV
          </button>
        </div>

        {/* Manifest Table */}
        <div className="flex-1 overflow-auto p-4">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p>No manifest items matching &quot;{searchTerm}&quot;</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 text-xs uppercase tracking-wider bg-neutral-50 dark:bg-neutral-800/40">
                    <th className="p-3 font-semibold">Item Title</th>
                    <th className="p-3 font-semibold">Identifier</th>
                    <th className="p-3 font-semibold">Category</th>
                    <th className="p-3 font-semibold">Condition</th>
                    <th className="p-3 font-semibold text-right">Qty</th>
                    <th className="p-3 font-semibold text-right">Unit MSRP</th>
                    <th className="p-3 font-semibold text-right">Total MSRP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                      <td className="p-3 font-medium text-neutral-900 dark:text-neutral-100 max-w-xs truncate">
                        {item.title}
                      </td>
                      <td className="p-3 font-mono text-xs text-neutral-500">
                        {item.asin || item.upc || 'N/A'}
                      </td>
                      <td className="p-3 text-neutral-600 dark:text-neutral-400">
                        {item.category}
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          {item.condition}
                        </span>
                      </td>
                      <td className="p-3 text-right font-semibold text-neutral-900 dark:text-neutral-100">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-right text-neutral-500">
                        ${item.retailPrice.toFixed(2)}
                      </td>
                      <td className="p-3 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                        ${item.totalRetail.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <span>Showing {filteredItems.length} of {items.length} listed items</span>
          <span>Manifest accuracy guarantee applied to all shrink-wrapped lots</span>
        </div>
      </div>
    </div>
  );
}
