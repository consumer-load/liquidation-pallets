-- Cloudflare D1 Database Schema for Liquidation Pallets Store

-- 1. Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  company_name TEXT,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  delivery_type TEXT NOT NULL DEFAULT 'commercial_dock', -- 'commercial_dock', 'residential_liftgate', 'warehouse_pickup'
  subtotal REAL NOT NULL,
  freight_cost REAL NOT NULL DEFAULT 0.0,
  tax_amount REAL NOT NULL DEFAULT 0.0,
  total_amount REAL NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'wire_transfer', -- 'wire_transfer', 'credit_card', 'ach'
  payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'cancelled'
  order_status TEXT NOT NULL DEFAULT 'processing', -- 'processing', 'dispatched', 'delivered'
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Order Items table
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  pallet_id TEXT NOT NULL,
  title TEXT NOT NULL,
  condition TEXT NOT NULL,
  fob_location TEXT NOT NULL,
  price REAL NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
);

-- 3. Freight Quotes & Pallet Inquiries table
CREATE TABLE IF NOT EXISTS freight_quotes (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  destination_zip TEXT NOT NULL,
  delivery_type TEXT NOT NULL, -- 'commercial_dock', 'residential_liftgate', 'warehouse_pickup'
  pallet_id TEXT,
  pallet_title TEXT,
  estimated_freight REAL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'open', -- 'open', 'quoted', 'closed'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Newsletter & Deal Alerts
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders (customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (order_status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_quotes_zip ON freight_quotes (destination_zip);
