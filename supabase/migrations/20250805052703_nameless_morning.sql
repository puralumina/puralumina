/*
  # Create orders table for apparel shop

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `stripe_session_id` (text, unique)
      - `customer_email` (text)
      - `amount` (bigint) - amount in cents
      - `currency` (text)
      - `status` (text)
      - `payment_status` (text)
      - `shipping_details` (jsonb)
      - `metadata` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `orders` table
    - Add policy for authenticated users to read orders
    - Add policy for service role to insert/update orders

  3. Indexes
    - Index on stripe_session_id for fast lookups
    - Index on customer_email for customer order history
    - Index on created_at for chronological sorting
*/

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text UNIQUE NOT NULL,
  customer_email text NOT NULL,
  amount bigint NOT NULL,
  currency text NOT NULL DEFAULT 'usd',
  status text NOT NULL DEFAULT 'pending',
  payment_status text,
  shipping_details jsonb,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Service role can insert orders"
  ON orders
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update orders"
  ON orders
  FOR UPDATE
  TO service_role
  USING (true);

CREATE POLICY "Service role can read all orders"
  ON orders
  FOR SELECT
  TO service_role
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session_id ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();