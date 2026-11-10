'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Wholesale Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          destinationZip: 'Contact Form Inquiry',
          deliveryType: 'inquiry',
          notes: `Subject: ${formData.subject} | Message: ${formData.message}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 mb-3">
            <Mail className="w-3.5 h-3.5" />
            Direct Support & Everman Distribution Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
            Get in Touch With Us
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Have questions about lot availability, custom truckloads, or scheduling a warehouse pickup in Everman, TX?
          </p>
        </div>

        {/* 2-Column Grid: Contact Info Cards + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Card 1: WhatsApp / Phone */}
            <a
              href="https://wa.me/18173309020"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4 hover:border-emerald-500 transition block"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-neutral-400">Direct Phone & WhatsApp</span>
                <div className="text-lg font-black text-neutral-900 dark:text-white mt-0.5">
                  +1 (817) 330-9020
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Fastest response for freight quotes and same-day pallet holds.
                </p>
              </div>
            </a>

            {/* Card 2: Email */}
            <a
              href="mailto:support@amzpalletsliquidation.com"
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4 hover:border-blue-500 transition block"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-neutral-400">Email Inquiries</span>
                <div className="text-base font-bold text-neutral-900 dark:text-white mt-0.5 truncate">
                  support@amzpalletsliquidation.com
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Average response time: under 2 business hours.
                </p>
              </div>
            </a>

            {/* Card 3: Location */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-neutral-400">Physical Yard & Storefront</span>
                <div className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                  AMZ Pallets Liquidation (amzpalletsliquidation.com)
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  328 Thomas Pl, Everman, TX 76140, USA
                </p>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-2 font-mono">
                  <Clock className="w-3.5 h-3.5" /> Mon-Fri: 8:30 AM – 5:00 PM CST
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Thank You for Reaching Out!
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto">
                    Your message has been safely recorded in our Cloudflare D1 communications database. Our Everman team will respond shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        subject: 'General Wholesale Inquiry',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    Send Us a Direct Message
                  </h3>

                  {error && (
                    <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden"
                    >
                      <option value="General Wholesale Inquiry">General Wholesale Inquiry</option>
                      <option value="Custom Truckload Pricing">Custom 24-Pallet Truckload Pricing</option>
                      <option value="Freight & Liftgate Coordination">Freight & Liftgate Coordination</option>
                      <option value="Warehouse Pickup Appointment">Everman Warehouse Pickup Appointment</option>
                      <option value="Manifest Verification">Manifest Verification Request</option>
                    </select>
                  </div>

                  <div className="text-xs">
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what pallets or categories you are interested in sourcing..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Sending Message...' : 'Send Message'}
                  </button>

                  <div className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Encrypted submission • Logged to Cloudflare D1
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
