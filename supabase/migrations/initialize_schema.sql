-- Create stores table
CREATE TABLE IF NOT EXISTS stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    stock_qty INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'cashier' CHECK (role IN ('admin', 'cashier')),
    store_id UUID REFERENCES stores(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cashier_id UUID REFERENCES profiles(id),
    store_id UUID REFERENCES stores(id),
    customer_name TEXT DEFAULT 'Walk-in',
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'refund')),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'card', 'upi')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL CHECK (type IN ('low_stock', 'spike', 'refund_rate')),
    message TEXT NOT NULL,
    resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Realtime for relevant tables
ALTER PUBLICATION supabase_realtime ADD TABLE transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE products;

-- Row Level Security (RLS)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Policies
-- Profiles: Users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- Transactions: Admins can read all, cashiers can read/insert their store's transactions
CREATE POLICY "Admins can select all transactions" ON transactions FOR SELECT 
USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Cashiers can select store transactions" ON transactions FOR SELECT
USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'cashier' AND store_id = transactions.store_id));

CREATE POLICY "Cashiers can insert transactions" ON transactions FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'cashier' AND store_id = transactions.store_id));

-- Products: Everyone authenticated can read
CREATE POLICY "Auth users can select products" ON products FOR SELECT TO authenticated USING (true);

-- Alerts: Admins can read all, cashiers can insert
CREATE POLICY "Admins can select alerts" ON alerts FOR SELECT 
USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Cashiers can insert alerts" ON alerts FOR INSERT TO authenticated WITH CHECK (true);

-- Functions/Triggers for stock decrement (simplified)
CREATE OR REPLACE FUNCTION handle_stock_decrement()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products 
    SET stock_qty = stock_qty - 1 -- Assuming 1 for simplicity, can be expanded
    WHERE name = NEW.product_name;
    
    -- Low stock alert
    IF (SELECT stock_qty FROM products WHERE name = NEW.product_name) < 5 THEN
        INSERT INTO alerts (type, message) 
        VALUES ('low_stock', 'Product ' || NEW.product_name || ' is low on stock!');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_transaction_insert
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION handle_stock_decrement();
