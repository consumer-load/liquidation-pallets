import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPalletBySlug, getPallets } from '@/sanity/client';
import PalletDetailClient from './PalletDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pallets = await getPallets();
  return pallets.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pallet = await getPalletBySlug(slug);

  if (!pallet) {
    return {
      title: 'Pallet Not Found | Liquidation Pallets USA',
    };
  }

  const title = pallet.seo?.metaTitle || `${pallet.title} - Wholesale Lot | Liquidation Pallets USA`;
  const description =
    pallet.seo?.metaDescription ||
    `Buy ${pallet.title} (${pallet.condition}) for $${pallet.price.toLocaleString()}. Estimated Retail MSRP: $${pallet.msrp.toLocaleString()} with ${pallet.pieceCount} items. FOB Warehouse: ${pallet.fobLocation}.`;

  const ogImage = pallet.images?.[0] || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80';

  return {
    title,
    description,
    keywords: pallet.seo?.metaKeywords || [
      pallet.category,
      pallet.sourceRetailer,
      'liquidation pallets',
      'wholesale lot',
      'customer returns',
    ],
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: pallet.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: pallet.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: pallet.seo?.canonicalUrl
      ? { canonical: pallet.seo.canonicalUrl }
      : undefined,
  };
}

export default async function PalletDetailPage({ params }: Props) {
  const { slug } = await params;
  const pallet = await getPalletBySlug(slug);

  if (!pallet) {
    notFound();
  }

  // Schema.org Product Structured Data JSON-LD
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pallet.title,
    description: pallet.description,
    sku: pallet.sku,
    image: pallet.images,
    brand: {
      '@type': 'Brand',
      name: pallet.structuredData?.brandName || pallet.sourceRetailer,
    },
    ...(pallet.structuredData?.gtin ? { gtin: pallet.structuredData.gtin } : {}),
    ...(pallet.structuredData?.mpn ? { mpn: pallet.structuredData.mpn } : {}),
    offers: {
      '@type': 'Offer',
      url: `https://liquidation-pallets.pages.dev/pallets/${pallet.slug}`,
      priceCurrency: 'USD',
      price: pallet.price,
      priceValidUntil: pallet.structuredData?.priceValidUntil || '2026-12-31',
      itemCondition: pallet.structuredData?.itemCondition || 'https://schema.org/UsedCondition',
      availability: pallet.structuredData?.availability || 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'AMZ Pallets Liquidation',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: pallet.structuredData?.ratingValue || 4.9,
      reviewCount: pallet.structuredData?.reviewCount || 18,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <PalletDetailClient pallet={pallet} />
    </>
  );
}
