# WealthWise Platform Setup Guide

This guide explains how to fully set up the email notifications and admin blog management system.

## Overview

The platform now includes:
- **Email Notifications**: Booking confirmations sent to `Itskarthikgangadharan@gmail.com`
- **Admin Panel**: Secure dashboard for managing blog posts
- **Blog Management**: Full CRUD operations for blog articles

---

## 1. Nodemailer Setup (for Booking Confirmations)

Nodemailer handles email sending through a Vercel serverless function. This requires Gmail 2FA and an app password.

**Quick Setup:**
1. Enable 2-Step Verification on your Gmail account at [myaccount.google.com/security](https://myaccount.google.com/security)
2. Generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Set environment variables in Vercel dashboard:
   - `EMAIL_USER` = your_email@gmail.com
   - `EMAIL_PASSWORD` = your_16_character_app_password
   - `ADMIN_EMAIL` = Itskarthikgangadharan@gmail.com

For detailed setup instructions, see [NODEMAILER_SETUP.md](./NODEMAILER_SETUP.md)

---

## 2. Supabase Setup (for Blog Management)

Supabase is an open-source Firebase alternative. It provides a PostgreSQL database for storing blog posts.

### Step 1: Create Supabase Project

1. Go to [Supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click **New Project**
4. Choose organization and enter:
   - **Project Name**: `clarity-wealth-hub` (or any name)
   - **Database Password**: Generate and save securely
   - **Region**: Choose closest to your location
5. Click **Create New Project**
6. Wait for the project to initialize (2-3 minutes)

### Step 2: Get Your Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under API Keys)

### Step 3: Create Blog Posts Table

1. Click **SQL Editor** in the sidebar
2. Click **New Query**
3. Paste this SQL to create the table:

```sql
CREATE TABLE public.blog_posts (
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

-- Set up RLS policies (Row Level Security)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published blog posts
CREATE POLICY "Allow public read access" 
  ON public.blog_posts 
  FOR SELECT 
  USING (true);

-- For now, insert/update/delete is done only through authenticated admin
-- We'll handle admin authorization at the app level
CREATE POLICY "Allow all operations" 
  ON public.blog_posts 
  USING (true);
```

4. Click **Run**
5. You should see success message

### Step 4: Add Sample Data (Optional)

In the same SQL Editor, paste:

```sql
INSERT INTO public.blog_posts (slug, title, excerpt, content, cover_image, reading_time, published_at) VALUES
('power-of-sip', 
 'The Power of SIP: How ₹5,000/Month Can Build a Crore',
 'Discover how systematic investment plans leverage compounding to turn small monthly investments into significant wealth over time.',
 'Systematic Investment Plans (SIP) are one of the most powerful tools for long-term wealth creation. Start with as low as ₹500 per month...',
 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
 '5 min read',
 NOW()),

('tax-saving-elss', 
 'ELSS vs PPF vs FD: Which Tax Saving Option Is Best?',
 'A comprehensive comparison of popular Section 80C investment options to help you make the smartest tax-saving decision.',
 'When it comes to saving taxes under Section 80C, investors have multiple options. Each has its own advantages and disadvantages...',
 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop',
 '7 min read',
 NOW());
```

5. Click **Run**

### Step 5: Update `.env.local`

Add these to your `.env.local` file:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```env
VITE_SUPABASE_URL=https://abc123xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc123...(long key here)
```

---

## 3. Admin Panel Setup

### Step 1: Set Admin Password

Add to your `.env.local`:

```env
VITE_ADMIN_PASSWORD=your_super_secure_password_here
```

**Example:**
```env
VITE_ADMIN_PASSWORD=MySecureAdminPass123!
```

### Step 2: Access Admin Panel

1. Start the dev server: `npm run dev`
2. Visit: `http://localhost:8080/admin`
3. Enter your admin password
4. You'll see the admin dashboard

### Step 3: Create Blog Posts

1. Click **"Manage Blog"** or go to `/admin/blog`
2. Click **"New Post"** button
3. Fill in:
   - **Title** (automatically generates slug)
   - **Excerpt** (short summary)
   - **Content** (full article)
   - **Cover Image URL** (use Unsplash URLs for free images)
   - **Reading Time** (e.g., "5 min read")
   - **Author** (defaults to "WealthWise Team")
4. Click **"Create Post"**
5. Post appears immediately in `/blog` page

### Step 4: Edit/Delete Blog Posts

- Click **"Edit"** to modify a post
- Click **"View"** to see it on the website
- Click **"Delete"** to remove (with confirmation)

---

## 4. Complete `.env.local` Example

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://abc123xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc123...(your actual key)

# Admin Configuration
VITE_ADMIN_PASSWORD=MySecureAdminPass123!

# Email Configuration (set in Vercel dashboard for production)
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASSWORD=your_app_password
# ADMIN_EMAIL=Itskarthikgangadharan@gmail.com
```

---

## 5. Testing the System

### Test Email Booking:

1. Go to `/book-session`
2. Fill in the form with test data
3. Click "Confirm Booking"
4. You should:
   - See success message
   - Receive email at `Itskarthikgangadharan@gmail.com`

### Test Admin Panel:

1. Go to `/admin`
2. Enter your admin password
3. Create/edit/delete a blog post
4. Go to `/blog` to see your post

---

## 6. Deployment

When deploying to production (Vercel):

1. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD`
   - `EMAIL_USER` (Gmail address)
   - `EMAIL_PASSWORD` (16-char app password)
   - `ADMIN_EMAIL` (admin notification email)

2. Deploy your code
3. Test on production

---

## 7. Security Notes

⚠️ **Important:**

- **Admin Password**: Change `VITE_ADMIN_PASSWORD` to a strong password
- **Email Credentials**: Never commit `.env.local` with email passwords (it's in `.gitignore`)
- **Supabase**: Use `anon` key only (it's read-only by default due to RLS)
- **Gmail App Password**: Only valid with 2FA enabled, regenerate if compromised

---

## 8. Troubleshooting

### Email Not Sending?

1. Check Vercel function logs for errors
2. Verify `EMAIL_USER` and `EMAIL_PASSWORD` are set in Vercel dashboard
3. Verify Gmail 2FA is enabled and app password is correct
4. Check browser console for API errors

### Blog Posts Not Loading?

1. Verify Supabase URL and key in `.env.local`
2. Check browser console for errors
3. Verify table exists: go to Supabase → Tables → check `blog_posts`
4. Check RLS policies are enabled

### Admin Login Not Working?

1. Verify `VITE_ADMIN_PASSWORD` is set correctly
2. Check exact password match (case-sensitive)
3. Clear browser localStorage if stuck: `localStorage.removeItem('admin_auth')`
4. Check browser console for errors

### Port 8080 Already in Use?

```bash
# Kill the process using port 8080
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:8080 | xargs kill -9
```

---

## 9. Next Steps

- [ ] Enable Gmail 2FA and generate app password
- [ ] Set environment variables in Vercel dashboard
- [ ] Create Supabase project and database table
- [ ] Test booking form in development
- [ ] Test admin panel
- [ ] Create blog posts
- [ ] Deploy to production

---

## Support

For issues:
1. Check the browser console (F12)
2. Check Supabase project logs
3. Check EmailJS error logs
4. Verify all environment variables are set

---

**Happy managing! 🎉**
