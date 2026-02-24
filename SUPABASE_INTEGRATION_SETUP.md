# Supabase Database Setup Guide

This guide will help you set up your Supabase database with all the tables needed for the WealthWise application.

## Prerequisites

1. Supabase project created and active
2. Access to the Supabase SQL Editor
3. Supabase URL and Public Key configured in `.env.local` ✅ (already done)

---

## Step 1: Create Tables and Policies

1. Go to your **Supabase Dashboard**: https://app.supabase.com
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the SQL below:

```sql
-- ==================== TABLE CREATION ====================

-- 1. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  reading_time TEXT NOT NULL DEFAULT '5 min read',
  author TEXT DEFAULT 'WealthWise Team',
  published_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- 2. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(date DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- 3. CONTACTS TABLE (for contact form submissions)
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'replied', 'closed')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);

-- ==================== ROW LEVEL SECURITY (RLS) ====================

-- Enable RLS on all tables
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- ==================== BLOG POSTS POLICIES ====================

-- Anyone can read blog posts
DROP POLICY IF EXISTS "blog_posts_read_all" ON public.blog_posts;
CREATE POLICY "blog_posts_read_all" ON public.blog_posts
  FOR SELECT USING (true);

-- All operations (protected at app level by admin auth)
DROP POLICY IF EXISTS "blog_posts_admin_all" ON public.blog_posts;
CREATE POLICY "blog_posts_admin_all" ON public.blog_posts
  FOR ALL USING (true);

-- ==================== BOOKINGS POLICIES ====================

-- Public users can INSERT bookings
DROP POLICY IF EXISTS "bookings_public_insert" ON public.bookings;
CREATE POLICY "bookings_public_insert" ON public.bookings
  FOR INSERT WITH CHECK (true);

-- Admins can do everything
DROP POLICY IF EXISTS "bookings_admin_all" ON public.bookings;
CREATE POLICY "bookings_admin_all" ON public.bookings
  FOR ALL USING (true);

-- ==================== CONTACTS POLICIES ====================

-- Public users can INSERT contacts
DROP POLICY IF EXISTS "contacts_public_insert" ON public.contacts;
CREATE POLICY "contacts_public_insert" ON public.contacts
  FOR INSERT WITH CHECK (true);

-- Admins can read, update, and delete
DROP POLICY IF EXISTS "contacts_admin_all" ON public.contacts;
CREATE POLICY "contacts_admin_all" ON public.contacts
  FOR ALL USING (true);

-- ==================== GRANT PERMISSIONS ====================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.blog_posts TO anon, authenticated;
GRANT ALL ON public.bookings TO anon, authenticated;
GRANT ALL ON public.contacts TO anon, authenticated;
```

6. Click the **Run** button (play icon) at the bottom right
7. Wait for the query to complete successfully ✅

---

## Step 2: Add Sample Data (Optional)

This step adds sample blog posts, bookings, and contacts so you can test the app.

1. Click **New Query** again
2. Copy and paste this SQL:

```sql
-- Insert sample blog posts
INSERT INTO public.blog_posts (slug, title, excerpt, content, cover_image, reading_time, author, published_at) VALUES
('power-of-sip', 
 'The Power of SIP: How ₹5,000/Month Can Build a Crore',
 'Discover how systematic investment plans leverage compounding to turn small monthly investments into significant wealth over time.',
 'Systematic Investment Plans (SIP) are one of the most powerful tools for long-term wealth creation. When you invest a fixed amount regularly, you benefit from rupee cost averaging and the power of compounding.

With just ₹5,000 per month invested in a diversified mutual fund earning 12% annually, you could accumulate over ₹80+ lakhs in 20 years.

The key is to start early and stay consistent. Time in the market beats timing the market! Start your SIP journey today and watch your wealth grow systematically.',
 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
 '5 min read',
 'WealthWise Team',
 NOW() - INTERVAL ''7 days''),

('tax-saving-elss', 
 'ELSS vs PPF vs FD: Which Tax Saving Option Is Best?',
 'A comprehensive comparison of popular Section 80C investment options to help you make the smartest tax-saving decision.',
 'When it comes to saving taxes under Section 80C, investors have multiple options. Each has its own advantages and disadvantages.

ELSS (Equity Linked Saving Scheme):
- Highest growth potential
- 3-year lock-in period
- Best for long-term investors
- Tax-free returns

PPF (Public Provident Fund):
- Guaranteed returns (7.1% currently)
- 15-year maturity
- Completely safe and government-backed
- Great for risk-averse investors

Choose based on your risk appetite and investment horizon!',
 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop',
 '7 min read',
 'WealthWise Team',
 NOW() - INTERVAL ''14 days''),

('health-insurance-2024', 
 'Health Insurance in 2024: A Complete Buying Guide',
 'Everything you need to know about choosing the right health insurance plan for your family.',
 'Health insurance is not a luxury but a necessity in today''s world. With medical inflation rising 10-12% annually, having comprehensive health coverage is crucial.

Key factors to consider:
- Sum Insured: Minimum ₹5 lakhs per person
- OPD Coverage: For outpatient treatments
- Pre-existing diseases: Check coverage timeline
- Network hospitals: Wider the better
- No-claim bonus: Accumulate extra coverage

Don''t wait for a medical emergency to realize you need insurance. Invest in a good health insurance plan now and protect your family''s financial future.',
 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
 '6 min read',
 'WealthWise Team',
 NOW() - INTERVAL ''21 days'')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample bookings
INSERT INTO public.bookings (name, email, phone, date, time_slot, message, status) VALUES
('Rajesh Kumar', 'rajesh@email.com', '9876543210', (NOW() + INTERVAL ''5 days'')::DATE, '10:00 AM', 'Interested in mutual fund consultation', 'pending'),
('Priya Singh', 'priya@email.com', '9876543211', (NOW() + INTERVAL ''3 days'')::DATE, '02:00 PM', 'Want to discuss health insurance options', 'confirmed'),
('Amit Patel', 'amit@email.com', '9876543212', (NOW() + INTERVAL ''7 days'')::DATE, '03:30 PM', 'Tax planning consultation needed', 'pending');

-- Insert sample contacts
INSERT INTO public.contacts (name, email, subject, message, phone, status) VALUES
('John Doe', 'john@email.com', 'Question about mutual funds', 'Hi, I want to know the best mutual funds for a beginner. Can you provide some recommendations?', '9876543220', 'new'),
('Maria Garcia', 'maria@email.com', 'Partnership inquiry', 'We are interested in partnering with WealthWise for corporate workshops.', '9876543221', 'new'),
('Tech Startup Inc', 'info@techstartup.com', 'Employee benefits consultation', 'Please provide details about employee health insurance and benefits planning.', '9876543222', 'reviewed');
```

