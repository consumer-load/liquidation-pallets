import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
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

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!builder || !source) return '';
  return builder.image(source).url();
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
    return data;
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
      return mockPallets.find((p) => p.slug === slug || p.id === slug) || null;
    }
    return data;
  } catch (error) {
    console.warn('Sanity single item query failed, using fallback:', error);
    return mockPallets.find((p) => p.slug === slug || p.id === slug) || null;
  }
}
