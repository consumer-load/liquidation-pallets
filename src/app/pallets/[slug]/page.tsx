import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPalletBySlug, getPallets } from '@/sanity/client';
import PalletDetailClient from './PalletDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pallets = await getPallets();
  return pallets.map((p) => ({ slug: p.slug }));
}

export default async function PalletDetailPage({ params }: Props) {
  const { slug } = await params;
  const pallet = await getPalletBySlug(slug);

  if (!pallet) {
    notFound();
  }

  return <PalletDetailClient pallet={pallet} />;
}
