# Liquidation Pallets E-Commerce Store

Modern, high-performance wholesale liquidation & surplus pallets e-commerce platform built with **Next.js 16 (App Router)**, **Sanity CMS**, and **Cloudflare Pages (`*.pages.dev`)** with native **Cloudflare D1 SQL Database**.

---

## 🚀 Key Highlights & Features

1. **Wholesale Liquidation Storefront**:
   - Condition Badges: *Brand New*, *Overstock*, *Customer Returns*, *Shelf Pulls*.
   - Live Retail Value vs Wholesale Discounted Price (% Savings Calculator).
   - Retailer Sourcing Badges: *Amazon, Target, The Home Depot, Walmart, Costco*.
   - FOB Warehouse Hubs (*Dallas TX, Atlanta GA, Indianapolis IN, Las Vegas NV, Philadelphia PA*).

2. **Interactive Manifest Table & CSV Exporter**:
   - Buyers can inspect each pallet's items, piece count, ASINs, UPCs, conditions, and MSRPs.
   - Live search within the manifest and 1-click Download Manifest CSV.

3. **Freight & Logistics Engine**:
   - Support for **Commercial Loading Dock** (forklift delivery), **Residential Liftgate** (hydraulic curb lowering), and **Free Self Pickup** ($0).

4. **Sanity CMS Integration**:
   - Client and schema definitions ready for Sanity Studio.
   - Built-in automatic fallback data layer: The site works out-of-the-box before adding Sanity keys.

5. **Cloudflare D1 Database**:
   - Serverless SQLite relational database (`schema.sql`).
   - Stores Customer Orders, Freight Quotes, and Newsletter Subscribers.
   - Integrated Admin dashboard at `/admin/orders` to view database records.

6. **Cloudflare Pages Ready**:
   - Edge-compatible, blazing fast worldwide distribution.
   - Configured with `wrangler.json`.

---

## 📦 Tech Stack

- **Framework**: Next.js 16 (React 19, TypeScript, App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **CMS**: Sanity.io (`next-sanity`, `@sanity/client`, `@sanity/image-url`)
- **Database**: Cloudflare D1 (Serverless SQLite)
- **Deployment**: Cloudflare Pages (`pages.dev`) via Wrangler

---

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the store.
Check [CLOUDFLARE_GUIDE.md](file:///d:/Liquidatin%20Pallets/CLOUDFLARE_GUIDE.md) for full deployment instructions.
