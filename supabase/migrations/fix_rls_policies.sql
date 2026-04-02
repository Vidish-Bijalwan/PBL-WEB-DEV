-- =====================================================
-- COMPLETE FIX SCRIPT: Run this in Supabase SQL Editor
-- This replaces old restrictive RLS policies and adds
-- a trigger to auto-create profiles on user signup.
-- =====================================================

-- 1. Drop old and any existing conflicting policies
DROP POLICY IF EXISTS "Admins can select all transactions" ON transactions;
DROP POLICY IF EXISTS "Cashiers can select store transactions" ON transactions;
DROP POLICY IF EXISTS "Cashiers can insert transactions" ON transactions;
DROP POLICY IF EXISTS "Authenticated users can insert transactions" ON transactions;
DROP POLICY IF EXISTS "Authenticated users can read transactions" ON transactions;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Auth users can read stores" ON stores;

-- 2. Simpler policies: any authenticated user can insert and read transactions
CREATE POLICY "Authenticated users can insert transactions"
ON transactions FOR INSERT TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can read transactions"
ON transactions FOR SELECT TO authenticated
USING (auth.uid() IS NOT NULL);

-- 3. Profiles: allow users to read their own profile (insert handled by trigger)
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT USING (auth.uid() = id);

-- 4. Stores: allow read for authenticated users
CREATE POLICY "Auth users can read stores"
ON stores FOR SELECT TO authenticated USING (true);

-- =====================================================
-- AUTO-CREATE PROFILE TRIGGER
-- This runs server-side when a new user signs up,
-- reading the name and role from user_metadata.
-- =====================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'cashier')
  )
  ON CONFLICT (id) DO NOTHING; -- safe if profile already exists
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop old trigger if it exists, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
