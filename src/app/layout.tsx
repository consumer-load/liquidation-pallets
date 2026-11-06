import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Liquidation Pallets | Wholesale Overstock, Returns & Closeout Truckloads',
  description: 'Buy direct wholesale liquidation pallets, verified customer returns, and excess overstock at up to 90% below retail MSRP. Nationwide LTL freight shipping.',
  keywords: [
    'liquidation pallets',
    'wholesale pallets',
    'amazon returns pallet',
    'overstock pallets',
    'truckload liquidation',
    'surplus merchandise'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col font-sans bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100`}>
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
