export type PalletCondition = 
  | 'Brand New' 
  | 'Overstock' 
  | 'Customer Returns' 
  | 'Shelf Pulls' 
  | 'Tested Working' 
  | 'Salvage / As-Is';

export type ProductCategory = 
  | 'Consumer Electronics'
  | 'Power Tools & Hardware'
  | 'Home & Kitchen'
  | 'Apparel & Footwear'
  | 'Toys & Hobbies'
  | 'Health & Beauty'
  | 'General Merchandise';

export type FOBLocation = 
  | 'Dallas, TX'
  | 'Atlanta, GA'
  | 'Indianapolis, IN'
  | 'Las Vegas, NV'
  | 'Philadelphia, PA';

export interface ManifestItem {
  id: string;
  asin?: string;
  upc?: string;
  title: string;
  category: string;
  quantity: number;
  retailPrice: number;
  totalRetail: number;
  condition: string;
}

export interface Pallet {
  id: string;
  slug: string;
  title: string;
  sku: string;
  category: ProductCategory;
  condition: PalletCondition;
  sourceRetailer: 'Amazon' | 'Target' | 'The Home Depot' | 'Walmart' | 'Wayfair' | 'Costco' | 'Major Wholesale';
  price: number; // Wholesale pallet price
  msrp: number; // Total estimated retail value
  pieceCount: number;
  weightLbs: number;
  dimensions: string; // e.g., "48x40x52 in"
  fobLocation: FOBLocation;
  images: string[];
  description: string;
  features: string[];
  manifestSummary: {
    totalItems: number;
    totalRetail: number;
    averageItemValue: number;
    topBrands: string[];
  };
  manifestItems: ManifestItem[];
  isFeatured?: boolean;
  isHotDeal?: boolean;
  stockAvailable: number;
  createdAt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    canonicalUrl?: string;
    noIndex?: boolean;
  };
  structuredData?: {
    brandName?: string;
    gtin?: string;
    mpn?: string;
    itemCondition?: string;
    availability?: string;
    priceValidUntil?: string;
    ratingValue?: number;
    reviewCount?: number;
  };
}

export interface CartItem {
  pallet: Pallet;
  quantity: number;
}

export type DeliveryType = 'commercial_dock' | 'residential_liftgate' | 'warehouse_pickup';

export interface FreightRate {
  deliveryType: DeliveryType;
  label: string;
  description: string;
  baseRate: number;
}

export interface OrderData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  companyName?: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  deliveryType: DeliveryType;
  subtotal: number;
  freightCost: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: 'wire_transfer' | 'credit_card' | 'ach';
  notes?: string;
  items: {
    palletId: string;
    title: string;
    condition: string;
    fobLocation: string;
    price: number;
    quantity: number;
  }[];
}
