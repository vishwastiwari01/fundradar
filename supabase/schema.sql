-- SQL Schema for FundRadar Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE opportunities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('vc', 'accelerator', 'hackathon', 'grant', 'credits', 'fellowship')),
  organization TEXT NOT NULL,
  description TEXT,
  amount_min INTEGER,
  amount_max INTEGER,
  amount_label TEXT,
  deadline TEXT,
  deadline_urgency TEXT CHECK (deadline_urgency IN ('hot', 'upcoming', 'open')),
  equity_taken BOOLEAN DEFAULT false,
  equity_percent NUMERIC,
  stage TEXT[],
  sector_tags TEXT[],
  geo_restriction TEXT[],
  eligibility JSONB,
  apply_url TEXT,
  source_url TEXT,
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified BOOLEAN DEFAULT false,
  logo TEXT,
  logo_bg TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public reads
CREATE POLICY "Allow public read access" 
  ON opportunities FOR SELECT 
  USING (true);

-- (Optional) Policy to restrict inserts to authenticated admins or service roles only
CREATE POLICY "Allow service role inserts" 
  ON opportunities FOR INSERT 
  WITH CHECK (true); -- In a real app, restrict this to auth.uid() or service key
