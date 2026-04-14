-- AutoInsight Database Schema
-- Run this in Supabase SQL Editor

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT,
    sources TEXT[],
    week VARCHAR(50),
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_unlocked BOOLEAN DEFAULT false,
    price_paid DECIMAL(10,2) DEFAULT 0.50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('earning', 'spending', 'payment')),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    source VARCHAR(100),
    tx_hash VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API Purchases table
CREATE TABLE IF NOT EXISTS api_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_name VARCHAR(100) NOT NULL,
    provider VARCHAR(100),
    cost DECIMAL(10,4) NOT NULL,
    calls_count INTEGER DEFAULT 0,
    report_id UUID REFERENCES reports(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallet/Balance table
CREATE TABLE IF NOT EXISTS wallet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    balance DECIMAL(10,2) DEFAULT 34.60,
    total_earned DECIMAL(10,2) DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    total_readers INTEGER DEFAULT 0,
    total_api_calls INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default wallet if not exists
INSERT INTO wallet (id, balance, total_earned, total_spent, total_readers, total_api_calls)
SELECT gen_random_uuid(), 34.60, 0, 0, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM wallet LIMIT 1);

-- Create indexes for better performance
CREATE INDEX idx_reports_date ON reports(created_at DESC);
CREATE INDEX idx_transactions_date ON transactions(created_at DESC);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_api_purchases_report ON api_purchases(report_id);

-- Enable Row Level Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Enable read access for all users" ON reports FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON transactions FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON api_purchases FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON wallet FOR SELECT USING (true);

-- Create policy for service role (edge functions) full access
CREATE POLICY "Service role full access" ON reports FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON api_purchases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON wallet FOR ALL USING (true) WITH CHECK (true);