3. Click **Run**
4. You should see the message "Successfully executed" ✅

---

## Step 3: Verify Setup

1. Go to **Tables** in the left sidebar
2. You should see:
   - `blog_posts` ✅
   - `bookings` ✅
   - `contacts` ✅

3. Click on each table to verify the sample data was inserted

---

## Step 4: Start the Development Server

```bash
npm run dev
```

---

## Step 5: Test the Features

### Test Blog Post Retrieval
1. Go to `http://localhost:5173/blog`
2. You should see the sample blog posts loading from Supabase ✅

### Test Booking Submission
1. Go to `http://localhost:5173/book-session`
2. Fill in the form and submit
3. You should see success message ✅
4. Go to `/admin` (password: admin123) → Bookings
5. New booking should appear in the list ✅

### Test Contact Form
1. Go to `http://localhost:5173/contact`
2. Fill in the form and submit
3. You should see success message ✅
4. Go to `/admin` (password: admin123) → Contacts
5. New contact message should appear ✅

### Test Blog Management
1. Go to `/admin` → Manage Blog
2. Click "New Post"
3. Create a blog post
4. It should appear at `/blog` ✅

---

## Features Overview

| Feature | Public Access | Admin Access | Database Table |
|---------|:---:|:---:|---|
| Read Blog Posts | ✅ | ✅ | `blog_posts` |
| Create Blog Posts | ❌ | ✅ | `blog_posts` |
| Edit Blog Posts | ❌ | ✅ | `blog_posts` |
| Delete Blog Posts | ❌ | ✅ | `blog_posts` |
| Submit Bookings | ✅ | ✅ | `bookings` |
| View Bookings | ❌ | ✅ | `bookings` |
| Update Booking Status | ❌ | ✅ | `bookings` |
| Delete Bookings | ❌ | ✅ | `bookings` |
| Submit Contact Forms | ✅ | ✅ | `contacts` |
| View Contacts | ❌ | ✅ | `contacts` |
| Update Contact Status | ❌ | ✅ | `contacts` |
| Delete Contacts | ❌ | ✅ | `contacts` |

---

## Troubleshooting

### "Table already exists" error?
- If you're re-running the script, use `DROP TABLE IF EXISTS` first
- The script already includes this, so just run it again

### Blog posts not loading?
- Check `.env.local` has correct Supabase URL and key
- Check browser console for errors (F12)
- Verify RLS policies are enabled

### Can't delete/update records?
- Check that the admin authentication is working
- Password is set in `.env.local` as `VITE_ADMIN_PASSWORD`

### Want to reset everything?
Run this in a new SQL query:
```sql
DROP TABLE IF EXISTS public.contacts;
DROP TABLE IF EXISTS public.bookings;
DROP TABLE IF EXISTS public.blog_posts;
```

Then re-run the table creation SQL from Step 1.

---

## Next Steps

✅ **Database is now set up!**

Your WealthWise application is now fully integrated with Supabase. You can:
- Create and manage blog posts from the admin panel
- View and manage customer bookings
- Track contact form submissions
- Monitor all data in Supabase

**Enjoy!** 🚀
