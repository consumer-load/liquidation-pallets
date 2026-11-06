# Cloudflare Pages & Cloudflare D1 Deployment Guide

This document explains how to deploy your **Liquidation Pallets Store** to Cloudflare Pages (`*.pages.dev`) and connect the serverless **Cloudflare D1** SQLite database.

---

## 1. Cloudflare D1 Database Setup

Cloudflare D1 is Cloudflare's serverless relational SQL database.

### Step 1: Login to Cloudflare via Wrangler CLI
```bash
npx wrangler login
```

### Step 2: Create your D1 Database
```bash
npx wrangler d1 create liquidation_pallets_db
```
Wrangler will output something like:
```json
[[d1_databases]]
binding = "DB"
database_name = "liquidation_pallets_db"
database_id = "xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### Step 3: Update `wrangler.json`
Copy the `database_id` generated above and update `database_id` inside [wrangler.json](file:///d:/Liquidatin%20Pallets/wrangler.json):
```json
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "liquidation_pallets_db",
    "database_id": "YOUR_ACTUAL_DATABASE_ID_HERE"
  }
]
```

### Step 4: Execute Schema Migration
Create tables in your production Cloudflare D1 database:
```bash
# Execute on remote Cloudflare D1 (Production)
npx wrangler d1 execute liquidation_pallets_db --remote --file=./schema.sql

# Or execute locally for offline testing:
npx wrangler d1 execute liquidation_pallets_db --local --file=./schema.sql
```

---

## 2. Deploy to Cloudflare Pages (`*.pages.dev`)

### Option A: Direct Git Push via Cloudflare Dashboard (Recommended)
1. Push your repository to **GitHub** or **GitLab**.
2. Open [Cloudflare Dashboard](https://dash.cloudflare.com) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository `Liquidatin Pallets`.
4. Configure Build Settings:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `npx @cloudflare/next-on-pages@1` or `npm run build`
   - **Build output directory**: `.vercel/output/static` (for next-on-pages) or `.next`
5. Under **Settings** > **Functions** > **D1 database bindings**:
   - Variable name: `DB`
   - D1 database: `liquidation_pallets_db`
6. Click **Save and Deploy**. Your website will be live at `https://liquidation-pallets.pages.dev`!

### Option B: Deploy via Wrangler CLI
```bash
npx wrangler pages deploy .next
```

---

## 3. Sanity CMS Connection

1. Create a free account at [sanity.io](https://www.sanity.io/).
2. Run `npm create sanity@latest` or create a project in the Sanity Manage dashboard.
3. Add your Sanity credentials in `.env.local` or Cloudflare Pages Environment Variables:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
   ```
4. If Sanity is not yet configured, the store **automatically and seamlessly serves high-res liquidation pallet mock data with verified manifests**, so it works right out of the box with zero errors!

---

## 4. Local Testing

To run the Next.js development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
