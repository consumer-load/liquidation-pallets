import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CustomerAuthProvider } from '@/context/CustomerAuthContext';
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
  metadataBase: new URL('https://liquidation-pallets.pages.dev'),
  title: {
    default: 'AMZ Pallets Liquidation | amzpalletsliquidation.com Wholesale Surplus Lots',
    template: '%s | amzpalletsliquidation.com',
  },
  description:
    'Buy direct wholesale liquidation pallets, verified Amazon customer returns, and excess overstock at up to 90% below retail MSRP. Nationwide LTL freight shipping.',
  keywords: [
    'amz pallets liquidation',
    'amzpalletsliquidation.com',
    'amazon liquidation pallets',
    'wholesale pallets',
    'amazon returns pallet',
    'target liquidation',
    'home depot tool lots',
    'overstock pallets',
    'truckload liquidation',
    'surplus merchandise',
  ],
  authors: [{ name: 'amzpalletsliquidation.com' }],
  creator: 'AMZ Pallets Liquidation',
  publisher: 'amzpalletsliquidation.com',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://liquidation-pallets.pages.dev',
    siteName: 'AMZ Pallets Liquidation',
    title: 'AMZ Pallets Liquidation | amzpalletsliquidation.com Wholesale Overstock',
    description:
      'Direct wholesale truckloads & liquidation pallets from Amazon, Target, Home Depot, and Costco. Up to 90% off retail MSRP. Nationwide LTL shipping.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'AMZ Pallets Liquidation Wholesale Warehouse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liquidation Pallets USA | Wholesale Overstock, Returns & Closeout Truckloads',
    description:
      'Direct wholesale truckloads & liquidation pallets from Amazon, Target, Home Depot, and Costco. Up to 90% off retail MSRP.',
    images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Organization & WebSite JSON-LD
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://liquidation-pallets.pages.dev/#organization',
        name: 'AMZ Pallets Liquidation',
        alternateName: 'amzpalletsliquidation.com',
        url: 'https://liquidation-pallets.pages.dev',
        logo: 'https://liquidation-pallets.pages.dev/logo.svg',
        telephone: '+1-817-330-9020',
        email: 'support@amzpalletsliquidation.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '328 Thomas Pl',
          addressLocality: 'Everman',
          addressRegion: 'TX',
          postalCode: '76140',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 32.6285,
          longitude: -97.2917,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+1-817-330-9020',
            contactType: 'customer service',
            areaServed: 'US',
            availableLanguage: ['English', 'Spanish'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://liquidation-pallets.pages.dev/#website',
        url: 'https://liquidation-pallets.pages.dev',
        name: 'Liquidation Pallets USA',
        publisher: {
          '@id': 'https://liquidation-pallets.pages.dev/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://liquidation-pallets.pages.dev/pallets?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col font-sans bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100`}
      >
        <CustomerAuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </CustomerAuthProvider>
      </body>
    </html>
  );
}
