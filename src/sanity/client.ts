import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import { Pallet } from '@/types';
import { mockPallets } from '@/data/mockPallets';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const isSanityConfigured = Boolean(projectId && projectId.trim() !== '');

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null;

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!builder || !source) return '';
  return builder.image(source).url();
}

const defaultImages = [
  'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
];

function sanitizePallet(p: any): Pallet {
  const fallback = mockPallets.find((m) => m.id === p.id || m.slug === p.slug) || mockPallets[0];
  return {
    ...p,
    images: (p.images && p.images.length > 0) ? p.images : fallback.images || defaultImages,
    manifestSummary: p.manifestSummary || fallback.manifestSummary,
    manifestItems: p.manifestItems || fallback.manifestItems,
    features: p.features || fallback.features,
    fobLocation: p.fobLocation || fallback.fobLocation,
    pieceCount: p.pieceCount || fallback.pieceCount,
    weightLbs: p.weightLbs || fallback.weightLbs,
  };
}

/**
 * Fetch all pallets - checks Sanity first, automatically falls back to mockPallets
 */
export async function getPallets(): Promise<Pallet[]> {
  if (!sanityClient) {
    return mockPallets;
  }

  try {
    const query = `*[_type == "pallet"] | order(createdAt desc) {
      _id,
      "id": _id,
      "slug": slug.current,
      title,
      sku,
      category,
      condition,
      sourceRetailer,
      price,
      msrp,
      pieceCount,
      weightLbs,
      dimensions,
      fobLocation,
      "images": images[].asset->url,
      description,
      features,
      manifestSummary,
      manifestItems,
      isFeatured,
      isHotDeal,
      stockAvailable,
      createdAt
    }`;
    const data = await sanityClient.fetch(query);
    if (!data || data.length === 0) {
      return mockPallets;
    }
    return data.map(sanitizePallet);
  } catch (error) {
    console.warn('Sanity query failed, using fallback mock data:', error);
    return mockPallets;
  }
}

/**
 * Fetch single pallet by slug or id
 */
export async function getPalletBySlug(slug: string): Promise<Pallet | null> {
  if (!sanityClient) {
    const found = mockPallets.find((p) => p.slug === slug || p.id === slug);
    return found || null;
  }

  try {
    const query = `*[_type == "pallet" && (slug.current == $slug || _id == $slug)][0] {
      _id,
      "id": _id,
      "slug": slug.current,
      title,
      sku,
      category,
      condition,
      sourceRetailer,
      price,
      msrp,
      pieceCount,
      weightLbs,
      dimensions,
      fobLocation,
      "images": images[].asset->url,
      description,
      features,
      manifestSummary,
      manifestItems,
      isFeatured,
      isHotDeal,
      stockAvailable,
      createdAt
    }`;
    const data = await sanityClient.fetch(query, { slug });
    if (!data) {
      const found = mockPallets.find((p) => p.slug === slug || p.id === slug);
      return found || null;
    }
    return sanitizePallet(data);
  } catch (error) {
    console.warn('Sanity single item query failed, using fallback:', error);
    const found = mockPallets.find((p) => p.slug === slug || p.id === slug);
    return found || null;
  }
}
