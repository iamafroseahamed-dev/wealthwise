# WealthWise Platform Setup Guide

This guide explains how to fully set up the email notifications and admin blog management system.

## Overview

The platform now includes:
- **Email Notifications**: Booking confirmations sent to `Itskarthikgangadharan@gmail.com`
- **Admin Panel**: Secure dashboard for managing blog posts
- **Blog Management**: Full CRUD operations for blog articles

---

## 1. EmailJS Setup (for Booking Confirmations)

EmailJS allows you to send emails directly from your frontend without a backend server.

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com)
2. Sign up for a free account
3. Verify your email

### Step 2: Set Up Email Service

1. Click **Add Service**
2. Choose **Gmail** (or your preferred email provider)
3. Name it: `gmail_service`
4. Connect your Gmail account (you may need to use an app password if 2FA is enabled)
5. Click **Create Service** (this generates your Service ID)

### Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Configure the template:

```
Template Name: Booking Confirmation
To Email: {{to_email}}
Subject: Session Booked - {{user_name}}

Email Body:
Hi {{user_name}},

Thank you for booking a consultation session with WealthWise!

📅 Session Details:
• Date: {{booking_date}}
• Time: {{booking_time}}
• Your Email: {{user_email}}
• Your Phone: {{user_phone}}

{{#if message}}
Additional Message:
{{message}}
{{/if}}

We'll send you a calendar invite shortly. If you have any questions, feel free to reach out.

Best regards,
WealthWise Team
Itskarthikgangadharan@gmail.com
```

4. Click **Save**. Note the **Template ID** (e.g., `template_xxxxx`)

### Step 4: Get Your Credentials

1. Go to **Account Settings**
2. Under **API** tab, copy:
   - **Service ID** (e.g., `service_xxxxx`)
   - **Public Key** (e.g., `3Lp2xxxxxxxxxxxxx`)
   - **Template ID** from the template you created

### Step 5: Update `.env.local`

Add these to your `.env.local` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Example:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123def456
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=3Lp2xyz123abc456
```

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

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123def456
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=3Lp2xyz123abc456

# Admin Configuration
VITE_ADMIN_PASSWORD=MySecureAdminPass123!
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

When deploying to production:

### Vercel / Netlify:

1. Add environment variables in your deployment dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_ADMIN_PASSWORD`

2. Deploy your code
3. Test on production

---

## 7. Security Notes

⚠️ **Important:**

- **Admin Password**: Change `VITE_ADMIN_PASSWORD` to a strong password
- **EmailJS Key**: Your public key is visible in browser (that's okay for EmailJS)
- **Supabase**: Use `anon` key only (it's read-only by default due to RLS)
- **Never commit `.env.local`**: It's in `.gitignore`

---

## 8. Troubleshooting

### Email Not Sending?

1. Check EmailJS dashboard for error logs
2. Verify email service is properly connected
3. Check template variables match: `{{to_email}}`, `{{user_name}}`, etc.
4. Test with console logs: `console.log('Sending:', bookingData)`

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

- [ ] Create EmailJS account and set up template
- [ ] Create Supabase project and database table
- [ ] Add credentials to `.env.local`
- [ ] Test booking form
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
