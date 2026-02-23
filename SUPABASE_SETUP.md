# Supabase Database Setup

## Your Credentials
- **Project URL**: https://qoytxtxfmbhmrcyhtyfk.supabase.co
- **Anon Key**: sb_publishable_wTMEWGmgvE4_SFBJOhUzVg_CMGXroJ_
- **Status**: ✅ Already configured in `.env.local`

## Step 1: Create Tables

1. Open your Supabase dashboard: https://app.supabase.com
2. Go to **SQL Editor**
3. Click **New Query**
4. Copy and paste this SQL:

```sql
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DROP POLICY IF EXISTS "Allow public read" ON public.blog_posts;
CREATE POLICY "Allow public read" ON public.blog_posts 
  FOR SELECT USING (true);

-- Allow all CRUD operations (protected at app level)
DROP POLICY IF EXISTS "Allow crud operations" ON public.blog_posts;
CREATE POLICY "Allow crud operations" ON public.blog_posts USING (true);

-- Create session_bookings table (optional)
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

CREATE INDEX IF NOT EXISTS idx_session_bookings_email ON public.session_bookings(email);
CREATE INDEX IF NOT EXISTS idx_session_bookings_date ON public.session_bookings(booking_date);

-- Enable RLS on bookings table
ALTER TABLE public.session_bookings ENABLE ROW LEVEL SECURITY;

-- Allow public read bookings
DROP POLICY IF EXISTS "Allow public read bookings" ON public.session_bookings;
CREATE POLICY "Allow public read bookings" ON public.session_bookings 
  FOR SELECT USING (true);

-- Allow public insert bookings
DROP POLICY IF EXISTS "Allow insert bookings" ON public.session_bookings;
CREATE POLICY "Allow insert bookings" ON public.session_bookings 
  FOR INSERT WITH CHECK (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO anon, authenticated;
GRANT SELECT, INSERT ON public.session_bookings TO anon, authenticated;
```

5. Click **Run** (the play button)
6. Wait for the query to complete

## Step 2: Add Sample Blog Posts (Optional)

Copy and paste this SQL to add 3 sample blog posts:

```sql
INSERT INTO public.blog_posts (slug, title, excerpt, content, cover_image, reading_time, author, published_at)
VALUES 
  (
    'power-of-sip',
    'The Power of SIP: How Rs 5,000/Month Can Build a Crore',
    'Discover how systematic investment plans leverage compounding to turn small monthly investments into significant wealth over time.',
    'Systematic Investment Plans (SIP) are one of the most powerful tools for long-term wealth creation. When you invest a fixed amount regularly, you benefit from rupee cost averaging and the power of compounding. With just Rs 5,000 per month invested in a diversified mutual fund earning 12% annually, you could accumulate over Rs 80+ lakhs in 20 years. The key is to start early and stay consistent. Start your SIP journey today and watch your wealth grow systematically.',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
    '5 min read',
    'WealthWise Team',
    NOW()
  ),
  (
    'tax-saving-elss',
    'ELSS vs PPF vs FD: Which Tax Saving Option Is Best?',
    'A comprehensive comparison of popular Section 80C investment options to help you make the smartest tax-saving decision.',
    'When it comes to saving taxes under Section 80C, investors have multiple options. Each has its own advantages. ELSS has highest growth potential with 3 year lock-in. PPF offers guaranteed returns with 15 year lock-in. FD provides predictable returns with flexible lock-in. Choose based on your risk appetite and investment horizon.',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop',
    '7 min read',
    'WealthWise Team',
    NOW()
  ),
  (
    'health-insurance-2024',
    'Health Insurance in 2024: A Complete Buying Guide',
    'Everything you need to know about choosing the right health insurance plan for your family.',
    'Health insurance is not a luxury but a necessity in today world. With medical inflation rising every year, having comprehensive health coverage is crucial. Key factors: Sum Insured should be Rs 5 lakhs+, check coverage for OPD and pre-existing diseases, ensure wide network hospitals, look for no-claim bonus, and balance premium with coverage. Invest in a good health insurance plan now.',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
    '6 min read',
    'WealthWise Team',
    NOW()
  )
ON CONFLICT (slug) DO NOTHING;
```

## Step 3: Verify Connection

1. Start your dev server:
```bash
npm run dev
```

2. Visit: `http://localhost:8080/admin`
3. Login with your admin password (set in `.env.local`)
4. Go to **Manage Blog**
5. You should see the sample blog posts loading from Supabase ✅

## Step 4: Test the Application

### Create a Blog Post:
1. Click **New Post** in admin panel
2. Fill in the details
3. Submit - it will save to Supabase
4. Go to `/blog` to see it published

### Test Booking Form:
1. Go to `/book-session`
2. Fill in the form
3. Submit (after configuring Nodemailer)
4. Email should be sent to Itskarthikgangadharan@gmail.com

## Troubleshooting

### Blog posts not loading?
- Check `.env.local` has correct Supabase URL and key
- Verify tables were created (go to Supabase Tables section)
- Check browser console for errors (F12)

### Can't insert/update posts?
- Verify RLS policies are enabled
- Check that permissions were granted
- Verify CRUD policies were created

### Want to reset data?
Run this in SQL editor:
```sql
DROP TABLE IF EXISTS public.session_bookings;
DROP TABLE IF EXISTS public.blog_posts;
```

Then re-run the table creation SQL above.

## Next: Email Configuration

After database is set up, configure Nodemailer:
1. Enable 2FA on your Gmail account
2. Generate an app password
3. Set environment variables in Vercel dashboard
4. Update admin email and password

See [NODEMAILER_SETUP.md](../NODEMAILER_SETUP.md) and [SETUP.md](../SETUP.md) for detailed instructions.

---

**Status**: Database ready! ✅
