'use client';

import React, { useState } from 'react';
import PolicyLayout from '@/components/PolicyLayout';
import { ChevronDown, Search } from 'lucide-react';

interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

interface Props {
  faqData: FaqItem[];
}

export default function FaqsClient({ faqData }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PolicyLayout
      title="Frequently Asked Questions (FAQs)"
      subtitle="Find answers to common questions about product sourcing, buying guidelines, freight delivery, and payments."
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. payment, dock, returns, certificate)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-500">
              No answers matching &quot;{searchTerm}&quot;. Please contact our support team.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20"
                open={idx < 3}
              >
                <summary className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white cursor-pointer list-none flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))
          )}
        </div>
      </div>
    </PolicyLayout>
  );
}
