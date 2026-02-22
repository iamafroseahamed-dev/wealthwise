#!/usr/bin/env node

/**
 * Database Setup Script for Supabase
 * 
 * This script creates the necessary tables and sets up RLS policies
 * Run this in Supabase SQL Editor
 */

const SQL = `
-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  cover_image TEXT NOT NULL,
  reading_time TEXT NOT NULL DEFAULT '5 min read',
  author TEXT DEFAULT 'WealthWise Team',
  published_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at);

-- Enable RLS (Row Level Security)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read all blog posts
DROP POLICY IF EXISTS "Allow public read" ON public.blog_posts;
CREATE POLICY "Allow public read" 
  ON public.blog_posts 
  FOR SELECT 
  USING (true);

-- Policy: Allow all CRUD operations (will be protected at app level with admin password)
DROP POLICY IF EXISTS "Allow crud operations" ON public.blog_posts;
CREATE POLICY "Allow crud operations" 
  ON public.blog_posts 
  USING (true);

-- Create session_bookings table (optional, for tracking bookings)
CREATE TABLE IF NOT EXISTS public.session_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index on email for lookups
CREATE INDEX IF NOT EXISTS idx_session_bookings_email ON public.session_bookings(email);
CREATE INDEX IF NOT EXISTS idx_session_bookings_date ON public.session_bookings(booking_date);

-- Enable RLS on session_bookings
ALTER TABLE public.session_bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow reading bookings
DROP POLICY IF EXISTS "Allow public read bookings" ON public.session_bookings;
CREATE POLICY "Allow public read bookings" 
  ON public.session_bookings 
  FOR SELECT 
  USING (true);

-- Policy: Allow inserting bookings
DROP POLICY IF EXISTS "Allow insert bookings" ON public.session_bookings;
CREATE POLICY "Allow insert bookings" 
  ON public.session_bookings 
  FOR INSERT 
  WITH CHECK (true);

-- Insert sample blog posts
INSERT INTO public.blog_posts (slug, title, excerpt, content, cover_image, reading_time, author, published_at)
VALUES 
  (
    'power-of-sip',
    'The Power of SIP: How ₹5,000/Month Can Build a Crore',
    'Discover how systematic investment plans leverage compounding to turn small monthly investments into significant wealth over time.',
    'Systematic Investment Plans (SIP) are one of the most powerful tools for long-term wealth creation. When you invest a fixed amount regularly, you benefit from rupee cost averaging and the power of compounding.

With just ₹5,000 per month invested in a diversified mutual fund earning 12% annually, you could accumulate over ₹80+ lakhs in 20 years. The key is to start early and stay consistent.

Start your SIP journey today and watch your wealth grow systematically.',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
    '5 min read',
    'WealthWise Team',
    NOW()
  ),
  (
    'tax-saving-elss',
    'ELSS vs PPF vs FD: Which Tax Saving Option Is Best?',
    'A comprehensive comparison of popular Section 80C investment options to help you make the smartest tax-saving decision.',
    'When it comes to saving taxes under Section 80C, investors have multiple options. Let''s compare the most popular choices:

ELSS (Equity Linked Saving Scheme):
- Highest growth potential
- Shortest lock-in of 3 years
- Good for long-term investors

PPF (Public Provident Fund):
- Guaranteed returns
- Lock-in of 15 years
- Safest option

FD (Fixed Deposit):
- Predictable returns
- Lock-in as per choice
- Low risk

Choose based on your risk appetite and investment horizon.',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop',
    '7 min read',
    'WealthWise Team',
    NOW()
  ),
  (
    'health-insurance-2024',
    'Health Insurance in 2024: A Complete Buying Guide',
    'Everything you need to know about choosing the right health insurance plan for your family in the current landscape.',
    'Health insurance is not a luxury but a necessity in today''s world. With medical inflation rising every year, having comprehensive health coverage is crucial.

Key factors to consider:
1. Sum Insured - Should be at least ₹5 lakhs for individuals
2. Coverage - OPD, pre-existing diseases, maternity
3. Network Hospitals - Wide network ensures better access
4. No-Claim Bonus - Additional cover for claim-free years
5. Premium - Balance between affordability and coverage

Invest in a good health insurance plan now to protect your family''s financial health.',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
    '6 min read',
    'WealthWise Team',
    NOW()
  )
ON CONFLICT (slug) DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO anon, authenticated;
GRANT SELECT, INSERT ON public.session_bookings TO anon, authenticated;
`;

console.log('SQL Setup Script for Supabase Blog Posts Table');
console.log('==============================================\n');
console.log('Copy the SQL below and paste it in your Supabase SQL Editor:\n');
console.log('URL: https://app.supabase.com/project/qoytxtxfmbhmrcyhtyfk/sql/new\n');
console.log('---START SQL---\n');
console.log(SQL);
console.log('\n---END SQL---\n');
console.log('\nSteps:');
console.log('1. Go to https://app.supabase.com/project/qoytxtxfmbhmrcyhtyfk/sql/new');
console.log('2. Copy and paste all the SQL above');
console.log('3. Click "Run" button');
console.log('4. Wait for the query to complete successfully');
console.log('5. You\'re done! Tables are created with sample data.\n');
