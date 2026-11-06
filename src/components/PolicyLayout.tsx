'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  RotateCcw, 
  FileText, 
  Truck, 
  HelpCircle, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  ChevronRight 
} from 'lucide-react';

interface PolicyLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PolicyLayout({ title, subtitle, children }: PolicyLayoutProps) {
  const pathname = usePathname();

  const policyLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy', icon: ShieldCheck },
    { name: 'Terms of Use', href: '/terms-of-use', icon: FileText },
    { name: 'Refund Policy', href: '/refund-policy', icon: RotateCcw },
    { name: 'Shipping Policy', href: '/shipping-policy', icon: Truck },
    { name: 'FAQs', href: '/faqs', icon: HelpCircle },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'About Us', href: '/about-us', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span>/</span>
            <span className="text-neutral-400">Policies</span>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">{title}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* 2-Column Grid: Policy Navigation Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Policy Center Menu */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-4">
                Policy Center
              </h2>
              <nav className="space-y-1.5">
                {policyLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href === '/faqs' && pathname === '/faq');
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                        {item.name}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-white' : ''}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Need Assistance Card */}
            <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Need Assistance?
              </span>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Have questions about our policies, wholesale pallets, or custom freight quotes? Our customer support team is here to assist you.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <a
                  href="https://wa.me/18173309020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-emerald-500 hover:text-emerald-600 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 font-semibold uppercase">WhatsApp / Call</div>
                    <div className="font-bold">+1 (817) 330-9020</div>
                  </div>
                </a>

                <a
                  href="mailto:info@suncitypalletsliquidation.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-blue-500 hover:text-blue-600 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 font-semibold uppercase">Email Support</div>
                    <div className="font-bold truncate max-w-[180px]">info@suncitypalletsliquidation.com</div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 font-semibold uppercase">Distribution Center</div>
                    <div className="font-bold text-xs leading-snug">328 Thomas Pl, Everman, TX 76140, USA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm text-neutral-700 dark:text-neutral-300">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
